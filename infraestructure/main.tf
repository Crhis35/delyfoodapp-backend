resource "azurerm_resource_group" "resource_group" {
  name     = var.rg-name
  location = var.location
}


resource "random_integer" "ri" {
  min = 10000
  max = 99999
}

module "delyfood_database" {
  source                    = "./modules/database"
  db_name                   = var.db_name
  name                      = "${var.rg-name}-postgresql"
  postgresql-admin-login    = var.postgresql-admin-login
  postgresql-admin-password = var.postgresql-admin-password
  postgresql-sku-name       = var.postgresql-sku-name
  postgresql-storage        = var.postgresql-storage
  postgresql-version        = var.postgresql-version
  resource_group = {
    name     = azurerm_resource_group.resource_group.name,
    location = azurerm_resource_group.resource_group.location,
  }
}

#Create Resource Group
resource "azurerm_storage_account" "fn_storage_account" {
  name                     = var.fn_storage_account_name
  location                 = azurerm_resource_group.resource_group.location
  resource_group_name      = azurerm_resource_group.resource_group.name
  account_tier             = "Standard"
  account_replication_type = "LRS"
}

resource "azurerm_service_plan" "fn_app_service_plan" {
  name                = var.fn_app_service_plan_name
  location            = azurerm_resource_group.resource_group.location
  resource_group_name = azurerm_resource_group.resource_group.name
  os_type             = "Linux"
  sku_name            = "Y1"

}
resource "azurerm_signalr_service" "delyapp_signalr" {
  name                = var.delyfood_signalr
  location            = azurerm_resource_group.resource_group.location
  resource_group_name = azurerm_resource_group.resource_group.name

  sku {
    name     = "Free_F1"
    capacity = 1
  }

  cors {
    allowed_origins = ["*"]
  }

  connectivity_logs_enabled = true
  messaging_logs_enabled    = true
  service_mode              = "Default"
}
resource "azurerm_application_insights" "application_insights" {
  name                = var.application_insights
  location            = azurerm_resource_group.resource_group.location
  resource_group_name = azurerm_resource_group.resource_group.name
  application_type    = "Node.JS"
}

resource "azurerm_linux_function_app" "fn_app" {
  name                       = var.function_app_name
  location                   = azurerm_resource_group.resource_group.location
  resource_group_name        = azurerm_resource_group.resource_group.name
  service_plan_id            = azurerm_service_plan.fn_app_service_plan.id
  storage_account_name       = azurerm_storage_account.fn_storage_account.name
  storage_account_access_key = azurerm_storage_account.fn_storage_account.primary_access_key

  site_config {

  }

  app_settings = {
    FUNCTIONS_EXTENSION_VERSION              = "~3"
    FUNCTIONS_WORKER_RUNTIME                 = "node"
    WEBSITE_CONTENTAZUREFILECONNECTIONSTRING = "${azurerm_storage_account.fn_storage_account.primary_connection_string}"
    WEBSITE_CONTENTSHARE                     = "${azurerm_storage_account.fn_storage_account.name}"
    APPINSIGHTS_INSTRUMENTATIONKEY           = azurerm_application_insights.application_insights.instrumentation_key,
  }

  depends_on = [
    module.delyfood_database
  ]
}

# Creates the queue
resource "azurerm_servicebus_namespace" "bus_namespace" {
  name                = var.services_bus_namespace_name
  location            = azurerm_resource_group.resource_group.location
  resource_group_name = azurerm_resource_group.resource_group.name
  sku                 = "Basic"

}

# Queue for regular messages
resource "azurerm_servicebus_queue" "delyfood_messages_queue" {
  name         = var.messages_queue_name
  namespace_id = azurerm_servicebus_namespace.bus_namespace.id

  lock_duration         = "PT30S"
  max_size_in_megabytes = 1024
  enable_partitioning   = true
}

# Queue for messages that had errors
resource "azurerm_servicebus_queue" "delyfood_messages_error_queue" {
  name         = var.messages_error_queue_name
  namespace_id = azurerm_servicebus_namespace.bus_namespace.id

  max_size_in_megabytes                = 1024
  enable_partitioning                  = true
  default_message_ttl                  = "PT30S"
  dead_lettering_on_message_expiration = true
  forward_dead_lettered_messages_to    = azurerm_servicebus_queue.delyfood_messages_queue.name
}

# Credentials for App1 message generator
resource "azurerm_servicebus_queue_authorization_rule" "delyfood_messages_writer" {
  name     = var.delyfood_messages_writer
  queue_id = azurerm_servicebus_queue.delyfood_messages_queue.id

  listen = false
  send   = true
  manage = false
}

# Credentials for Azure Functions consumer
resource "azurerm_servicebus_queue_authorization_rule" "delyfood_messages_reader" {
  name     = var.delyfood_messages_reader
  queue_id = azurerm_servicebus_queue.delyfood_messages_queue.id

  listen = true
  send   = false
  manage = false
}

# Credentials for App1 message generator
resource "azurerm_servicebus_queue_authorization_rule" "delyfood_messages_error_reader" {
  name     = var.delyfood_messages_error_reader
  queue_id = azurerm_servicebus_queue.delyfood_messages_error_queue.id

  listen = false
  send   = true
  manage = false
}
