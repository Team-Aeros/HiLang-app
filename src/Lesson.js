import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, ImageBackground, Switch } from 'react-native';
import Api from './Api.js';
import styles from '../assets/css/Style.js';
import Session from './Session.js';

import { MarkdownView} from 'react-native-markdown-view';

export default class Lesson extends React.Component {

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
            vocabulary: [],
            revert: false,
            
        }

        this.getLesson(this.props.navigation.getParam('id'));
    }

    getLesson(id: number) {
        Api.getInstance().callApi('/lesson/' + id, 'POST', {}, response => {
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
                    <View style={[styles.simple_list_item]} key={entry.id}>
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
            <ScrollView>
                <ImageBackground style={styles.courseBackground} source={{uri: this.props.navigation.getParam('img')}}>
                    <Text style={[styles.section_header, styles.shadow, { color: '#fff' }]}>{this.state.name}</Text>
                </ImageBackground>
                <View style={styles.courseContent}>
                    <Text>{this.state.description}</Text>
                    <Text style={ styles.section_subheader }>Lesson content</Text>
                    
                    
                    <Text style={ styles.section_subheader }>Vocabulary</Text>

                    {this.state.vocabulary}
    
                    <TouchableOpacity style={styles.standardBtnCon} onPress={() => this.props.navigation.navigate('PreExercise', 
                        {
                            id: this.state.id,
                            name: this.state.name,
                            img: this.props.navigation.getParam('img'),
                            questionLang: this.props.navigation.getParam('translation'),
                            answerLang: this.props.navigation.getParam('native')
                        })}>
                        <Text style={styles.standardBtn}> Test my knowledge! </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}