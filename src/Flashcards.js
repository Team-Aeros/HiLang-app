import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, TextInput, Alert, ImageBackground } from 'react-native';
import styles from '../assets/css/Style';
import Exercise from './Exercise.js';
import Api from './Api.js';
import ProgressBar from 'react-native-progress/Bar';

const timer = require('react-native-timer');

export default class Flashcards extends React.Component {
    constructor(props){
        super(props);
        this.exercise = new Exercise(this.props);
        this.exercise.innitialize(this.props.navigation.getParam('id'));
        this.state = {
            currentWord: this.exercise.getCurrentWord(),
            answer: '',
            lessonName: '',
            progress: this.exercise.getProgress(),
        };
    }


    next() {
        if(!this.exercise.isCorrect(this.state.answer)){
            console.log("answer wrong, like to shake the white box");
        } 
        this.exercise.next(this.state.answer);
        this.setState({currentWord: this.exercise.getCurrentWord()});
        this.setState({progress: this.exercise.getProgress()});
        this.setState({answer: ''});
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
                <ImageBackground style={styles.courseBackground} source={{uri: this.props.navigation.getParam('img')}}>
                    <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
                        <View style={styles.testTitle}>
                            <Text style={{margin: 10, fontSize: 30}}>{this.state.lessonName}</Text>
                        </View>
                        <View style={styles.testContainer}>
                            <Text style={{margin: 10, fontSize: 15}}>{this.state.currentWord.question}</Text>
                            <TextInput
                                style={styles.testInput}
                                label="Answer"
                                placeholder="Enter your answer here"
                                onChangeText={answer => this.setState({answer: answer})}
                                value={this.state.answer}
                                onSubmitEditing= { () => {
                                    this.next();
                                }}>
                            </TextInput>
                        </View>
                        <ProgressBar width={null} color={'green'} height={10} progress={this.state.progress}/>
                        <TouchableOpacity style={styles.standarBtnCon} onPress={ () => 
                            this.next()
                        }>
                            <Text style={styles.standarBtn}>submit</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>

            );
        } else {
            return (
                <ImageBackground style={styles.courseBackground} source={{uri: this.props.navigation.getParam('img')}}>
                <View style={styles.startExerciseScreen}>
                        <TouchableOpacity style={styles.startExerciseBtnCon} onPress={ () => 
                            this.start()
                        }>
                            <Text style={styles.standarBtn}>start</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
                );
        }
    }
}