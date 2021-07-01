import { Colors, Custom, Typography } from "styles";
import React, { useEffect, useState } from "react";

import { ScrollView, Text, TouchableOpacity, View, Modal } from "react-native";
import Style from "./Style";


// components
import Accounts from "../../components/Accounts/Accounts";
import CustomButton from "../../components/CustomButton";
import FriendNumber from "../../components/FriendNumber/FriendNumber";
import SignKey from "../../components/SignKey/SignKey";

import CreateFriendWidget from "../../components/CreateFriendWidget/CreateFriendWidget";
import InfoModalWidget from "../../components/InfoModalWidgets/InfoModalview"; 
import DoneModalViewWidget from "../../components/CustomWidgets/DoneModalview";
import BottomDrawer from "react-native-bottom-drawer-view";
import { BlurView, VibrancyView } from "@react-native-community/blur";
// svg
import Refresh from "../../assets/svg/Refresh.svg";
import LinearGradient from 'react-native-linear-gradient';
import { IAppState } from '../../store/store';
import { useSelector, useDispatch} from 'react-redux';
import { FriendAction } from '../../actions/friendActions'

const TAB_BAR_HEIGHT = 20;
const DOWN_DISPLAY = 50;

const FriendsScreen = ({ route, navigation }) => {

  // const [accounts, setAccoiunts] = useState([
  //   { active: true, name: "John Doe" },
  //   { active: false, name: "Rob Tin" },
  //   { active: false, name: "Hissein Johnson" },
  //   { active: false, name: "Brad Scott" },
  // ]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch(); 
  const lFriends = useSelector((state: IAppState) => state.friendState.friend);

  const [friends, setFriends] = useState(lFriends == null ? [] : lFriends); 

  const [modalVisible, setModalVisible] = useState(false);   
  const [viewRef, setViewRef] = useState(null);   
  const {nickname, signingKeyHex, signingKey, accounts, validator_accounts, bank_url, login} = route.params;   
  const [actName, setActName] = useState((friends == null || friends.length == 0) ? 'No Friends' : friends[0].name); 
  const [balance, setBalance] = useState((friends == null || friends.length == 0) ? '0.0' : friends[0].balance);  
  const [actNumber, setActNumber] = useState('');   
  const [doneVisible, setDoneVisible] = useState(login != 'login');  
  const [dlgMessage, setDlgMessage] = useState("");
  const [dlgVisible, setDlgVisible] = useState(false);
   
  const handleTransIndex = (index) => { 
    if(friends.length > 0){ 
      if(friends[index].name == null){
        setActName(index);
      } 
      else{
        setActName(friends[index].name);
      }
      setActNumber(friends[index].account_number);  
      setBalance(friends[index].balance); 
    }
    
  } 

  return (
    <View style={Style.container}  ref={(viewRef) => { setViewRef(viewRef); }}> 
      <View style={{ alignItems: "center"}} >
        <Text style={Style.heading}>{'My friends'}</Text> 
        <Accounts
          accounts={friends}
          addAccount={() => {
            setModalVisible(true);
            navigation.navigate.visible = false;
          }}
          handleTransIndex = {(index) => handleTransIndex(index)}
        />
      </View>  

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[Custom.row, Custom.mt30]}>
          <View>
           <Text style={Style.heading}>{actName}</Text> 
            <Text style={[Style.subHeading]}>FRIEND'S ACCOUNT BALANCE</Text>
            <Text style={[Style.heading]}>{balance}</Text>
          </View>
          <TouchableOpacity
            style={Style.refreshbutton}
            onPress={() => console.log("refresh")}
          >
            <Refresh />
          </TouchableOpacity>
        </View> 

        <FriendNumber
          friendNumber={
            actNumber
          }
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
        <View style={Style.modalContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <CreateFriendWidget title={"Add Friend"}
            navigation={navigation}
            route = {route} 
            addFirends={(friend) => { 
              setActName(friend.name);
              setActNumber(friend.account_number)
              setBalance(friend.balance)
              var bExist = false;  
              var bExistName = false; 
              friends.map((item)=>{
                if(item.account_number == friend.account_number){
                  bExist = true;
                }
                if(item.name == friend.name){
                  bExistName = true;
                }
              }) 
              if(bExist != false){ 
                setDlgMessage("This account number exists in your friends");
                setDlgVisible(true);
              }
              else if(bExistName != false){ 
                setDlgMessage("This account name exists in your friends");
                setDlgVisible(true);
              }
              else{ 
                friends.push(friend);
                dispatch(FriendAction(friends));
                setFriends(friends);
                setModalVisible(false);
                setDoneVisible(true);
              }
              
            }} 
            accounts = {validator_accounts}
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
                    message={"Your successfully added a new friend!"}
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

export default FriendsScreen;
