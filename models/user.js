//User model, in this case there is only an Admin but further roles may be added if need be
const Sequelize = require("sequelize")
//used for password encryption when stored in the database
const bcrypt = require( "bcrypt" );

const sequelize = new Sequelize( "sqlite::memory" );


//number of iterations that the hashing algorithm will( run 2^6 number of times in this case)
const SALT_ROUNDS = 6;

module.exports = ( sequelize, Sequelize ) => {
    const User = sequelize.define( "user", {
        email: {
            type: Sequelize.STRING,
            unique: true,
            trim: true,
            lowercase: true,
            allowNull: false,
        },
        role: {type: Sequelize.STRING},
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    }, {
        //produces "created at:, updated at: fields"
        timestamps: true,

        //when instances of the models are serialized to JSON or returned as JSON from queries
        //!!!!!?!??!?! Look into this later
        toJSON: {
            
            //removed password for security reasons when the model is returned
            transform: function(doc, ret) {
                delete ret.password;
                return ret;
            }
        }
    } );


    // **********************************************Hooks: https://sequelize.org/docs/v6/other-topics/hooks/ **********************************************


    //trim whitespace and make email lower case
    User.beforeValidate((user, options) => {
        if (user.email) {
            user.email = user.email.toLowerCase();
            user.email = user.email.trim();
        }
    });

    //Encrypt the password
    //retrieved from this source: https://stackoverflow.com/questions/51783864/encrypt-password-column-using-sequelize-and-mysql
    //"save" specifies the name of the hook
    User.beforeCreate( async (user, options) => 
    {
        try {
            user.password = await bcrypt.hash( user.password, SALT_ROUNDS );
        } catch( error ) {
            console.error( "Password is null:", error );
            throw error;
        }

        
    } );


    return User;
}