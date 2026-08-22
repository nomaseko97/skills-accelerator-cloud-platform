# 🚀 Skills Accelerator Cloud Platform

> **Share what you know. Learn what you need.**\
> A full-stack skills-sharing platform built with Node.js and
> PostgreSQL, containerised with Docker, and deployed on AWS using
> Terraform, load balancing, Auto Scaling, private compute, and Amazon
> RDS.

---

## 📖 Project Overview

**Skills Accelerator** is a community skills-sharing platform that
allows users to publish skills they can offer and discover skills shared
by others.

The application combines full-stack development, containerisation,
Infrastructure as Code, cloud networking, scalable compute, managed
database services, IAM, and secure instance administration in **one
end-to-end cloud project**.

The application began as a locally running Node.js/PostgreSQL system.
The same application was containerised with Docker and then deployed
into a custom AWS architecture provisioned with Terraform.

The result is a working three-tier cloud platform where users access the
application through an Application Load Balancer, application traffic is
routed to Docker running on private EC2 compute managed by Auto Scaling,
and persistent data is stored in Amazon RDS PostgreSQL.

---

## ✨ What the Application Does

Users can:

- ➕ Publish a new skill
- 🔍 Browse available skills
- 🔎 Search for skills
- 🗂️ Filter skills by category
- 📊 Filter skills by skill level
- ✏️ Edit existing skills
- 🗑️ Delete skills
- 📈 View skill statistics

Each skill can contain:

- Skill name
- Category
- Skill level
- Person offering the skill
- Availability
- Description

All CRUD operations are handled through the application backend and
persisted in PostgreSQL.

---

## 🎯 Project Goals

This project demonstrates how a working application can be engineered
into a cloud-hosted platform using modern deployment practices.

The project currently demonstrates:

- Full-stack application development
- REST API design
- PostgreSQL database integration
- Persistent CRUD operations
- Docker containerisation
- Docker image publishing
- Infrastructure as Code with Terraform
- AWS VPC and subnet design
- Public/private network separation
- Application Load Balancing
- Target health monitoring
- Auto Scaling-managed compute
- Repeatable EC2 configuration using Launch Templates
- Managed PostgreSQL with Amazon RDS
- IAM role-based permissions
- AWS Systems Manager Session Manager
- End-to-end cloud verification
- Cloud troubleshooting
- Cost-conscious resource management

---

## 🧰 Technology Stack

---

Layer / Area Technology Purpose

---

Frontend HTML5, CSS3, JavaScript Application user
interface

Backend Node.js, Express.js Application server

API REST Frontend/backend
communication

Database PostgreSQL Persistent relational
storage

Database Client `pg` Node.js/PostgreSQL
integration

Containerisation Docker Portable application
runtime

Container Registry Docker Hub Stores the deployable
image

Infrastructure as Code Terraform Provisions AWS
infrastructure

Cloud Platform AWS Hosts the application

Networking Amazon VPC Isolated cloud network

Public Connectivity Internet Gateway Internet connectivity
for public resources

Private Outbound NAT Gateway Outbound access for
Connectivity private resources

Load Balancing Application Load Public application
Balancer entry point

Traffic Routing Target Group Routes traffic to
healthy application
instances

Compute Amazon EC2 Runs the Docker
application

Compute Management EC2 Auto Scaling Manages EC2 instance
lifecycle

Instance Configuration Launch Template Defines repeatable EC2
configuration

Managed Database Amazon RDS PostgreSQL Cloud database tier

Identity & Access AWS IAM Roles and permissions

Instance Administration AWS Systems Manager Secure access to
private EC2

Source Control Git Version control

Repository GitHub Project hosting and
documentation

---

---

# 🏗️ Architecture

## Application Architecture

The application follows a three-tier logical design:

```text
┌────────────────────────────────────┐
│         PRESENTATION TIER          │
│      HTML + CSS + JavaScript       │
└──────────────────┬─────────────────┘
                   │
                   │ HTTP / REST API
                   ▼
┌────────────────────────────────────┐
│          APPLICATION TIER          │
│        Node.js + Express.js        │
│             Port 3000              │
└──────────────────┬─────────────────┘
                   │
                   │ SQL
                   ▼
┌────────────────────────────────────┐
│             DATA TIER              │
│            PostgreSQL              │
└────────────────────────────────────┘
```

