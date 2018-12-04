import React, { Component } from 'react';
import './App.css';
import './Bootstrap.min.css';
// import Home from './Home.js';
// import Login from './Login.js';
import Signup from './Signup.js';


class App extends Component {

  // constructor(props) {
  //   super(props)
  //   this.state = { showLogin: true }
  //   this.state = { showSignup: true }
  //   this.showLoginScreen = this.showLoginScreen.bind(this);
  //   this.showSignupScreen = this.showSignupScreen.bind(this);
  // }
  // showLoginScreen = () => {
  //   console.log("log in clicked")
  //   const { showLogin } = this.state;
  //   this.setState({ show: !showLogin })
  // }
  // showSignupScreen = () => {
  //   console.log("Sign Up clicked")
  //   const { showSignup } = this.state;
  //   this.setState({ show: !showSignup })
  // }
  render() {
    return (
      <div className="App">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-md-3 mx-auto my-5 py-5 px-4 bg-white shadow mb-5 border border-light">
              {/* <Home showLoginScreen={this.showLoginScreen} showSignupScreen={this.showSignupScreen} />
              {this.state.show && <Login />}
              {this.state.show && <Signup />} */}
              {/* <Home /> */}
              {/* <Login /> */}
              <Signup />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
