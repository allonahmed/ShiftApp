import React from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css'
import LoginPage from './LoginPage.js'
import SignUpPage from './SignUpPage'
// import CreatePost from './CreatePost.js';
import Shift from './shift.js'
import Shiftgen from './shiftgen';
import Shiftman from './shiftman';

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path = '/' component={LoginPage}/>
                    <Route path='/signup' component={SignUpPage} />
                    {/* <Route path='/createPost' component={CreatePost} /> */}
                    <Route path='/shift' component={Shift} />
                    <Route path='/shiftman' component={Shiftman} />
                    <Route path='/shiftgen' component={Shiftgen} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default App;
