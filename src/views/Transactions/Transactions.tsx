import { Colors, Custom, Typography } from "styles";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  ActivityIndicator
} from "react-native";
import {Account, Bank, Transaction} from 'thenewboston/dist/index.js';
import Style from "./Style";
import { useSelector, useDispatch} from 'react-redux';
import GestureRecognizer from 'react-native-swipe-gestures';
import RNConfigReader from 'rn-config-reader';

import { IAppState } from 'store/store'; 
import CustomButton from "components/CustomButton";  
import TransactionItem from "components/TransactionItem/TransactionItem"; 

const TransactionsScreen = ({route, navigation}) => { 
  const {nickname, bank_url, login} = route.params; 
  const [transactions, setTransactions] = useState(null);    
  const lAccounts = useSelector((state: IAppState) => state.accountState.account);
  const [myAccounts, setMyAccounts] = useState(lAccounts == null ? [] : lAccounts); 
  const [spinVisible, setSpinVisible] = useState(true);

  const validURL = (url) =>{
    const PROTOCOL = "HTTP";
    const PORT = "80";
    if(url.substr("http") > 0 || url.substr("HTTP") > 0){
      return url;
    }
    if(url == ""){
      url = RNConfigReader.SERVER_IP;
    }
    return PROTOCOL + '://' + url + ':' + PORT;
  }

  const gettingTransactions = async() => {  
    console.log(global.actNumber)
    const bank = new Bank(validURL(bank_url));
    var trans = [];
    setSpinVisible(true);
    const Atrans = await bank.getTransactions({ limit: 1, offset: 0 }); 
    let trans_size = 100;//Atrans.count; 
    for(let i = 0; i < trans_size; i+=100){
      const part_trans = await bank.getTransactions({ limit: 100, offset: i });   
      const actTrans = part_trans.results.filter(item => item.sender === global.actNumber);
      trans = [...trans, ...actTrans]; 
    }  
    
    setTransactions(trans);  
    setSpinVisible(false);  
  } 

  useEffect(() => { 
     
    gettingTransactions()
    
  }, []);

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 50
  };

  const onSwipeRight = (state) =>{
    navigation.navigate('overview')
  }

  const onSwipeLeft = (state) =>{ 
    navigation.navigate('friends')
  }

  return ( 
     
    <GestureRecognizer 
        onSwipeLeft={(state) => onSwipeLeft(state)}
        onSwipeRight={(state) => onSwipeRight(state)} 
        config={config} 
        style={Style.container}
        >  
      <View style={{ alignItems: "center" }}>
        <Text style={[Custom.mb10, { color: "#62737E" }]}>{nickname}</Text>
        <Text style={Style.heading}>Transactions</Text>  
      </View> 
      {spinVisible && <ActivityIndicator size="large" color="white" style={{justifyContent:'center', marginTop:'35%'}}></ActivityIndicator>}
      {!spinVisible && <FlatList 
        data={transactions != null && transactions != null ? transactions : null}
        renderItem={({ item, index }) => (
          <TransactionItem
            transaction={item} 
            myAccounts={myAccounts}
            showDate={
              index == 0 || item.id != transactions[index - 1].id
                ? true
                : false
            }
          />
        )}
        keyExtractor={(item, index) => "key" + index}
      />}
      
     <CustomButton
          title=""
          onPress={()=>{}} 
          loading={false}
          customStyle={Style.bottomArea}
      />
    </GestureRecognizer>
  );
};

export default TransactionsScreen;
 