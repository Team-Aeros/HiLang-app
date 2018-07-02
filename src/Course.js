import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, ImageBackground, Alert } from 'react-native';
import Api from './Api.js';
import styles from '../assets/css/Style.js';
import Session from './Session.js';
import { request_confirmation } from './Util.js'

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
            lessons: [],
            native: '',
            translation: '',
            isSubscribed: false,
            isFavorite: false
        }

        this.getCourse(this.props.navigation.getParam('id'));
        this.getLessons(this.props.navigation.getParam('id'));
    }

    getCourse(id: number) {
        Api.getInstance().callApi('/course/' + id + '/', 'POST', {}, response => {
            Api.getInstance().callApi('/language/' + response.native_lang + '/', 'POST', {}, nativeResponse => {
                this.setState({
                    native: nativeResponse[0].fields.name
                });
            });

            Api.getInstance().callApi('/language/' + response.trans_lang + '/', 'POST', {}, transResponse => {
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
                isFavorite: response.favorite,
                isSubscribed: response.subscription,
                image: response.image
            });
        });
    }

    getLessons(id: number) {
        Api.getInstance().callApi('/course/' + id + '/lessons', 'POST', {}, response => {
            let subArray = [];
            for(lesson of response) {
                let id = lesson.pk;
                subArray.push(
                    <TouchableOpacity style={styles.simple_list_item} key={lesson.pk} onPress={() => {
                        this.props.navigation.navigate('Lesson', {id: id, img: this.state.image, native: this.state.native, translation: this.state.translation});
                    }}>
                        <Text>{lesson.fields['name']}</Text>
                    </TouchableOpacity>
                );
            }

            this.setState({lessons: subArray});
        });
    }

    updateSubscription(course) {
        request_confirmation(
            () => {
                Api.getInstance().callApi('/course/' + (this.state.isSubscribed ? 'un' : '') + 'subscribe', 'POST', {
                    'user': Session.getInstance().getUserId(),
                    'course': course.state.id
                }, response => this.setState({isSubscribed: !this.state.isSubscribed}));
            }
        );
    }

    updateFavorites(course) {
        request_confirmation(
            () => {
                Api.getInstance().callApi('/course/' + (this.state.isSubscribed ? 'un' : '') + 'favorite', 'POST', {
                    'user': Session.getInstance().getUserId(),
                    'course': course.state.id
                }, response => this.setState({isFavorite: !this.state.isFavorite}));
            }
        );
    }

    render() {
        return (
            <ScrollView pagingEnabled={true}>
                <ImageBackground style={styles.courseBackground} source={{uri: this.state.image}}>
                    <View style={styles.courseHeader}>
                        <Text style={[styles.section_header, styles.shadow, { color: '#fff' }]}>{this.state.name}</Text>
                        <Text style={{ color: '#fff' }}>Created by: {this.state.author}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.courseContent}>
                    <Text style={ styles.section_subheader }>About this course</Text>
                    <Text>{this.state.description}</Text>

                    <Text style={ styles.section_subheader }>Lessons</Text>
                    <View>
                        { this.state.lessons }
                    </View>

                    <Text style={ styles.section_subheader }>Actions</Text>
                    <TouchableOpacity style={styles.simple_list_item} onPress={ () => this.updateSubscription(this) }>
                        <Text>{ this.state.isSubscribed ? 'Unsubscribe from course' : 'Subscribe to this course' }</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.simple_list_item} onPress={ () => this.updateFavorites(this) }>
                        <Text>{ this.state.isFavorite ? 'Remove from favorites' : 'Add to favorites' }</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}