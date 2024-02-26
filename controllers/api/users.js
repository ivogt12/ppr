//The controllers folder retrieves routes from './routes/api/users.js' to either login, signup, or check the credentials of a user
//This folder checks the models folder which contains user Schema defined in postgreSQL Database, and creates JWTs.

//The bcrypt library is used to ensure that the encrypted JWT matches the payload sent on the client side.
//Parameters of .compare: bcrypt.compare('plain-text password sent by user when logging in', 'hashed password retrieved from the database')

const User = require( "../../models/user" );
const jwt = require( "jsonwebtoken" );
const bcrypt = require( "bcrypt" );

//routes defined in './routes/api/users.js'
module.exports = {
    login
};

async function login(req, res)
{
    try {
        //Find user in postgreSQL Database. Keep in mind that no two users can have the same email
        const user = await User.findOne( { email: req.body.email } );

        //If user is not found in the database
        if( !user ) throw new Error();

        //compare user-inputted plain-text password to the user's hashed password retrieved when querying the database
        const match = await bcrypt.compare( req.body.password, user.password );
        
        //Email is found in the database but the user-inputted password does not match the hashed password in the database
        if( !match ) throw new Error();

        //Create JWT for authentication !!!Check Console for this
        res.json( createJWT( user ) );
    } catch {
        res.status( 400 ).json( "Bad Credentials" );
    }
};

// ***********************************************Create JWT Helper function***********************************************

//expiresIn gets checked by localStorage when the JWT is parsed in users-services.js
function createJWT( user ) {
    return jwt.sign(
        { user },
        process.env.SECRET,
        { expiresIn: '24h'  }
    )
};