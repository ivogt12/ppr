//inherits from component class
//this form is frequently checked for updates and will render accordingly
import { Component } from "react";

//this is a class Component
export default class UserListingContactForm extends Component {

    //using class fields to initialize state. another option would be using the constructor method
    state = {
        //collected state
        fName: '',
        lName: '',
        email: '',
        phone: '',
        description: '',

        //submition handling state
        error: '',
    }

    //normal syntax(like this: handleChange() ) does not work because it will be invoked as a callback fxn
    //consequentially, the body of the function will not have access to 'this' to retrieve object properties/methods
    
    //the object passed to setState is merged with the current state object
    handleChange = ( evt ) => {
        this.setState({
            [evt.target.name]: evt.target.value,
            error: '',
        });
    }

    // this submits and is async because it gets sent to the database
    handleSubmit = async (evt) => {
        //prevents form from being submitted on user input
        evt.preventDefault();

        //try catch to ensure data reaches db
        try {
            const formData = {
                fName: this.state.fName,
                lName: this.state.lName,
                email: this.state.email,
                phone: this.state.phone,
                description: this.state.description,
            }
            // this.setState(formData)
            alert(JSON.stringify(this.state));
        }
        catch {
            this.setState({error: 'Submition Failed - Try Again'})
        }
    }

    //render examines this.props and this.state and returns react elements,
    //arrays, portals, datatypes
    //does not modify component state, does not interact with browser
    render() {
        return (
            <div>
                <div className="form-container">
                    <form onSubmit={ this.handleSubmit }>
                        
                        <label>First Name:</label>
                        <input type="text" name="fName" value={ this.state.fName } onChange={ this.handleChange } required />

                        <label>Last Name:</label>
                        <input name="lName" value={ this.state.lName } onChange={ this.handleChange } required />

                        <label>Email:</label>
                        <input name="email" value={ this.state.email } onChange={ this.handleChange } required />

                        <label>Phone:</label>
                        <input name="phone" type="number" value={ this.state.phone } onChange={ this.handleChange } required />

                        <label>Description</label>
                        <input name="description" value={ this.state.description } onChange={ this.handleChange } required />

                        <button type="submit">Submit</button>

                    </form>

                    <p className="error-message">&nbsp;{this.state.error}</p>

                </div>
            </div>
        );
    }
}