import React from 'react';
import Session from './src/Session.js';
import Login from './src/Login.js';
import Home from './src/Home.js';
import Course from './src/Course.js';
import Lesson from './src/Lesson.js';
import Flashcards from './src/Flashcards.js';

import { createStackNavigator } from 'react-navigation';

const RootStack = createStackNavigator({
        Login: Login,
        Home: Home,
        Course: Course,
        Lesson: Lesson,
        Flashcards: Flashcards
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

/**
            <NativeRouter>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/course/:c_id" component={Course} />
                    <Route exact path="/lesson/:l_id" component={Lesson} />
                    <Route exact path="/flashcards/:l_id" component={Flashcards} />
                </Switch>
            </NativeRouter>
*/