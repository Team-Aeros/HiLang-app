import { View, StyleSheet, Text, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import styles from '../assets/css/Style';
import Api from './Api.js';

const timer = require('react-native-timer');

export default class Exercise{
    constructor(props, options){
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
        this.lessonId = null;
        this.revert = options.revert;
        this.capital = options.capital;
        this.accents = options.accents;
        this.random = options.random;
    }

    innitialize(lesson_id) {
    	this.resetTimer();
    	this.lessonId = lesson_id;
        Api.getInstance().callApi('/lesson/' + lesson_id, 'POST', {}, response => {
        	this.lessonName = response.name;
            for(question of response.vocabulary) {
                let native = question.native;
                let translation = question.translation;
                if(!this.capital) {
                    native = native.toLowerCase();
                    translation = translation.toLowerCase();
                }
                if(!this.accents) {
                    native = this.removeAccents(native);
                    translation = this.removeAccents(translation);
                }
            	if(!this.revert) {
            		this.vocabulary.push({
                    	id: question.id,
                    	question: native, 
                    	correctAnswer: translation,
                    	sentenceStructure: question.sentenceStructure,
                    	lesson_id: question.lesson_id
                	});
            	} else {
            		this.vocabulary.push({
                    	id: question.id,
                    	question: translation, 
                    	correctAnswer: native,
                    	sentenceStructure: question.sentenceStructure,
                    	lesson_id: question.lesson_id
                	});
            	}
                
            }
            let subArray = [];
            if(this.random) {
                for (let word of this.vocabulary.sort((a, b) => 0.5 - Math.random())) {
                    subArray.push(word);
                }
                this.vocabulary = subArray.slice();
            }
            this.totalPoints = this.vocabulary.length;
            this.currentWord = this.vocabulary[0];
        });
    }

    isCorrect(answer) {
        if(!this.capital) {
            answer=answer.toLowerCase();
        }
        if(!this.accents) {
            answer = this.removeAccents(answer);
        }
        return answer === this.currentWord.correctAnswer;
    	
    }

    removeAccents(input): string {
        let strAccents = input.split('');
        let strAccentsOut = new Array();
        let strAccentsLen = strAccents.length;
        let accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
        let accentsOut = "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz";
        for (let y = 0; y < strAccentsLen; y++) {
            if (accents.indexOf(strAccents[y]) != -1) {
                strAccentsOut[y] = accentsOut.substr(accents.indexOf(strAccents[y]), 1);
            } else
                strAccentsOut[y] = strAccents[y];
        }
        let output = strAccentsOut.join('');
        return output
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
    		'firstRound': this.firstRound,
    		'id': this.lessonId
    	});
    }
}