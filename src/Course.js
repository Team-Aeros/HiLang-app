import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import Api from './Api.js';
import styles from '../assets/css/Style.js';
import Session from './Session.js';

export default class Course extends React.Component {

    static navigationOptions = {
        title: 'Viewing course'
    };

    constructor(props){
        super(props);
        this.state = {
            id: '',
            name: '',
            description: '',
            author: '',
            authorId: '',
            image: '',
            favorite: '',
            subscription: '',
            lessons: []
        }
        this.getCourse(this.props.navigation.getParam('id'));
        this.getLessons(this.props.navigation.getParam('id'));
    }

    getCourse(id: number) {
        Api.getInstance().callApi('api/course/' + id + '/', 'POST', {}, response => {
            this.setState({
                id: response.id,
                name: response.name,
                description: response.description,
                author: response.author.name,
                authorId: response.authorId,
                favorite: response.favorite,
                subscription: response.subscription
            });
        });
    }

    getLessons(id: number) {
        Api.getInstance().callApi('api/course/' + id + '/lessons', 'POST', {}, response => {
            let subArray = [];

            for(lesson of response) {
                const id = lesson.pk;
                subArray.push(
                    <TouchableOpacity style={styles.list_item} key={lesson.pk} onPress={() => {
                        this.props.navigation.navigate('Lesson', {id: id});
                    }}>
                        <Text style={styles.course_card_title}>{lesson.fields['name']}</Text>
                        <Text>{lesson.fields['description']}</Text>
                    </TouchableOpacity>
                );
            }

            this.setState({lessons: subArray});
        });
            
    }

    render() {
        return (
            <ScrollView style={[styles.content, styles.courseLessonContainer]} pagingEnabled={true}>
                <Text style={ styles.section_header }>{this.state.name}</Text>
                <Text>by {this.state.author}</Text>

                <Text style={ styles.section_subheader }>Course description</Text>
                <Text> {this.state.description} </Text>

                <Text style={ styles.section_subheader }>Lessons</Text>
                { this.state.lessons }
            </ScrollView>
        );
    }
}