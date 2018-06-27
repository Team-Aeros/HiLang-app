import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import Api from './Api.js';
import styles from '../assets/css/Style.js';
import Session from './Session.js';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            subsribedCourses: [],
        }
        let api = Api.getInstance();
        api.callApi('api/user/' + Session.getInstance().getUserId() + '/', 'POST', {}, response => {
            this.setState({userName: response.name});
        });
        this.getSubscribedCourses();
    }

    getSubscribedCourses() {
        let subArray = [];
        Api.getInstance().callApi('api/user/subscriptions/' + Session.getInstance().getUserId() + '/', 'POST', {}, response => {
            for(course of response) {
                let id = course.pk;
                subArray.push(
                        <TouchableOpacity key= {course.pk} onPress={() => this.props.history.push('/course/' + id)}>
                            <Text style={styles.subscribedCourseCard }>{ course['fields']['name']}</Text>
                        </TouchableOpacity>
                    );
            }
            this.setState({subscribedCourses: subArray});
        });

    }

    render() {
      return (
        <View style = {{ padding: 30}}>
            <Text>Hi {this.state.userName }</Text>
            <ScrollView>
                { this.state.subscribedCourses }
            </ScrollView>
        </View>
      );
    }
}