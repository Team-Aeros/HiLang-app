import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, ImageBackground, Switch } from 'react-native';
import Api from './Api.js';
import styles from '../assets/css/Style.js';
import Session from './Session.js';

export default class PreExercise extends React.Component {

    static navigationOptions = {
        title: 'Test options'
    };

    constructor(props){
        super(props);

        this.state = {
            lessonId: this.props.navigation.getParam('id'),
            lessonName: this.props.navigation.getParam('name'),
            revert: false,
            questionLang: this.props.navigation.getParam('questionLang'),
            answerLang: this.props.navigation.getParam('answerLang'),
            capital: true,
            accents: true,
            random: true
        }
    }

    render() {
        return (
            <ScrollView style={{ backgroundColor: '#fff'}}>
                <ImageBackground style={styles.courseBackground} source={{uri: this.props.navigation.getParam('img')}}>
                    <Text style={[styles.section_header, styles.shadow, { color: '#fff' }]}>{this.state.lessonName}</Text>
                </ImageBackground>
            
                <View style={styles.courseContent}>
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
                                    Turn importance of capital letters ON or OFF
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
                                    Turn importance of accents ON or OFF
                                </Text>
                            </View>
                            <View style={styles.toggleRevert}>
                                <Switch
                                    value={this.state.accents}
                                    onValueChange={() => {
                                        this.setState({accents:  !this.state.accents});
                                    }}
                                    >
                                </Switch>
                            </View>
                    </View>
                    <View style={styles.exerciseOptionsRow}>
                        <View style={styles.toggleRevert}>
                            <Text style={styles.languageName}>
                                Turn random order ON or OFF
                            </Text>
                        </View>
                        <View style={styles.toggleRevert}>
                            <Switch
                                value={this.state.random}
                                onValueChange={() => {
                                    this.setState({random:  !this.state.random});
                                }}
                                >
                            </Switch>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.standardBtnCon} onPress={() => {
                        this.props.navigation.navigate('Flashcards', {
                                    id: this.state.lessonId,
                                    img: this.props.navigation.getParam('img'),
                                    revert: this.state.revert,
                                    capital: this.state.capital,
                                    accents: this.state.accents,
                                    lessonName: this.state.lessonName,
                                    random: this.state.random
                                });

                        }}>
                    <Text style={styles.standardBtn}> Start test </Text>
                </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}