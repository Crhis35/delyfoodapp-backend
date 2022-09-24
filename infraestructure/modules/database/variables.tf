variable "resource_group" {
  description = "The name of the resource group"
  type = object({
    name     = string
    location = string
  })
}

variable "name" {
  description = "The name of the service"
}
variable "db_name" {
  description = "The name of the database"
}

variable "postgresql-admin-login" {
  type        = string
  description = "Login to authenticate to PostgreSQL Server"
}

variable "postgresql-admin-password" {
  type        = string
  description = "Password to authenticate to PostgreSQL Server"
}

variable "postgresql-version" {
  type        = string
  description = "PostgreSQL Server version to deploy"
  default     = "11"
}

variable "postgresql-sku-name" {
  type        = string
  description = "PostgreSQL SKU Name"
  default     = "B_Gen5_1"
}

variable "postgresql-storage" {
  type        = number
  description = "PostgreSQL Storage in MB, from 5120 MB to 4194304 MB"
  default     = "5120"
}
