import "react-native-gesture-handler";

import * as React from "react";

import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import ConnectScreen from "./src/views/Connect/Connect";
import CreateAccountScreen from "./src/views/CreateAccount/CreateAccount";
import FriendsScreen from "./src/views/Friends/Friends";
import  Icon from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";
import LoginPasswordScreen from "./src/views/LoginPassword/LoginPassword";
import LoginScreen from "./src/views/Login/Login";
import OverviewScreen from "./src/views/OverView/Overview";
import ScanCode from "./src/assets/svg/ScanCode.svg";
import SettingsScreen from "./src/views/Settings/Settings";
import TNBLogo from "./src/assets/svg/TNBLogo.svg";
import { TouchableOpacity } from "react-native-gesture-handler";
import TransactionsScreen from "./src/views/Transactions/Transactions";
import { View } from "react-native";
import { color } from 'react-native-elements/dist/helpers';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

const MainTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

const Navigator = () => {
  const Stack = createStackNavigator();
  return (
    <LinearGradient
      colors={["#62737E", "#040505"]}
      style={{ flex: 1}}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      locations={[0, 0.35]}
    >
      <NavigationContainer theme={MainTheme}>
        <Stack.Navigator>
          <Stack.Screen
            name="connect"
            component={ConnectScreen}
            options={{
              ...headerOptions,
              headerRight: () => (
                <TouchableOpacity>
                  <ScanCode />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="createAccount"
            component={CreateAccountScreen}
            options={{
              ...headerOptions
             }}/>
          <Stack.Screen name="login" component={LoginScreen} options={headerOptions} />
          <Stack.Screen name="loginPassword" component={LoginPasswordScreen} options={headerOptions}/>
          <Stack.Screen name="tab" component={TabNavigator} options={tabsHeaderOptions}/>
        </Stack.Navigator>
      </NavigationContainer>
    </LinearGradient>
  );
};

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
      <Tab.Navigator initialRouteName={"overview"} tabBarOptions={tabBarOptions}>
        <Tab.Screen name="overview" component={OverviewScreen} options={{
          tabBarLabel: 'Overview',
          tabBarIcon: ({color}) => (
            <Icon name="ios-home" color={color} size={24} />
          ),
      }} />
        <Tab.Screen name="transactions" component={TransactionsScreen} options={{
          tabBarLabel: 'Transactions',
          tabBarIcon: ({color}) => (
            <Icon name="ios-list-circle" color={color} size={24} />
          ),
        }}/>
        <Tab.Screen name="friends" component={FriendsScreen} options={{
          tabBarLabel: 'Friends',
          tabBarIcon: ({color}) => (
            <Icon name="people" color={color} size={24} />
          ),
        }}/>
        <Tab.Screen name="settings" component={SettingsScreen} options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({color}) => (
            <Icon name="settings-sharp" color={color} size={24} />
          ),
        }}/>
      </Tab.Navigator>
  );
};

const headerOptions = {
  headerStyle: {
    backgroundColor: "transparent",
    elevation: 0,
    shadowOpacity: 0,
  },
  headerTitle: '',
  headerLeft: () => <TNBLogo />,
};

const tabsHeaderOptions = {
  headerShown: false,
};

const tabBarOptions = {
  labelStyle: {
    fontSize: 12,
  },
  activeTintColor: '#fff',
  inactiveTintColor: "#62737E",
  tabStyle: {
    width: 100
  },
  style: {
    backgroundColor: '#1D2731'
  },
  }
export default Navigator;