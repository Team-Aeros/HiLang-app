import { View, StyleSheet, Text, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import styles from '../assets/css/Style';
import Api from './Api.js';

export default class Exercise{
    constructor(){
        this.vocabulary = [];
        this.currentWord = null;
        this.incorrectWords = [];
        this.correctWords = [];
        this.answer = "";
    }

    innitialize(lesson_id) {
        Api.getInstance().callApi('api/lesson/' + lesson_id, 'POST', {}, response => {
            this.totalLength = response.vocabulary.length;
            for(question of response.vocabulary) {
                this.vocabulary.push({
                    id: question.id,
                    question: question.translation,
                    correctAnswer: question.native,
                    sentenceStructure: question.sentenceStructure,
                    lesson_id: question.lesson_id
                });
            }
            this.currentWord = this.vocabulary[0];
        });
    }

    next(answer) {
        if(answer === this.currentWord.correctAnswer) {
            this.correctWords.push(this.currentWord);
        } else {
            this.incorrectWords.push(this.currentWord);
        }

        if(this.hasNext()) {
            this.vocabulary.shift();
        } else if(this.incorrectWords.length === 0) {
        	this.exit();
        } else {
        	this.vocabulary = this.incorrectWords.slice();
        }

        this.currentWord = this.vocabulary[0];
    }

    hasNext() {
        return this.vocabulary.length > 1;
    }

    getCurrentWord() {
    	return this.currentWord;
    }

    exit() {
    	Alert.alert("You have finished this exercise");
    }

}