## AWS Deployment Architecture

The same logical tiers are implemented in AWS as:

```text
                              INTERNET
                                  │
                                  │ HTTP :80
                                  ▼
                     ┌────────────────────────┐
                     │ Application Load       │
                     │ Balancer               │
                     └───────────┬────────────┘
                                 │
                                 │ Target Group :3000
                                 ▼
              ┌─────────────────────────────────────┐
              │          AUTO SCALING GROUP         │
              │                                     │
              │   ┌──────────────────────────────┐  │
              │   │ Private EC2                 │  │
              │   │       ↓                     │  │
              │   │ Docker                      │  │
              │   │       ↓                     │  │
              │   │ Node.js / Express :3000     │  │
              │   └──────────────┬───────────────┘  │
              └──────────────────┼──────────────────┘
                                 │
                                 │ PostgreSQL :5432
                                 │ SSL/TLS
                                 ▼
                     ┌────────────────────────┐
                     │ Amazon RDS PostgreSQL  │
                     │ Private Database Tier  │
                     └────────────────────────┘
```

### Request Flow

```text
Browser
   ↓
Application Load Balancer
   ↓
Target Group
   ↓
Auto Scaling Group
   ↓
Private EC2
   ↓
Docker
   ↓
Node.js / Express REST API
   ↓
Amazon RDS PostgreSQL
```

### 📸 Architecture Diagram

![Skills Accelerator AWS project architecture](<Screenshots/1.skills-accelerator-project-architecture.png>)

*Terraform-managed three-tier AWS architecture, including networking,
load balancing, Auto Scaling, RDS, CI/CD, Systems Manager, and
CloudWatch.*

> The architecture diagram represents the entire Skills Accelerator
> platform and will continue to evolve as CI/CD, monitoring, scaling
> policies, and additional security capabilities are added.

---

# 🔌 Application & REST API

The backend is built with **Node.js and Express.js**.

The frontend communicates with the backend through REST API endpoints,
while the backend uses the PostgreSQL `pg` client for database
operations.

CRUD functionality has been verified end-to-end:

Operation Function Status

---

Create Publish a skill ✅
Read Retrieve skills ✅
Update Edit a skill ✅
Delete Remove a skill ✅

The database provides persistent storage, so application records remain
available after browser refreshes and application requests.

### 📸 Application Evidence

![Skills Accelerator application showing persisted skill records](<Screenshots/2.Skills Accelerator application showing persisted skill records.PNG>)

*The Skills Accelerator interface displaying persisted application
data.*

---

# 🐳 Docker Containerisation

The application is packaged into Docker so that the same deployable
artifact can run consistently across local and AWS environments.

Build the image:

```bash
docker build -t skills-accelerator .
```

The Node.js application listens on:

```text
3000/tcp
```

The tested image is published to Docker Hub as:

```text
nomaseko97/skills-accelerator:latest
```

This image is used by the AWS application tier.

### 📸 Docker Hub Evidence

![Skills Accelerator latest image published on Docker Hub](<Screenshots/3.nomaseko97skills-acceleratorlatest Docker .PNG>)

*The published `nomaseko97/skills-accelerator:latest` container image.*

---

# 🧱 Infrastructure as Code with Terraform

The AWS infrastructure is provisioned using **Terraform**.

This makes the cloud environment reproducible, version-controlled, and
easier to review than relying only on manually created resources.

Core Terraform configuration:

```text
terraform/
├── main.tf
├── variables.tf
├── outputs.tf
└── terraform.tfvars
```

Terraform workflow:

```bash
terraform fmt
terraform validate
terraform plan
terraform apply
```

The infrastructure is deployed in:

```text
AWS Region: af-south-1 — Cape Town
```

### 📸 Terraform Evidence

```{=html}
<!-- ADD SCREENSHOT HERE: Successful Terraform deployment -->
```

---

# 🌐 AWS Networking

The project uses a custom Amazon VPC with public and private network
tiers.

The network includes:

- Custom VPC
- Two public subnets
- Two private subnets
- Multiple Availability Zones
- Internet Gateway
- NAT Gateway
- Public route table
- Private route table
- Security Groups

