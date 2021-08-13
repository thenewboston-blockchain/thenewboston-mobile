 
import React, { useEffect, useState, memo, useRef} from "react";
import { View, Text, Image, PermissionsAndroid, Platform, Dimensions, Animated } from "react-native"; 
import { PERMISSIONS, check, RESULTS } from 'react-native-permissions'
import LinearGradient from "react-native-linear-gradient";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as ImagePicker from 'react-native-image-picker';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Colors, Custom, Typography } from "styles"; 
import ConnectScreen from "views/Connect/Connect";
import CreateAccountScreen from "views/CreateAccount/CreateAccount";
import FriendsScreen from "views/Friends/Friends"; 
import LoginPasswordScreen from "views/LoginPassword/LoginPassword";
import LoginScreen from "views/Login/Login";
import OverviewScreen from "views/MyAccount/Overview"; 
import SettingsScreen from "views/Settings/Settings";
import SendCoins1Screen from "views/SendCoins1/SendCoins1";
import SendCoins2Screen from "views/SendCoins2/SendCoins2";
import EditAccountScreen from "views/Settings/EditAccount/EditAccount";  
import TransactionsScreen from "views/Transactions/Transactions";  
import { Modalize } from 'react-native-modalize';
import { Host, Portal } from 'react-native-portalize';
import { useCombinedRefs } from './use-combined-refs';

// svg
import Home from "assets/svg/Home.svg";
import Transactions from "assets/svg/Transactions.svg";
import Friends from "assets/svg/Friends.svg";
import Settings from "assets/svg/Settings.svg";
import ArrowBack from "assets/svg/ArrowBack.svg";
import ScanCode from "assets/svg/ScanCode.svg";
import TNBLogo from "assets/svg/TNBLogo.svg";

const { width } = Dimensions.get('window');
const HEADER_COLLAPSE = 32;
const HEADER_LIST = 60;
const HEADER_HEIGHT = HEADER_LIST + HEADER_COLLAPSE;

const Navigator = ({route, isLogin}) => {
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
        <Stack.Navigator
          initialRouteName={"login"}
        >
          <Stack.Screen
            name="connec"
            component={ConnectScreen}
            options={({ navigation }) =>
            qrCodeHeaderOptions("", navigation)
            }
            
          />
          <Stack.Screen
            name="login"
            component={LoginScreen} 
            options={authHeaderOptions}
          />
          <Stack.Screen
            name="createAccount"
            component={CreateAccountScreen}
            options={authHeaderOptions}
          />  
          <Stack.Screen
            name="loginPassword"
            component={LoginPasswordScreen}
            options={authHeaderOptions}
          />
          <Stack.Screen
            options={nonHeaderOptions}
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
    <View style={{ alignItems: "center", justifyContent: "center", top: -6, borderTopColor:'red', borderTopWidth: focused ? 2 : 0, paddingTop:11}}>
      {icon}
      <Text
        style={{
          color: focused ? "#FFF" : "#62737E",
          fontSize: 10,
          marginTop: 8,
        }}
      >
        {text}
      </Text>
    </View>
  );
};

const TabNavigator = ({route}) => {
  const Tab = createBottomTabNavigator();    
  const modalizeRef = useRef(null);
  const contentRef = useRef(null);
  const ref = useRef<Modalize>(null); 
  const combinedRef = useCombinedRefs(ref, modalizeRef);
  const [index, setIndex] = useState(0);
  const scrollY = useRef(new Animated.Value(0)).current;
  const Tabs = memo(({ active, onIndexChange }) => {
     
    return (
     <View></View>
    );
  });

  const handleIndexChange = i => {
    const w = 55; // item width
    const m = 25; // item margin
    const x = (w + m) * i;
 

    if (contentRef.current) {
      contentRef.current.getScrollResponder().scrollTo({ y: 0, animated: true });
    }
 
  };

  return (
    // <Modalize
    //   ref={combinedRef}
    //   contentRef={contentRef}
    //   HeaderComponent={Tab}
    //   modalStyle={{ backgroundColor: '#1a1d21' }}
    //   handleStyle={{ width: 35, backgroundColor: '#75777a' }}
    //   childrenStyle={{ borderTopLeftRadius: 12, borderTopRightRadius: 12, overflow: 'hidden' }}
    //   scrollViewProps={{
    //     onScroll: Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
    //       useNativeDriver: true,
    //     }),
    //     scrollEventThrottle: 16,
    //   }}
    // >
    //   <Tabs active={index} onIndexChange={handleIndexChange} />
    // </Modalize>
    <Tab.Navigator
      tabBarOptions={{ showLabel: false, style: tabStyle, keyboardHidesTabBar: true}}
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
      initialParams={{nickname: route.params.nickname, signingKeyHex: route.params.signingKeyHex, tabBottom: Tab,
        accountNumber: route.params.accountNumber, signingKey: route.params.signingKey, accounts: route.params.accounts,
        validator_accounts: route.params.validator_accounts,bank_url: route.params.bank_url, login: route.params.login, genKey: route.params.genKey}}
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
      initialParams={{nickname: route.params.nickname, signingKeyHex: route.params.signingKeyHex, 
        accountNumber: route.params.accountNumber, signingKey: route.params.signingKey, accounts: route.params.accounts,
        validator_accounts: route.params.validator_accounts, bank_url: route.params.bank_url, login: route.params.login, genKey: route.params.genKey}}
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
      initialParams={{nickname: route.params.nickname, signingKeyHex: route.params.signingKeyHex, accountNumber: route.params.accountNumber, signingKey: route.params.signingKey, accounts: route.params.accounts, validator_accounts: route.params.validator_accounts, bank_url: route.params.bank_url, login: route.params.login, genKey: route.params.genKey}}
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
      initialParams={{nickname: route.params.nickname}}
      component={SettingsStackScreen}
    />
  </Tab.Navigator>
  ); 
};

