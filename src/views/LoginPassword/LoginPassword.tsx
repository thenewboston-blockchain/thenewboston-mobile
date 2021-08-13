import React, { useState, useEffect } from "react";
import Style from "./Style";
import { View, Text, ScrollView, Modal, NativeModules} from "react-native";
import { useSelector, useDispatch} from 'react-redux'; 
import { Custom, Typography, Colors } from "styles"; 
import EncryptedStorage from 'react-native-encrypted-storage';  
import { BlurView, VibrancyView } from "@react-native-community/blur";
import LinearGradient from 'react-native-linear-gradient';
import nacl from 'tweetnacl' 

import { IAppState } from 'store/store'; 
import { PasswordAction} from 'actions/loginActions'; 
import CustomInput from "components/CustomInput"; 
import CustomButton from "components/CustomButton";  
import InfoModalWidget from "components/InfoModalWidgets/InfoModalview";    

var Aes = NativeModules.Aes
type AccountKeys = [Uint8Array, Uint8Array]; 
const LoginPasswordScreen = ({ navigation, route}) => {

  const dispatch = useDispatch();   
  const {accounts, validator_accounts, bank_url, nickname, paramSeed} = route.params; 
  const [seed, setSeed] = useState(paramSeed == null ? "" : paramSeed);
  const [password, setPassword] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const [loadingPwd, setLoadingPwd] = useState(false); 
  const [isValid, setValid] = useState(false);
  const [lnickName, setlNickName] = useState(nickname);
  const [dlgMessage, setDlgMessage] = useState("");
  const [dlgVisible, setDlgVisible] = useState(false); 
  const lSigningKey = useSelector((state: IAppState) => state.loginState.signing_key);
  const lAccountNumber = useSelector((state: IAppState) => state.loginState.account_number); 
  const [mySigningKey, setMySigningKey] = useState(lSigningKey == null ? "" : lSigningKey);  
  const generateKey = (password: string, salt: string, cost: number, length: number) => Aes.pbkdf2(password, salt, cost, length)
  const [privateKey, setPrivateKey] = useState(null);  
  const [publicKey, setPublicKey] = useState(null);  
   
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

  function generateFromKey(signingKey: string): AccountKeys {  
    const { publicKey: accountNumber, secretKey: signingKey_ } = nacl.sign.keyPair.fromSeed(hexToUint8Array(signingKey)); 
    return [accountNumber, signingKey_];
  }

  function randomKey(): AccountKeys {
    const keyPair = nacl.box.keyPair();
    const { publicKey, secretKey: signingKey } = keyPair; 
    return [publicKey, signingKey];
  }

  function uint8arrayToHex(array: Uint8Array): string {
    return Buffer.from(array).toString("hex");
  } 
  
  function fromBothKeys(signingKey: string, accountNumber: string): AccountKeys {
    const accountNumberArray = hexToUint8Array(accountNumber);
    const signingKeyArray = new Uint8Array(64);
    signingKeyArray.set(hexToUint8Array(signingKey));
    signingKeyArray.set(accountNumberArray, 32);
    return [accountNumberArray, signingKeyArray];
  }
  
  async function setKeyPair(exportPubKey, exportPriKey) {
    try {
      await EncryptedStorage.setItem(
          "keyPair",
          JSON.stringify({ 
            privateKey: exportPriKey,
            publicKey : exportPubKey, 
        })
      ); 
    } catch (error) {
       console.log(error);
    }
  } 

  function hexToUint8Array(arr: string): Uint8Array {
    return new Uint8Array(Buffer.from(arr, "hex"));
  } 

  async function getSeedESP() {
    try {   
      const session = await EncryptedStorage.getItem("seed");   
      if (session !== undefined) { 
           setSeed(session);    
      }   
      
      const keyPair = await EncryptedStorage.getItem("keyPair");  
      if (keyPair !== null) {   
        setPrivateKey(JSON.parse(keyPair).privateKey);   
        setPublicKey(JSON.parse(keyPair).publicKey);    
      }  
       
    }
    catch (error) {
       console.log(error);
    } 
  }

  const login = async ()  => {  
    var lSeed = seed;
    if(lSeed == null || lSeed == undefined){
      lSeed = route.params.paramSeed;
      setSeed(lSeed); 
    } 
    if(password == ""){
      setDlgMessage("Input your Password")
      setDlgVisible(true);
    } 
    else if ((lSeed == "" || lSeed == null) && (mySigningKey == "" && (global.hasPassword == false || global.hasPassword == undefined))){
      dispatch(PasswordAction(password)); 
      setSeedESP(password);
      navigation.navigate('createAccount', { 
        accounts: accounts,
        validator_accounts: validator_accounts,
        bank_url: bank_url,
        login: 'create',
        pScreen:'password', 
      }); 
    }
    else if(lSeed == password || (lSeed == null && (mySigningKey != ""))){ 
      setLoading(true); 
      generateKey(password, 'SALT', 1000, 256).then((key: any) => {  
        dispatch(PasswordAction(password));  
        setSeedESP(password);  
        setLoading(false); 
        const genKeyPair = randomKey()
        const exportPubKey = (uint8arrayToHex(genKeyPair[0]));
        const exportPriKey = (uint8arrayToHex(genKeyPair[1]));   
        setPrivateKey(exportPriKey);   
        setPublicKey(exportPubKey);  
        setKeyPair(exportPubKey, exportPriKey);  
        navigation.navigate('tab', {
          nickname: lnickName,
          signingKeyHex: "",
          accountNumber: "", 
          signingKey: password,
          accounts: accounts,
          validator_accounts: validator_accounts,
          bank_url: bank_url,
          login: 'login',
          pScreen:'password',
          genKey: key,
        });
      });
      
    }
    else{   
      setDlgMessage("Your password is not correct.")
      setDlgVisible(true);
    }
  };

  const handleSubmit = () => {  
    setLoadingPwd(true);
    navigation.navigate('createAccount', { 
      accounts: accounts,
      validator_accounts: validator_accounts,
      bank_url: bank_url,
      login: 'create',
      pScreen:'password'
    }); 
    setLoadingPwd(false); 
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
            loading={loadingPwd}
            customStyle={{ backgroundColor: "transparent", marginTop: 0 }}
          />
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
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

export default LoginPasswordScreen;