Conceptually:

```text
AWS VPC
│
├── PUBLIC TIER
│   ├── Application Load Balancer
│   └── NAT Gateway
│
└── PRIVATE TIER
    ├── Auto Scaling EC2 Application
    └── Amazon RDS PostgreSQL
```

The **Application Load Balancer** is the public application entry point.

The EC2 application tier operates inside the private network instead of
exposing the application server directly to users.

The NAT Gateway provides outbound connectivity required by resources in
the private application tier.

Amazon RDS operates in the private database tier.

### 📸 VPC Evidence

![AWS VPC and subnet configuration](<Screenshots/VPC and subnet configuration.png>)

*The custom VPC and its public and private subnet configuration across
multiple Availability Zones.*

---

# ⚖️ Application Load Balancer

The Application Load Balancer receives incoming HTTP traffic and
forwards requests to the application Target Group.

```text
Internet
   ↓
Application Load Balancer :80
   ↓
Target Group :3000
   ↓
EC2 Application
```

The ALB allows the application compute layer to remain behind the
load-balancing tier instead of exposing an EC2 instance directly.

### 📸 ALB Evidence

![Active Skills Accelerator Application Load Balancer](<Screenshots/02-application-load-balancer.PNG>)

*The internet-facing Application Load Balancer in an active state, with
its DNS endpoint and Availability Zones visible.*

---

# ❤️ Target Group & Health Checks

The Target Group routes ALB traffic to the Skills Accelerator
application on port `3000`.

Deployment verification confirmed:

```text
Total targets : 1
Healthy       : 1
Unhealthy     : 0
```

This is important because a running EC2 instance alone does not prove
that the application is reachable. A healthy target confirms that the
load balancer can successfully communicate with the deployed
application.

### 📸 Target Health Evidence

![Skills Accelerator target group showing a healthy EC2 target](<Screenshots/03-target-group-healthy.PNG>)

*The application Target Group reporting its EC2 target as healthy.*

---

# 📈 Auto Scaling Group

The application compute layer is managed by an **EC2 Auto Scaling
Group**.

Current tested configuration:

Setting Value

---

Minimum Capacity 1
Desired Capacity 1
Maximum Capacity 2
Instance Type `t3.micro`

Auto Scaling functionality was validated by temporarily increasing
desired capacity:

```text
1 → 2
```

AWS successfully launched an additional instance. After the scaling
test, desired capacity was returned to `1` to avoid unnecessary AWS
resource usage.

The Auto Scaling Group means the application architecture is based on
managed, replaceable instances rather than one manually maintained
server.

### 📸 Auto Scaling Evidence

![Skills Accelerator Auto Scaling Group configuration](<Screenshots/05-auto-scaling-group.PNG>)

*The Auto Scaling Group capacity configuration and associated Launch
Template.*

---

# 🚀 Launch Template & Instance Refresh

The Auto Scaling Group creates application instances from an AWS Launch
Template.

The Launch Template was updated to include the required EC2 IAM instance
profile:

```text
instanceRole
```

Instead of manually updating the running EC2 instance, the new
configuration was deployed using an **Auto Scaling Instance Refresh**.

Verified result:

```text
Status               : Successful
Percentage completed : 100%
Instances to update  : 0
```

This confirmed that a replacement EC2 instance could be created
successfully from the updated Launch Template.

### 📸 Instance Refresh Evidence

![Successful Auto Scaling Instance Refresh](<Screenshots/06-instance-refresh-successful.PNG>)

*A completed Auto Scaling Instance Refresh with a successful status.*

---

# 🖥️ EC2 Application Tier

The Skills Accelerator application runs on an EC2 `t3.micro` instance
managed by the Auto Scaling Group.

The EC2 instance runs Docker and uses:

```text
nomaseko97/skills-accelerator:latest
```

Runtime verification:

```bash
sudo docker ps
```

confirmed that the application container was running and exposing port
`3000`.

### 📸 EC2 / Docker Evidence

![Docker container running on the private EC2 application instance](<Screenshots/sudo docker ps showing Skills Accelerator container.PNG>)

*Runtime verification showing the Skills Accelerator container running
on EC2 and exposing port `3000`.*

