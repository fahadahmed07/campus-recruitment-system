import React, { Component } from 'react';
import './App.css';
import './Bootstrap.min.css';
import MyRoutes from './Routes'

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="container-fluid">
          <MyRoutes />          
        </div>
      </div>
    );
  }
}

export default App;
