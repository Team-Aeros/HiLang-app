import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import Api from './Api.js';
import UserPool from './UserPool.js';
import styles from '../assets/css/Style.js';
import Session from './Session.js';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '1234',
            subsribedCourses: [],
        }
        let api = Api.getInstance();
        api.callApi('api/user/' + Session.getInstance().getUserId() + '/', 'POST', {}, response => {
            this.setState({userName: response[0]['fields']['name']});
        });
        this.getSubscribedCourses();
    }

    getSubscribedCourses() {
        let subArray = [];
        Api.getInstance().callApi('api/user/subscriptions/' + Session.getInstance().getUserId() + '/', 'POST', {}, response => {
            for(course of response) {
                console.log(course);
                subArray.push(
                        <TouchableOpacity key= {course.pk} onPress={() => {
                            console.log(course.pk);
                            this.props.history.push('/course/' + course.pk);
                        }}>
                            <Text style={styles.subscribedCourseCard }>{ course['fields']['name']}</Text>
                        </TouchableOpacity>
                    );
            }
            this.setState({subscribedCourses: subArray});
        });

    }
    render() {
      return (
            <View style ={{ padding: 20}}>
                <Text>Hi {this.state.userName }</Text>
                <Text style={ styles.section_header }>My courses</Text>
                <ScrollView>
                    { this.state.subscribedCourses }
                </ScrollView>
            </View>
        );
    }
}