import { Alert } from 'react-native';

export function request_confirmation(onTrue = () => {}) {
    Alert.alert(
        'Confirmation needed', 'Are you sure you want to do this?',
        [
            {text: 'Cancel', onPress: () => {}, style: 'cancel'},
            {text: 'OK', onPress: () => onTrue()},
        ],
        { 
            cancelable: false 
        }
    );
}