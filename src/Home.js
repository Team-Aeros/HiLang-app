import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Api from './Api.js';
import LazyUserLoader from './LazyUserLoader.js';
import styles from '../assets/css/Style.js';
import Session from './Session.js';

export default class Home extends React.Component {

    _lazyUserLoader;

    static navigationOptions = {
        title: 'Dashboard'
    };

    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            subscribedCourses: [],
            authors: []
        }

        this._lazyUserLoader = LazyUserLoader.getInstance();

        let api = Api.getInstance();
        api.callApi('/user/' + Session.getInstance().getUserId() + '/', 'POST', {}, response => this.setState({userName: response.name}));

        this.getSubscribedCourses();
    }

    getSubscribedCourses() {
        let subArray = [];

        Api.getInstance().callApi('/user/subscriptions/' + Session.getInstance().getUserId() + '/', 'POST', {}, response => { 
            for(let course of response) {
                const id = course.pk;
                const author_id = course['fields']['user'];

                this.setState({
                    authors: [...this.state.authors, this.state.authors[author_id]]
                });

                this._lazyUserLoader.executeOnUser(author_id, user => {
                    let authors = this.state.authors;
                    authors[author_id] = user.name;

                    this.setState({
                        authors: [...authors]
                    });
                });

                subArray.push(course);
            }

            this.setState({subscribedCourses: subArray});
        });

    }

    render() {
        return (
            <ScrollView>
                <View style={{ padding: 20}}>
                    <Text style={ styles.section_header }>Hello, { this.state.userName }</Text>
                    <Text style={ styles.section_subheader }>Courses you're subscribed to</Text>
                    {
                        this.state.subscribedCourses.map((course, key) => {
                            return (
                                <TouchableOpacity key={course.pk} style={ styles.list_item } onPress={() => this.props.navigation.navigate('Course', {id: course.pk})}>
                                    <Text style={ styles.course_card_title }>{ course['fields']['name']}</Text>
                                    <Text>{ course['fields']['description'] }</Text>
                                    <Text style={ styles.course_card_author }>Created by { this.state.authors[course['fields']['user']] }</Text>
                                </TouchableOpacity>
                            );
                        })
                    }
                </View>
            </ScrollView>
        );
    }
}