//organizes application specific logic, such as functions for signing up or loggin in a user.
//This file uses and depends upon API modules
//Any component can import the functions exported from this file

export async function LoginForm(userData) {
    //delegate the network request code to the users-api.js API module which will ultimately return a JSON Web Token.


    // A JSON Web Token (JWT) is a compact, URL-safe means of representing claims between two parties. It is typically used for authentication and authorization in web applications. 
    // JWTs consist of three parts separated by dots: a header, a payload, and a signature.

    // 1) Header: The header typically consists of two parts: the type of token (JWT) and the signing algorithm being used, such as HMAC SHA256 or RSA.

    // 2) Payload: The payload contains the claims or statements about the entity (usually the user) and additional data. Claims are typically statements about an 
    // entity (e.g., user ID, username) and other data relevant to the application's security context.

    // 3) Signature: The signature is created by encoding the header, payload, and a secret key, using the specified algorithm. This signature is used to verify 
    // that the message has not been tampered with during transit and that it was issued by a trusted party.

    // JWTs are often used in authentication mechanisms where a user logs in to a web application and receives a JWT token, which is then sent with each subsequent request to the server.
    // The server can then verify the token to ensure that the user is authenticated and authorized to access the requested resources without needing to store session state on the server.


    // A JSON Web Token is a single encoded (not encrypted) string. Encryption makes the data completely unreadable until it's decrypted using keys, whereas, encoding simply converts one data format to another.

    // Some facts about JWTs:

        // The token can contain whatever custom data (called claims) we want to put in it.
        // The token is cryptographically signed by the server when it is created so that if the token is changed in any way, it is considered invalid.
        // The token is encoded, but not encrypted. It is encoded (converted) using a standard known as base64url encoding so that it can be serialized across the internet or even be included in a URL's querystring. It may seem that encoded data is "secret" - it's not as you'll soon see!


    //await pauses execution of the function until the promise is resolved
    const token = await usersAPI.login(userData);

    //localStorage is a built-in object in web browsers that provides a way to store key-value pairs persistently across browser sessions.
    //Data stored in localStorage remains available even after the browser is closed and reopened.
    localStorage.setItem( "token", token );

    //send to getUser to ensure token hasn't expired and then parse token for readability by browser and safety
    return getUser();
}

// **********************************Get User **********************************/
export function getUser()
{
    //isExpired?
    const token = getToken();
    //atob decodes base64-payload and then a JavaScript object is returned, represented by the string
    return token ? JSON.parse( atob( token.split( "." )[1] ) ).user : null;
}

export function getToken()
{
    const token = localStorage.getItem( "token" );
    const payload = JSON.parse( atob( token.split(".")[1] ) );

    //checks if token expiration is past current date
    if( payload.exp * 1000 < Date.now() )
    {
        localStorage.removeItem( "token" );
    }
    
    return token;
}

// *****************************Check Token*****************************