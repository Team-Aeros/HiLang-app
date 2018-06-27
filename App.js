import React from 'react';
import Session from './src/Session.js';
import Login from './src/Login.js';
import Logout from './src/Logout.js';
import Home from './src/Home.js';
import Course from './src/Course.js';
import Lesson from './src/Lesson.js';
import LoginLoadingScreen from './src/LoginLoadingScreen.js';
import Profile from './src/Profile.js';
import CourseList from './src/CourseList.js';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Flashcards from './src/Flashcards.js';

import AccountAreaNavigation from './src/navigation/AccountAreaNavigation.js';

import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';

const PreLoginStack = createStackNavigator({
    Login: Login,
    Logout: Logout
    /*Loading: {
        screen: LoginLoadingScreen,
        headerMode: 'none',
        header: null,
        tabBarVisible: false
    },*/
});

const CourseArea = createStackNavigator({
    CourseList: CourseList,
    Course: Course,
    Lesson: Lesson,
    Flashcards: Flashcards
});

const AccountArea = createStackNavigator({
    Navigation: AccountAreaNavigation,
    Profile: Profile
});

const HomeArea = createStackNavigator({
    Home: Home
});

const UserArea = createBottomTabNavigator({
        Home: HomeArea,
        Courses: CourseArea,
        Account: AccountArea
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor}) => {
                const { routeName } = navigation.state;

                let iconName;

                switch (routeName) {
                    case 'Home':
                        iconName = 'ios-home';
                        break;
                    case 'Courses':
                        iconName = 'ios-book';
                        break;
                    case 'Account':
                        iconName = 'ios-settings';
                        break;
                }

                return <Ionicons name={iconName} size={25} color={tintColor} />;
            }
        })
    }
);

const Navigation = createSwitchNavigator({
        Auth: PreLoginStack,
        UserArea: UserArea,
    },
    {
        initialRouteName: 'Auth'
    }
);

export default class App extends React.Component {

    render() {
        return <Navigation />;
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