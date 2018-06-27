import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import styles from '../assets/css/Style';
import Api from './Api.js';

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
            grade: this.calculateGrade(),
            rounds: rounds,
            timeTaken: this.props.navigation.getParam('time'),
            result: this.handleWords()
        };
    }

    calculateGrade() {
        let points = this.props.navigation.getParam('points');
        let totalPoints = this.props.navigation.getParam('totalPoints');
        return ((points / totalPoints) * 9) + 1 
    }

    handleWords() {
        let result = [];
        for(words of this.props.navigation.getParam('firstRound')) {
            console.log(words);
            if(words.correct) {
               result.push(
                    <View key={words.word.id} style={styles.resultItemCorrect}>
                        <Text style={ styles.resultEntry }>{words.word.question}</Text>
                        <Text style={ styles.resultEntry }>{words.word.correctAnswer}</Text>
                    </View>
                ); 
            } else {
                result.push(
                    <View key={words.word.id} style={styles.resultItemInCorrect}>
                        <Text style={ styles.resultEntry }>{words.word.question}</Text>
                        <Text style={ styles.resultEntry }>{words.answer}</Text>
                        <Text style={ styles.resultEntry }>{words.word.correctAnswer}</Text>
                    </View>
                );
            }
        }
        return result;
    }

    render() {
        return (
            <View style={styles.resultContainer}>
                <Text>
                    You took {this.state.rounds}
                </Text>
                <Text>
                    Grade: { this.state.grade }
                </Text>
                <Text>
                    Your total time was { this.state.timeTaken } seconds
                </Text>
                <ScrollView>
                    { this.state.result }
                </ScrollView>
            </View>
        );
    }
}