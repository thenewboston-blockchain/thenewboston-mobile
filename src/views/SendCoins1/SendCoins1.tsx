import { Colors, Custom, Typography } from "styles";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

import CustomButton from "../../components/CustomButton";
// components
import CustomInput from "../../components/CustomInput";
import CustomSelect from "../../components/CustomSelect";
import Style from "./Style";
//redux
import { IAppState } from '../../store/store';
import { useSelector, useDispatch} from 'react-redux'; 



const SendCoins1Screen = (props) => {
  const dispatch = useDispatch(); 
  const lAccounts = useSelector((state: IAppState) => state.accountState.account);
  const lFriends = useSelector((state: IAppState) => state.friendState.friend);
  const [myAccounts, setMyAccounts] = useState(lAccounts == null ? [] : lAccounts); 
  const [friends, setFriends] = useState(lFriends == null ? [] : lFriends); 
  const {validator_accounts, bank_url} = props.route.params; 
  
  const [memo, setMemo] = useState(""); 

  const [loading, setLoading] = useState(false);
  const [isValid, setValid] = useState(false);

  const _from = myAccounts.map(item => ( 
    {  
      label: item.name,
      value: item.account_number,
      balance: item.balance
    }
  ));
  const [froms, setFroms] = useState(_from);  

  const _tos = friends.map(item => ( 
    {  
      label: item.name,
      value: item.account_number,
      balance: item.balance
    }
  ));
  const [tos, setTos] = useState(_tos);  

  const [from, setFrom] = useState("Select"); 
  const [to, setTo] = useState("To"); 

  useEffect(() => { 
     
    
  }, []);

  const handleSubmit = () => {
    let selectFrom;
    froms.map(item =>{
      if(item.value == from){
        selectFrom = item
      }
    })
    let selectTo;
    tos.map(item =>{
      if(item.value == to){
        selectTo = item
      }
    })
    if(selectFrom != null && selectTo != null){
      props.navigation.navigate("sendcoins2",{
        from: selectFrom,
        to: selectTo,
        memo: memo,
        bank_url: bank_url,
      });
    }
    
  };

  return (
    <View style={Style.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={Style.formView}>
          <CustomSelect
            options={froms}
            selected={from}
            required={true}
            updateSelected={(selected: any) => setFrom(selected)}
            customStyle={[Custom.mb20]}
            placeholder={{ label: "Select" }}
          />

          <CustomSelect
            options={tos}
            selected={to}
            required={true}
            updateSelected={(selected: any) => setTo(selected)}
            customStyle={[Custom.mb20]}
            placeholder={{ label: "To" }}
          />

          <CustomInput
            name="memo"
            value={memo}
            staticLabel={false}
            labelText="memo"
            onChangeText={(value: string) => {
              setMemo(value);
            }}
            autoCapitalize="none"
          />

          <CustomButton
            title="Next"
            onPress={handleSubmit}
            disabled={!isValid}
            buttonColor={Colors.WHITE}
            loading={loading}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default SendCoins1Screen;
