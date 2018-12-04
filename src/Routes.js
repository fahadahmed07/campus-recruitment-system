import React from 'react'
import {
    Router,
    Route,
} from 'react-router-dom'
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import createBrowserHistory from 'history/createBrowserHistory'

const customHistory = createBrowserHistory();

const MyRoutes = ()=> (
    <Router history={customHistory}>
        <div>
            <Route exact path='/' component={Home}></Route>
            <Route path='/login' component={Login}></Route>
            <Route path='/signup' component={Signup}></Route>
        </div>
    </Router>
)

export default MyRoutes;