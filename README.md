
# Xioma Automotive Project

## Overview

This project is a full-stack application that utilizes Docker and Docker Compose to simplify deployment and management. The services include an API Gateway, authentication service, task service, and a frontend client built with React.

## Prerequisites

To run the project, you need to have the following installed:

- **Docker**
- **Docker Compose**

## How to Run the Project

1. Clone the repository to your local machine.

2. Build and start the containers with the following command:
   ```bash
   docker compose up --build -d
   ```

3. Once the services are up, you can access the application in your browser at:
   ```
   http://localhost:3000
   ```

4. You can also manage the MongoDB database using Mongo Express at:
   ```
   http://localhost:27020
   ```

## Running the Project in Development Mode

To run the project in development mode:

1. First, start the MongoDB database:
   ```bash
   docker-compose up mongo
   ```

2. Then, for each service, run the `dev` script:

   - API Gateway:
     ```bash
     cd api-gateway
     yarn dev
     ```

   - Auth Service:
     ```bash
     cd auth-service
     yarn dev
     ```

   - Task Service:
     ```bash
     cd task-service
     yarn dev
     ```

   - Frontend Client:
     ```bash
     cd xioma-auto-client
     yarn dev
     ```

This will start all services in development mode with hot-reloading enabled.
