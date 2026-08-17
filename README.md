# 🚀 Skills Accelerator Cloud Platform

A full-stack skills-sharing platform that allows users to offer,
discover, update, and manage skills within a community.

The project demonstrates practical software development, database
integration, containerisation, Infrastructure as Code, and cloud
engineering using **Node.js, Express.js, PostgreSQL, Docker, Docker Hub,
Terraform, and AWS**.

The project is developed incrementally over four weeks. Each week
extends the same application and infrastructure rather than creating a
separate project.

------------------------------------------------------------------------

## 📌 Project Overview

Skills Accelerator is a community learning platform designed around a
simple idea:

> **Share what you know. Learn what you need.**

Users can publish skills they are willing to share with others and
discover skills offered by other members of the community. The
application exposes backend functionality through a REST API and
persists application data in PostgreSQL.

------------------------------------------------------------------------

# 🗓️ Week 1 --- Application & Containerisation

## 🎯 Objectives

-   Build a CRUD web application
-   Connect the application to PostgreSQL
-   Implement REST API functionality
-   Containerise the application with Docker
-   Test the application locally
-   Push the application image to Docker Hub
-   Prepare the GitHub repository

## ✨ Application Features

-   ➕ Add and publish new skills
-   🔍 Browse and search skills
-   🗂️ Filter by category and skill level
-   ✏️ Edit existing skills
-   🗑️ Delete skills
-   📈 Display skill statistics
-   💾 Persistent PostgreSQL storage
-   🔌 REST API integration

## 🏗️ Application Architecture

``` text
Frontend (HTML + CSS + JavaScript)
              │
              │ HTTP / REST API
              ▼
Backend (Node.js + Express)
              │
              │ SQL Queries
              ▼
PostgreSQL Database
```

## 🐳 Docker Containerisation

The application was packaged into a Docker image and tested locally
before AWS deployment.

``` bash
docker build -t skills-accelerator .
```

### 📸 Evidence --- Local Application

``` markdown
![Skills Accelerator running locally](docs/screenshots/week1-local-application.png)
```

## 📦 Docker Hub

Docker image:

``` text
nomaseko97/skills-accelerator:latest
```

### 📸 Evidence --- Docker Hub

``` markdown
![Docker Hub Image](docs/screenshots/week1-docker-hub.png)
```

## ✅ Week 1 Outcome

-   ✅ Working CRUD application
-   ✅ Node.js/Express REST API
-   ✅ PostgreSQL integration
-   ✅ Dockerfile and working container
-   ✅ Docker Hub image
-   ✅ GitHub repository
-   ✅ Initial documentation

------------------------------------------------------------------------

# 🗓️ Week 2 --- AWS Infrastructure with Terraform

## 🎯 Objectives

Week 2 focused on building the AWS infrastructure required to host the
containerised application using **Terraform Infrastructure as Code**.

-   Create a custom VPC
-   Create public and private subnets
-   Configure Internet and NAT Gateways
-   Configure route tables and Security Groups
-   Deploy Amazon RDS PostgreSQL
-   Create an Application Load Balancer
-   Create a Launch Template
-   Create an Auto Scaling Group
-   Deploy Docker on EC2
-   Connect the application to RDS
-   Verify the complete three-tier deployment

**AWS Region:** `af-south-1` --- Cape Town

## 🧱 Infrastructure as Code

``` text
terraform/
├── main.tf
├── variables.tf
├── outputs.tf
└── terraform.tfvars
```

``` bash
terraform fmt
terraform validate
terraform plan
terraform apply
```

### 📸 Evidence --- Terraform Deployment

``` markdown
![Terraform Apply](docs/screenshots/week2-terraform-apply.png)
```

## 🌐 VPC and Networking

The environment uses a custom VPC with two public subnets, two private
subnets, multiple Availability Zones, an Internet Gateway, NAT Gateway,
route tables and Security Groups.

### 📸 Evidence --- VPC and Subnets

``` markdown
![AWS VPC and Subnets](docs/screenshots/week2-vpc-subnets.png)
```

