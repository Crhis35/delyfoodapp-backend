# Docs

- command: terraform plan -var-file=variables/dev.tfvars

```terraform
resource "azurerm_virtual_network" "default" {
  name                = "${var.name}-vnet"
  location            = var.resource_group.location
  resource_group_name = var.resource_group.name
  address_space       = ["10.1.0.0/16"]
}

resource "azurerm_network_security_group" "default" {
  name                = "${var.name}-nsg"
  location            = var.resource_group.location
  resource_group_name = var.resource_group.name

  security_rule {
    name                       = "foxsec-sec"
    priority                   = 100
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "*"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }
}

resource "azurerm_subnet" "default" {
  name                 = "${var.name}-subnet"
  virtual_network_name = azurerm_virtual_network.default.name
  resource_group_name  = var.resource_group.name
  address_prefixes     = ["10.1.1.0/24"]
  service_endpoints    = ["Microsoft.Storage"]

  delegation {
    name = "affs"

    service_delegation {
      name = "Microsoft.DBforPostgreSQL/flexibleServers"

      actions = [
        "Microsoft.Network/virtualNetworks/subnets/join/action",
      ]
    }
  }
}

resource "azurerm_subnet_network_security_group_association" "default" {
  subnet_id                 = azurerm_subnet.default.id
  network_security_group_id = azurerm_network_security_group.default.id
}

resource "azurerm_private_dns_zone" "default" {
  name                = "${var.name}-pdz.postgres.database.azure.com"
  resource_group_name = var.resource_group.name

  depends_on = [azurerm_subnet_network_security_group_association.default]
}

resource "azurerm_private_dns_zone_virtual_network_link" "delyfood_dns" {
  name                  = "${var.name}-pdzvnetlink.com"
  private_dns_zone_name = azurerm_private_dns_zone.default.name
  virtual_network_id    = azurerm_virtual_network.default.id
  resource_group_name   = var.resource_group.name
}

resource "azurerm_postgresql_flexible_server" "delyfood_postgresql_flexible_server" {
  name                   = "${var.name}-server"
  resource_group_name    = var.resource_group.name
  location               = var.resource_group.location
  version                = var.postgresql-version
  delegated_subnet_id    = azurerm_subnet.default.id
  private_dns_zone_id    = azurerm_private_dns_zone.default.id
  administrator_login    = var.postgresql-admin-login
  administrator_password = var.postgresql-admin-password
  zone                   = "1"
  storage_mb             = var.postgresql-storage
  sku_name               = var.postgresql-sku-name
  backup_retention_days  = 7

  

  depends_on = [azurerm_private_dns_zone_virtual_network_link.delyfood_dns]
}
resource "azurerm_postgresql_flexible_server_database" "delyfood_flexible_server_db" {
  name      = "${var.name}-db"
  server_id = azurerm_postgresql_flexible_server.delyfood_postgresql_flexible_server.id
  collation = "en_US.UTF8"
  charset   = "UTF8"
}

```
