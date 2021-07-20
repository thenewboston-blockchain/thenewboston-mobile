import { Colors, Custom, Typography } from "styles";
import React, { useEffect, useState,} from "react";

import { ScrollView, Text, TouchableOpacity, View, Modal, ActivityIndicator, NativeModules} from "react-native";
import Style from "./Style";


// components
import Accounts from "../../components/Accounts/Accounts";
import CustomButton from "../../components/CustomButton";
import AccountNumber from "../../components/AccountNumber/AccountNumber";
import SignKey from "../../components/SignKey/SignKey";

import CreateAccountWidget from "../../components/CreateAccountWIdget/CreateAccountWidget";
import DoneModalViewWidget from "../../components/CustomWidgets/DoneModalview";
import InfoModalWidget from "../../components/InfoModalWidgets/InfoModalview"; 
import BottomDrawer from "react-native-bottom-drawer-view";
import { BlurView, VibrancyView } from "@react-native-community/blur";
import { IAppState } from '../../store/store';
import { useSelector, useDispatch} from 'react-redux';
import { AccountAction } from '../../actions/accountActions'
import DeleteAccount from './DeleteAccount/DeleteAccount'
import LinearGradient from 'react-native-linear-gradient';
// svg
import Refresh from "../../assets/svg/Refresh.svg";
import CryptoJS from "crypto-js"
import EncryptedStorage from 'react-native-encrypted-storage';


const TAB_BAR_HEIGHT = 20;
const DOWN_DISPLAY = 50;

var Aes = NativeModules.Aes

