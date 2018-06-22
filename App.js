import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, Button, Alert } from 'react-native';

import styles from './assets/css/Style';

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            'email': '',
            'password': ''
        }
    }

    render() {
        return (
            <ImageBackground style={styles.container} source={ require('./assets/images/login.jpg') }>
                <View style={{
                        paddingTop: 50
                    }}>
                    <Text style={{
                        color: 'dimgray',
                        fontSize: 50,
                        marginBottom: 30,
                        textAlign: 'center'
                    }}>HiLang</Text>
                    <View style={{
                        backgroundColor: 'rgba(250, 250, 250, 0.8)',
                        margin: 15
                    }}>
                        <TextInput  label="E-mail address"
                                    placeholder="somebody@example.com"
                                    value={ this.state.email }
                                    onChangeText={ email => this.setState({email}) }
                                    style={{
                                        margin: 30,
                                        padding: 15,
                                        fontSize: 25,
                                        borderWidth: 1,
                                        borderColor: '#efefef',
                                        backgroundColor: '#fff',
                                        letterSpacing: -1
                                    }}></TextInput>

                        <TextInput  label="Password"
                                    onKeyPress={ (keyPress) => console.log(keyPress)}
                                    onChangeText={ password => this.setState({password}) }
                                    style={{
                                        marginLeft: 30,
                                        marginRight: 30,
                                        marginTop: 0,
                                        marginBottom: 30,
                                        padding: 15,
                                        fontSize: 25,
                                        borderWidth: 1,
                                        borderColor: '#efefef',
                                        backgroundColor: '#fff',
                                        letterSpacing: -1
                                    }}
                                    secureTextEntry={true}
                                    onSubmitEditing= { () => {
                                        Alert.alert('email: ' + this.state.email, "pw: " + this.state.password);
                                    }}>
                        </TextInput>

                        <View style={{
                            backgroundColor: 'rgba(215, 215, 215, 0.8)',
                            padding: 10
                        }}>
                            <Button
                                onPress={() => {
                                    Alert.alert('email: ' + this.state.email, "pw: " + this.state.password);
                                }}
                                title="Log in"
                            />
                        </View>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}