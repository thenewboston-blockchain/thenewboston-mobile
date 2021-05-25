<<<<<<< HEAD
import "react-native-gesture-handler";

import * as React from "react";

import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import LinearGradient from "react-native-linear-gradient";

// screen
import ConnectScreen from "./src/views/Connect/Connect";
import CreateAccountScreen from "./src/views/CreateAccount/CreateAccount";
import FriendsScreen from "./src/views/Friends/Friends";
import LoginScreen from "./src/views/Login/Login";
import OverviewScreen from "./src/views/MyAccount/Overview";
import SettingsScreen from "./src/views/Settings/Settings";
import TransactionsScreen from "./src/views/Transactions/Transactions";
import LoginPasswordScreen from "./src/views/LoginPassword/LoginPassword";

// svgs
import TNBLogo from "./src/assets/svg/TNBLogo.svg";
import ScanCode from "./src/assets/svg/ScanCode.svg";
import { TouchableOpacity } from "react-native-gesture-handler";

const MainTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};
=======
import * as React from "react";

import Navigator from './Navigator';
>>>>>>> master

const App = () => {
  return (
<<<<<<< HEAD
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
            name="createAccount"
            component={CreateAccountScreen}
            options={{
              ...authOptions,
              headerRight: () => (
                <TouchableOpacity>
                  <ScanCode />
                </TouchableOpacity>
              ),
            }}
          />
           <Stack.Screen name="login" component={LoginScreen} options={authOptions}/>
           <Stack.Screen name="loginPassword" component={LoginPasswordScreen} options={authOptions}/>
          <Stack.Screen name="connect" component={ConnectScreen} />
          <Stack.Screen name="tab" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </LinearGradient>
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

const authOptions = {
  headerStyle: {
    backgroundColor: "transparent",
  },
  headerTitle: "",
  headerLeft: () => <TNBLogo />,
};

export default App;

// No need for redux since we are not managing any global state
=======
    <Navigator />
  );
};

export default App;
>>>>>>> master
