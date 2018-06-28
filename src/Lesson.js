import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, ImageBackground, Switch } from 'react-native';
import Api from './Api.js';
import styles from '../assets/css/Style.js';
import Session from './Session.js';

const maxEntryLength = 60;

export default class Course extends React.Component {

    static navigationOptions = {
        title: 'Viewing lesson'
    };

    constructor(props){
        super(props);

        this.state = {
            id: '',
            name: '',
            category: '',
            description: '',
            grammar: '',
            course_id: '',
            vocabulary: [],
            revert: false,
            questionLang: this.props.navigation.getParam('translation'),
            answerLang: this.props.navigation.getParam('native')
        }

        this.getLesson(this.props.navigation.getParam('id'));
    }

    getLesson(id: number) {
        Api.getInstance().callApi('/lesson/' + id, 'POST', {}, response => {
            this.setState({
                id: response.id,
                name: response.name,
                category: response.category,
                description: response.description,
                grammar: response.grammar,
                course_id: response.course_id
            });

            let subArray = [];
            for(entry of response.vocabulary) {
                subArray.push(
                    <View style={[styles.list_item]} key={entry.id}>
                        <Text style={[styles.vocEntry, styles.bold]}>{entry.native}</Text>
                        <Text style={styles.vocEntry}>{entry.translation}</Text>
                    </View>
                );
            }

            this.setState({
                vocabulary: subArray
            });
        });
            
    }

    render() {
        return (
            <ImageBackground style={styles.courseBackground} source={{uri: this.props.navigation.getParam('img')}}>
                <ScrollView style={styles.container}>
                    <Text style={ styles.section_header }>{this.state.name}</Text>
                    <View>
                        <Text>{this.state.description}</Text>
                    </View>
                    <Text style={ styles.section_subheader }>Lesson content</Text>
                    <Text>{this.state.grammar}</Text>
                    <Text style={ styles.section_subheader }>Vocabulary</Text>
    
                    {this.state.vocabulary}
                    <View style={styles.flexRow}>
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
    
                    <TouchableOpacity style={styles.standardBtnCon} onPress={() => this.props.navigation.navigate('Flashcards', {id: this.state.id, img: this.props.navigation.getParam('img'), revert: this.state.revert})}>
                        <Text style={styles.standardBtn}> Start test </Text>
                    </TouchableOpacity>
                </ScrollView>
            </ImageBackground>
        );
    }
}