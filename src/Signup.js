import React, { Component } from 'react';
import './Bootstrap.min.css';
import './Signup.css';
import firebaseconfig from './Firebaseconfig';
import swal from 'sweetalert2';

class Signup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            fullName: '',
            email: '',
            password: '',
            userStatus: {
                student: false,
                company: false,
                admin: false,
            },
            formErrors: {
                userFullNameError: false,
                userEmailError: false,
                userPasswordError: false,
                userStatusError: false,
            },
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
        for (let key in userStatus) {
            userStatus[key] = false;
        }
        userStatus[event.target.value] = event.target.checked;
        this.setState({
            userStatus: userStatus
        })
    }
    signupHandler(event) {
        let userFullName = this.state.fullName;
        let userFullNameFormate = /^([A-Za-z.\s_-]).{5,}$/;
        let userEmail = this.state.email;
        // let userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let userEmailFormate = /^(([^<>().,;:\s@"]+(\.[^<>().,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let userPassword = this.state.password;
        let userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;
        let userStatusStudent = this.state.userStatus.student;
        let userStatusCompany = this.state.userStatus.company;

        if (!userFullName.match(userFullNameFormate)) {
            let formErrors = this.state.formErrors
            formErrors.userFullNameError = true;
            // console.log(formErrors.userFullNameError, "Full Name Error")
            this.setState({
                formErrors: formErrors
            })
        } else if (!userEmail.match(userEmailFormate)) {
            let formErrors = this.state.formErrors
            formErrors.userEmailError = true;
            // console.log(formErrors.userEmailError, "Email Error")
            this.setState({
                formErrors: formErrors
            })
        } else if (!userPassword.match(userPasswordFormate)) {
            let formErrors = this.state.formErrors
            formErrors.userPasswordError = true;
            // console.log(formErrors.userPasswordError, "Password Error")
            this.setState({
                formErrors: formErrors,
            })
        } else if (userStatusStudent === false && userStatusCompany === false) {
            let formErrors = this.state.formErrors
            formErrors.userStatusError = true;
            // console.log(formErrors.userStatusError, "User Status Error")
            this.setState({
                formErrors: formErrors,
            })
        } else {
            let email = this.state.email;
            let password = this.state.password;
            firebaseconfig.auth().createUserWithEmailAndPassword(email, password).then((success) => {
                let user = firebaseconfig.auth().currentUser;
                var uid;
                if (user != null) {
                    uid = user.uid;
                }
                let firebaseRef = firebaseconfig.database().ref();
                let userData = {
                    userUid: user.uid,
                    userFullName: this.state.fullName,
                    userEmail: this.state.email,
                    userPassword: this.state.password,
                    userStatus: this.state.userStatus,
                    userFb: "https://www.facebook.com/",
                    userTw: "https://twitter.com/",
                    userGp: "https://plus.google.com/",
                    userBio: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda non natus hic omnis impedit velit laboriosam est! Velit ipsa, placeat odio est excepturi, dolores temporibus, rerum soluta fuga dicta voluptas?",
                }
                firebaseRef.child(uid).set(userData);
                swal('Account Successfully Created', 'Your account has been successfully created. Now you can Login to your account', 'success'
                ).then((value) => {
                    // window.setTimeout(function () {
                    // }, 3000)
                    this.props.history.push('/login');
                });
            }).catch(function (error) {
                // Handle Errors here.
                // var errorCode = error.code;
                var errorMessage = error.message;
                swal({
                    type: 'error',
                    title: 'Error',
                    text: errorMessage,
                })
            });

        }
    }
    gotoLogin() {
        this.props.history.push('/login');
    }

    render() {
        return (
            <div className="col-lg-3 col-md-3 mx-auto my-5 py-5 px-4 bg-white shadow mb-5 border border-light">
                <div id="signUpForm">
                    <h1 className="h1 text-center text-dark mb-4">Sign Up</h1>
                    <div className="form-group">
                        <label htmlFor="userFullName">Full name<span className="text-danger ml-1">*</span></label>
                        <input type="text" value={this.state.fullName} onChange={this.fullNameHandler} className="form-control" id="userFullName" placeholder="Edward Snowden" />
                        {
                            this.state.formErrors.userFullNameError ? <small id="userFullNameError" className="form-text text-danger">Please enter only alphabets &amp; greater than 5 characters.</small> : ""
                        }

                    </div>
                    <div className="form-group">
                        <label htmlFor="userEmail">Email address<span className="text-danger ml-1">*</span></label>
                        <input type="email" value={this.state.email} onChange={this.emailHandler} className="form-control" id="userEmail" placeholder="name@example.com" />
                        {
                            this.state.formErrors.userEmailError ? <small id="userEmailError" className="form-text text-danger">Please enter a valid email.</small> : ""
                        }
                    </div>
                    <div className="form-group">
                        <label htmlFor="userPassword">Password<span className="text-danger ml-1">*</span></label>
                        <input type="password" value={this.state.password} onChange={this.passwordHandler} className="form-control" id="userPassword" placeholder="Password" />
                        {
                            this.state.formErrors.userPasswordError ? <small id="userPasswordError" className="form-text text-danger">Use alphanumeric, uppercase, lowercase &amp; greater than 10 characters.</small> : null
                        }

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
                        {
                            this.state.formErrors.userStatusError ? <small id="userStatusError" className="form-text text-danger">Must be selected any one.</small> : null
                        }
                    </div>
                    <button type="button" onClick={this.signupHandler} className="btn btn-primary btn-block text-uppercase mb-3">Sign Up</button>
                    <p>Already have an account? Click here</p>
                    <button type="button" className="btn btn-outline-primary btn-block text-uppercase mt-0 mb-3" onClick={this.gotoLogin}>Log In</button>
                </div>
            </div>
        )
    }
}
export default Signup;