## 🏗️ AWS Architecture

``` text
Internet
   │
   ▼
Application Load Balancer :80
   │
   ▼
Target Group :3000
   │
   ▼
Auto Scaling Group
   │
   ▼
Private EC2 → Docker → Node.js / Express
   │
   │ PostgreSQL :5432
   ▼
Amazon RDS PostgreSQL
```

### 📸 Architecture Diagram

``` markdown
![Skills Accelerator AWS Architecture](docs/architecture/skills-accelerator-architecture.png)
```

## ⚖️ Application Load Balancer

The ALB provides the public application entry point and forwards
requests to the Target Group.

### 📸 Evidence --- ALB

``` markdown
![Application Load Balancer](docs/screenshots/week2-alb.png)
```

## ❤️ Target Group Health

Testing confirmed:

``` text
Total targets: 1
Healthy: 1
Unhealthy: 0
```

### 📸 Evidence --- Healthy Target Group

``` markdown
![Healthy Target Group](docs/screenshots/week2-target-group-healthy.png)
```

## 📈 Auto Scaling Group

``` text
Minimum capacity: 1
Desired capacity: 1
Maximum capacity: 2
Instance type: t3.micro
```

Auto Scaling was tested by temporarily increasing desired capacity from
`1` to `2`. AWS launched an additional instance, after which capacity
was returned to `1` to reduce resource usage.

### 📸 Evidence --- Auto Scaling Group

``` markdown
![Auto Scaling Group](docs/screenshots/week2-auto-scaling-group.png)
```

## 🚀 Launch Template and Instance Refresh

An updated Launch Template version included the required IAM instance
profile:

``` text
instanceRole
```

The Auto Scaling Instance Refresh completed successfully:

``` text
Status: Successful
Percentage completed: 100%
Instances to update: 0
```

### 📸 Evidence --- Instance Refresh

``` markdown
![Successful Instance Refresh](docs/screenshots/week2-instance-refresh.png)
```

## 🖥️ EC2 and Docker

The application runs on a private EC2 `t3.micro` instance using:

``` text
nomaseko97/skills-accelerator:latest
```

The container was verified with:

``` bash
sudo docker ps
```

### 📸 Evidence --- Docker on EC2

``` markdown
![Docker Container Running](docs/screenshots/week2-docker-ec2.png)
```

## 🔐 Systems Manager Session Manager

The private EC2 instance uses `instanceRole` and successfully connected
to AWS Systems Manager.

``` text
Ping status: Online
Session Manager connection status: Connected
```

### 📸 Evidence --- Session Manager

``` markdown
![Session Manager Connected](docs/screenshots/week2-session-manager.png)
```

## 🗄️ Amazon RDS PostgreSQL

Amazon RDS provides the managed PostgreSQL database tier. The
application connects on TCP port `5432`, and the DB subnet group uses
the private subnets.

### 📸 Evidence --- RDS

``` markdown
![Amazon RDS PostgreSQL](docs/screenshots/week2-rds.png)
```

## 🔗 Application-to-RDS Connectivity

Application logs confirmed:

``` text
Skills Accelerator server is running on http://localhost:3000
Database connected successfully.
Skills table is ready.
```

### 📸 Evidence --- RDS Connection

``` markdown
![RDS Connection Successful](docs/screenshots/week2-rds-connection.png)
```

## 💾 End-to-End Database Persistence

The deployed application was tested through the ALB. The REST API
successfully returned skill records persisted in Amazon RDS:

``` bash
curl http://localhost:3000/api/skills
```

  Operation   Result
  ----------- -----------
  Create      ✅ Passed
  Read        ✅ Passed
  Update      ✅ Passed
  Delete      ✅ Passed

``` text
Browser
   ↓
Application Load Balancer
   ↓
Target Group
   ↓
Private EC2
   ↓
Docker
   ↓
Node.js / Express
   ↓
Amazon RDS PostgreSQL
```

### 📸 Evidence --- Application Through ALB

