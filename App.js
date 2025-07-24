import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// 🔗 import หน้าจอจากโฟลเดอร์ screens
import LoginScreen from './screen/LoginScreen';
import HomeScreen from './screen/HomeScreen';
import LessonScreen from './screen/LessonScreen';
import Testscreen from './screen/TestScreen';
import Reportscreen from './screen/ReportScreen';
import TimesScreen from './screen/TimesScreen';
import Lesson1 from './screen/lesson1-6/lesson1';
import Lesson2 from './screen/lesson1-6/lesson2';
import Lesson3 from './screen/lesson1-6/lesson3';
import Lesson4 from './screen/lesson1-6/lesson4';
import Lesson5 from './screen/lesson1-6/lesson5';
import Lesson6 from './screen/lesson1-6/lesson6';
import Lesson7 from './screen/lesson1-6/lesson7';
import Lesson8 from './screen/lesson1-6/lesson8';
import Test1 from './screen/Test1-6/test1';
import Test2 from './screen/Test1-6/test2';
import Test3 from './screen/Test1-6/test3';
import Test4 from './screen/Test1-6/test4';
import Test5 from './screen/Test1-6/test5';
import Test6 from './screen/Test1-6/test6';
import Test7 from './screen/Test1-6/test7';
import Test8 from './screen/Test1-6/test8';
import GameMenu from './screen/GamesScreen';
import Quizgame from './screen/games/quizgame';
import memorymatching from './screen/games/memorymatching';
import draganddrop from './screen/games/draganddrop';
import tappinggame from './screen/games/tappinggame';
import Wordscramble from './screen/games/Wordscramble';
// ✅ สร้าง Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: '#4a90e2' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Welcome' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'หน้าหลัก' }} />
        <Stack.Screen name="Lesson" component={LessonScreen} />
        <Stack.Screen name="Testscreen" component={Testscreen} />
        <Stack.Screen name="Reportscreen" component={Reportscreen} />
        <Stack.Screen name="TimesScreen" component={TimesScreen} />
        <Stack.Screen name="Lesson1" component={Lesson1} />
        <Stack.Screen name="Lesson2" component={Lesson2} />
        <Stack.Screen name="Lesson3" component={Lesson3} />
        <Stack.Screen name="Lesson4" component={Lesson4} />
        <Stack.Screen name="Lesson5" component={Lesson5} />
        <Stack.Screen name="Lesson6" component={Lesson6} />
        <Stack.Screen name="Lesson7" component={Lesson7} />
        <Stack.Screen name="Lesson8" component={Lesson8} />
        <Stack.Screen name="Test1" component={Test1} />
        <Stack.Screen name="Test2" component={Test2} />
        <Stack.Screen name="Test3" component={Test3} />
        <Stack.Screen name="Test4" component={Test4} />
        <Stack.Screen name="Test5" component={Test5} />
        <Stack.Screen name="Test6" component={Test6} />
        <Stack.Screen name="Test7" component={Test7} />
        <Stack.Screen name="Test8" component={Test8} />
        <Stack.Screen name="GameMenu" component={GameMenu} />
        <Stack.Screen name="Quizgame" component={Quizgame} />
        <Stack.Screen name="memorymatching" component={memorymatching} />
        <Stack.Screen name="draganddrop" component={draganddrop} />
        <Stack.Screen name="tappinggame" component={tappinggame} />
        <Stack.Screen name="Wordscramble" component={Wordscramble} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
