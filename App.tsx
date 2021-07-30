import * as React from "react";
import { View, Text} from "react-native";
import { Provider } from 'react-redux'
import Navigator from "./Navigator";
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './src/store/store'; 
import { persistStore, persistReducer } from 'redux-persist';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from "react-navigation-stack";
//import * as Linking from 'expo-linking';
const store = configureStore();
//const prefix = Linking.createURL('/');
const persistor = persistStore(store); 
import Home from "./Home";

// const App = (props) => {
//   const prefix = 'myapp://'
  
//   return (
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//       <Navigator linking={linking} fallback={<Text>Loading...</Text>}/>
//       </PersistGate>
//     </Provider>
//   ) 
// };

const MainApp = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerTitle: 'Home'
    },
    path: 'home'
  }, 
})

const AppContainer = createAppContainer(MainApp)

export default () => {
  const prefix = 'myapp://'
  return <AppContainer uriPrefix={prefix} />
}