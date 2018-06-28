import React from 'react';
import { View, Text } from 'react-native';
import styles from '../assets/css/Style';
import Session from './Session.js';
import Api from './Api.js';

export default class Profile extends React.Component {

    static navigationOptions = {
        title: 'My account'
    };

    constructor(props) {
        super(props);
        this.state = {
            email: null,
            name: null
        }
        this.getUserInfo();
    }

    getUserInfo() {
        Api.getInstance().callApi('/user/' + Session.getInstance().getUserId() + '/', 'POST', {}, response => {
                this.setState({
                    email: response.email,
                    name: response.name,
                    //avatar: response.avatar
                });
            });
    }

    render() {
        return (
            <View>
                <View>
                    <Text>E-mail:   {this.state.email}</Text>
                    <Text>Username: {this.state.name}</Text>
                </View>
            </View>
        );
    }
}