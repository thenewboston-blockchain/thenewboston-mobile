import { Colors, Custom, Typography } from "styles";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, Modal} from "react-native";
import FingerprintScanner from "react-native-fingerprint-scanner"
import { BlurView, VibrancyView } from "@react-native-community/blur";
import LinearGradient from 'react-native-linear-gradient'; 
import CustomButton from "../../components/CustomButton";
import InfoModalWidget from "../../components/InfoModalWidgets/InfoModalview";  
// svgs
import FingerPrint from "../../assets/svg/FingerPrint.svg";
import Style from "./Style";
import { TouchableOpacity } from "react-native-gesture-handler";

interface login {
  navigation: any,
  route: any
}

const LoginScreen = ({ navigation, route }:login) => {
  const [loading, setLoading] = useState(false);
  const [isValid, setValid] = useState(false);
  const [fingerPrint, setFingerPrint] = useState(false)
  const [fingerAuth, setFingerAuth] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [dlgMessage, setDlgMessage] = useState("");
  const [dlgVisible, setDlgVisible] = useState(false); 
 
  const goToPasswordLogin = () => { 
    navigation.navigate("loginPassword", { 
      accounts: route.params.accounts,
      validator_accounts: route.params.validator_accounts,
      bank_url: route.params.bank_url, 
      nickname: route.params.nickname,
    });
  };

  useEffect(() => { 
    FingerprintScanner
    .authenticate({ description: 'Scan your fingerprint on the device scanner to continue' })
    .then(() => {
      setFingerAuth(true)
    })
    .catch((error) => { 
      setErrorMessage(error.message)
    });
     
    FingerprintScanner
    .isSensorAvailable()
    .then(biometryType => setFingerPrint(true))
    .catch(error=> setErrorMessage(error.message));
    
  }, []);
 

  const onFingerprint = () =>{
        
     if(fingerPrint == false){
      navigation.navigate("loginPassword", { 
        accounts: route.params.accounts,
        validator_accounts: route.params.validator_accounts,
        bank_url: route.params.bank_url, 
        nickname: route.params.nickname,
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
          accounts: route.params.accounts,
          validator_accounts: route.params.validator_accounts,
          bank_url: route.params.bank_url, 
          nickname: route.params.nickname,
          login: 'login',
          pScreen:'password'
        });
       }
     }
  }

  const handleSubmit = () => { 
    navigation.navigate("createAccount", { 
      accounts: route.params.accounts,
      validator_accounts: route.params.validator_accounts,
      bank_url: route.params.bank_url, 
      nickname: route.params.nickname,  
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

export default LoginScreen;
