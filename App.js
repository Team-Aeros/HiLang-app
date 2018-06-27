import React from 'react';
import Session from './src/Session.js';
import Login from './src/Login.js';
import Home from './src/Home.js';
import Course from './src/Course.js';
import Lesson from './src/Lesson.js';
import Flashcards from './src/Flashcards.js';
import Result from './src/Result.js';

import { createStackNavigator } from 'react-navigation';

const RootStack = createStackNavigator({
        Login: Login,
        Home: Home,
        Course: Course,
        Lesson: Lesson,
        Flashcards: Flashcards,
        Result: Result,
    },
    {
        initialRouteName: 'Login'
    }
);

export default class App extends React.Component {

    render() {
        return <RootStack />;
    }
}