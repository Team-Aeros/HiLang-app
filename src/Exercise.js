import { View, StyleSheet, Text, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import styles from '../assets/css/Style';
import Api from './Api.js';

const timer = require('react-native-timer');

export default class Exercise{
    constructor(props){
    	this.props = props;
        this.vocabulary = [];
        this.currentWord = null;
        this.incorrectWords = [];
        this.firstRound = [];
        this.correctWords = [];
        this.points = 0;
        this.totalPoints = 0;
        this.answer = "";
        this.round = 0;
        this.lessonName = "";
        this.timeInSeconds = 0;
        this.progress = 0;
    }

    innitialize(lesson_id) {
    	this.resetTimer();
        Api.getInstance().callApi('api/lesson/' + lesson_id, 'POST', {}, response => {
        	this.lessonName = response.name;
            for(question of response.vocabulary) {
                this.vocabulary.push({
                    id: question.id,
                    question: question.translation, 
                    correctAnswer: question.native,
                    sentenceStructure: question.sentenceStructure,
                    lesson_id: question.lesson_id
                });
            }
            let subArray = [];
            for (let word of this.vocabulary.sort((a, b) => 0.5 - Math.random())) {
            	subArray.push(word);
            }
            this.vocabulary = subArray.slice();
            this.totalPoints = this.vocabulary.length;
            this.currentWord = this.vocabulary[0];
        });
    }

    next(answer) {
        if(answer === this.currentWord.correctAnswer) {
            this.correctWords.push(this.currentWord);
            this.progress = this.correctWords.length / this.totalPoints;
            if(this.round === 0) {
            	this.firstRound.push({word: this.currentWord,
            						  answer: answer,
            						  correct: true
            						});
            	this.points++;
            }
        } else {
        	if(this.round === 0) {
        		this.firstRound.push({word: this.currentWord,
        							  answer: answer,
            						  correct: false
            						});
        	}
            this.incorrectWords.push(this.currentWord);
        }

        if(this.hasNext()) {
            this.vocabulary.shift();
        } else if(this.incorrectWords.length === 0) {
        	this.round++;
        	this.exit();
        } else {
        	this.vocabulary = this.incorrectWords.slice();
        	this.incorrectWords = [];
        	let subArray = [];
            for (let word of this.vocabulary.sort((a, b) => 0.5 - Math.random())) {
            	subArray.push(word);
            }
            this.vocabulary = subArray.slice();
            this.round++;
        }

        this.currentWord = this.vocabulary[0];
    }

    hasNext() {
        return this.vocabulary.length > 1;
    }

    getCurrentWord() {
    	return this.currentWord;
    }

    getLessonName() {
    	return this.lessonName;
    }

    getProgress() {
    	return this.progress;
    }

    getRound() {
    	return this.round;
    }

    startTimer() {
    	let startingTime = new Date();
        this.clock = timer.setInterval('timer', () => {
            this.timeInSeconds = Math.floor((new Date().getTime() - startingTime.getTime()) / 1000);
        }, 1000);
    }

    resetTimer() {
    	this.timeInSeconds = 0;
    }

    stopTimer() {
    	timer.clearInterval(this.clock);
    }

    exit() {
    	this.stopTimer();
    	this.props.navigation.navigate('Result', {
    		'points': this.points, 
    		'name': this.lessonName,
    		'totalPoints': this.totalPoints,
    		'rounds': this.round,
    		'time': this.timeInSeconds,
    		'firstRound': this.firstRound
    	});
    }

}