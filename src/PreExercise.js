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
                    <View style={styles.simple_list_item}>
                            <View>
                                <Text>
                                    Translate from foreign language to known language
                                </Text>
                                <Switch
                                    value={this.state.revert}
                                    onValueChange={() => this.setState({ revert: !this.state.revert })}
                                    >
                                </Switch>
                            </View>
                    </View>
                    <View style={styles.simple_list_item}>
                            <View>
                                <Text>
                                    Capital letters are important
                                </Text>
                                <Switch
                                    value={this.state.capital}
                                    onValueChange={() => {
                                        this.setState({capital:  !this.state.capital});
                                    }}
                                    >
                                </Switch>
                            </View>
                    </View>
                    <View style={styles.simple_list_item}>
                            <View>
                                <Text style={styles.languageName}>
                                    Accents are important
                                </Text>
                                <Switch
                                    value={this.state.accents}
                                    onValueChange={() => {
                                        this.setState({accents:  !this.state.accents});
                                    }}
                                    >
                                </Switch>
                            </View>
                    </View>
                    <View style={styles.simple_list_item}>
                        <View>
                            <Text style={styles.languageName}>
                                Ask words in random order
                            </Text>
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