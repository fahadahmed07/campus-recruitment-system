import React, { Component } from 'react';
import './Bootstrap.min.css';
import './Signup.css';

class Signup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            fullName: '',
            email: '',
            password: '',
            userStatus: {
                student: true,
                company: false,
            }
        }
        this.fullNameHandler = this.fullNameHandler.bind(this);
        this.emailHandler = this.emailHandler.bind(this);
        this.passwordHandler = this.passwordHandler.bind(this);
        this.userStatusHandler = this.userStatusHandler.bind(this);
        this.signupHandler = this.signupHandler.bind(this);
        this.gotoLogin = this.gotoLogin.bind(this);
    }
    fullNameHandler(event) {
        this.setState({
            fullName: event.target.value,
        })
    }
    emailHandler(event) {
        this.setState({
            email: event.target.value,
        })
    }
    passwordHandler(event) {
        this.setState({
            password: event.target.value
        })
    }
    userStatusHandler(event) {
        let userStatus = this.state.userStatus;
        for(let key in userStatus){
            userStatus[key] = false;
        }
        userStatus[event.target.value] = event.target.checked;
        this.setState({
            userStatus: userStatus
        })
    }
    signupHandler(event) {
        console.log("Full Name: ", this.state.fullName)
        console.log("Email: ", this.state.email)
        console.log("Password: ", this.state.password)
        console.log("User Status: ", this.state.userStatus)
    }
    gotoLogin() {
        this.props.history.push('/login');
    }

    render() {
        return (
            <div id="signUpForm">
                <h1 className="h1 text-center text-dark mb-4">Sign Up</h1>
                <div className="form-group">
                    <label htmlFor="userFullName">Full name<span className="text-danger ml-1">*</span></label>
                    <input type="text" value={this.state.fullName} onChange={this.fullNameHandler} className="form-control" id="userFullName" placeholder="Edward Snowden" />
                    <small id="userFullNameError" className="form-text text-danger">Please enter only alphabets &amp; greater than 5 characters.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="userEmail">Email address<span className="text-danger ml-1">*</span></label>
                    <input type="email" value={this.state.email} onChange={this.emailHandler} className="form-control" id="userEmail" placeholder="name@example.com" />
                    <small id="userEmailError" className="form-text text-danger">Please enter a valid email.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="userPassword">Password<span className="text-danger ml-1">*</span></label>
                    <input type="password" value={this.state.password} onChange={this.passwordHandler} className="form-control" id="userPassword" placeholder="Password" />
                    <small id="userPasswordError" className="form-text text-danger">Use alphanumeric, uppercase, lowercase &amp; greater than 10 characters.</small>
                </div>
                <div className="mb-3">
                    <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="userStudent" name="userStatus" className="custom-control-input" value="student" checked={this.state.userStatus["student"]} onChange={this.userStatusHandler} />
                        <label className="custom-control-label" htmlFor="userStudent">Student</label>
                    </div>
                    <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="userCompany" name="userStatus" className="custom-control-input" value="company" checked={this.state.userStatus["company"]} onChange={this.userStatusHandler} />
                        <label className="custom-control-label" htmlFor="userCompany">Company</label>
                    </div>
                </div>
                <button type="button" onClick={this.signupHandler} className="btn btn-primary btn-block text-uppercase mb-3">Sign Up</button>
                <p>Already have an account? Click here</p>
                <button type="button" className="btn btn-outline-primary btn-block text-uppercase mt-0 mb-3" onClick={this.gotoLogin}>Log In</button>
            </div>
        )
    }
}
export default Signup;

