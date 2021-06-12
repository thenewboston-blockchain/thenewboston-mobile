import "react-native-gesture-handler";

import * as React from "react";

import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { Image, Text, View } from "react-native";

import Back from "./src/assets/svg/Back.svg";
import ConnectScreen from "./src/views/Connect/Connect";
import CreateAccountScreen from "./src/views/CreateAccount/CreateAccount";
import EditAccountScreen from "./src/views/EditAccount/EditAccount";
import Friends from "./src/assets/svg/Friends.svg";
import FriendsScreen from "./src/views/Friends/Friends";
// svg
import Home from "./src/assets/svg/Home.svg";
import LinearGradient from "react-native-linear-gradient";
import LoginPasswordScreen from "./src/views/LoginPassword/LoginPassword";
import LoginScreen from "./src/views/Login/Login";
import OverviewScreen from "./src/views/MyAccount/Overview";
import ScanCode from "./src/assets/svg/ScanCode.svg";
import Settings from "./src/assets/svg/Settings.svg";
import SettingsScreen from "./src/views/Settings/Settings";
import TNBLogo from "./src/assets/svg/TNBLogo.svg";
import { TouchableOpacity } from "react-native-gesture-handler";
import Transactions from "./src/assets/svg/Transactions.svg";
import TransactionsScreen from "./src/views/Transactions/Transactions";
import { Typography } from "./src/styles";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

const Navigator = () => {
  const Stack = createStackNavigator();
  return (
    <LinearGradient
      colors={["#62737E", "#040505"]}
      style={{ flex: 1, padding: 10 }}
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
              ...authHeaderOptions,
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
            options={authHeaderOptions}
          />
          <Stack.Screen
            name="login"
            component={LoginScreen}
            options={authHeaderOptions}
          />
          <Stack.Screen
            name="loginPassword"
            component={LoginPasswordScreen}
            options={authHeaderOptions}
          />
          <Stack.Screen
            options={headerOptions}
            name="tab"
            component={TabNavigator}
          />
          <Stack.Screen
          options={editNicknameOptions}
          name="editAccount"
          component={EditAccountScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </LinearGradient>
  );
};

const TabIcon = ({ icon, text, focused }) => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center", top: 10 }}>
      {/* <Image
        source={require("./src/assets/imgs/home.png")}
        resizeMode="contain"
        style={{
          width: 25,
          height: 25,
          tintColor: focused ? "#FFF" : "#62737E",
        }}
      /> */}
      {icon}
      <Text
        style={{
          color: focused ? "#FFF" : "#62737E",
          fontSize: 10,
          marginTop: 10,
        }}
      >
        {text}
      </Text>
    </View>
  );
};

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      tabBarOptions={{ showLabel: false, style: tabStyle }}
      initialRouteName="overview"
    >
      <Tab.Screen
        name="overview"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              text="My Accounts"
              focused={focused}
              icon={<Home fill={focused ? "#FFF" : "#62737E"} />}
            />
          ),
        }}
        component={OverviewScreen}
      />
      <Tab.Screen
        name="transactions"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              text="Transactions"
              focused={focused}
              icon={<Transactions fill={focused ? "#FFF" : "#62737E"} />}
            />
          ),
        }}
        component={TransactionsScreen}
      />
      <Tab.Screen
        name="friends"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              text="Friends"
              focused={focused}
              icon={<Friends fill={focused ? "#FFF" : "#62737E"} />}
            />
          ),
        }}
        component={FriendsScreen}
      />
      <Tab.Screen
        name="settings"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              text="Settings"
              focused={focused}
              icon={<Settings fill={focused ? "#FFF" : "#62737E"} />}
            />
          ),
        }}
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
};

const MainTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

const authHeaderOptions = {
  headerStyle: {
    backgroundColor: "transparent",
    elevation: 0,
    shadowOpacity: 0,
  },
  headerTitle: "",
  headerLeft: () => <TNBLogo />,
};

const headerOptions = {
  headerStyle: {
    backgroundColor: "transparent",
    elevation: 0,
    shadowOpacity: 0,
  },
  headerTitle: "",
  headerLeft: () => null,
};

const editNicknameOptions= {
  headerStyle: {
    backgroundColor: "transparent",
    elevation: 0,
    shadowOpacity: 0,
  },
  headerTitle: "Edit nickname",
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: "bold",
    fontSize: Typography.FONT_SIZE_28
  },
  headerLeft: () => <Back/>,
};


const tabStyle = {
  position: "absolute",
  bottom: 25,
  left: 10,
  right: 10,
  elevation: 0,
  borderRadius: 16,
  height: 65,
  backgroundColor: "#2B4150",
  borderWidth: 0,
  borderColor: "#62737E",
};

export default Navigator;
