//This file abstracts logic that makes network requests
//(examples include AJAX calls to backend/third party APIs)

//This is the server-side base bath of the Express route
//it is the root endpoint for accessing resources related to user operations
//ex: url for retrieving a specific user by id"
//  'GET /api/users/{id}'
//it can be found in server.js
const BASE_URL = "/api/users";

//evaluate all function calls to send-request for DRY code
import sendRequest from "./send-request";

//credentials holds the user input sent from the browser
export async function login( credentials )
{
    //sent into the server with specific URL to be routed, type of request, and payload to be compared to the database
    return sendRequest( `${BASE_URL}/login`, `POST`, credentials );
}
