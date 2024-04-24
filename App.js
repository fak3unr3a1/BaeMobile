import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from './screens/SignInScreen';
import HomeScreen from './screens/HomeScreen';
import ConversationHistoryScreen from './screens/ConversationHistoryScreen';
import IndexScreen from './screens/IndexScreen';
import SettingsScreen from './screens/SettingsScreen';
import StoreScreen from './screens/StoreScreen';
import TasksScreen from './screens/TasksScreen';
import ContactsList from './screens/ContactsList'; // Import ContactsList screen

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Index" component={IndexScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Store" component={StoreScreen} />
        <Stack.Screen name="ConversationHistory" component={ConversationHistoryScreen} />
        <Stack.Screen name="Tasks" component={TasksScreen} />
        <Stack.Screen name="Contacts" component={ContactsList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
