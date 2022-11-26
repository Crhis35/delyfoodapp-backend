
resource "azurerm_postgresql_flexible_server" "delyfood_postgresql_flexible_server" {
  name                   = "${var.name}-server"
  resource_group_name    = var.resource_group.name
  location               = var.resource_group.location
  version                = var.postgresql-version
  administrator_login    = var.postgresql-admin-login
  administrator_password = var.postgresql-admin-password
  zone                   = "1"
  storage_mb             = var.postgresql-storage
  sku_name               = var.postgresql-sku-name
  backup_retention_days  = 7


}
resource "azurerm_postgresql_flexible_server_database" "delyfood_flexible_server_db" {
  name      = "${var.name}-db"
  server_id = azurerm_postgresql_flexible_server.delyfood_postgresql_flexible_server.id
  collation = "en_US.UTF8"
  charset   = "UTF8"
}
