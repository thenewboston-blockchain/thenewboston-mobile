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
import { IAppState } from '../../store/store';
import { useSelector, useDispatch} from 'react-redux';
import CustomButton from "../../components/CustomButton";  
import TransactionItem from "../../components/TransactionItem/TransactionItem"; 

const TransactionsScreen = ({route}) => {
  const {nickname, signingKeyHex, accountNumber, signingKey, bank_url, login} = route.params; 
  const [transactions, setTransactions] = useState(null);    
  const lAccounts = useSelector((state: IAppState) => state.accountState.account);
  const [myAccounts, setMyAccounts] = useState(lAccounts == null ? [] : lAccounts); 
  const [spinVisible, setSpinVisible] = useState(true);

  async function gettingTransactions() {
    const bank = new Bank(bank_url);
    var trans = [];
    setSpinVisible(true);
    const Atrans = await bank.getTransactions({ limit: 1, offset: 0 }); 
    let trans_size = 100;//Atrans.count; 
    for(let i = 0; i < trans_size; i+=100){
      const part_trans = await bank.getTransactions({ limit: 100, offset: i });  
      trans = [...trans, ...part_trans.results]; 
    } 
    console.log(trans.length)
    setTransactions(trans);  
    setSpinVisible(false); 
  } 

  useEffect(() => { 
     
    gettingTransactions()
    
  }, []);

  return (
    <View style={Style.container}>
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
    </View>
  );
};

export default TransactionsScreen;
 