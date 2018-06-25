import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, Button, Alert, TouchableOpacity, Image } from 'react-native';
import Api from './Api.js';
import Session from './Session.js';
import styles from '../assets/css/Style';

export default class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            'email': 'aeros@aeros.com',
            'password': 'Welkom!1234'
        }
    }

    checkLogin() {
        if(this.state.email != '' && this.state.password != '') {
            let api = Api.getInstance();
            let userData = {
                email: this.state.email,
                password: this.state.password
            }
            api.apiLogin('api/login', 'POST', userData, response => {
                if(Object.keys(response).length != 0) {
                    Session.getInstance().saveToken(response['token']);
                    Session.getInstance().saveUserId(response['user_id']);
                    this.props.history.push('/home');
                } else {
                    Alert.alert("Could not log in");
                } 
            });
        }else {
            Alert.alert("Please fill in all the fields");
        }
    }

    render() {
        return (
            <ImageBackground style={styles.container} source={ require('../assets/images/login.jpg') }>
                <View style={ styles.logInContainer }>
                    <Text style={ styles.compTitle }>HiLang</Text>
                    <TextInput  label="E-mail address"
                                placeholder="somebody@example.com"
                                value={ this.state.email }
                                onChangeText={ email => this.setState({email}) }
                                style={ styles.logInEmail }></TextInput>
                    <TextInput  label="Password"
                                value={ this.state.password }
                                onChangeText={ password => this.setState({password}) }
                                style={ styles.logInPw }
                                secureTextEntry={true}
                                onSubmitEditing= { () => {
                                    this.checkLogin();
                                }}>
                    </TextInput>

                    <TouchableOpacity 
                        onPress={() => {
                            this.checkLogin();
                        }}
                        style={ styles.logInBtnCon }>
                        <Text style= {styles.logInBtn}>Log In </Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        );
    }
}