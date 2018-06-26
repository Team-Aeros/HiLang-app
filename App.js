import React from 'react';
import Session from './src/Session.js';
import Login from './src/Login.js';
import Home from './src/Home.js';
import Course from './src/Course.js';
import Lesson from './src/Lesson.js';
import {NativeRouter, Switch, Route} from 'react-router-native';

const SideMenu = require('react-native-side-menu');

export default class App extends React.Component {

    render() {
        return (
            <NativeRouter>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/course/:c_id" component={Course} />
                    <Route exact path="/lesson/:l_id" component={Lesson} />
                </Switch>  
            </NativeRouter>
        );
    }
}