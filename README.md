# Expense Tracker App

Welcome to the Expense Tracker App! This application helps users track their income, expenses, and manage their financial transactions.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)

## Overview

The Expense Tracker App is a web-based application developed to assist users in managing their financial transactions. It provides features such as tracking income, expenses, managing categories, and viewing transaction history.

## Features

- User authentication and login functionality.
- Balance tracking with the ability to update the balance.
- Income and expense statistics on the dashboard.
- Adding, updating, and deleting expense categories.
- Recording income and expense transactions.
- Viewing transaction history.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/expense-tracker.git
   ```

2. Install dependencies:
    ```bash
    cd backend
    npm install
      
    cd client
    npm install
    ```

## Usage
1. Start the server
   ```bash
   npm start
   ```
   or start the development server
   ```bash
   npm run dev
   ```

## API Endpoints
- GET /user/:id: Retrieve user information.
- PUT /user/:id: Update user information (e.g., balance).
- GET /category/:id: Get all categories for a user.
- POST /category: Create a new category.
- GET /record/:id: Get all records for a user.
- POST /record: Add a new record.

  ## Dependencies
 - React
 - Axios
 - react-router-dom
 - react-hot-toast

  ## Screenshots
  ![image](https://github.com/KattachaithanyaKumar/MERN-exprense-tracker/assets/80614118/6f44442c-6017-45df-9cbe-aa1612657a4a)
  ![image](https://github.com/KattachaithanyaKumar/MERN-exprense-tracker/assets/80614118/2c84eb75-cd6f-4626-9b47-c6b1dc924e70)
  ![image](https://github.com/KattachaithanyaKumar/MERN-exprense-tracker/assets/80614118/80e08688-5d77-40d1-9518-4d07ce753f00)
  ![image](https://github.com/KattachaithanyaKumar/MERN-exprense-tracker/assets/80614118/96923f65-2838-466c-9fef-2ef6d6e5c1bf)





   