``` markdown
![Application Through ALB](docs/screenshots/week2-application-alb.png)
```

### 📸 Evidence --- API / RDS Persistence

``` markdown
![RDS Persistence Test](docs/screenshots/week2-api-rds.png)
```

## 🔐 Security Design

Security Groups restrict traffic between tiers. EC2 administration uses
Systems Manager rather than direct public SSH access.

``` text
Internet
   │ HTTP :80
   ▼
Application Load Balancer
   │ HTTP :3000
   ▼
Private EC2 / Docker
   │ PostgreSQL :5432
   ▼
Amazon RDS PostgreSQL
```

## 🛠️ Challenges and Solutions

### RDS PostgreSQL SSL

**Problem:** The application initially reported
`no pg_hba.conf entry ... no encryption`.

**Solution:** The Node.js PostgreSQL configuration was updated to use
SSL/TLS for AWS RDS. The Docker image was rebuilt and redeployed
successfully.

### Systems Manager Connection

**Problem:** A replacement EC2 instance initially showed
`Session Manager: Not connected`.

**Solution:** A new Launch Template version was created with the
`instanceRole` IAM instance profile and the ASG was refreshed.

### IAM PassRole

**Problem:** Instance Refresh initially returned
`You are not authorized to use launch template`.

**Solution:** A scoped `iam:PassRole` permission was configured for
`instanceRole`, after which the refresh completed successfully.

## 📊 Week 2 Test Results

  Test                                     Result
  ---------------------------------------- -----------
  Terraform infrastructure deployment      ✅ Passed
  VPC networking                           ✅ Passed
  ALB connectivity                         ✅ Passed
  Target Group health                      ✅ Passed
  Auto Scaling deployment                  ✅ Passed
  Launch Template update                   ✅ Passed
  Instance Refresh                         ✅ Passed
  Systems Manager access                   ✅ Passed
  Docker container on EC2                  ✅ Passed
  EC2 → RDS connectivity                   ✅ Passed
  Application through ALB                  ✅ Passed
  Create / Read / Update / Delete in RDS   ✅ Passed

## ✅ Week 2 Outcome

-   ✅ Terraform Infrastructure as Code
-   ✅ Custom VPC
-   ✅ Public and private subnets
-   ✅ Internet Gateway and NAT Gateway
-   ✅ Route tables and Security Groups
-   ✅ Application Load Balancer
-   ✅ Healthy Target Group
-   ✅ Launch Template
-   ✅ Auto Scaling Group
-   ✅ Private EC2 application tier
-   ✅ Docker deployment on EC2
-   ✅ Amazon RDS PostgreSQL
-   ✅ IAM instance role
-   ✅ Systems Manager Session Manager
-   ✅ Successful Instance Refresh
-   ✅ Application-to-RDS connectivity
-   ✅ End-to-end CRUD persistence

------------------------------------------------------------------------

## 📂 Screenshot Structure

``` text
docs/
├── architecture/
│   └── skills-accelerator-architecture.png
└── screenshots/
    ├── week1-local-application.png
    ├── week1-docker-hub.png
    ├── week2-terraform-apply.png
    ├── week2-vpc-subnets.png
    ├── week2-alb.png
    ├── week2-target-group-healthy.png
    ├── week2-auto-scaling-group.png
    ├── week2-instance-refresh.png
    ├── week2-docker-ec2.png
    ├── week2-session-manager.png
    ├── week2-rds.png
    ├── week2-rds-connection.png
    ├── week2-application-alb.png
    └── week2-api-rds.png
```

------------------------------------------------------------------------

## 🚧 Project Status

-   ✅ **Week 1 --- Application & Containerisation**
-   ✅ **Week 2 --- AWS Infrastructure with Terraform**
-   ⏳ **Week 3 --- CI/CD & Deployment Automation**
-   ⏳ **Week 4 --- Monitoring, Scaling & Security**

The same Skills Accelerator application, architecture, and README will
continue to evolve throughout the remaining project stages.
