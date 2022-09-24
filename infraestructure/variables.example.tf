variable "location" {
  description = "The Azure Region in which all resources groups should be created."
}

variable "rg-name" {
  description = "The name of the resource group"
}

variable "db_name" {
  description = "The name of the database"
}

variable "postgresql-admin-login" {
  description = "Login to authenticate to PostgreSQL Server"
}

variable "postgresql-admin-password" {
  description = "Password to authenticate to PostgreSQL Server"
}

variable "postgresql-version" {
  description = "PostgreSQL Server version to deploy"
  default     = "11"
}

variable "postgresql-sku-name" {
  description = "PostgreSQL SKU Name"
  default     = "B_Gen5_1"
}

variable "postgresql-storage" {
  description = "PostgreSQL Storage in MB, from 5120 MB to 4194304 MB"
  default     = "5120"
}


variable "fn_storage_account_name" {
  description = "The name of the storage account name"
}

variable "fn_app_service_plan_name" {
  description = "The name of the function app service plan"
}

variable "function_app_name" {
  description = "The name of the function app"
}
variable "application_insights" {
  description = "The name of the application insights"
}

variable "services_bus_namespace_name" {
  description = "The name of the services bus namespace"
}
variable "messages_queue_name" {
  description = "The name of queue"
}
variable "messages_error_queue_name" {
  description = "The name of queue for error messages"
}
variable "delyfood_messages_writer" {
  description = "The authorization_rule of queue writer"
}

variable "delyfood_messages_reader" {
  description = "The authorization_rule of queue reader"
}
variable "delyfood_messages_error_reader" {
  description = "The authorization_rule of error queue reader"
}

variable "delyfood_messages_error_writer" {
  description = "The authorization rule of error queue writer"
}
variable "delyfood_signalr" {
  description = "The name of signalr service"
}
