import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, ImageBackground, Switch } from 'react-native';
import Api from './Api.js';
import styles from '../assets/css/Style.js';
import Session from './Session.js';

const maxEntryLength = 60;

export default class PreExercise extends React.Component {

    static navigationOptions = {
        title: 'Test options'
    };

    constructor(props){
        super(props);

        this.state = {
            lessonId: this.props.navigation.getParam('id'),
            revert: false,
            questionLang: this.props.navigation.getParam('questionLang'),
            answerLang: this.props.navigation.getParam('answerLang'),
            capital: true,
            punctuation: true
        }
    }

    render() {
        return (
            <ImageBackground style={styles.courseBackground} source={{uri: this.props.navigation.getParam('img')}}>
                <View style={styles.exerciseOptions}>
                    <View style={styles.exerciseOptionsRow}>
                            <View style={styles.toggleRevert}>
                                <Text style={styles.languageName}>
                                    {this.state.questionLang}
                                </Text>
                            </View>
                            <View style={styles.toggleRevert}>
                                <Switch
                                    value={this.state.revert}
                                    onValueChange={() => {
                                        this.setState({revert:  !this.state.revert});
                                        let holder = this.state.questionLang;
                                        this.setState({questionLang: this.state.answerLang,
                                                       answerLang: holder
                                                   });
    
                                    }}
                                    >
                                </Switch>
                            </View>
                            <View style={styles.toggleRevert}>
                                 <Text style={styles.languageName}>
                                    {this.state.answerLang}
                                </Text>
                            </View>
                    </View>
                    <View style={styles.exerciseOptionsRow}>
                            <View style={styles.toggleRevert}>
                                <Text style={styles.languageName}>
                                    Turn importance of capital letters on or off
                                </Text>
                            </View>
                            <View style={styles.toggleRevert}>
                                <Switch
                                    value={this.state.capital}
                                    onValueChange={() => {
                                        this.setState({capital:  !this.state.capital});
                                    }}
                                    >
                                </Switch>
                            </View>
                    </View>
                    <View style={styles.exerciseOptionsRow}>
                            <View style={styles.toggleRevert}>
                                <Text style={styles.languageName}>
                                    Turn importance of punctuation on or off
                                </Text>
                            </View>
                            <View style={styles.toggleRevert}>
                                <Switch
                                    value={this.state.punctuation}
                                    onValueChange={() => {
                                        this.setState({punctuation:  !this.state.punctuation});
                                    }}
                                    >
                                </Switch>
                            </View>
                    </View>
                </View>
    
                <TouchableOpacity style={styles.standardBtnCon} onPress={() => this.props.navigation.navigate('Flashcards', {
                    id: this.state.lessonId,
                    img: this.props.navigation.getParam('img'),
                    revert: this.state.revert,
                    capital: this.state.capital,
                    punctuation: this.this.state.punctuation
                })}>
                    <Text style={styles.standardBtn}> Start test </Text>
                </TouchableOpacity>
            </ImageBackground>
        );
    }
}