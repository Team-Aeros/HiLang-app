import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import styles from '../assets/css/Style';
import Exercise from './Exercise.js';
import Api from './Api.js';
import ProgressBar from 'react-native-progress/Bar';

export default class Flashcards extends React.Component {
    constructor(props){
        super(props);
        this.exercise = new Exercise(this.props);
        this.exercise.innitialize(this.props.navigation.getParam('id'));
        this.state = {
            currentWord: this.exercise.getCurrentWord(),
            answer: '',
            lessonName: '',
            progress: this.exercise.getProgress()
        };
    }


    next() {
        this.exercise.next(this.state.currentWord.correctAnswer);
        this.setState({currentWord: this.exercise.getCurrentWord()});
        this.setState({answer: ''});
        this.setState({progress: this.exercise.getProgress()});
    }

    start() {
        this.setState({currentWord: this.exercise.getCurrentWord(),
                       lessonName: this.exercise.getLessonName()
                   });
        this.exercise.startTimer();
    }


    render() {
        if(this.state.currentWord != null) {
            return (
                <View>
                    <Text style={{margin: 20}}>Flashcards   {this.state.lessonName}</Text>
                    <Text>{this.state.currentWord.question}</Text>
                    <TextInput 
                        onChangeText={answer => this.setState({answer: answer})}
                        value={this.state.answer}>
                    </TextInput>
                    <ProgressBar width={null} color={'green'} height={10} progress={this.state.progress}/>
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