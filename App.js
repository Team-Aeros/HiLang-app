import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, Button, Alert, TouchableOpacity, Image } from 'react-native';
import Session from './src/Session.js';
import Login from './src/Login.js';
import Home from './src/Home.js';
import {NativeRouter, Switch, Route} from 'react-router-native';

export default class App extends React.Component {

    render() {
        return (
            <NativeRouter>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/home" component={Home} />
                </Switch>  
            </NativeRouter>
        );
    }
}