import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Api from './Api.js';
import Session from './Session.js';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        let api = Api.getInstance();
        let userData = {
            token: Session.getInstance().getToken(),
            userId: Session.getInstance().getUserId()
        }
        api.call('api/user/' + Session.getInstance().getUserId(), 'POST', userData, response => {
            console.log(response);
        });
        
    }
    render() {
      return (
        <View>  
        </View>
      );
    }
}