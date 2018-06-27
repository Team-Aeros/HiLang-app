import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import Api from './Api.js';
import styles from '../assets/css/Style.js';
import Session from './Session.js';

export default class Course extends React.Component {
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
                    <TouchableOpacity style={styles.courseLessonCard} key={lesson.pk} onPress={() => {
                        this.props.navigation.navigate('Lesson', {id: id});
                    }}>
                        <Text>{lesson.fields['name']}</Text>
                    </TouchableOpacity>
                );
            }

            this.setState({lessons: subArray});
        });
            
    }

    render() {
        return (
            <View style = {styles.container}>
                <View style = {{ padding: 30}}>
                    <Text>{this.state.name}</Text>
                    <Text>by {this.state.author}</Text>
                </View>
                <View style={{padding: 10}}>
                    <Text> {this.state.description} </Text>
                </View>

                <ScrollView style={styles.courseLessonContainer} horizontal={true} pagingEnabled={true}>
                    { this.state.lessons }
                </ScrollView>
            </View>
        );
    }
}