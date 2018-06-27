import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import styles from '../assets/css/Style';
import Exercise from './Exercise.js';
import Api from './Api.js';

export default class Flashcards extends React.Component {
    constructor(props){
        super(props);
        this.exercise = new Exercise();
        this.exercise.innitialize(this.props.match.params['l_id']);
        this.state = {
            currentWord: this.exercise.getCurrentWord(),
            answer: ''
        };
    }


    next() {
        this.exercise.next(this.state.answer);
        this.setState({currentWord: this.exercise.getCurrentWord()});
        this.setState({answer: ''});
    }

    start() {
        this.setState({currentWord: this.exercise.getCurrentWord()});
    }


    render() {
        if(this.state.currentWord != null) {
            return (
                <View>
                    <Text style={{margin: 20}}>Flashcards</Text>
                    <Text>{this.state.currentWord.question}</Text>
                    <TextInput 
                        onChangeText={answer => this.setState({answer: answer})}
                        value={this.state.answer}>
                    </TextInput>
                    <TouchableOpacity style={styles.startTestBtnCon} onPress={ () => 
                        this.next()
                    }>
                        <Text style={styles.startTestBtn}>submit</Text>
                    </TouchableOpacity>
                </View>

            );
        } else {
            return (
                <View>
                    <TouchableOpacity style={styles.startTestBtnCon} onPress={ () => 
                        this.start()
                    }>
                        <Text style={styles.startTestBtn}>start</Text>
                    </TouchableOpacity>
                </View>
                );
        }
    }
}