import React, { useState, useEffect } from "react";
import Style from "./Style";
import { View, Text, ScrollView, Modal} from "react-native";
import { Custom, Typography, Colors } from "styles";

// components
import CustomInput from "../../components/CustomInput";
import CustomSelect from "../../components/CustomSelect";
import CustomButton from "../../components/CustomButton";
import {Account, AccountData, BlockData, BlockMessage, AccountPaymentHandlerOptions, SignedMessage, Transaction} from 'thenewboston/dist/index.js'' 
import { IAppState } from '../../store/store';
import { useSelector, useDispatch} from 'react-redux';
import { PasswordAction } from '../../actions/loginActions';
import { BlurView, VibrancyView } from "@react-native-community/blur";
import LinearGradient from 'react-native-linear-gradient';
import InfoModalWidget from "../../components/InfoModalWidgets/InfoModalview";  

const LoginPasswordScreen = ({ navigation, route}) => {

  const dispatch = useDispatch(); 
  const lPassword = useSelector((state: IAppState) => state.loginState.password);  
 
  const [password, setPassword] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const [isValid, setValid] = useState(false);
  const {accounts, validator_accounts, bank_url, nickname} = route.params;
  const [lnickName, setlNickName] = useState(nickname);
  const [dlgMessage, setDlgMessage] = useState("");
  const [dlgVisible, setDlgVisible] = useState(false);
  const login = () => {
    
    if((lPassword == "" || lPassword == password) && password != ""){
      dispatch(PasswordAction(password));
      navigation.navigate('tab', {
        nickname: lnickName,
        signingKeyHex: "",
        accountNumber: "", 
        signingKey: password,
        accounts: accounts,
        validator_accounts: validator_accounts,
        bank_url: bank_url,
        login: 'login',
      });
    }
    else{
      setDlgMessage("Your password is not correct.")
      setDlgVisible(true);
    }
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
            Please enter your password to login
          </Text>

          {/* <CustomInput
            name="nickname"
            value={lnickName}
            staticLabel={false}
            labelText="nickName" 
            onChangeText={(value: string) => {
              setlNickName(value);
            }}
            autoCapitalize="none"
          /> */}

          <CustomInput
            name="password"
            value={password}
            staticLabel={false}
            isPassword={true}
            customStyles = {Style.customStyle}
            numberOfLines = {3} 
            labelText="Your password"
            onChangeText={(value: string) => {
              setPassword(value);
            }}
            autoCapitalize="none"  
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={dlgVisible}  
        onRequestClose={() => {
          // this.closeButtonFunction()
        }}
        
      >
         <BlurView
          style={Style.absolute}
          blurType="dark"
          blurAmount={5}
          reducedTransparencyFallbackColor="white"
        />
             
         <LinearGradient start={{x: 0, y: 1}} end={{x: 0, y: 0}} colors={['rgba(29, 39, 49, 0.9)', 'rgba(53, 96, 104, 0.9)']} style={Style.doInofContainer}>
            <InfoModalWidget 
                title={""}
                message={dlgMessage} 
                button={"Ok"} 
                handleOk={() => {
                setDlgVisible(false);
            }} /> 
        </LinearGradient>  
      </Modal>
    </View>
  );
};

export default LoginPasswordScreen;
