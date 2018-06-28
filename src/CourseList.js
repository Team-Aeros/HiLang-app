import React from 'react';
import { View, TextInput, TouchableOpacity, Text, ScrollView } from 'react-native';
import styles from '../assets/css/Style.js';
import Api from './Api.js';

export default class CourseList extends React.Component {

    static navigationOptions = {
        title: 'Browse courses'
    };

    constructor(props){
        super(props);
        this.getAllPublic();
        this.state = {
            name: '',
            searchResults: []
        }
    }

    search() {
        let sendData = {
            name: this.state.name
        }
        Api.getInstance().callApi('/course/search', 'POST', sendData, response => {
            let holderArray = [];
            for(course of response) {
                holderArray.push(
                    <TouchableOpacity key={course.id} style={ styles.list_item } onPress={() => this.props.navigation.navigate('Course', {id: course.id})}>
                        <Text style={ styles.course_card_title }>{ course.name}</Text>
                        <Text>{ course.description }</Text>
                        <Text style={ styles.course_card_author }>Created by { course.author }</Text>
                    </TouchableOpacity>
                );
            }
            this.setState({searchResults: holderArray});
        });
    }

    getAllPublic() {
        Api.getInstance().callApi('/courses/public', 'POST', {}, response => {
            let holderArray = [];
            for(course of response) {
                let author = "";
                Api.getInstance().callApi('/user/' + course.fields.user + '/', 'POST', {}, response => {
                    author = response.name;
                });
                holderArray.push(
                    <TouchableOpacity key={course.pk} style={ styles.list_item } onPress={() => this.props.navigation.navigate('Course', {id: course.pk})}>
                        <Text style={ styles.course_card_title }>{ course.fields.name}</Text>
                        <Text>{ course.fields.description }</Text>
                        <Text style={ styles.course_card_author }>Created by { author }</Text>
                    </TouchableOpacity>
                );
                this.setState({searchResults: holderArray});
            }
        });
    }

    render() {
        return (
            <ScrollView>
                <View>
                    <View style={[styles.browseBar, styles.flexRow]}>
                        <TextInput  label="browse"
                                    value={this.state.name}
                                    onChangeText={name => this.setState({name: name})}
                                    style={ styles.browseInput }
                                    onSubmitEditing= { () => {
                                        this.search();
                                        }}>
                        </TextInput>
        
                        <TouchableOpacity
                            style={styles.searchdBtnCon}
                            onPress={() => {
                                this.search();
                            }}>
                            <Text style={styles.standardBtn}>search</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ padding: 20}}>
                    { this.state.searchResults }
                </View>
            </ScrollView>
        );
    }
}