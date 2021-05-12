import 'react-native-gesture-handler';

import * as React from 'react';

import ConnectScreen from './src/views/Connect/Connect';
import CreateAccountScreen from './src/views/CreateAccount/CreateAccount';
import FriendsScreen from './src/views/Friends/Friends';
import { NavigationContainer } from '@react-navigation/native';
import OverviewScreen from './src/views/MyAccount/Overview';
import SettingsScreen from './src/views/Settings/Settings';
import TransactionsScreen from './src/views/Transactions/Transactions';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

const App = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Overview" component={CreateAccountScreen} />
      <Stack.Screen name="Overview" component={ConnectScreen} />
      <Stack.Screen name="Overview" component={TabNavigator} />
    </Stack.Navigator>
  );

};

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="OverviewScreen" component={OverviewScreen} />
        <Tab.Screen name="FriendsScreen" component={FriendsScreen} />
        <Tab.Screen name="TransactionsScreen" component={TransactionsScreen} />
        <Tab.Screen name="SettingsScreen" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
 };

 
export default App;

// No need for redux since we are not managing any global state