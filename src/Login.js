import React, { Component } from 'react';
import './Bootstrap.min.css';
import './Login.css';

class Login extends Component {
    render() {
        return (
            <div id="logInForm">
                <h1 className="h1 text-center text-dark mb-4">Log In</h1>
                <div className="form-group">
                    <label htmlFor="userSIEmail">Email address<span className="text-danger ml-1">*</span></label>
                    <input type="email" className="form-control" id="userSIEmail" placeholder="name@example.com" />
                    <small id="userSIEmailError" className="form-text text-danger">Please enter a valid email.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="userSIPassword">Password<span className="text-danger ml-1">*</span></label>
                    <input type="password" className="form-control" id="userSIPassword" placeholder="Password" />
                    <small id="userSIPasswordError" className="form-text text-danger">Please enter a valid password.</small>
                </div>
                <button type="button" className="btn btn-primary btn-block text-uppercase mb-3">Log In</button>
                <p>Don't have an account yet? Click here</p>
                <button type="button" className="btn btn-outline-primary btn-block text-uppercase mt-0 mb-3">Create new account</button>
            </div>
        )
    }
}
export default Login;

