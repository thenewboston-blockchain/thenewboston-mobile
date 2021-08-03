import { Colors, Custom, Typography} from "styles";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch} from 'react-redux';
import { BlurView, VibrancyView } from "@react-native-community/blur"; 
import { ScrollView, Text, View, Modal, NativeModules} from "react-native"; 
import LinearGradient from 'react-native-linear-gradient'; 
import EncryptedStorage from 'react-native-encrypted-storage';   
import nacl from 'tweetnacl'
import naclutil from 'tweetnacl-util' 

import Style from "./Style";
import CreateAccountWidget from "components/CreateAccountWIdget/CreateAccountWidget"; 
import InfoModalWidget from "components/InfoModalWidgets/InfoModalview";   
import { AccountAction } from 'actions/accountActions' 
import { IAppState } from 'store/store'; 

 
interface createAccount {
  navigation: any; // TODO use navigation props type
  route: any;
} 

const CreateAccountScreen = ({ navigation, route}: createAccount) => { 
  const {accounts, validator_accounts, bank_url, login, pScreen} = route.params;  
  const dispatch = useDispatch();     
  const lAccounts = useSelector((state: IAppState) => state.accountState.account); 
  const [myAccounts, setMyAccounts] = useState(lAccounts == null ? [] : lAccounts);   
  const [prevScreen, setPrevScreen] = useState(pScreen); 
  const [dlgMessage, setDlgMessage] = useState("");
  const [dlgVisible, setDlgVisible] = useState(false);  
  const [seed, setSeed] = useState("");  
  const [privateKey, setPrivateKey] = useState(null);  
  const [publicKey, setPublicKey] = useState(null);  
 
  type AccountKeys = [Uint8Array, Uint8Array]; 

  useEffect(() => {  
    getSeedESP();

  }, []);      
   
  function hexToUint8Array(arr: string): Uint8Array {
    return new Uint8Array(Buffer.from(arr, "hex"));
  } 

  function naclEncrypting(plain_text){
    const one_time_code = nacl.randomBytes(24);    
    const cipher_text = nacl.box(
      naclutil.decodeUTF8(plain_text),
        one_time_code,
        hexToUint8Array(publicKey),
        hexToUint8Array(privateKey)
        
    ); 
     
    const message_in_transit = {cipher_text, one_time_code}; 
    return message_in_transit;
  }; 

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
    } catch (error) {
       console.log(error);
    }
  } 
  
  return (
    <View style={Style.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CreateAccountWidget title={"Create or Add Account"}
            navigation={navigation}
            route = {route} 
            addAccount={(account, addMode) => {   
              var bExist = false;  
              var bExistName = false; 
              myAccounts.map((item)=>{
                if(item.account_number == account.account_number){
                  bExist = true;
                }
                if(item.name == account.name){
                  bExistName = true;
                }
              })
              if(bExist != false){ 
                setDlgMessage("This signning key exists in your accounts");
                setDlgVisible(true);
              }
              else if(bExistName != false){ 
                setDlgMessage("This account name exists in your accounts");
                setDlgVisible(true);
              }
              else{   
                 
                if(publicKey == null || privateKey == null){
                  account.isEncrypt = false;
                }
                else{  
                  const encryptedData = naclEncrypting(account.sign_key)  
                  account.sign_key = encryptedData.cipher_text;
                  account.one_time_code = encryptedData.one_time_code;
                  account.isEncrypt = true;
                 
                }
                 
                myAccounts.push(account);     
                dispatch(AccountAction(myAccounts));  
                navigation.navigate("loginPassword", { 
                  accounts: accounts,
                  validator_accounts: validator_accounts,
                  bank_url: bank_url, 
                  nickname: route.params.nickname,
                  paramSeed: seed,
                });  
                
              }
              
            }} 
            validator_accounts = {validator_accounts}
            handleCancel={() => { 
              if(prevScreen == 'login' || prevScreen == 'password'){ 
                navigation.goBack(null);  
              } 
            }}
            />
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

export default CreateAccountScreen;
