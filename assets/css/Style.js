import React, { Platform, StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 20 : 24,
        padding: 20,
    },

    courseBackground: {
        width: Dimensions.get('window').width,
        padding: 20,
        marginBottom: 0
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
    },

    course_card_author: {
        textAlign: 'right',
        fontSize: 9,
    },

    section_header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#263238',
        marginTop: 5
    },

    section_subheader: {
        fontSize: 18,
        marginBottom: 5,
        color: '#cc6343',
        letterSpacing: -1,
        marginTop: 20
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
    	margin: 5,
        backgroundColor: '#309930'
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

    languageName: {
        padding: 3,
        margin: 2,
    },

    standardBtn: {
    	color: 'white',
    	fontSize: 20,
    	textAlign: 'center'
    }, 

    standardBtnCon: {
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
        padding: 5,
        backgroundColor: '#fff'
    },

    resultHeader: {
        borderWidth: 2,
        borderRadius: 5,
        borderColor: '#cccccc',
        marginBottom: 10,
        padding: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: Dimensions.get('window').height / 10
    },

    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        backgroundColor: '#fff',
        margin: 3,
        borderColor: '#dddddd',
        borderWidth: 3,
        borderRadius: 5
    },

    profileContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 30
    },

    simple_list_item: {
        padding: 15,
        borderColor: '#dddddd',
        borderBottomWidth: 1,
        backgroundColor: '#fff'
    },

    card: {
        backgroundColor: '#fff',
        height: 80,
        alignItems: 'flex-start'
    },

    startExerciseScreen: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        margin: 25
    },

    startExerciseBtnCon: {
        margin: 200,
        backgroundColor: 'green',
        padding: 15,
        borderRadius: 50,
        overflow: 'hidden',
        height: 100,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',

    },

    courseHeader: {
        alignItems: 'center',
    },

    courseContent: {
        margin: 10,
        marginTop: 0,
        padding: 20,
        backgroundColor: '#fff'
    },


    flexColumn: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },

    exerciseOptions: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        margin: 30
    },

    flexRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    exerciseOptionsRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10
    },

    courseBottom: {
        marginBottom: 5,
        height: 100
    },

    testTitle: {
        borderWidth: 1,
        borderColor: '#747574',
        borderRadius: 10,
        backgroundColor: '#f9fff9',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 20
    },

    testContainer: {
        borderWidth: 3,
        borderColor: '#747574',
        borderRadius: 10,
        backgroundColor: '#fcfcfc',
        alignItems: 'center',
        alignSelf: 'center',
        width: 300,
        height: 100,
        flex: 1,
        flexDirection: 'column',
        marginBottom: 15,
        paddingTop: 25,
        paddingBottom: 25,
    },

    errorContainer: {
        borderWidth: 3,
        borderColor: '#747574',
        borderRadius: 10,
        backgroundColor: '#c62d2dac',
        alignItems: 'center',
        alignSelf: 'center',
        width: 300,
        height: 100,
        flex: 1,
        flexDirection: 'column',
        marginBottom: 15,
        paddingTop: 25,
        paddingBottom: 25,
    },

    correctContainer: {
        borderWidth: 3,
        borderColor: '#747574',
        borderRadius: 10,
        backgroundColor: '#21bc24ac',
        alignItems: 'center',
        alignSelf: 'center',
        width: 300,
        height: 100,
        flex: 1,
        flexDirection: 'column',
        marginBottom: 15,
        paddingTop: 25,
        paddingBottom: 25,
    },


    testQuestion: {
        margin: 10,
        fontSize: 20,
        marginBottom: 100
    },

    testInput: {
        alignSelf: 'center',
        letterSpacing: -1,
        fontSize: 20,
        width: 230,
        padding: 5
    },

    toggleRevert: {
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 5,
        backgroundColor: '#e8e5e5',
        alignSelf: 'center',
        alignItems: 'center',
    },

    progressBar: {
        borderWidth: 1,
        borderColor: 'green',
        borderRadius: 5,
        width: Dimensions.get('window').width - 50,
        backgroundColor: '#f9fff9',
        alignSelf: 'center'
    },

    searchdBtnCon: {
        margin: 30,
        backgroundColor: 'green',
        padding: 15,
        borderRadius: 10,
        overflow: 'hidden',
        width: 100
    },

    browseBar: {
        backgroundColor: '#fff',
        padding: 20
    },

    browseInput: {
        width: 250,
        fontSize: 20
    },
    shadow: {
        shadowColor: '#595959',
        shadowOffset: {
            width: 1,
            height: 2
        },
        shadowRadius: 2,
        shadowOpacity: 1.0
    },

    optionsContainer: {
        backgroundColor: '#fff',
        height: Dimensions.get('window').height,
    }
});