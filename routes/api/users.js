//This matches the AJAX requests being made from the browser to the server that matches these requests
//These are API requests that are being made to validate user login and check credentials for control flow

const express = require( "express" );
const router = express.Router();
const usersCtrl = require("../../controllers/api/users");

//****************************************Route the request url to a controller//****************************************

//Login routing
router.post("/", usersCtrl.login);

module.exports = router;