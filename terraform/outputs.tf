output "bastion_public_ip" {
  description = "Bastion host public IP"
  value       = aws_instance.bastion.public_ip
}

output "app_private_ip" {
  description = "Application server private IP"
  value       = aws_instance.app.private_ip
}

output "ecr_repository_url" {
  description = "ECR repository URL"
  value       = aws_ecr_repository.main.repository_url
}

output "vpc_id" {
  description = "VPC ID"
  value       = aws_vpc.main.id
}

output "application_url" {
  description = "Public URL to access the application"
  value       = "http://${aws_lb.main.dns_name}"
}