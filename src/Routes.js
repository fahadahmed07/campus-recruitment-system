import React from 'react'
import {
    Router,
    Route,
    // Link,
} from 'react-router-dom'
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Studentdashboard from './Studentdashboard';
import Admindashboard from './Admindashboard';
import Companydashboard from './Companydashboard';
import createBrowserHistory from 'history/createBrowserHistory'

const customHistory = createBrowserHistory();

const MyRoutes = () => (
    <Router history={customHistory}>
        <div>
            <Route exact path='/' component={Home}></Route>
            <Route path='/login' component={Login}></Route>
            <Route path='/signup' component={Signup}></Route>
            <Route path='/student-dashboard' component={Studentdashboard}></Route>
            <Route path='/company-dashboard' component={Companydashboard}></Route>
            <Route path='/admin-dashboard' component={Admindashboard}></Route>
        </div>
    </Router>
)

export default MyRoutes;