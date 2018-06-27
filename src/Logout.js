import React from 'react';
import { View } from 'react-native';
import Session from './Session.js';

export default class Login extends React.Component {

    static navigationOptions = {
        header: null,
        tabBarVisible: false,
        gesturesEnabled: false
    }

    constructor(props) {
        super(props);
        this.logout();
    }

    logout() {
        Session.getInstance().destroy();
        this.props.navigation.navigate('Login');
    }

    render() {
        return (<View></View>);
    }
}