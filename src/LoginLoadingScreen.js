import React from 'react';
import { View, ActivityIndicator, StatusBar } from 'react-native';
import styles from '../assets/css/Style';

export default class Login extends React.Component {

    constructor(props) {
        super(props);

        this.bootstrapAsync();
    }

    bootstrapAsync() {
        this.props.navigation.navigate('Login');
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}