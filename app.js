// DOTENV loads the .env file values into process.env configuration
require('dotenv').config();

/*************
  EXPRESS
 *************

  Express is a minimal and flexible Node.js web application framework that
  provides a robust set of features for web and mobile applications.

  Documentation can be found here:

  https://expressjs.com/
*/
const express = require('express');

// Routes
const publicRoutes = require("./src/routes/public");
const privateRoutes = require("./src/routes/private");

// Middlewares
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const jwt = require('express-jwt');

const app = express();
const port = process.env.PORT || 9999;

/*************
  CORS CONFIG
 *************

  This utilizes the Express CORS middleware.  There is a standard configuration,
  or you can define a custom configuration.  Documenation can be found here:

  http://expressjs.com/en/resources/middleware/cors.html
*/

// Use Default CORS Config
app.use(cors());

// For custom configuration, remove the above line and uncomment below
/*
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
*/

/*************
  HELMET
 *************

  A wrapper for several middleware components which set various HTTP headers that
  help secure the API and make Express more useful

  Details on what is being set can be found here:

  https://www.npmjs.com/package/helmet
*/
app.use(helmet());

/*************
  BODYPARSER
 *************

  bodyParser.json() is a middleware that allows the API to assume that the body
  from each request is in JSON format and parses it to an object.  It is
  commonly used, but you can remove it if you need to parse the body in some
  other manner.
*/
app.use(bodyParser.json());

/*************
  MORGAN
 *************

  Logging middleware which provides pre-formatted and customizeable logging for
  incoming API requests. Very easy to use out of the box, but has customization
  options available for more focused logging as needed.

  Further information can be found here:

  https://github.com/expressjs/morgan
*/
app.use(morgan('combined'));

// Add the root route for the API.
app.get('/', (req, res) => {
  res.json({message: "NodeJS Starter Application"});
});

// Health Route - Always returns 200 when application is running
app.get('/health', (req, res) => res.sendStatus(200));

// Respond to favicon request with 204
app.get('/favicon.ico', (req, res) => res.sendStatus(204));

// Add any public API routes that are openly accessible here, prior to
// using EXPRESS-JWT for Authorization Token checking.
app.use('/public', publicRoutes);

/*************
  EXPRESS-JWT
 *************

  Add Authorization Token Checking For All Subsequent Routes
  Example Authorization Config

  NOTE: audience and issuer are optional

  Documentation and configuration options found here:

  https://www.npmjs.com/package/express-jwt
*/
const checkJwt = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
  //audience: 'http://myapi/protected',
  //issuer: 'http://issuer',
});

app.use(checkJwt);

// Add any private API routes that required JWT Authorization here.
app.use('/private', privateRoutes);

// Start the Server on the predefined port
app.listen(port, () => {
  console.log('NodeJS API Server Started - Listening on port ' + port);
});
