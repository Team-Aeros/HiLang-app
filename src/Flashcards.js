import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, TextInput, ImageBackground, Dimensions } from 'react-native';
import styles from '../assets/css/Style';
import Exercise from './Exercise.js';
import Api from './Api.js';
import ProgressBar from 'react-native-progress/Bar';

const timer = require('react-native-timer');

export default class Flashcards extends React.Component {
    constructor(props){
        super(props);
        let options = {
            revert: this.props.navigation.getParam('revert'),
            capital: this.props.navigation.getParam('capital'),
            accents: this.props.navigation.getParam('accents'),
            random: this.props.navigation.getParam('random')

        }
        this.exercise = new Exercise(this.props, options);
        this.exercise.innitialize(this.props.navigation.getParam('id'));
        this.state = {
            currentWord: this.exercise.getCurrentWord(),
            answer: '',
            lessonName: this.props.navigation.getParam('lessonName'),
            progress: this.exercise.getProgress(),
            containerStyle: styles.testContainer,
            disableSubmit: false
        };
    }


    check() {
        if(!this.exercise.isCorrect(this.state.currentWord.correctAnswer)){
            this.setState({
                containerStyle: styles.errorContainer,
                disableSubmit: true
            });
            timer.setTimeout(this, 'error', () => {
                this.setState({
                    containerStyle: styles.testContainer,
                    disableSubmit: false
                });
                this.next();
            }, 2000);
        }else {
            this.setState({
                containerStyle: styles.correctContainer,
                disableSubmit: true
            });
            timer.setTimeout(this, 'correct', () => {
                this.setState({
                    containerStyle: styles.testContainer,
                    disableSubmit: false
                });
                this.next();
            }, 2000);
        }   
    }

    next() {
        this.exercise.next(this.state.currentWord.correctAnswer);
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
                <View>
                    <ImageBackground style={styles.courseBackground} source={{uri: this.props.navigation.getParam('img')}}>
                        <Text style={[styles.section_header, styles.shadow, { color: '#fff' }]}>{this.state.lessonName}</Text>
                    </ImageBackground>
                        <View style = {{backgroundColor: '#fff', margin: 10, height: 500}}>
                            <View style={this.state.containerStyle}>
                                <Text style={styles.testQuestion}>{this.state.currentWord.question}</Text>
                                <TextInput
                                    style={styles.testInput}
                                    label="Answer"
                                    placeholder="Enter your answer here"
                                    onChangeText={answer => this.setState({answer: answer})}
                                    value={this.state.answer}
                                    onSubmitEditing= { () => {
                                        this.check();
                                    }}>
                                </TextInput>  
                            </View>
                            <View style={styles.progressBar}>
                                <ProgressBar width={null} color={'green'} height={10} progress={this.state.progress}/>
                            </View>
                            
                            <TouchableOpacity disable={this.state.disableSubmit} style={styles.standardBtnCon} onPress={ () => 
                                this.check()
                            }>
                                <Text style={styles.standardBtn}>submit</Text>
                            </TouchableOpacity>
                        </View>
                </View>
            );
        } else {
            return (
                <View>
                    <ImageBackground style={styles.courseBackground} source={{uri: this.props.navigation.getParam('img')}}>
                        <Text style={[styles.section_header, styles.shadow, { color: '#fff' }]}>{this.state.lessonName}</Text>
                    </ImageBackground>
                    <View style={styles.startExerciseScreen}>
                            <TouchableOpacity style={styles.startExerciseBtnCon} onPress={ () => 
                                this.start()
                            }>
                                <Text style={styles.standardBtn}>start</Text>
                            </TouchableOpacity>
                    </View>
                </View>
                
            );
        }
    }
}