---

# 🔐 AWS Systems Manager

The EC2 application instance was configured for secure administrative access using **AWS Systems Manager Session Manager**.

The instance uses an IAM instance profile with the required Systems Manager permissions, allowing it to register with Systems Manager and be managed without relying on SSH as the primary administration method.

During project validation, the EC2 instance successfully registered with Systems Manager and a Session Manager connection was established.

This provided a secure management method for the application server while reducing the need for direct SSH access during normal administration.

---

# 🗄️ Amazon RDS PostgreSQL

The application's PostgreSQL data tier is hosted using **Amazon RDS for
PostgreSQL**.

Database communication uses:

```text
Protocol   : PostgreSQL
Port       : 5432
Connection : SSL/TLS
```

RDS is associated with the private database network and is separated
from the public application entry point.

### 📸 RDS Evidence

![Amazon RDS PostgreSQL instance showing Available status](<Screenshots/RDS PostgreSQL showing Available status.png>)

*The managed PostgreSQL database in the `Available` state.*

> Do not expose passwords, access keys, `.env` values, or database
> credentials in repository screenshots.

---

# 🔗 Application-to-Database Connectivity

The application was tested from the deployed EC2 environment to verify
that the Node.js container could actually communicate with RDS.

Application logs confirmed:

```text
Skills Accelerator server is running on http://localhost:3000
Database connected successfully.
Skills table is ready.
```

Verified connectivity:

```text
Private EC2
    ↓
Docker
    ↓
Node.js / Express
    ↓
PostgreSQL Client
    ↓
Amazon RDS
```

### 📸 Database Connection Evidence

![Application logs showing a successful Amazon RDS connection](<Screenshots/Application logs showing successful RDS connection .PNG>)

*Container logs confirming that the application connected to RDS and
initialised the skills table.*

---

# 🧪 End-to-End Testing

The complete architecture was tested from the user-facing application
through to the database.

The application was accessed through the **Application Load Balancer DNS
endpoint**.

A skill was created through the deployed application.

The API was then queried from the application instance:

```bash
curl http://localhost:3000/api/skills
```

The endpoint returned the record persisted in Amazon RDS.

## CRUD Verification

Test Result

---

Create skill ✅ Passed
Read skill ✅ Passed
Update skill ✅ Passed
Delete skill ✅ Passed
Data persistence ✅ Passed

This validates the complete path:

```text
Browser
   ↓
ALB
   ↓
Target Group
   ↓
Private EC2
   ↓
Docker
   ↓
Node.js / Express
   ↓
RDS PostgreSQL
```

### 📸 Live Application Evidence

![Skills Accelerator running through the Application Load Balancer with persisted data](<Screenshots/Application running through ALB with persisted data.PNG>)

*The deployed application accessed through the ALB DNS endpoint and
displaying records persisted in RDS.*

### 📸 API Persistence Evidence

![Skills Accelerator API returning records persisted in Amazon RDS](<Screenshots/API Persistence Evidence.PNG>)

*The `/api/skills` endpoint returning persisted skill records from the
database tier.*

---

# 🔒 Security Design

The project currently follows a tiered security model:

```text
Internet
   │ HTTP :80
   ▼
Application Load Balancer
   │ HTTP :3000
   ▼
Private EC2 / Docker
   │ PostgreSQL :5432 + TLS
   ▼
Amazon RDS PostgreSQL
```

Current security decisions include:

- Public application traffic enters through the ALB.
- EC2 application instances operate in the private tier.
- RDS operates in the private database tier.
- Security Groups restrict communication between tiers.
- EC2 uses an IAM instance role rather than application-embedded AWS
  credentials.
- Systems Manager is used for private EC2 administration.
- PostgreSQL communication with RDS uses SSL/TLS.
- Secrets and `.env` files must not be committed to GitHub.

---

# 🧠 Challenges, Fixes & Lessons Learned

## RDS PostgreSQL SSL Connection

### Problem

The deployed application initially reported:

```text
no pg_hba.conf entry ... no encryption
```

### Cause

The network path to RDS was working, but the PostgreSQL client was
attempting an unencrypted connection.

### Fix

