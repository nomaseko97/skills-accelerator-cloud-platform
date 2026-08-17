🚀 Skills Accelerator Cloud Platform

> **Share what you know. Learn what you need.**

Skills Accelerator is a full-stack skills-sharing platform where users
can publish, discover, search, edit, and delete skills.

The project started as a Node.js and PostgreSQL application, was
containerised with Docker, and was then deployed to AWS using
Terraform as a scalable three-tier cloud application.

✨ Features

● Create, view, search, edit and delete skills

● Search and filter skills

● REST API

● PostgreSQL data persistence

● Docker containerisation

● Terraform-managed AWS infrastructure

● Load-balanced cloud deployment

● Auto Scaling-managed EC2

● Amazon RDS PostgreSQL

🧰 Tech Stack

HTML • CSS • JavaScript • Node.js • Express.js • PostgreSQL
• Docker • Terraform • AWS • Git • GitHub

AWS: VPC • EC2 • Application Load Balancer • Auto Scaling • RDS •
IAM • Systems Manager

Region: af-south-1 — Cape Town

💻 Application Architecture

The application was first built as a three-tier application:

```text
Frontend
HTML + CSS + JavaScript
        ↓
REST API
        ↓
Node.js + Express
        ↓
PostgreSQL
```

CRUD functionality was implemented and tested successfully:

Operation    Status

Create         ✅
Read           ✅
Update         ✅
Delete         ✅

📸 Application

```{=html}
<!-- ADD SCREENSHOT HERE: Working Skills Accelerator application -->
```

🐳 Containerisation

The application was packaged with Docker to create a portable deployment
artifact.

Build the image:

```bash
docker build -t skills-accelerator .
```

Published Docker image:

```text
nomaseko97/skills-accelerator:latest
```

The same container image is used for the AWS deployment.

📸 Docker Hub

```{=html}
<!-- ADD SCREENSHOT HERE: Published Skills Accelerator Docker image -->
```

☁️ AWS Deployment

After the application and container were working, the infrastructure
required to host the application was provisioned using Terraform.

The deployment includes:

● Custom VPC

● Public and private subnets

● Internet Gateway and NAT Gateway

● Application Load Balancer

● Target Group

● Auto Scaling Group

● Launch Template

● Private EC2 application tier

● Amazon RDS PostgreSQL

● IAM instance role

● AWS Systems Manager

Current Architecture

```text
Internet
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
Node.js / Express
   ↓
Amazon RDS PostgreSQL
```

📸 Architecture

```{=html}
<!-- ADD SCREENSHOT HERE: Skills Accelerator Draw.io AWS architecture -->
```

Deploy with Terraform

```bash
cd terraform
terraform fmt
terraform validate
terraform plan
terraform apply
```

📸 AWS Infrastructure

```{=html}
<!-- ADD SCREENSHOT HERE: Terraform / AWS infrastructure -->
```

🧪 End-to-End Verification

The complete cloud application flow was successfully tested:

```text
Browser → ALB → EC2 → Docker → Node.js → RDS
```

Test                                  Status

Application accessible through ALB      ✅
Target Group healthy                    ✅
Docker running on EC2                   ✅
Application connected to RDS            ✅
CRUD operations                         ✅
RDS data persistence                    ✅
Auto Scaling                            ✅
Instance Refresh                        ✅
Systems Manager access                  ✅

The REST API was also used to confirm that skills created through the
application were stored in RDS:

```bash
curl http://localhost:3000/api/skills
```

📸 Live AWS Application

```{=html}
<!-- ADD SCREENSHOT HERE: Application running through ALB -->
```

📸 RDS Persistence

```{=html}
<!-- ADD SCREENSHOT HERE: API returning persisted RDS records -->
```

🧠 Key Challenges Solved

● RDS connection: Updated the Node.js PostgreSQL configuration to
use SSL/TLS.

● Systems Manager: Added instanceRole to the Launch Template and
refreshed the Auto Scaling Group.

● Launch Template authorization: Added the required scoped
iam:PassRole permission.

▶️ Run Locally

Clone and install:

```bash
git clone <YOUR-REPOSITORY-URL>
cd skills-accelerator/app
npm install
```

Configure your local PostgreSQL connection in .env, then:

```bash
npm start
```

Open:

```text
http://localhost:3000
```

Stop with Ctrl + C.

> Never commit `.env`, passwords, AWS credentials, or database
> credentials.

🐳 Run with Docker

```bash
docker build -t skills-accelerator .

docker run -d \
  --name skills-accelerator \
  -p 3000:3000 \
  --env-file app/.env \
  skills-accelerator
```

Stop:

```bash
docker stop skills-accelerator
```

⏹️ Stop AWS Resources

Because EC2 is managed by Auto Scaling, scale the group down instead of
manually stopping the EC2 instance:

```text
Minimum capacity: 0
Desired capacity: 0
```

To completely remove the Terraform-managed environment:

```bash
cd terraform
terraform destroy
```

> ⚠️ Save required screenshots and database data before destroying
> infrastructure. Resources such as the ALB, NAT Gateway, and RDS may
> continue generating costs while they remain deployed.

📂 Project Structure

```text
skills-accelerator/
├── app/
├── terraform/
├── docs/
│   ├── architecture/
│   └── screenshots/
├── Dockerfile
├── .gitignore
└── README.md
```

🛣️ What’s Next?

The same Skills Accelerator platform will continue to evolve with:

● CI/CD automation

● Automated Docker build and deployment

● Monitoring and logging

● Scaling policies

● Security improvements

● Secrets management

● Cost optimisation

> **Build → Containerise → Provision → Deploy → Verify → Automate →
> Monitor → Secure**
