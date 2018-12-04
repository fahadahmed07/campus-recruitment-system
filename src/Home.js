import React, { Component } from 'react';
import './Bootstrap.min.css';
import './Login.css';

class Home extends Component {
    render() {
        return (
            <div id="homeScreen py-5">
                <div className="mb-5">
                    <h1 className="h1 text-center text-primary">Profiles Manager</h1>
                    <p className="text-center text-dark">Welcome to Profiles Manager</p>
                </div>
                <button type="button" className="btn btn-primary btn-block text-uppercase mb-1" onClick={this.props.showLoginScreen}>Log In</button>
                <p className="text-center mb-1">OR<small></small></p>
                <button type="button" className="btn btn-outline-primary btn-block text-uppercase mt-0 mb-3" onClick={this.props.showSignupScreen}>Create new account</button>
            </div>
        )
    }
}
export default Home;