import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import Api from './Api.js';
import styles from '../assets/css/Style.js';
import Session from './Session.js';
const maxEntryLength = 60;
export default class Course extends React.Component {
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
        this.getLesson(this.props.match.params['l_id']);
    }

    getLesson(id: number) {
        Api.getInstance().callApi('api/lesson/' + id, 'POST', {}, response => {
                this.setState({
                    id: response.id,
                    name: response.name,
                    category: response.category,
                    description: response.description,
                    grammar: response.grammar,
                    course_id: response.course_id,
                });
                let subArray = [];
                for(entry of response.vocabulary){
                    let native = '';
                    let translation = '';
                    let total = entry.native.length + entry.translation.length;
                    if(total >= maxEntryLength) {
                        nativePart = entry.native.length / total;
                        translationPart = entry.translation.length / total;

                        nativeMaxLength = (nativePart * maxEntryLength) - 3;
                        translationMaxLength = (translationPart * maxEntryLength) - 3;

                        native = entry.native.slice(0,nativeMaxLength) + ' ...';
                        translation = entry.translation.slice(0,translationMaxLength) + ' ...';
                    } else {
                        native = entry.native;
                        translation = entry.translation;
                    }
                    subArray.push(
                        <View style={styles.vocItem} key={entry.id}>
                            <Text style={styles.vocEntry}>{native}</Text>
                            <Text style={styles.vocEntry}>{translation}</Text>
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
            <View style={styles.lessonDetContainer}>
                <View>
                    <Text>{this.state.name}</Text>
                </View>
                <View>
                    <Text>{this.state.description}</Text>
                </View>
                <ScrollView>
                    {this.state.vocabulary}
                </ScrollView>
                <TouchableOpacity style={styles.startTestBtnCon} onPress={() => 
                    this.props.history.push('/flashcards/' + this.state.id)
                }>
                    <Text style={styles.startTestBtn}> Start test </Text>
                </TouchableOpacity>
            </View>
        );
    }
}