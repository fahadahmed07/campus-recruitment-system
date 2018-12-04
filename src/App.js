import React, { Component } from 'react';
import './App.css';
import './Bootstrap.min.css';
import MyRoutes from './Routes'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-md-3 mx-auto my-5 py-5 px-4 bg-white shadow mb-5 border border-light">
              <MyRoutes />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
