# Featured Projects

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20-green?style=flat-square&logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-API-orange?style=flat-square&logo=express)](https://expressjs.com/)
[![Docker](https://img.shields.io/badge/Docker-Container-blue?style=flat-square&logo=docker)](https://www.docker.com/)
[![Caddy](https://img.shields.io/badge/Caddy-Web_Server-1F8C44?style=flat-square&logo=caddy)](https://caddyserver.com/)
[![Cloudflare](https://img.shields.io/badge/Cloudflare-Workers-F38020?style=flat-square&logo=cloudflare)](https://workers.cloudflare.com/)
[![AWS](https://img.shields.io/badge/AWS-SES-FF9900?style=flat-square&logo=amazon-aws)](https://aws.amazon.com/ses/)
[![Oracle Cloud](https://img.shields.io/badge/Oracle_Cloud-VM-F80000?style=flat-square&logo=oracle)](https://www.oracle.com/cloud/)

---

![Home](https://dawn-unit-97b0.sdrowvieli1.workers.dev/creativehub/images/featured.png)

---

## 📖 About

**Featured Projects** is an extension page designed to showcase different projects and their details, with clear categories such as **Web Apps**, **Mobile Apps**, and **Web Games**.

It highlights services across web development, mobile applications, databases, APIs, and full-stack digital solutions.

> 🔧 Modular, route-based architecture  
> 💡 Fully responsive and optimized for scalability  
> 📫 Includes an integrated contact form and smooth scrolling sections

---

## 🌐 Live Demo

> 🔗 [Visit Featured Projects](https://lindocode.com/projects)

---

## 🛠️ Tech Stack

### Frontend

| Technology               | Purpose                                                 |
| ------------------------ | ------------------------------------------------------- |
| **Next.js**              | React framework for SSR, routing, and page optimization |
| **JavaScript / JSX**     | Core language and component syntax                      |
| **Base Path & Rewrites** | Project scaling and clean URL management                |

### Backend (Self-hosted on Oracle VM)

| Technology            | Purpose                                                    |
| --------------------- | ---------------------------------------------------------- |
| **Node.js + Express** | Custom API backend for form handling and internal services |
| **AWS SES**           | Email delivery for contact forms                           |
| **Caddy**             | Web server with automatic HTTPS                            |
| **Docker**            | Containerized deployment and service isolation             |

### Media & Performance

| Technology             | Purpose                                              |
| ---------------------- | ---------------------------------------------------- |
| **Cloudflare Workers** | Image optimization, video streaming, and CDN caching |

### Infrastructure

| Technology          | Purpose                          |
| ------------------- | -------------------------------- |
| **Oracle Cloud VM** | Hosting gateway for all services |
| **Git**             | Version control                  |

---

## 📁 Project Structure

```text
lazy-apps-website/
├── app/
│   ├── page.jsx
│   ├── mobile-apps/
│   ├── web-apps/
│   ├── web-games/
│   └── layout.js
├── components/
├── public/
├── next.config.mjs
└── README.md
```

---

## ⚙️ Key Features

- ✅ **Base Path Support** — Scalable project structure for multi-environment deployment
- ✅ **URL Rewrites** — Clean routing between frontend and backend services
- ✅ **Cloudflare Workers** — Optimized media delivery without origin strain
- ✅ **AWS SES Integration** — Reliable email form submissions
- ✅ **Dockerized Deployment** — Consistent environment across development and production
- ✅ **Caddy Auto-HTTPS** — Zero-config SSL certificates

---

## 🚀 Deployment Architecture

```text
User Request
   ↓
Cloudflare (CDN + Workers for images/videos)
   ↓
Caddy (Reverse Proxy + Auto-HTTPS)
   ↓
Docker Container (Next.js App)
   ↓
Express API (Node.js on same VM)
   ↓
AWS SES (Email sending)
```

---

## 👨‍💻 Author

**Lindocode Digital**  
_Trading as Lazy Apps_

_Apps That Work, So You Don't Have To._

---

## 📄 License

All rights reserved © Lindocode Digital

---

## ⭐ Support

_If this project helped you or you like it, consider giving it a star ⭐ on GitHub!_
