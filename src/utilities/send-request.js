//This file handles the login and ensurement of credentials(for the admin).
//This could be defined in users-api.js but for the sake of best practice, I have decided to create a seperate file to ensure DRY code.

//sendRequest() defaults to these arguments. These defaults will only be used for the checkToken() function defined in users-api.
//otherwise the login function from users-api will have its own URL extension, "POST", and the payload(email and password) sent from LoginForm.jsx
export default async function sendRequest(url, method = "Get", payload = null) {
    
    //retrieve method specified in argument
    const options = { method };

    // *****************************************Create JSON Web Token*****************************************
    
    if( payload )
    {
        //define the type of JWT
        options.headers = { 'Content-Type': 'applications/json' };

        //make payload a string, to be appended to JSON Web Token
        options.body = JSON.stringify( payload );
    }

    // *****************************************Return status of routing from the servers side*****************************************

    //fetches the route defined in server.js <=> /routes/api/users.js <=> /controllers/api/users.js <=> /models/users.js
    const res = await fetch( url, options );

    //*****************************************Response gets evaluated*****************************************
    
    //res.ok is a boolean value indicating whether the HTTP response status is within the range of 200-299, indicating the request was successful
    //res.json converts the response body(JSON format) to a JavaScript object, allowing the data to be worked with in a more convenient and structured way(ex: access properties and values)
    //the return gets sent back to users-services.js to be used as a token
    if( res.ok ) return res.json();

    throw new Error( 'Bad Request' );
}