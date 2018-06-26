import React, { Platform, StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 20 : 24
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

    courseLessonCard: {
    	borderWidth: 3,
    	padding: 30,
    	borderColor: 'black',
    	borderRadius: 10,
    	width: Dimensions.get('window').width-20,
    	height: 150,
    	alignItems: 'center',
    	justifyContent: 'center',
    	margin: 10
    },

    courseDetContainer: {
    	flex: 1,
    	flexDirection: 'column',
    	justifyContent: 'space-between'
    },

    lessonDetContainer: {
    	margin: 5,
    	flex: 1,
    	flexDirection: 'column',
    	justifyContent: 'space-between'
    },

    vocItem: {
    	flex: 1,
    	flexDirection: 'row',
    	margin: 2,
    	justifyContent: 'center',
    	alignItems: 'center',
    	width: Dimensions.get('window').width - 12
    },

    vocEntry: {
    	padding: 3,
    	borderWidth: 2,
    	borderRadius: 10,
    	borderColor: 'black',
    	margin: 2,
    	alignSelf: 'center'
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
});