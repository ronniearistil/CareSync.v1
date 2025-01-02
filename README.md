# CareSynq

**A Full-Stack Healthcare Management Platform**  
**Deployed at: [CareSynq on Render](https://caresynq.render.com)**  

---

## Table of Contents

- [Overview](#overview)  
- [Core Features](#core-features)  
- [Technologies Used](#technologies-used)  
- [System Architecture](#system-architecture)  
- [Getting Started](#getting-started)  
  - [Backend Setup](#backend-setup)  
  - [Frontend Setup](#frontend-setup)  
- [Testing](#testing)  
  - [Backend Testing](#backend-testing)  
  - [Frontend Testing](#frontend-testing)  
- [Deployment](#deployment)  
- [Contributing](#contributing)  
- [Troubleshooting](#troubleshooting)  
- [Future Enhancements](#future-enhancements)  
- [Acknowledgements](#acknowledgements)  

---

## Overview

CareSynq is a robust healthcare management platform designed to streamline collaboration between healthcare providers and patients. It combines appointment scheduling, health analytics, recommendations, and goal tracking into one seamless interface.

---

## Core Features

### For Providers:

- Manage Patient Records: Access and update health data securely.  
- Schedule Appointments: Organize patient follow-ups and reminders.  
- Monitor Analytics: Gain insights into patient engagement and trends.  
- Collaborate on Care Plans: Share care goals with patients.  
- Personalized Recommendations: View care suggestions based on health data.  

### For Patients:

- Track Health Records: Monitor medical history and progress.  
- Appointment Management: Schedule and receive reminders.  
- Engage with Providers: Collaborate directly on care plans.  
- Personalized Insights: Access goal-based recommendations for better health outcomes.  

---

## Technologies Used

### Frontend

- **React**: Dynamic rendering and state management.  
- **Material-UI (MUI)**: Modern UI components for consistency and accessibility.  
- **React Router**: Client-side routing for seamless navigation.  
- **Axios**: HTTP client for API integration.  
- **React Hot Toast**: Interactive notifications.  

### Backend

- **Python Flask**: RESTful API framework.  
- **SQLAlchemy**: ORM for database interactions.  
- **Marshmallow**: Serialization, validation, and schema definition.  
- **PostgreSQL**: Relational database management.  
- **Bcrypt**: Secure hashing for password storage.  
- **Flask-JWT-Extended**: Token-based authentication.  
- **Flask-CORS**: Cross-origin communication.  

### Development Tools

- **Thunder Client**: API testing tool.  
- **Docker**: Containerization for consistent environments.  
- **GitHub Actions**: CI/CD for automated deployment.  
- **Render.com**: Cloud hosting and deployment platform.  

---

## System Architecture

### Frontend Structure:

- **Main Components**: Organized by domain (authentication, dashboard, patients, etc.).  
- **Store**: State management slices for analytics, appointments, and search.  
- **Routing**: Defined routes for protected and public views.  

### Backend Structure:

- **Models**: Database tables for users, appointments, recommendations, etc.  
- **Schemas**: Marshmallow-based serialization and validation.  
- **Resources**: Flask-RESTful classes for API endpoints.  
- **Routes**: Organized by module for scalability.  
- **Services**: Business logic decoupled from routes.  

### Database Schema:

A PostgreSQL schema connects providers, patients, appointments, analytics, and recommendations, enabling flexible querying and scalability.  

---

## Getting Started

### Backend Setup

1. Clone the repository and navigate to the backend folder.  
2. Create and activate a virtual environment:  

python3 -m venv venv  
source venv/bin/activate  

3. Install dependencies:  

pip install -r requirements.txt  

4. Configure the environment:  

cp .env.example .env  

Update environment variables, including database connection details.  

5. Initialize the database:  

flask db init  
flask db migrate -m "Initial Migration"  
flask db upgrade  

6. Start the server:  

python run.py  

---

### Frontend Setup

1. Navigate to the client folder.  
2. Install dependencies:  

npm install  

3. Start the React development server:  

npm run dev 

---

## Testing

### Backend Testing

Run tests with Flask's built-in testing framework:  

pytest  

### Frontend Testing

React testing with Jest and React Testing Library:  

npm test  

---

## Deployment

### CI/CD Pipeline

- **Backend**:  
  GitHub Actions triggers deploy scripts to Render upon push to the main branch.  

- **Frontend**:  
  Integrated with Render for seamless updates.  

---

## Contributing

1. Fork the repository.  
2. Create a feature branch:  

git checkout -b feature-name  

3. Commit your changes:  

git commit -m "Add feature description"  

4. Push changes:  

git push origin feature-name  

5. Submit a Pull Request.  

---

## Troubleshooting

### Database Connection Issues:

- Verify `.env` variables and database credentials.  
- Restart the PostgreSQL service.  

### Frontend Build Errors:

- Clear the cache:  

npm cache clean --force  

- Reinstall dependencies:  

npm install  

### CORS Issues:

- Ensure Flask-CORS is enabled in `app.py`.  

---

## Future Enhancements

- **Telemedicine Integration**: Video calls for remote appointments.  
- **AI-Driven Analytics**: Predictive modeling for health trends.  
- **Mobile App**: React Native implementation for iOS/Android.  
- **Multi-Tenant Support**: Handle multiple clinics and providers.  

---

## Acknowledgements

Special thanks to the Flatiron School instructor, Matteo P for their guidance throughout the development of CareSynq.  

---

## Contact Information

**Engineer**: Ronnie Aristil  
**GitHub**: [Ronnie Aristil](https://github.com/ronniearistil)  
