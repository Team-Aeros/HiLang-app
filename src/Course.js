import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
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
            image: 'https://www.tiptoncommunications.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png',
            favorite: '',
            subscription: '',
            lessons: [],
            native: '',
            translation: ''
        }
        this.getCourse(this.props.navigation.getParam('id'));
        this.getLessons(this.props.navigation.getParam('id'));
    }

    getCourse(id: number) {
        Api.getInstance().callApi('api/course/' + id + '/', 'POST', {}, response => {
            Api.getInstance().callApi('api/language/' + response.native_lang + '/', 'POST', {}, nativeResponse => {
                this.setState({
                    native: nativeResponse[0].fields.name
                });
            });
            Api.getInstance().callApi('api/language/' + response.trans_lang + '/', 'POST', {}, transResponse => {
                this.setState({
                    translation: transResponse[0].fields.name
                });
            });
            this.setState({
                id: response.id,
                name: response.name,
                description: response.description,
                author: response.author.name,
                authorId: response.authorId,
                favorite: response.favorite,
                subscription: response.subscription,
                image: response.image
            });
        });
    }

    getLessons(id: number) {
        Api.getInstance().callApi('api/course/' + id + '/lessons', 'POST', {}, response => {
            let subArray = [];
            for(lesson of response) {
                let id = lesson.pk;
                subArray.push(
                    <TouchableOpacity style={styles.courseLessonCard} key={lesson.pk} onPress={() => {
                        this.props.navigation.navigate('Lesson', {id: id, img: this.state.image, native: this.state.native, translation: this.state.translation});
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
            <ImageBackground style={styles.courseBackground} source={{uri: this.state.image}}>
                <View style={styles.courseDetContainer}>
                    <View>
                        <View style={styles.courseHeader}>
                            <Text style = {styles.section_header}>{this.state.name}</Text>
                            <Text>by {this.state.author}</Text>
                        </View>
                        <View style={styles.courseContent}>
                            <Text style={ styles.section_subheader }> {this.state.description} </Text>
                        </View>
                    </View>
                    <View style={styles.courseBottom}>
                        <ScrollView horizontal={true} pagingEnabled={true} height={50}>
                            { this.state.lessons }
                        </ScrollView>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}