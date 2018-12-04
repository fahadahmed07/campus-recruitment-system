import React, { Component } from 'react';
import './Bootstrap.min.css';
import './Signup.css';

class Signup extends Component {
    render() {
        return (
            <div id="signUpForm">
                <h1 className="h1 text-center text-dark mb-4">Sign Up</h1>
                <div className="form-group">
                    <label htmlFor="userFullName">Full name<span className="text-danger ml-1">*</span></label>
                    <input type="text" className="form-control" id="userFullName" placeholder="Edward Snowden" />
                    <small id="userFullNameError" className="form-text text-danger">Please enter only alphabets & greater than 5 characters.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="userEmail">Email address<span className="text-danger ml-1">*</span></label>
                    <input type="email" className="form-control" id="userEmail" placeholder="name@example.com" />
                    <small id="userEmailError" className="form-text text-danger">Please enter a valid email.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="userPassword">Password<span className="text-danger ml-1">*</span></label>
                    <input type="password" className="form-control" id="userPassword" placeholder="Password" />
                    <small id="userPasswordError" className="form-text text-danger">Use alphanumeric, uppercase, lowercase & greater than 10 characters.</small>
                </div>
                <button type="button" className="btn btn-primary btn-block text-uppercase mb-3">Sign Up</button>
                <p>Already have an account? Click here</p>
                <button type="button" className="btn btn-outline-primary btn-block text-uppercase mt-0 mb-3">Log In</button>
            </div>
        )
    }
}
export default Signup;

