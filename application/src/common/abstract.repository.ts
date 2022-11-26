import {
  CreateOptions,
  EntityData,
  EntityRepository,
  FilterQuery,
  FindOptions,
  RequiredEntityData,
} from '@mikro-orm/core';
import { Logger, NotFoundException } from '@nestjs/common';
import { GraphQLResolveInfo } from 'graphql';

import { CoreEntity } from './entities/core.entity';
import { getPopulations } from './util/populate';

export abstract class AbstractRepository<TDocument extends CoreEntity> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: EntityRepository<TDocument>) {}

  async create(
    document: RequiredEntityData<TDocument>,
    options?: CreateOptions,
  ): Promise<TDocument> {
    const doc = this.model.create(document, options);
    await this.model.persist(doc).flush();
    return doc;
  }

  async findOne(
    filterQuery: FilterQuery<TDocument>,
    info: GraphQLResolveInfo,
  ): Promise<TDocument> {
    const document = await this.model.findOne(filterQuery, {
      populate: getPopulations(info),
    });

    if (!document) {
      this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new NotFoundException('Document not found.');
    }

    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: EntityData<TDocument>,
  ) {
    const document = await this.model.nativeUpdate(filterQuery, update);

    if (!document) {
      this.logger.warn(`Document not found with filterQuery:`, filterQuery);
      throw new NotFoundException('Document not found.');
    }

    return document;
  }

  async find({
    filterQuery,
    info,
    options,
  }: {
    filterQuery?: FilterQuery<TDocument>;
    info?: GraphQLResolveInfo;
    options?: FindOptions<TDocument, never>;
  }) {
    return this.model.find(filterQuery, {
      ...options,
      populate: getPopulations(info),
    });
  }
}
