# CodoLingo Backend

CodoLingo is an Android-based app designed to teach beginners the fundamentals of Python. Users can complete a series of interactive exercises, including multiple choice questions, drag-and-drop activities, and fill-in-the-blank challenges. The app starts with the basics, such as data types in Python, and progresses to more complex topics like loops and functions. Users can track their progress, compare it against their friends and climb the leaderboard by earning points.

This app uses MongoDB for data storage and Express for building the backend server. 

## Getting Started

### Prerequisites

Ensure you have Node.js and npm installed on your machine. You will also need MongoDB.

### Installation

1. Clone the Repository: Clone the CodoLingo backend repository from GitHub:

   `git clone https://github.com/G-eebs/codolingo-be`

2. Install Dependencies: Navigate to the project directory and install the required dependencies:

    ```
    cd codolingo-be 
    npm install
    ````

3. Configure Environment Variables:

    Create a .env file in the root directory of the project with the following:

    `MONGO_URI=mongodb://localhost:27017/codolingo`

     In addition, ensure you create .env.test and .env.development file.

4. Configure Node Modules:
   In node_modules/tr46/index.js, declare the following at the top of the page:

   `const punycode = require("punycode/")`

## Running the App Locally

1. Before running the Node.js server, ensure that MongoDB is running. You can start MongoDB by running: 

    `mongo start`

2. Set Up Databases: Run the following command to set up the MongoDB databases:

    `npm run setup-dbs`

3. Seed the Database: Seed the database with initial data:

    `npm run seed`

4. Start the Development Server: Run the following command to start the Node.js server:

     `npm start`

   This will start the server on http://localhost:3000.

  ### Testing

  To run the tests, use the following command:

  `npm test`