import React, { useState, useEffect } from "react";
import Style from "./Style";
import { View, Text, ScrollView, Modal} from "react-native";
import { Custom, Typography, Colors } from "styles";

// components
import CustomInput from "../../components/CustomInput";
import CustomSelect from "../../components/CustomSelect";
import CustomButton from "../../components/CustomButton";
import {Account, AccountData, BlockData, BlockMessage, AccountPaymentHandlerOptions, SignedMessage, Transaction} from 'thenewboston/dist/index.js';
import { IAppState } from '../../store/store';
import { useSelector, useDispatch} from 'react-redux';
import { PasswordAction } from '../../actions/loginActions';
import { BlurView, VibrancyView } from "@react-native-community/blur";
import LinearGradient from 'react-native-linear-gradient';
import InfoModalWidget from "../../components/InfoModalWidgets/InfoModalview";  
import CryptoJS from "crypto-js"
import EncryptedStorage from 'react-native-encrypted-storage';

const LoginPasswordScreen = ({ navigation, route}) => {

  const dispatch = useDispatch(); 
  //const lPassword = useSelector((state: IAppState) => state.loginState.password);  
  const [seed, setSeed] = useState("");
  const [password, setPassword] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const [isValid, setValid] = useState(false);
  const {accounts, validator_accounts, bank_url, nickname} = route.params;
  const [lnickName, setlNickName] = useState(nickname);
  const [dlgMessage, setDlgMessage] = useState("");
  const [dlgVisible, setDlgVisible] = useState(false);

  useEffect(() => {  
    getSeedESP() 
  }, []);

  async function setSeedESP(seed) {
    try {
      await EncryptedStorage.setItem(
          "seed",
          seed
      ); 
    } catch (error) {
       console.log(error);
    }
  }

  async function getSeedESP() {
    try {   
      const session = await EncryptedStorage.getItem("seed"); 
      if (session !== undefined) {
           setSeed(session);
           console.log(session);
      }
    } catch (error) {
       console.log(error);
    }
  }

  const login = async ()  => { 
    if(password == ""){
      setDlgMessage("Input your Password")
      setDlgVisible(true);
    } 
    else if (seed == "" || seed == null){
      dispatch(PasswordAction(password)); 
      navigation.navigate('createAccount', { 
        accounts: accounts,
        validator_accounts: validator_accounts,
        bank_url: bank_url,
        login: 'create',
        pScreen:'password'
      }); 
    }
    else if(seed == password){
      dispatch(PasswordAction(password)); 

      setSeedESP(password);
      navigation.navigate('tab', {
        nickname: lnickName,
        signingKeyHex: "",
        accountNumber: "", 
        signingKey: password,
        accounts: accounts,
        validator_accounts: validator_accounts,
        bank_url: bank_url,
        login: 'login',
        pScreen:'password'
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
      pScreen:'password'
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
