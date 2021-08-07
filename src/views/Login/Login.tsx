import { Colors, Custom, Typography } from "styles";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, Modal} from "react-native";
import FingerprintScanner from "react-native-fingerprint-scanner"
import { BlurView, VibrancyView } from "@react-native-community/blur";
import LinearGradient from 'react-native-linear-gradient'; 
import { TouchableOpacity } from "react-native-gesture-handler";  
import {Account, Bank} from 'thenewboston' 
import { useSelector, useDispatch} from 'react-redux';
import { IAppState } from 'store/store'; 
import Style from "./Style";

import CustomButton from "components/CustomButton";
import InfoModalWidget from "components/InfoModalWidgets/InfoModalview";    
import FingerPrint from "assets/svg/FingerPrint.svg";

const ACCOUNT_MAX = 100; 

interface login {
  navigation: any,
  route: any
}

const LoginScreen = ({ navigation, route }:login) => {
  const [loading, setLoading] = useState(false);
  const [isValid, setValid] = useState(false);
  const [fingerPrint, setFingerPrint] = useState(false)
  const [fingerAuth, setFingerAuth] = useState(false) 
  const [dlgMessage, setDlgMessage] = useState("");
  const [dlgVisible, setDlgVisible] = useState(false); 
  const [bankURL, setBankURL] = useState(route.params.bank_url)
  const [nickName, setNickName] = useState(route.params.nickName)
  const [accounts, setAccounts] = useState(route.params.accounts)
  const [validAccounts, setValidAccounts] = useState(route.params.validator_accounts)
  const lNickname = useSelector((state: IAppState) => state.loginState.nickName);
 
  const goToPasswordLogin = () => { 
    navigation.navigate("loginPassword", { 
      accounts: accounts,
      validator_accounts: validAccounts,
      bank_url: bankURL, 
      nickname: nickName,
    });
  };

  const getAccounts = async ()  => {
    const bank = new Bank(bankURL);  
    const accounts = await bank.getAccounts();      
    const validator_bank = new Bank(bankURL);    
    const allAccounts = await validator_bank.getAccounts({ limit: 1, offset: 0 }); 
    setAccounts(allAccounts)
    var validator_accounts = [];
    let account_size = allAccounts.count; 
    for(let i = 0; i < account_size; i += ACCOUNT_MAX){
      const part_accounts = await validator_bank.getAccounts({ limit: ACCOUNT_MAX, offset: i });  
      validator_accounts = [...validator_accounts, ...part_accounts.results]; 
    } 
    setValidAccounts(validator_accounts);
    if(nickName == "" || nickName == null){
      setNickName(lNickname)
    }
    onLoginScreen(); 
    
  }

  useEffect(() => {  
      
    if(accounts == null){
      getAccounts(); 
    } 
    else{
      onLoginScreen();
    }
    
  }, []);
 
  const onLoginScreen = () => {
    FingerprintScanner
    .authenticate({ description: 'Scan your fingerprint on the device scanner to continue' })
    .then(() => {
      setFingerAuth(true) 
      onFingerprint();
    })
    .catch((error) => {  
      setFingerAuth(false) 
      onFingerprint();
      console.log(error.message)
    }); 
    FingerprintScanner
    .isSensorAvailable()
    .then(biometryType => setFingerPrint(true))
    .catch(error=> { 
      setFingerAuth(false) 
      onFingerprint();
      console.log(error.message);
    });
  }

  const onFingerprint = () =>{
        
     if(fingerPrint == false){
      navigation.navigate("loginPassword", { 
        accounts: accounts,
        validator_accounts: validAccounts,
        bank_url: bankURL, 
        nickname: nickName,
      });
     }
     else{
       if(fingerAuth == false){
         setDlgMessage("Failed to fingerprint auth!");
         setDlgVisible(true);
       }
       else{
        navigation.navigate('tab', { 
          signingKeyHex: "",
          accountNumber: "", 
          accounts: accounts,
          validator_accounts: validAccounts,
          bank_url: bankURL, 
          nickname: nickName,
          login: 'login',
          pScreen:'password'
        });
       }
     }
  }

  const handleSubmit = () => { 
    navigation.navigate("createAccount", { 
      accounts: accounts,
      validator_accounts: validAccounts,
      bank_url: bankURL, 
      nickname: nickName,  
      pScreen: 'login'
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
            Please scan your fingerprint to login
          </Text>

          <View style={[Custom.m40, Custom.mb40]}>
            <TouchableOpacity
              onPress={onFingerprint}
            >
              <FingerPrint />
            </TouchableOpacity>
          </View>

          <CustomButton
            title="Login with password"
            onPress={goToPasswordLogin}
            disabled={!isValid}
            buttonColor={Colors.WHITE}
            loading={loading}
            customStyle={{ marginTop: "30%" }}
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
        animationType="fade"
        transparent={true}
        visible={dlgVisible}  
        onRequestClose={() => {
           
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

export default LoginScreen;
