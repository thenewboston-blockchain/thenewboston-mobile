import React, { useEffect, useState } from "react";
import { Provider } from 'react-redux'
import Navigator from "./Navigator";
import { PersistGate } from 'redux-persist/integration/react';
import EncryptedStorage from 'react-native-encrypted-storage'; 
import configureStore from './src/store/store'; 
import { persistStore, persistReducer } from 'redux-persist';  
const store = configureStore(); 
const persistor = persistStore(store);   


const App = (props) => {   
  const [connect, setConnect] = useState(false);
  const getConnectFlag = async () =>{
    try {   
      const connectInfo = await EncryptedStorage.getItem("connect");   
      if (connectInfo == "1") { 
        setConnect(true);   
      }  
      
    }
    catch (error) {
       console.log(error);
    } 
  }

  useEffect(() => {   
    getConnectFlag();    
  }, []);
   
  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Navigator isLogin={!connect}/>
      </PersistGate>
    </Provider>
  ) 
}; 

export default App;