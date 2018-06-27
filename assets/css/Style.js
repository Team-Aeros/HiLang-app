import React, { Platform, StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 20 : 24,
        padding: 20,
    },

    content: {
        padding: 20
    },

    logInContainer: {
    	paddingTop: 50
    },

    compTitle: {
    	color: '#efefef',
        fontSize: 50,
        marginBottom: 30,
        textAlign: 'center'
    },

    logInEmail: {
    	margin: 30,
        marginLeft: 10,
        marginRight: 10,
        padding: 15,
        fontSize: 25,
        borderWidth: 1,
        borderColor: '#efefef',
        backgroundColor: '#fff',
        letterSpacing: -1
    },

    logInPw: {
    	marginLeft: 10,
       	marginRight: 10,
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
        marginLeft: 10,
        marginRight: 10,
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

    list_item: {
        padding: 10,
        margin: 3,
        borderColor: 'dimgray',
        backgroundColor: '#fff',
        shadowColor: '#595959',
        shadowOffset: {
            width: 1,
            height: 2
        },
        shadowRadius: 2,
        shadowOpacity: 1.0
    },

    course_card_title: {
        fontWeight: 'bold',
        //color: '#fff'
    },

    course_card_author: {
        textAlign: 'right',
        fontSize: 9,
        //color: '#fff'
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
    	marginBottom: 6,
        marginLeft: 2,
        marginRight: 2,
    	width: Dimensions.get('window').width - 12
    },

    vocEntry: {
    	padding: 3,
    	margin: 2,
        marginTop: 0
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
    },

    sidebar: {
        flex: 1,
        padding: 20,
        backgroundColor: '#efefef'
    }, 

    resultItemCorrect: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#49d849',
        borderRadius: 10,
        marginTop: 5,
        marginLeft: 2,
        marginRight: 2,
        width: Dimensions.get('window').width - 12
    },

    resultItemInCorrect: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#c12222',
        borderRadius: 10,
        marginTop: 5,
        marginLeft: 2,
        marginRight: 2,
        width: Dimensions.get('window').width - 12
    },

    resultEntryRight: {
        marginLeft: 40
    },

    resultEntry: {
        padding: 3,
        margin: 2,
    },

    resultContainer: {
        padding: 5
    },

    courseDetContainer: {
        flex: 1,
        justifyContent: 'space-between'
    },

    resultHeader: {
        borderWidth: 3,
        marginBottom: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: Dimensions.get('window').height / 10
    }
});