const OverviewScreen = ({ route, navigation }) => {
 
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch(); 
  const lAccounts = useSelector((state: IAppState) => state.accountState.account); 
  const {nickname, signingKeyHex, accountNumber, signingKey, accounts, validator_accounts, bank_url, login, genKey} = route.params;  
  const [myAccounts, setMyAccounts] = useState(lAccounts == null ? [] : lAccounts); 
  const [modalVisible, setModalVisible] = useState(false);   
  const [viewRef, setViewRef] = useState(null);  
  const [actName, setActName] = useState((myAccounts == null || myAccounts.length == 0) ? 'No Accounts' : myAccounts[0].name); 
  const [actNumber, setActNumber] = useState((myAccounts == null || myAccounts.length == 0) ? '' : (myAccounts[0].account_number)); 
  const [actSignKey, setActSignKey] = useState((myAccounts == null || myAccounts.length == 0) ? '' : toDecrypt(myAccounts[0].sign_key));  
  const [actBalance, setActBalance] = useState((myAccounts == null || myAccounts.length == 0) ? '0.00' : myAccounts[0].balance); 
  const [doneVisible, setDoneVisible] = useState(login != 'login'); 
  const [addMode, setAddMode] = useState(false); 
  const [dlgMessage, setDlgMessage] = useState("");
  const [dlgVisible, setDlgVisible] = useState(false); 
  const [removeVisible, setRemoveVisible] = useState(false);
  const [spinVisible, setSpinVisible] = useState(false) 
    
  const handleSendCoins = () => { 
    console.log("send coins");
  };

  function toDecrypt(cipher){
    let bytes = CryptoJS.AES.decrypt(cipher, genKey);    
    return bytes.toString(); 
  }

  function toHexString(byteArray) {
    return Array.prototype.map.call(byteArray, function(byte) {
      return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('');
  }

  const [seed, setSeed] = useState(""); 

  useEffect(() => {  
    getSeedESP();
  }, []); 

  async function setMyAccountsESP(accounts, isCapsule) {
    try {
      await EncryptedStorage.setItem(
          "myAccounts",
          JSON.stringify({ 
            isCapsule: isCapsule,
            myAccounts : accounts, 
        })
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
      }
    } catch (error) {
       console.log(error);
    }
  } 

  const deleteAccount = () => {   
    let _myAccounts = myAccounts.filter(item => item.account_number !== actNumber);
    setMyAccounts(_myAccounts);  
    dispatch(AccountAction(_myAccounts)); 
    
    if(_myAccounts != [] && _myAccounts.length > 0){
      setActName(_myAccounts[0].name);
      setActNumber((_myAccounts[0].account_number));
      setActSignKey((_myAccounts[0].sign_key));
      setActBalance(_myAccounts[0].balance);
    }
    else{
      setActName('No Accounts');
      setActNumber('');
      setActSignKey('');
      setActBalance('0.00');
    }
  }; 

  const onRefresh = () => {
    if(validator_accounts != null){ 
      setSpinVisible(true);
      let cusAccounts = myAccounts.map((account)=>{
        validator_accounts.forEach(item => {
          if(item.account_number == account.account_number){
            account.balance = item.balance; 
            return false;
          }
        }); 
        return account 
      })  
     dispatch(AccountAction(cusAccounts));  
     setMyAccounts(cusAccounts);
     setSpinVisible(false);

   }  
  }

  const handleTransIndex = (index) => { 
     
    if(myAccounts.length > 0){
      if(myAccounts[index].name == null){
        setActName(index);
      } 
      else{
        setActName(myAccounts[index].name);
      } 
      setActNumber((myAccounts[index].account_number));   
      setActSignKey(toDecrypt(myAccounts[index].sign_key));
      setActBalance(myAccounts[index].balance);  
    } 
  }

  return (
    <View style={Style.container}  ref={(viewRef) => { setViewRef(viewRef); }}> 
      <View style={{ alignItems: "center"}} >
        <Text style={Style.heading}>{actName}</Text> 
        <Accounts
          accounts={myAccounts}
          addAccount={() => setModalVisible(true)}
          handleTransIndex = {(index) => handleTransIndex(index)}
        />

      </View> 
      {spinVisible && <ActivityIndicator size="large" color="white" style={{justifyContent:'center', marginTop:'32%'}}></ActivityIndicator>}
      {!spinVisible && <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[Custom.row, Custom.mt30]}>
          <View>
            <Text style={[Style.subHeading]}>MY ACCOUNT BALANCE</Text>
            <Text style={[Style.heading]}>{actBalance}</Text>
          </View>
          <TouchableOpacity
            style={Style.refreshbutton}
            onPress={onRefresh}
          >
            <Refresh />
          </TouchableOpacity>
        </View>

        {/* send coins  */}
        <CustomButton
          title="Send Coins" 
          onPress={()=>navigation.navigate('sendcoins1')}
          buttonColor={Colors.WHITE}
          loading={loading}
          customStyle={{ width: "35%" }}
        />

        <AccountNumber
          navigator={navigation}
          accountNumber={
            actNumber
          }
        />
        <SignKey
          signKey={ actSignKey }
          writeKeyFunc = {(msg)=>{
            setDlgMessage(msg);
            setDlgVisible(true);
          }}
        /> 
        <CustomButton
          title="Delete Account"
          onPress={()=>{
            if(myAccounts.length > 0){
              setRemoveVisible(true);  
            }
          }}
          buttonColor={Colors.WHITE}
          loading={loading}
          customStyle={Style.deleteButton}
        />
        <CustomButton
          title=""
          onPress={handleSendCoins}
          buttonColor={Colors.WHITE}
          loading={loading}
          customStyle={Style.bottomArea}
        />
      </ScrollView>}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
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
        <View style={Style.modalContainer}>
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
                setDlgMessage("This signing key exists in your accounts");
                setDlgVisible(true);
              }
              else if(bExistName != false){ 
                setDlgMessage("This account name exists in your accounts");
                setDlgVisible(true);
              }
              else{  
                let encryptString = CryptoJS.AES.encrypt(account.sign_key, genKey);  
                account.sign_key = encryptString.toString(); 
                myAccounts.push(account);   
                dispatch(AccountAction(myAccounts));
                setMyAccounts(myAccounts); 
                setModalVisible(false);
                setDoneVisible(true); 
              }
              
            }} 
            validator_accounts = {validator_accounts}
            handleCancel={() => {
              setModalVisible(false);
            }}
            />
            </ScrollView>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={doneVisible}  
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
             
         <LinearGradient start={{x: 0, y: 1}} end={{x: 0, y: 0}} colors={['rgba(29, 39, 49, 0.9)', 'rgba(53, 96, 104, 0.9)']} style={Style.doModalContainer}>
            <DoneModalViewWidget 
                    title={"Done"}
                    message={addMode ? "Your account has been successfully added!" : "Your account has been successfully created!"}
                    navigation={navigation}
                    button={"Ok"} 
                    handleOk={() => {
                    setDoneVisible(false);
                }} />
        </LinearGradient>  
      </Modal>
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
      <Modal
          animationType="fade"
          transparent={true}
          visible={removeVisible}  
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

          <LinearGradient start={{x: 0, y: 1}} end={{x: 0, y: 0}} colors={['rgba(29, 39, 49, 0.9)', 'rgba(53, 96, 104, 0.6)']} style={Style.deleteContainer}>
              <DeleteAccount 
                  title={"Delete account"}
                  message={"Are you sure you want to delete this account?"} 
                  balance={actBalance}
                  nickname={actName}
                  account_number={actNumber}
                  yes={"Ok"} 
                  no={"Cancel"} 
                  handleYes={() => {  
                      deleteAccount();
                      setRemoveVisible(false);
                  }}
                  handleNo={() => {
                    setRemoveVisible(false);
                  }}
              /> 
          </LinearGradient>  
      </Modal>
    </View>
  );
};

export default OverviewScreen;