const SettingsStackScreen = ({route, navigation}) => {
  const SettingStack = createStackNavigator();  
  return (
    <SettingStack.Navigator>
      <SettingStack.Screen
        options={{ headerShown: false }}
        name="settingView" 
        initialParams={{nickname: route.params.nickname}}
        component={SettingsScreen}
      />
      <SettingStack.Screen
        options={({ navigation }) =>
          stackheaderOptions("Edit nickname", navigation)
        }
        name="editaccount"
        initialParams={{nickname: route.params.nickname, setNickName: route.params.setNickName}}
        component={EditAccountScreen}
      /> 
    </SettingStack.Navigator>
  );
};

const OverviewStackScreen = ({route}) => {
  const OverviewStack = createStackNavigator();  
  return (
    <OverviewStack.Navigator>
      <OverviewStack.Screen
        options={{ headerShown: false }}
        name="overview" 
        initialParams={{nickname: route.params.nickname, signingKeyHex: route.params.signingKeyHex, accountNumber: route.params.accountNumber, signingKey: route.params.signingKey, accounts: route.params.accounts, validator_accounts: route.params.validator_accounts, bank_url: route.params.bank_url, login: route.params.login, genKey: route.params.genKey,  tabBottom: route.params.tabBottom,}}
        component={OverviewScreen}
      />
      <OverviewStack.Screen
        options={({ navigation }) =>
          stackSendCoinheaderOptions("Send Coins", navigation)
        }
        name="sendcoins1"
        initialParams={{validator_accounts: route.params.validator_accounts, bank_url: route.params.bank_url}}
        component={SendCoins1Screen}
      />
      <OverviewStack.Screen
        options={({ navigation }) =>
          stackSendCoinheaderOptions("Send Coins", navigation)
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

const nonHeaderOptions = {
  headerStyle: {
    backgroundColor: "transparent",
    elevation: 0,
    shadowOpacity: 0,
    height: 0
  },
  headerTitle: "", 
  headerLeft: "", 
}; 

const qrCodeHeaderOptions = (title, navigation) => {
  return {
    headerStyle: {
      backgroundColor: "transparent",
      elevation: 0,
      shadowOpacity: 0,
    }, 
    headerTitle: title,
      // headerRight: () => (
      //   <TouchableOpacity onPress={openCameraWithPermission}>
      //     <ScanCode />
      //   </TouchableOpacity>
      // ), 
    headerLeft: () => <TNBLogo />, 
  }; 
};

const openCameraWithPermission = async() =>{ 
  if(Platform.OS === 'android'){
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'App Camera Permission',
        message: 'App needs access to your camera ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      ImagePicker.launchCamera(
        {
          mediaType: 'mixed',
          includeBase64: false,
          maxHeight: 200,
          maxWidth: 200,
        },
        (response) => {
          console.log(response); 
        },
      );
    } else {
      console.log('Camera permission denied');
    }  
  }
  else {  //iOS
    const res = await check(PERMISSIONS.IOS.CAMERA); 
    if (res === RESULTS.GRANTED) {
      ImagePicker.launchCamera(
        {
          mediaType: 'mixed',
          includeBase64: false,
          maxHeight: 200,
          maxWidth: 200,
        },
        (response) => {
          console.log(response); 
        },
      );
    } 
    else {
      console.log('Camera permission denied');
    }
  }
    
}


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
      elevation: 0,
      shadowOpacity: 0,
      backgroundColor: "transparent", 
    },
    headerLeft: () => (
      <TouchableOpacity style={{left:10}} onPress={() => navigation.goBack(null)}>
        <ArrowBack />
      </TouchableOpacity>
    ),
    headerTitle: () => <Text style={headingStyle}>{title}</Text>,
  };
};

const stackSendCoinheaderOptions = (title, navigation) => {
  return {
    headerStyle: {
      elevation: 0,
      shadowOpacity: 0,
      backgroundColor: "transparent", 
    },
    headerLeft: () => (
      <TouchableOpacity style={{left:10}} onPress={() => navigation.goBack(null)}>
        <ArrowBack />
      </TouchableOpacity>
    ),
    headerRight: () => (
      <TouchableOpacity onPress={openCameraWithPermission}>
        <ScanCode />
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
  backgroundColor: "linear-gradient(20.23deg, rgba(53, 96, 104, 1.0) -4.86%, rgba(29, 39, 49, 0.8) 110.32%)",
  //borderWidth: 0,
  borderColor: "#62737E", 
  // borderTopColor: 'red',
  // borderTopWidth: 1,
};

const headingStyle = {
  fontSize: Typography.FONT_SIZE_28,
  fontWeight: Typography.FONT_WEIGHT_BOLD,
  color: Colors.WHITE, 
};

export default Navigator;
