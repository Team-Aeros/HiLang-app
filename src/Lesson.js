import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import Api from './Api.js';
import styles from '../assets/css/Style.js';
import Session from './Session.js';

const maxEntryLength = 60;

export default class Course extends React.Component {

    static navigationOptions = {
        title: 'Viewing lesson'
    };

    constructor(props){
        super(props);

        this.state = {
            id: '',
            name: '',
            category: '',
            description: '',
            grammar: '',
            course_id: '',
            vocabulary: []
        }

        this.getLesson(this.props.navigation.getParam('id'));
    }

    getLesson(id: number) {
        Api.getInstance().callApi('api/lesson/' + id, 'POST', {}, response => {
                this.setState({
                    id: response.id,
                    name: response.name,
                    category: response.category,
                    description: response.description,
                    grammar: response.grammar,
                    course_id: response.course_id
                });

                let subArray = [];
                for(entry of response.vocabulary) {
                    subArray.push(
                        <View style={styles.vocItem} key={entry.id}>
                            <Text style={[styles.vocEntry, styles.bold]}>{entry.native}</Text>
                            <Text style={styles.vocEntry}>{entry.translation}</Text>
                        </View>
                    );
                }

                this.setState({
                    vocabulary: subArray
                });
        });
            
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={ styles.section_header }>{this.state.name}</Text>
                <View>
                    <Text>{this.state.description}</Text>
                </View>
                <Text style={ styles.section_subheader }>Lesson content</Text>
                <Text>{this.state.grammar}</Text>
                <Text style={ styles.section_subheader }>Vocabulary</Text>
                <ScrollView>
                    {this.state.vocabulary}
                </ScrollView>
                <TouchableOpacity style={styles.startTestBtnCon} onPress={() => this.props.navigation.navigate('Flashcards', {state: this.state.id})}>
                    <Text style={styles.startTestBtn}> Start test </Text>
                </TouchableOpacity>
            </View>
        );
    }
}