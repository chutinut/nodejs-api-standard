# nodejs-api-standard

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-≥18-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose_8-47A248?logo=mongodb&logoColor=white)](https://mongoosejs.com/)
[![Author](https://img.shields.io/badge/Author-SHEDKAE-blueviolet)](https://github.com/chutinut)

> **The API boilerplate that keeps your team's code consistent.**

A production-ready Node.js REST API template built with Express and MongoDB — designed to serve as an **internal coding standard** for teams who want clean, predictable, and maintainable API code from day one. No overthinking, just structure.

---

## Table of Contents

- [About](#about)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Reference](#api-reference)
- [Coding Standards & Conventions](#coding-standards--conventions)
- [Available Scripts](#available-scripts)
- [License](#license)

---

## About

This project was originally written as an **internal API standard** for a company — a reference template that defines how every API endpoint, file, and response should look and behave. It's not just about getting things to work; it's about getting the whole team to work the same way.

Whether you're onboarding a new dev or starting a new service, clone this and you're already 80% of the way to a consistent, scalable codebase.

---

## Tech Stack

| Package                                                                        | Version    | Purpose                       |
| ------------------------------------------------------------------------------ | ---------- | ----------------------------- |
| [Node.js](https://nodejs.org/)                                                 | ≥ 18 (ESM) | Runtime                       |
| [Express](https://expressjs.com/)                                              | ^4.18      | HTTP framework                |
| [Mongoose](https://mongoosejs.com/)                                            | ^8.1       | MongoDB ODM                   |
| [dotenv](https://github.com/motdotla/dotenv)                                   | ^16.4      | Environment variables         |
| [cors](https://github.com/expressjs/cors)                                      | ^2.8       | Cross-Origin Resource Sharing |
| [express-rate-limit](https://github.com/express-rate-limit/express-rate-limit) | ^7.1       | Rate limiting                 |
| [lodash](https://lodash.com/)                                                  | ^4.17      | Utility functions             |
| [bson](https://github.com/mongodb/js-bson)                                     | ^6.2       | MongoDB ObjectId handling     |
| [ESLint](https://eslint.org/)                                                  | ^8.56      | Linting                       |
| [Prettier](https://prettier.io/)                                               | ^3.2       | Code formatting               |
| [Nodemon](https://nodemon.io/)                                                 | ^3.0       | Dev auto-restart              |

---

## Project Structure

```
nodejs-api-standard/
├── config/
│   └── mongodb.config.js       # MongoDB connection setup
├── controllers/
│   └── member.controller.js    # Business logic for member endpoints
├── middlewares/
│   ├── endpoint-not-found-handler.middleware.js  # 404 fallback handler
│   ├── rate-limit.middleware.js                  # Rate limiter (100 req/min)
│   └── router.middleware.js                      # Central route registration
├── models/
│   └── member.model.js         # Mongoose schema for member collection
├── routes/
│   └── member.routes.js        # Route definitions for /member
├── .env-example                # Environment variable template
├── .eslintrc.json              # ESLint configuration
├── .prettierrc.json            # Prettier configuration
└── server.js                   # App entry point
```

---

## Getting Started

### Prerequisites

- Node.js `>= 18`
- MongoDB instance (local or Atlas)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/chutinut/nodejs-api-standard.git
cd nodejs-api-standard

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env-example .env
```

Open `.env` and fill in the values:

```env
PORT=3000
ENVIRONMENT=development   # development | production
MONGODB_URI=mongodb://localhost:27017/your-db-name
```

### Running the Server

```bash
# Development (ESLint check + hot reload)
npm run development

# Production
npm start
```

---

## API Reference

Base URL: `http://localhost:{PORT}`

All responses follow the [Unified Response Format](#unified-response-format).

---

### Members

#### Get All Members

```
GET /member/get-members
```

**Response `200`**

```json
{
    "status": 200,
    "message": "success",
    "result": [
        {
            "_id": "65c1234567890abcdef12345",
            "username": "john_doe",
            "status": "normal"
        }
    ]
}
```

---

#### Create Member

```
POST /member/create-member
```

**Request Body**

```json
{
    "username": "john_doe",
    "password": "secretpassword",
    "status": "normal"
}
```

**Response `200`**

```json
{
    "status": 200,
    "message": "success",
    "result": {
        "_id": "65c1234567890abcdef12345",
        "username": "john_doe",
        "status": "normal"
    }
}
```

---

#### Update Member

```
PUT /member/update-member?_id={memberId}
```

**Query Parameters**

| Param | Type     | Required | Description                    |
| ----- | -------- | -------- | ------------------------------ |
| `_id` | `string` | Yes      | MongoDB ObjectId of the member |

**Request Body** — Any fields to update

```json
{
    "status": "premium"
}
```

**Response `200`**

```json
{
    "status": 200,
    "message": "success",
    "result": { ...previousMemberData }
}
```

---

#### Delete Member

```
DELETE /member/delete-member?_id={memberId}
```

**Query Parameters**

| Param | Type     | Required | Description                    |
| ----- | -------- | -------- | ------------------------------ |
| `_id` | `string` | Yes      | MongoDB ObjectId of the member |

**Response `200`**

```json
{
    "status": 200,
    "message": "success"
}
```

---

## Coding Standards & Conventions

This section is the **heart of this project**. These are the conventions every contributor must follow to keep the codebase consistent and readable.

---

### File Naming Convention

All files follow the pattern: `<name>.<type>.js`

| Type       | Example                    |
| ---------- | -------------------------- |
| Controller | `member.controller.js`     |
| Model      | `member.model.js`          |
| Middleware | `rate-limit.middleware.js` |
| Routes     | `member.routes.js`         |
| Config     | `mongodb.config.js`        |

---

### Import Ordering

Imports must always be grouped and ordered in exactly three blocks — as shown in `server.js`:

```js
/** import core packages */
import "dotenv/config";
import express from "express";

/** import extension packages */
import cors from "cors";

/** import middlewares, routers, database and other config */
import rateLimit from "./middlewares/rate-limit.middleware.js";
import router from "./middlewares/router.middleware.js";
```

1. **Core packages** — Node.js built-ins and environment setup
2. **Extension packages** — third-party npm packages
3. **Local imports** — internal files (middlewares, configs, routes, etc.)

---

### Unified Response Format

Every endpoint must return a response in this exact shape:

```json
{
    "status": 200,
    "message": "success",
    "result": {}
}
```

| Field     | Type     | Description                               |
| --------- | -------- | ----------------------------------------- |
| `status`  | `number` | HTTP status code                          |
| `message` | `string` | Human-readable status message             |
| `result`  | `any`    | Response payload (omit if not applicable) |

**Standard status messages:**

| Status | Message                                        |
| ------ | ---------------------------------------------- |
| `200`  | `"success"`                                    |
| `404`  | `"METHOD /path - endpoint not found"`          |
| `422`  | `"invalid parameter"`                          |
| `429`  | `"too many requests, please try again later."` |
| `500`  | `"internal server error"`                      |

---

### Error Handling Pattern

Controllers use a two-tier error handling approach:

```js
try {
    // validate input — throw a plain object, NOT an Error instance
    if (!isValid) throw { status: 422, message: "invalid parameter" };

    // do work...
} catch (error) {
    if (error instanceof Error) {
        // unexpected runtime error
        res.status(500).send({ status: 500, message: "internal server error" }).end();
    } else {
        // intentional thrown object → forward as-is
        res.status(error.status).send(error).end();
    }
}
```

**Rule:** Throw `{ status, message }` plain objects for expected failures. Reserve `Error` instances for truly unexpected runtime errors.

---

### Rate Limiting

Rate limiting is applied globally on every request via `rate-limit.middleware.js`.

| Setting         | Value      |
| --------------- | ---------- |
| Window          | 1 minute   |
| Max requests    | 100 per IP |
| Response status | `429`      |

```json
{
    "status": 429,
    "message": "too many requests, please try again later."
}
```

---

### ESLint Rules

Key rules enforced in `.eslintrc.json`:

| Rule                     | Level | Reason                      |
| ------------------------ | ----- | --------------------------- |
| `no-unused-vars`         | error | Keep code clean             |
| `no-duplicate-imports`   | error | No redundant imports        |
| `no-const-assign`        | error | Prevent accidental mutation |
| `no-return-assign`       | error | Avoid side-effect bugs      |
| `node/no-deprecated-api` | error | Stay up to date             |
| `prettier/prettier`      | warn  | Format enforcement          |

Run lint manually:

```bash
npm run precommit:check   # check only
npm run precommit:fix     # auto-fix
```

---

### Prettier Config

Configured in `.prettierrc.json`:

| Rule            | Value   |
| --------------- | ------- |
| `tabWidth`      | `4`     |
| `semi`          | `true`  |
| `singleQuote`   | `false` |
| `trailingComma` | `none`  |
| `printWidth`    | `120`   |
| `endOfLine`     | `auto`  |

---

## Available Scripts

| Script      | Command                   | Description                       |
| ----------- | ------------------------- | --------------------------------- |
| Start       | `npm start`               | Run the server (production)       |
| Development | `npm run development`     | ESLint check + nodemon hot reload |
| Lint Check  | `npm run precommit:check` | Run ESLint, report issues         |
| Lint Fix    | `npm run precommit:fix`   | Run ESLint and auto-fix issues    |

---

## License

[MIT](./LICENSE) — Copyright © 2024 Chutinut Jirasritana-anan

---

<div align="center">
  Built with intention by <strong>SHEDKAE, THE DEVELOPER</strong>
</div>
