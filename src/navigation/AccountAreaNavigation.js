import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../assets/css/Style.js';

export default class AccountAreaNavigation extends React.Component {

    static navigationOptions = {
        title: 'Browse courses'
    };

    constructor(props){
        super(props);

        this.state = {
            navigationItems: [
                {
                    label: 'View profile',
                    href: 'Profile',
                    params: {}
                },
                {
                    label: 'My courses',
                    href: 'Home',
                    params: {}
                },
                {
                    label: 'Logout',
                    href: 'Logout',
                    params: {}
                }
            ]
        };
    }

    render() {
        return (
            <View>
                {this.state.navigationItems.map((item, key) => {
                    return (
                        <TouchableOpacity style={styles.simple_list_item} onPress={() => this.props.navigation.navigate(item.href, item.params)} key={key}>
                            <Text>{ item.label }</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    }
}