The Node.js database configuration was updated to use SSL/TLS for the
AWS RDS connection.

After rebuilding and redeploying the Docker image:

```text
Database connected successfully.
Skills table is ready.
```

### Lesson

Network reachability and successful application/database connectivity
are different layers. A database can be reachable while still rejecting
an incorrectly configured client.

---

## Systems Manager Connection

### Problem

A replacement EC2 instance initially showed:

```text
Session Manager: Not connected
```

### Cause

The Launch Template did not initially include the required EC2 IAM
instance profile.

### Fix

A new Launch Template version was created containing:

```text
instanceRole
```

The Auto Scaling Group was refreshed using the updated template.

### Lesson

Configuration required by Auto Scaling instances belongs in the Launch
Template rather than being manually applied to one server.

---

## IAM PassRole Permission

### Problem

Starting the Instance Refresh initially returned:

```text
You are not authorized to use launch template
```

### Cause

The deployment IAM user required permission to pass the EC2 instance
role.

### Fix

A scoped:

```text
iam:PassRole
```

permission was configured for `instanceRole`.

The Instance Refresh then completed successfully.

### Lesson

AWS infrastructure operations can require both permission to perform an
action and permission to pass the IAM role used by the resulting
resource.

---

# ▶️ How to Run the Project Locally

## Prerequisites

Install:

- Git
- Node.js and npm
- PostgreSQL
- Docker

## Clone the Repository

```bash
git clone <YOUR-GITHUB-REPOSITORY-URL>
cd skills-accelerator
```

## Install Dependencies

```bash
cd app
npm install
```

## Configure Environment Variables

Create your local `.env` file.

Example:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=skills_accelerator
DB_USER=<your-user>
DB_PASSWORD=<your-password>
PORT=3000
```

> Never commit `.env` or credentials to GitHub.

## Start PostgreSQL

Ensure the PostgreSQL service and configured database are running.

## Start the Application

```bash
npm start
```

Open:

```text
http://localhost:3000
```

## Stop the Local Application

Press:

```text
Ctrl + C
```

---

# 🐳 Run the Project with Docker

Build:

```bash
docker build -t skills-accelerator .
```

Run:

```bash
docker run -d \
  --name skills-accelerator \
  -p 3000:3000 \
  --env-file app/.env \
  skills-accelerator
