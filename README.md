## Project-2

Welcome to the project-2 ! This project is designed to be easy to set up and run for development

## Table of Contents
- [Overview](#overview)
- [Setup Instructions](#setup-instructions)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)

## Overview
project consists of a **backend** built with Flask and a **frontend** powered by React. We have separated the two parts into different folders for easier management.

## Setup Instructions
# 

### 1. Create and Activate a Virtual Environment
At the **root folder** of the project, create a virtual environment to manage your Python dependencies.

For **Windows**:
```bash
python -m venv venv
venv\Scripts\activate
```

For **macOS/Linux**:
```bash
python3 -m venv venv
source venv/bin/activate
```

### 2. Install Python Requirements
Once the virtual environment is active, install all necessary Python packages using the **requirements.txt** file:
```bash
pip install -r requirements.txt
```

### 3. Open Two Terminals for Frontend and Backend
Split your terminal window into two panes (or open two separate terminals):

- **Terminal 1:** For the **backend folder**  
- **Terminal 2:** For the **frontend folder**

### 4. Run the Backend
In **Terminal 1**, navigate to the **backend** folder:
```bash
cd backend
```

Set the environment variables for development:
```bash
# For Windows:
set FLASK_ENV=development
set FLASK_APP=app.py

# For macOS/Linux:
export FLASK_ENV=development
export FLASK_APP=app.py
```

Start the Flask development server:
```bash
flask run
```

### 5. Run the Frontend
In **Terminal 2**, navigate to the **frontend** folder:
```bash
cd frontend
```

Start the frontend application:
```bash
npm start
```

## Running the Project
After following the above steps:
- The **backend** (Flask) will be running on a local development server (usually `http://127.0.0.1:5000`).
- The **frontend** (React) will be running on a separate local port (usually `http://localhost:3000`).

## Project Structure
```
daffodl-zone/
├── backend/         # Flask application code
│   └── app.py       # Main Flask application file
├── frontend/        # Frontend application code
│   └── package.json # Node.js project configuration
├── requirements.txt # Python dependencies
├── README.md        # This file
└── venv/            # Virtual environment (created after setup)

```
