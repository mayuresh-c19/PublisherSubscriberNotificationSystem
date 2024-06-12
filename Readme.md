# E-CommerceDevDynamics

This project implements a Publisher-Subscriber Notification System using Node.js for the backend and React for the frontend. The project is structured with two main folders: `Backend` and `Frontend`.

### API Documentation

For detailed API documentation, please refer to the [Postman API Documentation](https://documenter.getpostman.com/view/30851421/2sA3XPBhNg).

## Project Structure

E_CommerceDevDynamics/
│
├── Backend/
│ ├── backendserver.js
│
├── Frontend/
│ ├── src/
│ │ ├── App.js
│ │ ├── index.js
│ │ └── ...other React components
│ ├── public/
│ ├── package.json
│ ├── vite.config.js
│ └── ...other config files
│
├── README.md
└── ...other project files


## Project Explanation

The project consists of a simple Publisher-Subscriber Notification System. The backend handles the subscription, notification, and unsubscription of topics by subscribers. The frontend allows users to interact with this system via a simple web interface.

### Backend

- **Node.js with Express** is used to handle API requests.
- **CORS** is enabled to allow communication between the frontend and backend.
- **In-memory storage** is used to maintain the state of topics(Array) and subscribers(Set).

### Frontend

- **React** is used to create a simple user interface.
- **Vite** is used for building and running the React application.

## API Endpoints

1. **Subscribe to a Topic**: `POST /subscribe`
2. **Notify Subscribers**: `POST /notify`
3. **Unsubscribe from a Topic**: `POST /unsubscribe`
4. **Get Current State**: `GET /getState`

## How to Run the Project

### Prerequisites

- **Node.js**: Make sure Node.js is installed on your system.
- **npm**: Node package manager to install dependencies.

### Steps to Run the Backend and Frontend

1. Navigate to the `Backend` folder:
   ```
   cd Backend
   npm install
   node backendserver.js
   ```

2. Navigate to `Frontend` folder:
    ```
    cd Frontend\ECOMFrontend
    npm install
    npm run dev
    ```
The frontend development server will start, and you can access the application at http://localhost:5173 (default Vite port).

### Interaction Flow 

1. **Subscribe to a Topic**: Enter a `Topic ID` and `Subscriber ID` in the input fields and click "Subscribe" to subscribe the subscriber to the topic.
2. **Notify Subscribers**: Enter a `Topic ID` and click "Notify" to notify all subscribers of the specified topic.
3. **Unsubscribe from a Topic**: Enter a `Topic ID` and `Subscriber ID` in the input fields and click "Unsubscribe" to unsubscribe the subscriber from the topic.
4. **Get Current State**: The current state of topics and subscribers is displayed as a table below the input fields and buttons.

The Current State API is created for the sake of understanding how the current state of the website is looking.

### The Data Structures Used for this Site are Array for Storing Topics and Set for Storing Subscribers to avoid Duplication :)