```

Check the container:

```bash
docker ps
```

View logs:

```bash
docker logs -f skills-accelerator
```

Stop:

```bash
docker stop skills-accelerator
```

Restart:

```bash
docker start skills-accelerator
```

Remove the stopped container when no longer required:

```bash
docker rm skills-accelerator
```

---

# ☁️ Deploy the Project to AWS

## Prerequisites

Ensure you have:

- AWS account
- AWS CLI
- Terraform
- Required IAM permissions
- Docker image available on Docker Hub

Verify the AWS identity being used:

```bash
aws sts get-caller-identity
```

Navigate to the Terraform configuration:

```bash
cd terraform
```

Format:

```bash
terraform fmt
```

Validate:

```bash
terraform validate
```

Review the deployment:

```bash
terraform plan
```

Deploy:

```bash
terraform apply
```

Review the Terraform plan carefully before approving it.

Once the infrastructure is deployed and the target is healthy, access
Skills Accelerator using the **Application Load Balancer DNS name**.

---

# ⏹️ Stop the AWS Project & Reduce Cost

AWS resources can continue generating charges even when the application
is not actively being used.

## Auto Scaling-managed EC2

Because EC2 is controlled by an Auto Scaling Group, manually stopping
the EC2 instance is not the normal way to pause compute. The Auto
Scaling Group can replace a stopped instance.

For a temporary compute shutdown, configure:

```text
Minimum capacity : 0
Desired capacity : 0
```

When resuming the project:

```text
Minimum capacity : 1
Desired capacity : 1
Maximum capacity : 2
```

> Scaling EC2 to zero does not stop charges from resources such as the
> NAT Gateway, Application Load Balancer, or RDS.

## Destroy the Terraform Environment

If the cloud environment is no longer required and can safely be
recreated:

```bash
cd terraform
terraform plan -destroy
terraform destroy
```

Review the destruction plan before confirming.

> ⚠️ **Important:** `terraform destroy` can permanently remove
> infrastructure and database data depending on the Terraform
> configuration. Capture project evidence and back up required data
> first.

---

# 💰 Cost-Conscious Development

Before ending an AWS development session:

1.  Capture required evidence/screenshots.
2.  Commit and push application and Terraform changes.
3.  Determine whether database data must be retained.
4.  Scale down resources that can safely be stopped.
5.  Check which billable AWS resources remain active.
6.  Destroy the environment only when it is safe to recreate.

Cost management is treated as part of the cloud engineering lifecycle.

---

# 📊 Verification Matrix

Layer Verification Result

---

Frontend Application loads ✅
API REST API responds ✅
CRUD Create / Read / Update / Delete ✅
Database PostgreSQL persistence ✅
Container Docker image builds ✅
Container Docker image runs ✅
Registry Image published to Docker Hub ✅
IaC Terraform deployment ✅
Network VPC/subnet connectivity ✅
Load Balancer ALB reachable ✅
Target Health Target Group healthy ✅
Compute EC2 launched through Auto Scaling ✅
Scaling Desired capacity 1 → 2 tested ✅
Configuration Launch Template updated ✅
Lifecycle Instance Refresh completed ✅
Management Systems Manager connected ✅
Runtime Docker running on EC2 ✅
Database Application connected to RDS ✅
Persistence RDS data persisted ✅
End-to-End Browser → ALB → EC2 → RDS ✅

---

# 📸 Project Evidence Checklist

Use screenshots that demonstrate the architecture and prove
functionality rather than capturing every AWS configuration page.

    \# Evidence

---

     1 Working local Skills Accelerator application
     2 Docker Hub image
     3 Successful Terraform deployment
     4 VPC and subnets
     5 Active Application Load Balancer
     6 Healthy Target Group
     7 Auto Scaling Group
     8 Successful Instance Refresh
     9 Docker running on EC2
    10 Systems Manager connected
    11 RDS PostgreSQL available
    12 Application successfully connected to RDS
    13 Application running through ALB
    14 REST API returning persisted RDS data

When editing the README directly on GitHub, drag the relevant image into
the position marked:

```text
ADD SCREENSHOT HERE
```

GitHub will upload the image and insert the Markdown automatically.

---

# 📂 Recommended Repository Structure

```text
skills-accelerator/
│
├── app/
│   ├── public/
│   ├── server.js
│   ├── db.js
│   ├── package.json
│   └── .env.example
│
├── terraform/
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   └── terraform.tfvars
│
├── docs/
│   ├── architecture/
│   │   └── skills-accelerator-aws-architecture.png
│   └── screenshots/
│
├── Dockerfile
├── .dockerignore
├── .gitignore
└── README.md
```

---

# 🏆 Current Project Achievement

Skills Accelerator has evolved from:

```text
Frontend
   ↓
Node.js / Express
   ↓
PostgreSQL
   ↓
Docker
```

into:

```text
Terraform-managed AWS Infrastructure
                ↓
              VPC
                ↓
    Application Load Balancer
                ↓
          Target Group
                ↓
         Auto Scaling
                ↓
          Private EC2
                ↓
             Docker
                ↓
       Node.js / Express
                ↓
     Amazon RDS PostgreSQL
```

The application, Docker image, Terraform infrastructure, AWS networking,
compute, and database are all components of **one Skills Accelerator
Cloud Platform**.

---

# 🛣️ Roadmap

The next capabilities will extend the existing architecture rather than
creating separate projects:

- 🔄 GitHub Actions CI/CD
- 🐳 Automated Docker image build and publishing
- 🚀 Automated application deployment
- 📊 CloudWatch metrics
- 📝 Centralised application logging
- 🚨 CloudWatch alarms
- 📈 CPU-based Auto Scaling policies
- 🔐 Additional IAM/security hardening
- 🔑 Secrets management
- 💰 Further cost optimisation

---

## 💡 Engineering Principle

> **Build it → Containerise it → Provision it → Deploy it → Verify it →
> Automate it → Monitor it → Secure it.**

The goal of Skills Accelerator is to demonstrate the evolution of a
working application into a complete, reproducible, scalable, and
well-documented cloud platform.
