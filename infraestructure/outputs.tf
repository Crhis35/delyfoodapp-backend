output "resource_group_name" {
  value       = azurerm_resource_group.resource_group.name
  description = "Name of the resource group"
}


output "function_app_name" {
  value       = azurerm_linux_function_app.fn_app.name
  description = "Name of the resource group"
}

output "function_app_id" {
  value       = azurerm_linux_function_app.fn_app.id
  description = "Id of the function app"
}

