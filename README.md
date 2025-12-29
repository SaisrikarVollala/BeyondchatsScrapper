# BeyondChats Scraper

A robust web scraping application built with TypeScript, Express, and MongoDB for extracting and storing web data efficiently.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Local Setup Instructions](#local-setup-instructions)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [API Documentation](#api-documentation)


## ✨ Features

- Web scraping with Cheerio
- RESTful API with Express
- MongoDB database integration
- TypeScript for type safety
- Environment-based configuration
- Modular architecture

## 🛠 Tech Stack

- **Runtime**: Node.js (v20.19.0+)
- **Language**: TypeScript 5.9.3
- **Framework**: Express 5.2.1
- **Database**: MongoDB with Mongoose 9.0.2
- **HTTP Client**: Axios 1.13.2
- **Web Scraper**: Cheerio 1.1.2
- **Environment Management**: dotenv 17.2.3


## 🚀 Local Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/SaisrikarVollala/BeyondchatsScrapper.git
cd beyondchats-scraper
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
touch .env
```

Add the following environment variables:

```env
# Server Configuration
PORT=3000

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/beyondchats

# For MongoDB Atlas (alternative):
# MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/beyondchats
```

### 4. Start MongoDB

**For Local MongoDB:**

```bash
# macOS (with Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

**For MongoDB Atlas:**
- Ensure your connection string is correctly set in `.env`
- Whitelist your IP address in MongoDB Atlas dashboard

### 5. Build the Project

```bash
npm run build
```

This compiles TypeScript files from `src/` to JavaScript in `dist/`.

### 6. Run the Application
**Production Mode:**

```bash
npm start
```

The server will start on `http://localhost:3000` (or your configured PORT).

You should receive a success response if everything is set up correctly.

## 📁 Project Structure

```
beyondchats-scraper/
├── src/
│   ├── config/
│   │   ├── db.ts           # Database connection configuration
│   │   └── env.ts          # Environment variables management
│   ├── models/             # Mongoose schemas and models
│   ├── routes/             # Express route definitions
│   ├── controllers/        # Request handlers and business logic
│   ├── services/           # Scraping and data processing services
│   ├── utils/              # Helper functions and utilities
│   └── index.ts            # Application entry point
├── dist/                   # Compiled JavaScript (generated)
├── node_modules/           # Dependencies
├── .env                    # Environment variables (create this)
├── .gitignore             # Git ignore rules
├── package.json           # Project metadata and scripts
├── tsconfig.json          # TypeScript configuration
└── README.md              # This file
```

## Architecture

### Data Flow Diagram

```
┌─────────────┐
│   Client    │
│  (Browser)  │
└──────┬──────┘
       │ HTTP Request
       ▼
┌─────────────────────────────────────┐
│         Express Server              │
│  ┌───────────────────────────────┐  │
│  │      Routes Layer             │  │
│  │  (API Endpoints)              │  │
│  └───────────┬───────────────────┘  │
│              │                       │
│              ▼                       │
│  ┌───────────────────────────────┐  │
│  │    Controllers Layer          │  │
│  │  (Request Handling)           │  │
│  └───────────┬───────────────────┘  │
│              │                       │
│              ▼                       │
│  ┌───────────────────────────────┐  │
│  │    Services Layer             │  │
│  │  • Web Scraping (Cheerio)     │  │
│  │  • Data Processing            │  │
│  │  • Business Logic             │  │
│  └───────────┬───────────────────┘  │
│              │                       │
└──────────────┼───────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│         Database Layer              │
│  ┌───────────────────────────────┐  │
│  │    Mongoose Models            │  │
│  │  (Schema Definitions)         │  │
│  └───────────┬───────────────────┘  │
│              │                       │
│              ▼                       │
│  ┌───────────────────────────────┐  │
│  │       MongoDB                 │  │
│  │  (Data Persistence)           │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
               │
               ▼
     ┌─────────────────┐
     │  External Sites │
     │  (Scraping      │
     │   Targets)      │
     └─────────────────┘
```

### Component Descriptions

#### 1. **Express Server**
- Entry point: `src/index.ts`
- Handles HTTP requests and responses
- Middleware for parsing, validation, and error handling

#### 2. **Routes Layer**
- Defines API endpoints
- Maps URLs to controller functions
- Handles request routing

#### 3. **Controllers Layer**
- Processes incoming requests
- Validates input data
- Calls appropriate services
- Formats and returns responses

#### 4. **Services Layer**
- **Scraping Service**: Uses Axios and Cheerio to fetch and parse web pages
- **Data Processing**: Cleans and transforms scraped data
- **Business Logic**: Implements core application functionality

#### 5. **Database Layer**
- **Mongoose Models**: Define data schemas and relationships
- **MongoDB**: Persistent storage for scraped data
- Handles CRUD operations

#### 6. **External Sites**
- Target websites for scraping
- Axios fetches HTML content
- Cheerio parses and extracts data

## 📚 API Documentation





**Built with ❤️ by Srikar**