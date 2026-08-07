# 🚀 Skills Accelerator Cloud Platform

A full-stack skills-sharing platform that allows users to offer, discover, update, and manage skills within a community.

The project demonstrates practical software development, database integration, containerisation, and cloud engineering concepts using **Node.js, Express.js, PostgreSQL, Docker, and Docker Hub**.

---

## 📌 Project Overview

Skills Accelerator is a community learning platform designed around a simple idea:

> **Share what you know. Learn what you need.**

Users can publish skills they are willing to share with others and discover skills offered by other members of the community.

Each skill contains information such as:

- Skill name
- Category
- Skill level
- Person offering the skill
- Availability
- Description

The application stores the information in a PostgreSQL database and exposes backend functionality through a REST API.

---

## ✨ Features

- ➕ Add and publish new skills
- 🔍 Browse available skills
- 🔎 Search for skills
- 🗂️ Filter skills by category
- 📊 Filter skills by skill level
- ✏️ Edit existing skills
- 🗑️ Delete skills
- 📈 Display skill statistics
- 💾 Persistent PostgreSQL database storage
- 🔌 REST API integration
- 🐳 Docker containerisation
- 📦 Docker Hub image publishing
- 🔐 Environment-based database configuration

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| HTML5 | Application structure |
| CSS3 | User interface styling |
| JavaScript | Frontend functionality |
| Node.js | Backend runtime |
| Express.js | Web server and REST API |
| PostgreSQL | Relational database |
| `pg` | PostgreSQL integration with Node.js |
| Docker | Application containerisation |
| Docker Hub | Container image registry |
| Git | Source control |
| GitHub | Source code repository |

---

## 🏗️ Application Architecture

The application follows a simple three-tier architecture:

```text
┌─────────────────────────────┐
│ Frontend │
│ HTML + CSS + JavaScript │
└──────────────┬──────────────┘
│
│ HTTP / REST API
▼
┌─────────────────────────────┐
│ Backend │
│ Node.js + Express │
└──────────────┬──────────────┘
│
│ SQL Queries
▼
┌─────────────────────────────┐
│ Database │
│ PostgreSQL │
└─────────────────────────────┘
