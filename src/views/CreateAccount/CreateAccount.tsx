import { Colors, Custom, Typography} from "styles";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, Modal, NativeModules} from "react-native";

// components
import CreateAccountWidget from "../../components/CreateAccountWIdget/CreateAccountWidget";

import DoneModalViewWidget from "../../components/CustomWidgets/DoneModalview";
import InfoModalWidget from "../../components/InfoModalWidgets/InfoModalview"; 
import BottomDrawer from "react-native-bottom-drawer-view";
import { BlurView, VibrancyView } from "@react-native-community/blur";
import { IAppState } from '../../store/store';
import { useSelector, useDispatch} from 'react-redux';
import { AccountAction, ISCAPSULEAction } from '../../actions/accountActions'
import { SigningKeyAction, AccountNumberAction } from '../../actions/loginActions';
import Style from "./Style";
import LinearGradient from 'react-native-linear-gradient'; 
import EncryptedStorage from 'react-native-encrypted-storage';   
import nacl from 'tweetnacl'
import naclutil from 'tweetnacl-util' 

interface createAccount {
  navigation: any; // TODO use navigation props type
  route: any;
} 

const CreateAccountScreen = ({ navigation, route}: createAccount) => { 
  const {nickname, signingKeyHex, accountNumber, signingKey, accounts, validator_accounts, bank_url, login, pScreen} = route.params;  
  const dispatch = useDispatch();     
  const lAccounts = useSelector((state: IAppState) => state.accountState.account);
  const lIsCapsule = useSelector((state: IAppState) => state.accountState.is_capsule);  
  const [myAccounts, setMyAccounts] = useState(lAccounts == null ? [] : lAccounts); 
  const [isCapsule, setCapsule] = useState(lIsCapsule == null ? [] : lIsCapsule); 
  const [modalVisible, setModalVisible] = useState(false);   
 
  const [actName, setActName] = useState((myAccounts == null || myAccounts.length == 0) ? 'No Accounts' : 'No Accounts'); //myAccounts[0].name
  const [actNumber, setActNumber] = useState((myAccounts == null || myAccounts.length == 0) ? '' : ''); //myAccounts[0].account_number
  const [actSignKey, setActSignKey] = useState((myAccounts == null || myAccounts.length == 0) ? '' : '');  //myAccounts[0].sign_key
  const [actBalance, setActBalance] = useState((myAccounts == null || myAccounts.length == 0) ? '0.00' : '0.00');  //myAccounts[0].balance
  const [doneVisible, setDoneVisible] = useState(login != 'login'); 
  const [addMode, setAddMode] = useState(true); 
  const [prevScreen, setPrevScreen] = useState(pScreen); 
  const [dlgMessage, setDlgMessage] = useState("");
  const [dlgVisible, setDlgVisible] = useState(false); 
  const [removeVisible, setRemoveVisible] = useState(false);
  const [spinVisible, setSpinVisible] = useState(false); 
  const [seed, setSeed] = useState("");  
  const [privateKey, setPrivateKey] = useState(null);  
  const [publicKey, setPublicKey] = useState(null);  

  var Aes = NativeModules.Aes;
  type AccountKeys = [Uint8Array, Uint8Array];
  
  const generateKey = (password: string, salt: string, cost: number, length: number) => Aes.pbkdf2(password, salt, cost, length) 

  useEffect(() => {  
    getSeedESP();

  }, []);    

  function generateFromKey(signingKey: string): AccountKeys {
    const { publicKey: accountNumber, secretKey: signingKey_ } = nacl.sign.keyPair.fromSeed(hexToUint8Array(signingKey)); 
    return [accountNumber, signingKey_];
  }
  
  function fromBothKeys(signingKey: string, accountNumber: string): AccountKeys {
    const accountNumberArray = hexToUint8Array(accountNumber);
    const signingKeyArray = new Uint8Array(64);
    signingKeyArray.set(hexToUint8Array(signingKey));
    signingKeyArray.set(accountNumberArray, 32);
    return [accountNumberArray, signingKeyArray];
  }
  
  function uint8arrayToHex(array: Uint8Array): string {
    return Buffer.from(array).toString("hex");
  }

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
    //message to be sent to Viktoria
    const message_in_transit = {cipher_text, one_time_code}; 
    return message_in_transit;
  };

  function naclDecrypting(message){
    //Get the decoded message 
    let decoded_message = nacl.box.open(message.cipher_text, message.one_time_code, hexToUint8Array(publicKey), hexToUint8Array(privateKey));

    //Get the human readable message
    let plain_text = naclutil.encodeUTF8(decoded_message)

    //return the plaintext
    return plain_text;
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
              setActName(account.name);
              setActNumber(account.account_number);
              setActBalance(account.balance); 
              setAddMode(addMode); 
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
                console.log(seed)
                if(publicKey == null || privateKey == null){
                  account.isEncrypt = false;
                }
                else{ 
                  const encryptedData = naclEncrypting(account.sign_key) 
                  console.log(encryptedData)
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
              else{
                setModalVisible(false); 
              }
            }}
            />
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

export default CreateAccountScreen;
