import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import styles from '../assets/css/Style';
import Api from './Api.js';
import Session from './Session.js';

export default class Result extends React.Component {
    constructor(props){
        super(props);
        this.setupResults();
    }

    setupResults() {
        let numberOfRounds = this.props.navigation.getParam('rounds');
        let rounds = "";
        if(numberOfRounds < 2) {
            rounds = numberOfRounds + ' round';
        } else {
            rounds = numberOfRounds + ' rounds';
        }

        this.state = {
            lessonName: this.props.navigation.getParam('name'),
            lessonId: this.props.navigation.getParam('lessonId'),
            grade: this.calculateGrade(),
            rounds: rounds,
            timeTaken: this.props.navigation.getParam('time'),
            result: this.handleWords()
        };
        this.setAsCompleted();
    }

    setAsCompleted() {
        let sendData = {
            user_id: Session.getInstance().getUserId(),
            lesson_id: this.state.lessonId,
            grade: this.state.grade
      }
      Api.getInstance().callApi('/lesson/' + sendData.user_id + '/' + sendData.lesson_id + '/completed', sendData, 'POST');
    }

    calculateGrade() {
        let points = this.props.navigation.getParam('points');
        let totalPoints = this.props.navigation.getParam('totalPoints');
        return ((points / totalPoints) * 9) + 1 
    }

    handleWords() {
        let result = [];
        for(words of this.props.navigation.getParam('firstRound')) {
            if(words.correct) {
               result.push(
                    <View key={words.word.id} style={styles.resultItemCorrect}>
                        <View>
                            <Text style={ styles.resultEntry }>Question:</Text>
                            <Text style={ styles.resultEntry }>Your Answer:</Text>
                            <Text style={ styles.resultEntry }>Correct Answer:</Text>
                        </View>
                        <View style={styles.resultEntryRight}>
                            <Text style={ styles.resultEntry }>{words.word.question}</Text>
                            <Text style={ styles.resultEntry }>{words.answer}</Text>
                            <Text style={ styles.resultEntry }>{words.word.correctAnswer}</Text>
                        </View>
                    </View>
                ); 
            } else {
                result.push(
                    <View key={words.word.id} style={styles.resultItemInCorrect}>
                        <View>
                            <Text style={ styles.resultEntry }>Question:</Text>
                            <Text style={ styles.resultEntry }>Your Answer:</Text>
                            <Text style={ styles.resultEntry }>Correct Answer:</Text>
                        </View>
                        <View style={styles.resultEntryRight}>
                            <Text style={ styles.resultEntry }>{words.word.question}</Text>
                            <Text style={ styles.resultEntry }>{words.answer}</Text>
                            <Text style={ styles.resultEntry }>{words.word.correctAnswer}</Text>
                        </View>
                    </View>
                );
            }
        }
        return result;
    }

    render() {
        return (
            <ScrollView style={styles.resultContainer}>
                <View style={styles.resultHeader}>
                    <Text>
                        { this.state.rounds }
                    </Text>
                    <Text>
                        Grade: { this.state.grade }
                    </Text>
                    <Text>
                        { this.state.timeTaken } seconds
                    </Text>
                </View>
                { this.state.result }
                <TouchableOpacity style={styles.standardBtnCon} onPress={() => this.props.navigation.navigate('Lesson', {id: this.state.lessonId})}>
                    <Text style={styles.standardBtn}> Back to lesson </Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}