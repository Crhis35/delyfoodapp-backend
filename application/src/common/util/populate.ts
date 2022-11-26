import fieldsToRelations from 'graphql-fields-to-relations';

export const getPopulations = (info) => {
  const relationPaths: string[] = fieldsToRelations(info as any).filter(
    (field) => field !== 'items',
  );
  const newRelations = relationPaths.map((word) => {
    const newWord = word.split('.');
    newWord.shift();
    return newWord.join('.');
  });

  return newRelations as any;
};
