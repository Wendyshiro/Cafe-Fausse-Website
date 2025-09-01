# Cafe Fausse - Full Stack Restaurant Website

A modern, responsive restaurant website built with React frontend, Flask backend, and PostgreSQL database.

## Project Structure

```
cafe-fausse/
├── frontend/                 # React application
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── App.js
│   └── package.json
├── backend/                  # Flask API
│   ├── app.py
│   ├── models.py
│   ├── routes.py
│   └── requirements.txt
├── database/                 # Database setup
│   └── schema.sql
└── README.md
```

## Features

- **5 Pages**: Home, Menu, Reservations, About, Gallery
- **Reservation System**: Table booking with availability checking
- **Newsletter Signup**: Email collection for marketing
- **Responsive Design**: Modern CSS with Grid/Flexbox
- **REST API**: Flask backend with CORS enabled
- **Database**: PostgreSQL with proper schema

## Quick Start

### Prerequisites
- Node.js (v14+)
- Python (v3.8+)
- PostgreSQL

### Installation

1. Install all dependencies:
```bash
npm run install-all
```

2. Set up PostgreSQL database:
```bash
createdb cafe_fausse
psql cafe_fausse < database/schema.sql
```

3. Configure environment variables:
```bash
# Create backend/.env
DATABASE_URL=postgresql://username:password@localhost/cafe_fausse
FLASK_ENV=development
```

4. Start development servers:
```bash
npm run dev
```

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Restaurant Information

**Cafe Fausse**
- Address: 1234 Culinary Ave, Suite 100, Washington, DC 20002
- Phone: (202) 555-4567
- Hours: Mon-Sat 5:00PM-11:00PM, Sun 5:00PM-9:00PM

## Technology Stack

- **Frontend**: React, React Router, CSS Grid/Flexbox
- **Backend**: Flask, Flask-CORS, SQLAlchemy
- **Database**: PostgreSQL
- **Development**: Concurrently for running both servers
