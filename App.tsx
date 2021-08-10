import React, { useEffect, useState } from "react";
import { Provider } from 'react-redux'
import Navigator from "./Navigator";
import { PersistGate } from 'redux-persist/integration/react'; 
import configureStore from './src/store/store'; 
import { persistStore, persistReducer } from 'redux-persist';  
const store = configureStore(); 
const persistor = persistStore(store);   


const App = (props) => {    
  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Navigator isLogin={true}/>
      </PersistGate>
    </Provider>
  ) 
}; 

export default App;