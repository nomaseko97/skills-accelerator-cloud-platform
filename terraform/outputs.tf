# ============================================================
# TERRAFORM OUTPUTS
# ============================================================
# These outputs display important AWS resource information
# after the infrastructure has been deployed successfully.


# VPC ID
output "vpc_id" {
  description = "ID of the Skills Accelerator VPC"
  value       = aws_vpc.main.id
}


# Public Subnet IDs
output "public_subnet_ids" {
  description = "IDs of the public subnets"

  value = [
    aws_subnet.public_1.id,
    aws_subnet.public_2.id
  ]
}


# Private Subnet IDs
output "private_subnet_ids" {
  description = "IDs of the private subnets"

  value = [
    aws_subnet.private_1.id,
    aws_subnet.private_2.id
  ]
}


# Application Load Balancer DNS Name
output "alb_dns_name" {
  description = "Public DNS name of the Application Load Balancer"
  value       = aws_lb.main.dns_name
}


# RDS PostgreSQL Endpoint
output "rds_endpoint" {
  description = "Endpoint of the PostgreSQL RDS database"
  value       = aws_db_instance.main.address
}


# Auto Scaling Group Name
output "autoscaling_group_name" {
  description = "Name of the application Auto Scaling Group"
  value       = aws_autoscaling_group.app.name
}


# NAT Gateway Public IP
output "nat_gateway_public_ip" {
  description = "Public Elastic IP assigned to the NAT Gateway"
  value       = aws_eip.nat.public_ip
}