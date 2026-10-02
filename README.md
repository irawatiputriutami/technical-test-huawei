# Technical Assessment - Digital Transformation & Analytics

This repository contains the complete implementation and technical solutions for the Technical Assessment for PT. Huawei Tech Investment.

## Project Structure

```text
├── q1-subscriber-api/   # Backend REST API (Express.js) & Web UI Frontend
├── q2-automation/       # Periodic snapshot & automated retention cleanup scripts
├── q3-sql/              # SQL queries and execution scripts (Node.js SQLite)
└── README.md
```

## Quick Start Guide

### 1. Q1: Subscriber Usage API
Navigate to `q1-subscriber-api`, install dependencies, and start the service:
```bash
cd q1-subscriber-api
npm install
node server.js
```
* **API Endpoint:** `http://localhost:3000/api/usage`
* **Web UI (Frontend):** Open `index.html` in your browser.

---

### 2. Q2: Usage Snapshot Automation
Ensure the Q1 server is active, then run:
```bash
cd ../q2-automation
node snapshot.js    # Extracts API data and saves CSV snapshot to snapshots/
node cleanup.js     # Purges snapshots older than 30 days
```

---

### 3. Q3: Subscriber & Usage SQL
Inspect `solution.sql` for the raw SQL queries, or execute the runner script to view formatted table outputs:
```bash
cd ../q3-sql
node run.js
```

---

### 4. Q4: Troubleshoot & Explain
The comprehensive root cause analysis, bug fix implementation, and defensive engineering strategies for the `getTotalUsageMB` reducer function are documented in the accompanying Technical Assessment Report (PDF).
