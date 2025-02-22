# BackEnd_API

Could not implement the Front-End due to time limitation.

# Backend API for Transaction Dashboard

This is the backend portion of the **Transaction Dashboard** project. It provides APIs to retrieve transaction data, generate charts (bar & pie), and fetch sales statistics based on selected months.

## Features

- Retrieve transaction data with pagination & search.
- Fetch monthly statistics (total sales, sold & unsold items).
- Generate **bar & pie charts** for sales analysis.
- Built using **MERN Stack (MongoDB, Express, Node.js)**.

## Tech Stack

- Backend: Node.js, Express.js  
- Database: MongoDB (Mongoose ODM)  
- API Testing: Postman 

## Installation & Setup

1. Clone this repository:

   git clone https://github.com/NgangamHaolai/BackEnd_API
   
2. Navigate into the project directory:

   cd BackEnd_API
   
3. Install dependencies:
 
   npm install
   
4. Create your own .env file and include your MONGO_URI inside
 
   MONGO_URI=your_mongodb_connection_string
   
5. Start the Back End server:
 
   node index.js
   
6. Enjoy!
   
## Use Postman to Test the API endpoints
## Input Values as :
   *   KEY        VALUE
   *   month      7
   *   search     Mens Cotton Jacket
   *   page       3
   *   perPage    5
