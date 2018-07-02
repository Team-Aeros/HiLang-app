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
            createdCourses: [],
            favoriteCourses: [],
            authors: []
        }

        this._lazyUserLoader = LazyUserLoader.getInstance();

        let api = Api.getInstance();
        api.callApi('/user/' + Session.getInstance().getUserId() + '/', 'POST', {}, response => this.setState({userName: response.name}));

        this.getSubscribedCourses();
        this.getCreatedCourses();
        this.getFavoriteCourses();
    }

    addCourses(response, state) {
        let subArray = [];

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

        this.setState({[state]: subArray});
    }

    getSubscribedCourses() {
        Api.getInstance().callApi('/user/subscriptions/' + Session.getInstance().getUserId() + '/', 'POST', {}, response => this.addCourses(response, 'subscribedCourses'));
    }

    getCreatedCourses() {
        Api.getInstance().callApi('/courses/' + Session.getInstance().getUserId() + '/', 'POST', {}, response => this.addCourses(response, 'createdCourses'));
    }

    getFavoriteCourses() {
        Api.getInstance().callApi('/user/favorites/' + Session.getInstance().getUserId() + '/', 'POST', {}, response => this.addCourses(response, 'favoriteCourses'));
    }

    renderCourseField(course) {
        return (
            <TouchableOpacity key={course.pk} style={ styles.list_item } onPress={() => this.props.navigation.navigate('Course', {id: course.pk})}>
                <Text style={ styles.course_card_title }>{ course['fields']['name']}</Text>
                <Text>{ course['fields']['description'] }</Text>
                <Text style={ styles.course_card_author }>Created by { this.state.authors[course['fields']['user']] }</Text>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <ScrollView>
                <View style={{ padding: 20}}>
                    <Text style={ styles.section_header }>Hello, { this.state.userName }</Text>
                    <Text style={ styles.section_subheader }>Courses you're subscribed to</Text>
                    {
                        this.state.subscribedCourses.map((course, key) => {
                            return this.renderCourseField(course);
                        })
                    }

                    <Text style={ styles.section_subheader }>Courses you've created</Text>
                    {
                        this.state.createdCourses.map((course, key) => {
                            return this.renderCourseField(course);
                        })
                    }

                    <Text style={ styles.section_subheader }>Your favorite courses</Text>
                    {
                        this.state.favoriteCourses.map((course, key) => {
                            return this.renderCourseField(course);
                        })
                    }
                </View>
            </ScrollView>
        );
    }
}