import React, { Platform, StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 20 : 24,
        padding: 20
    },

    logInContainer: {
    	paddingTop: 50
    },

    compTitle: {
    	color: 'dimgray',
        fontSize: 50,
        marginBottom: 30,
        textAlign: 'center'
    },

    logInEmail: {
    	margin: 30,
        padding: 15,
        fontSize: 25,
        borderWidth: 1,
        borderColor: '#efefef',
        backgroundColor: '#fff',
        letterSpacing: -1
    },

    logInPw: {
    	marginLeft: 30,
       	marginRight: 30,
       	marginTop: 0,
       	padding: 15,
       	fontSize: 25,
       	borderWidth: 1,
       	borderColor: '#efefef',
       	backgroundColor: '#fff',
       	letterSpacing: -1
    },

    logInBtnCon: {
    	margin: 30,
    	backgroundColor: '#c62828cf',
    	padding: 15,
    	borderRadius: 10,
    	overflow: 'hidden'
    },

    logInBtn: {
    	textAlign: 'center',
    	fontSize: 20,
    	color: 'white',
    },
    
    subscribedCourseCard: {

    },

    course_card: {
        padding: 20,
        margin: 3,
        borderRadius: 8,
        backgroundColor: '#ff5f52'
    },

    course_card_title: {
        fontWeight: 'bold'
    },

    course_card_author: {
        textAlign: 'right',
        fontSize: 9,
        color: '#263238'
    },

    section_header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#263238',
        marginTop: 5
    },

    section_subheader: {
        fontSize: 23,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#263238',
        marginTop: 5
    },

    courseLessonCard: {
    	borderWidth: 3,
    	padding: 30,
    	borderColor: 'black',
    	borderRadius: 10,
    	width: Dimensions.get('window').width-20,
    	height: 50,
    	alignItems: 'center',
    	justifyContent: 'center',
    	margin: 10
    },

    vocItem: {
    	marginTop: 5,
        marginLeft: 2,
        marginRight: 2,
    	width: Dimensions.get('window').width - 12
    },

    vocEntry: {
    	padding: 3,
    	margin: 2,
    },

    startTestBtn: {
    	color: 'white',
    	fontSize: 20,
    	textAlign: 'center'
    }, 

    startTestBtnCon: {
    	margin: 30,
    	backgroundColor: 'green',
    	padding: 15,
    	borderRadius: 10,
    	overflow: 'hidden'
    },

    bold: {
        fontWeight: 'bold'
    }
});