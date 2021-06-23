import { Colors, Custom, Typography } from "styles";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import {Account, Bank} from 'thenewboston' 
import CustomButton from "../../components/CustomButton";
// components
import CustomInput from "../../components/CustomInput";
import CustomSelect from "../../components/CustomSelect";
import Style from "./Style";
import { IAppState } from '../../store/store';
import {connect, useSelector, useDispatch} from 'react-redux';

import { ProtocolAction, IpAddressAction, PortAction, NickNameAction } from '../../actions/loginActions'

interface connects {
  props: any;
  navigation: any; // TODO use navigation props type
}
 

const connectScreen = (props, {navigation: {navigate}}: connects) => {
  // console.log('props = ', props)
  const ipAddress = useSelector((state: IAppState) => state.loginState.ipAddress);
  const port = useSelector((state: IAppState) => state.loginState.port);
  const nickname = useSelector((state: IAppState) => state.loginState.nickName); 
  const protocol = useSelector((state: IAppState) => state.loginState.protocol);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isValid, setValid] = useState(false);

  

  const handleSubmit = async()=>{
    console.log(props);
    let bank_url = protocol + '://' + ipAddress
    const bank = new Bank(bank_url);
    try{
      const accounts = await bank.getAccounts();
     
      navigate('login', {
        accounts: accounts,
        bank_url: bank_url
      }); 
      //console.log(accounts)
    } catch(err){
      console.log(err)
    }
     
  }

  return (
    <View style={Style.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={Style.formView}>
          <Text style={[Typography.FONT_REGULAR, Style.heading]}>
            Connect to the network
          </Text>
          <Text
            style={[
              Typography.FONT_REGULAR,
              Custom.mt20,
              Custom.mb40,
              { color: "#63737E" },
            ]}
          >
            Please enter the address of a bank
          </Text>

          <CustomSelect
            options={protocol}
            selected={protocol}
            required={true}
            updateSelected={(selected: any) => dispatch(ProtocolAction(selected))}
            customStyle={[Custom.mb20]}
            placeholder={{ label: "Protocol" }}
          />

          <CustomInput
            name="ipAddress"
            value={ipAddress}
            staticLabel={false}
            labelText="ip address"                      
            onChangeText={(value: string) => { 
              dispatch(IpAddressAction(value))
            }}
            autoCapitalize="none"
          />

          <CustomInput
            name="port"
            value={port}
            staticLabel={false}
            labelText="port"
            onChangeText={(value: string) => { 
              dispatch(PortAction(value))
            }}
            autoCapitalize="none"
          />

          <CustomInput
            name="nickname"
            value={nickname}
            staticLabel={false}
            labelText="nickname"
            onChangeText={(value: string) => { 
              dispatch(NickNameAction(value))
            }}
            autoCapitalize="none"
          />

          <CustomButton
            title="Connect To The Network"
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

export default connectScreen
 