import React, { useState, useEffect } from "react";
import Style from "./Style";
import { View, Text, ScrollView } from "react-native";
import { Custom, Typography, Colors } from "styles";

// components
import CustomInput from "../../components/CustomInput";
import CustomSelect from "../../components/CustomSelect";
import CustomButton from "../../components/CustomButton";
import {Account, AccountData, BlockData, BlockMessage, AccountPaymentHandlerOptions, SignedMessage, Transaction} from 'thenewboston' 

const LoginPasswordScreen = ({ navigation, route}) => {
  const [password, setPassword] = useState("23ba5b604ac5291510d9aa3856666c75bb88fb68a10329930faa1639c59c8cd2"); 
  const [loading, setLoading] = useState(false); 
  const [isValid, setValid] = useState(false);
  const {accounts, validator_accounts, bank_url, nickname} = route.params;
  const [lnickName, setlNickName] = useState(nickname);

  const login = () => {
    
    const account = new Account(password);  
    const signingKey = account.signingKey
    const accountNumberHex = account.accountNumberHex
    let signedMessage = account.createSignedMessage({ name: lnickName }); 
    console.log('signingKeyHex = ' + signedMessage.signature)
    console.log('accountNumber = ' + signedMessage.node_identifier) 
    console.log('signedMessage = ' + signingKey)  
    navigation.navigate('tab', {
      nickname: lnickName,
      signingKeyHex: signedMessage.signature,
      accountNumber: signedMessage.node_identifier, 
      signingKey: password,
      accounts: accounts,
      validator_accounts: validator_accounts,
      bank_url: bank_url,
      login: 'login',
    });
  };

  const handleSubmit = () => {  
    navigation.navigate('createAccount', { 
      accounts: accounts,
      validator_accounts: validator_accounts,
      bank_url: bank_url,
      login: 'create',
    }); 
  };

  return (
    <View style={Style.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={Style.formView}>
          <Text style={[Typography.FONT_REGULAR, Style.heading]}>Login</Text>
          <Text
            style={[
              Typography.FONT_REGULAR,
              Custom.mt20,
              Custom.mb40,
              { color: "#63737E" },
            ]}
          >
            Please enter your nickname and password to login
          </Text>

          <CustomInput
            name="nickname"
            value={lnickName}
            staticLabel={false}
            labelText="lnickName"
            onChangeText={(value: string) => {
              setlNickName(value);
            }}
            autoCapitalize="none"
          />

          <CustomInput
            name="password"
            value={password}
            staticLabel={false}
            customStyles = {Style.customStyle}
            numberOfLines = {3}
            multiline = {true}
            labelText="password"
            onChangeText={(value: string) => {
              setPassword(value);
            }}
            autoCapitalize="none"
            isPassword={true}
          />

          <CustomButton
            title="Login"
            onPress={login}
            disabled={!isValid}
            buttonColor={Colors.WHITE}
            loading={loading}
          />

          <CustomButton
            title="Create account"
            onPress={handleSubmit}
            disabled={!isValid}
            buttonColor={Colors.WHITE}
            loading={loading}
            customStyle={{ backgroundColor: "transparent", marginTop: 0 }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default LoginPasswordScreen;
