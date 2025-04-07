<div align="center">
  
  ![GitHub repo size](https://img.shields.io/badge/repo_size-10_MB-yellow)
  ![GitHub stars](https://img.shields.io/github/stars/ranitderia/mindease?style=social)
  [![Twitter Follow](https://img.shields.io/twitter/follow/DeriaRanit?style=social)](https://twitter.com/intent/follow?screen_name=DeriaRanit)

  <br />
  <br />
  
  <img src="./readme-images/brand1.png" />

  <h2 align="center">Kravs - Custom Automation Workflows</h2>

  A Zapier-style automation tool to create workflows using Webhooks, Email, GPay, and more.<br />
  
  Build and publish automations with ease.<br />

  <a href="#"><strong>➥ Live Demo</strong></a>

</div>

<br />

### 📸 Demo Screenshots:

#### Main Dashboard View

![Main Screenshot](./readme-images/dashboard.png)

---

#### Additional Screens

<div align="center">

<img src="./readme-images/create-krav.png" width="300" alt="Create Krav" />
<img src="./readme-images/select-trigger.png" width="300" alt="Select Trigger" />
<img src="./readme-images/select-action.png" width="300" alt="Select Action" />
<img src="./readme-images/action-config.png" width="300" alt="Action Config" />
<img src="./readme-images/trigger-test.png" width="300" alt="Trigger Test" />
<img src="./readme-images/publish.png" width="300" alt="Publish Workflow" />
<img src="./readme-images/webhook.png" width="300" alt="Webhook Trigger" />
<img src="./readme-images/gpay.png" width="300" alt="GPay Integration" />
<img src="./readme-images/email.png" width="300" alt="Email Action" />
<img src="./readme-images/mobile.png" width="300" alt="Mobile View" />
<img src="./readme-images/receive.png" width="300" alt="Mobile View" />

</div>


### ✅ Prerequisites

Before setting up and running this project, ensure the following tools are installed on your machine:

| Tool          | Description                                       | Download Link                                                                 |
|---------------|---------------------------------------------------|--------------------------------------------------------------------------------|
| **Git**       | Version control system                            | [Download Git](https://git-scm.com/downloads)                                 |
| **Node.js**   | JavaScript runtime environment                    | [Download Node.js](https://nodejs.org/)                                       |
| **npm**       | Node package manager (usually comes with Node.js) | [Included with Node.js](https://nodejs.org/)                                  |
| **Docker**    | Containerization platform                         | [Download Docker](https://www.docker.com/products/docker-desktop)             |
| **Postman**   | API testing tool                                  | [Download Postman](https://www.postman.com/downloads/)                        |
| **PostgreSQL**| Relational database system                        | [Download PostgreSQL](https://www.postgresql.org/download/)                   |
| **VS Code**   | Recommended IDE for development                   | [Download VS Code](https://code.visualstudio.com/)                            |

> ⚠️ Make sure to configure your environment variables such as `BACKEND_URL`, `DATABASE_URL`, and any other API keys or tokens required. These should be added in a `.env` file or within your Docker configuration.



### 🚀 Technologies Utilized

#### 🧱 Frameworks & Languages
- **Next.js** – Frontend framework for a fast, SEO-friendly user interface.
- **TypeScript** – Strongly-typed language for robust and maintainable code.
- **Express.js** – Backend framework for handling API requests and business logic.

#### 🗃️ Database & ORM
- **PostgreSQL** – Relational database for secure and efficient data storage.
- **Prisma** – ORM for seamless database interactions and queries.

#### 🔐 Data Validation & Security
- **Zod** – Schema validation to ensure data integrity in API requests.
- **JWT (JSON Web Tokens)** – Token-based authentication for secure user sessions.

#### ⚡ Event Streaming & Task Execution
- **Kafka** – Event streaming platform for real-time automation and background task execution.

#### 🌐 Networking & API Communication
- **Axios** – Promise-based HTTP client for efficient API communication.
- **Hoppscotch** – Lightweight and powerful API testing tool for debugging and validation.

#### 🚢 Deployment & Infrastructure
- **Docker** – Containerization platform for consistent deployment across environments.
- **Vercel** – Cloud platform for seamless frontend deployment and hosting.


### 🛠️ Run Locally

To run **Kraven** on your local development machine, follow these steps:

#### 1. Clone the Repository

```bash
git clone https://github.com/RanitDERIA/webhook.git
cd kraven
```

#### 2. Set Up Environment Variables

Create a `.env` file in the root directory and add your required environment variables:

```env
# Example
DATABASE_URL=postgresql://your_user:your_password@localhost:5432/kraven
JWT_SECRET=your_jwt_secret
BACKEND_URL=http://localhost:5000
```

#### 3. Install Dependencies

**Frontend:**

```bash
cd frontend
npm install
```

**Backend:**

```bash
cd ../backend
npm install
```

#### 4. Start PostgreSQL

Make sure you have PostgreSQL running locally. You can use Docker if preferred:

```bash
docker run --name kraven-postgres -e POSTGRES_PASSWORD=your_password -p 5432:5432 -d postgres
```

#### 5. Run Prisma Migrations

In the `backend` directory:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

#### 6. Start Development Servers

**Backend:**

```bash
npm run dev
```

**Frontend:**

Open a new terminal:

```bash
cd frontend
npm run dev
```

The frontend will be running at: `http://localhost:3000`  
The backend will be running at: `http://localhost:5000` *(or your configured port)*

---

You're all set! 🚀

### Contributing:

Contributions are always welcome!

If you'd like to contribute to this project, please follow these guidelines:

- Fork the repository
- Create a new branch for your feature or bug fix
- Make your changes and commit them with descriptive messages
- Push your changes to your fork
- Submit a pull request

Thank you for contributing to this project!

### License:

This project is **free to use** and does not contains any license.
