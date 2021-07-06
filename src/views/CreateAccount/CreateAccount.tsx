import { Colors, Custom, Typography} from "styles";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, Modal} from "react-native";

// components
import CreateAccountWidget from "../../components/CreateAccountWIdget/CreateAccountWidget";

import DoneModalViewWidget from "../../components/CustomWidgets/DoneModalview";
import InfoModalWidget from "../../components/InfoModalWidgets/InfoModalview"; 
import BottomDrawer from "react-native-bottom-drawer-view";
import { BlurView, VibrancyView } from "@react-native-community/blur";
import { IAppState } from '../../store/store';
import { useSelector, useDispatch} from 'react-redux';
import { AccountAction } from '../../actions/accountActions'
import Style from "./Style";
import LinearGradient from 'react-native-linear-gradient';

interface createAccount {
  navigation: any; // TODO use navigation props type
  route: any;
}
 

const CreateAccountScreen = ({ navigation, route}: createAccount) => { 
  const {nickname, signingKeyHex, accountNumber, signingKey, accounts, validator_accounts, bank_url, login} = route.params; 
  const dispatch = useDispatch(); 
  const lAccounts = useSelector((state: IAppState) => state.accountState.account);
  const [myAccounts, setMyAccounts] = useState(lAccounts == null ? [] : lAccounts); 
  const [modalVisible, setModalVisible] = useState(false);   
  const [actName, setActName] = useState((myAccounts == null || myAccounts.length == 0) ? 'No Accounts' : myAccounts[0].name); 
  const [actNumber, setActNumber] = useState((myAccounts == null || myAccounts.length == 0) ? '' : myAccounts[0].account_number);
  const [actSignKey, setActSignKey] = useState((myAccounts == null || myAccounts.length == 0) ? '................................................................................' : myAccounts[0].sign_key);  
  const [actBalance, setActBalance] = useState((myAccounts == null || myAccounts.length == 0) ? '0.00' : myAccounts[0].balance); 
  const [doneVisible, setDoneVisible] = useState(login != 'login'); 
  const [addMode, setAddMode] = useState(true); 
  const [dlgMessage, setDlgMessage] = useState("");
  const [dlgVisible, setDlgVisible] = useState(false); 
  const [removeVisible, setRemoveVisible] = useState(false);
  const [spinVisible, setSpinVisible] = useState(false)

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
                myAccounts.push(account);
                dispatch(AccountAction(myAccounts));
                setMyAccounts(myAccounts);
                navigation.navigate('tab', {
                  nickname: account.name,
                  signingKeyHex: "",
                  accountNumber: "", 
                  signingKey: "",
                  accounts: myAccounts,
                  validator_accounts: validator_accounts,
                  bank_url: bank_url,
                  login: 'login',
                });
              }
              
            }} 
            validator_accounts = {validator_accounts}
            handleCancel={() => {
              setModalVisible(false);
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
