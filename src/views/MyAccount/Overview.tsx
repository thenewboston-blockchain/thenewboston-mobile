import { Colors, Custom, Typography } from "styles";
import React, { useEffect, useState } from "react";

import { ScrollView, Text, TouchableOpacity, View, Modal } from "react-native";
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
import LinearGradient from 'react-native-linear-gradient';
// svg
import Refresh from "../../assets/svg/Refresh.svg";



const TAB_BAR_HEIGHT = 20;
const DOWN_DISPLAY = 50;

const OverviewScreen = ({ route, navigation }) => {
 
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch(); 
  const lAccounts = useSelector((state: IAppState) => state.accountState.account);
  const [myAccounts, setMyAccounts] = useState(lAccounts == null ? [] : lAccounts); 
  const [modalVisible, setModalVisible] = useState(false);   
  const [viewRef, setViewRef] = useState(null);   
  const {nickname, signingKeyHex, accountNumber, signingKey, accounts, validator_accounts, bank_url, login} = route.params; 
  const [actName, setActName] = useState((myAccounts == null || myAccounts.length == 0) ? 'No Accounts' : myAccounts[0].name); 
  const [actNumber, setActNumber] = useState((myAccounts == null || myAccounts.length == 0) ? '' : myAccounts[0].account_number);
  const [actSignKey, setActSignKey] = useState((myAccounts == null || myAccounts.length == 0) ? '................................................................................' : myAccounts[0].sign_key);  
  const [actBalance, setActBalance] = useState((myAccounts == null || myAccounts.length == 0) ? '0.00' : myAccounts[0].balance); 
  const [doneVisible, setDoneVisible] = useState(login != 'login'); 
  const [addMode, setAddMode] = useState(false); 
  const [dlgMessage, setDlgMessage] = useState("");
  const [dlgVisible, setDlgVisible] = useState(false);
  
 
  const handleSendCoins = () => { 
    console.log("send coins");
  };

  const handleTransIndex = (index) => { 
    console.log(myAccounts[index].balance)
    if(myAccounts.length > 0){
      if(myAccounts[index].name == null){
        setActName(index);
      } 
      else{
        setActName(myAccounts[index].name);
      }
      setActNumber(myAccounts[index].account_number);
      setActSignKey(myAccounts[index].sign_key);
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

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[Custom.row, Custom.mt30]}>
          <View>
            <Text style={[Style.subHeading]}>MY ACCOUNT BALANCE</Text>
            <Text style={[Style.heading]}>{actBalance}</Text>
          </View>
          <TouchableOpacity
            style={Style.refreshbutton}
            onPress={() => console.log("refresh")}
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
          accountNumber={
            actNumber
          }
        />
        <SignKey
          signKey={
            actSignKey
            
          }
        /> 
        <CustomButton
          title="Delete Account"
          onPress={handleSendCoins}
          buttonColor={Colors.WHITE}
          loading={loading}
          customStyle={Style.deleteButton}
        />
      </ScrollView>
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
                setDlgMessage("This signning key exists in your accounts");
                setDlgVisible(true);
              }
              else if(bExistName != false){ 
                setDlgMessage("This account name exists in your accounts");
                setDlgVisible(true);
              }
              else{
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

export default OverviewScreen;
