import React, { Component } from 'react';
import './Bootstrap.min.css';
import './Login.css';

class Home extends Component {

    constructor(props) {
        super(props)
        this.gotoLogin = this.gotoLogin.bind(this);
        this.gotoSignup = this.gotoSignup.bind(this);
    }

    gotoLogin() {
        this.props.history.push('/login');
    }
    gotoSignup() {
        this.props.history.push('/signup');
    }

    render() {
        return (
            <div className="col-lg-3 col-md-3 mx-auto my-5 py-5 px-4 bg-white shadow mb-5 border border-light">
                <div id="homeScreen py-5" className="col-12">
                    <div className="mb-5">
                        <h1 className="h1 text-center text-primary">Profiles Manager</h1>
                        <p className="text-center text-dark">Welcome to Profiles Manager</p>
                    </div>
                    <button type="button" className="btn btn-primary btn-block text-uppercase mb-1" onClick={this.gotoLogin}>Log In</button>
                    <p className="text-center mb-1">OR<small></small></p>
                    <button type="button" className="btn btn-outline-primary btn-block text-uppercase mt-0 mb-3" onClick={this.gotoSignup}>Create new account</button>
                </div>
            </div>
        )
    }
}
export default Home;