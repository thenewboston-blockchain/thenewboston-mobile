import "react-native-gesture-handler";

import * as React from "react";
import { View, Text, Image } from "react-native";

import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import ConnectScreen from "./src/views/Connect/Connect";
import CreateAccountScreen from "./src/views/CreateAccount/CreateAccount";
import FriendsScreen from "./src/views/Friends/Friends";
import LinearGradient from "react-native-linear-gradient";
import LoginPasswordScreen from "./src/views/LoginPassword/LoginPassword";
import LoginScreen from "./src/views/Login/Login";
import OverviewScreen from "./src/views/MyAccount/Overview";
import ScanCode from "./src/assets/svg/ScanCode.svg";
import SettingsScreen from "./src/views/Settings/Settings";
import SendCoins1Screen from "./src/views/SendCoins1/SendCoins1";
import SendCoins2Screen from "./src/views/SendCoins2/SendCoins2";
import TNBLogo from "./src/assets/svg/TNBLogo.svg";
import { TouchableOpacity } from "react-native-gesture-handler";
import TransactionsScreen from "./src/views/Transactions/Transactions";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Colors, Custom, Typography } from "styles";

// svg
import Home from "./src/assets/svg/Home.svg";
import Transactions from "./src/assets/svg/Transactions.svg";
import Friends from "./src/assets/svg/Friends.svg";
import Settings from "./src/assets/svg/Settings.svg";
import ArrowBack from "./src/assets/svg/ArrowBack.svg";

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
        </Stack.Navigator>
      </NavigationContainer>
    </LinearGradient>
  );
};

const TabIcon = ({ icon, text, focused }) => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center", top: 10 }}>
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
        component={OverviewStackScreen}
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

const OverviewStackScreen = () => {
  const OverviewStack = createStackNavigator();

  return (
    <OverviewStack.Navigator>
      <OverviewStack.Screen
        options={{ headerShown: false }}
        name="overview"
        component={OverviewScreen}
      />
      <OverviewStack.Screen
        options={({ navigation }) =>
          stackheaderOptions("Send Coins", navigation)
        }
        name="sendcoins1"
        component={SendCoins1Screen}
      />
      <OverviewStack.Screen
        options={({ navigation }) =>
          stackheaderOptions("Send Coins", navigation)
        }
        name="sendcoins2"
        component={SendCoins2Screen}
      />
    </OverviewStack.Navigator>
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

const stackheaderOptions = (title, navigation) => {
  return {
    headerStyle: {
      backgroundColor: "transparent",
    },
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.goBack(null)}>
        <ArrowBack />
      </TouchableOpacity>
    ),
    headerTitle: () => <Text style={headingStyle}>{title}</Text>,
  };
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

const headingStyle = {
  fontSize: Typography.FONT_SIZE_28,
  fontWeight: Typography.FONT_WEIGHT_BOLD,
  color: Colors.WHITE,
};

export default Navigator;
