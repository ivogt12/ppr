//It loads environment variables from a .env file into process.env to keep sensitive data secure.
//A .env file, short for "environment file," is a plaintext file used to store configuration 
//variables for applications. These variables are typically environment-specific configurations 
//such as API keys, database credentials, and other settings that might vary between development, testing, and production environments.
require('dotenv').config();

//instantiates database
// require('./config/database');

//

// Require modules
const express = require('express');


const path = require('path');
const favicon = require('serve-favicon');

//displays errors
const logger = require('morgan');

//postgreSQL API modules
//req.body - look into later??
const bodyParser = require("body-parser");

//Cross-Origin Resource Sharing is a system, consisting of transmitting HTTP headers,
//that determines whetehre browsers block frontend JavaScript code from accessing,
//responses for cross-origin requests
// See https://developer.mozilla.org/en-Us/Docs/Glossary/CORS
const cors = require('cors');

  
// ******************************************************************************* Express app initialization *******************************************************************************
const app = express();


// parse JSON payloads requests into the json middleware(makes JSON available in req.body)
//example would be 
//  {
//    "name": "John Doe",
//    "email": "john@example.com"  
//  }
app.use(express.json());

//Logs HTTP requests in the console with the "dev" format
//check 'nodemon server' terminal
app.use(logger('dev'));

//Enables Cross-Origin Resource Sharing for the server
app.use(cors());

// Configure static files from the build folder, including
//client-side assets like HTML, CSS, and JavaScript files
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

// ******************************************************************************* Sequelize/PostgreSQL Syncing *******************************************************************************
const db = require("./models");

//Sync database and output message
db.sequelize.sync()
  .then( () => {
    console.log("Synced db.")
  })
  .catch( ( err ) => {
    console.log("Failed to sync db:" + err.message)
  });

//???I dont know if i need thise
//In development, you may need to drop existing tables and re-sync database. Just use force: true 
db.sequelize.sync({ force: true }).then(() => {
  console.log( "Drop and re-sync db." );
});


// Configure the app (app.set)
  
  
// Mount middleware (app.use)

//Client Side Routing:

      // 1: Initial Page Load: When a user first loads the web application, the server sends the initial HTML content along with any necessary JavaScript and CSS files.

      // 2: JavaScript Framework/Router Initialization: A client-side JavaScript framework or router (e.g., React Router for React applications, Vue Router for Vue.js applications) is used to define the application's routes and navigation logic.

      // 3: Navigation: When the user clicks on a link or interacts with UI elements that trigger a route change, the client-side router intercepts the navigation event.

      // 4: Route Matching: The client-side router matches the requested URL against the defined routes to determine which component or view should be rendered.

      // 5: Rendering: Instead of requesting a new HTML page from the server, the router renders the appropriate component or view directly within the browser window, typically by manipulating the DOM or using virtual DOM techniques.

      // 6: History Management: Client-side routers also manage browser history using the HTML5 History API, allowing users to navigate forward and backward through the application's history without triggering full-page reloads.

// Mount routes

//Login and Check Credential Routing: These ensure that server routes are sent to the proper routes folder
app.use( "/api/users", require( "./routes/api/users" ) );


// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests
// users using links to client-side routing will send them to 'index.html'
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

//Specifies the port to listen on. It uses the port from the environment variables(.env) if available, other wise defaults to port 3001
const port = process.env.PORT || 3001;

//Logs a message indicating that the Express app is running and on which port
app.listen(port, function() {
    console.log(`Express app running on port ${port}`)
  });