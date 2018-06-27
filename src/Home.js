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
                const id = course.pk;
                subArray.push(
                    <TouchableOpacity key= {course.pk} style={ styles.course_card } onPress={() => this.props.history.push('/course/' + id)}>
                        <Text style={ styles.course_card_title }>{ course['fields']['name']}</Text>
                        <Text>{ course['fields']['description'] }</Text>
                        <Text style={ styles.course_card_author }>Created by Test</Text>
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