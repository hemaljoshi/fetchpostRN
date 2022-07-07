import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FetchPostController from './src/FetchPostController';
import WebView from './src/WebView';
const Stack = createNativeStackNavigator();
export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="FetchPost" component={FetchPostController} />
          <Stack.Screen name="WebView" component={WebView} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
