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
import DoneModalViewWidget from "../../components/CustomWidgets/DoneModalview";
import BottomDrawer from "react-native-bottom-drawer-view";
import { BlurView, VibrancyView } from "@react-native-community/blur";
// svg
import Refresh from "../../assets/svg/Refresh.svg";
import LinearGradient from 'react-native-linear-gradient';
import { IAppState } from '../../store/store';
import { useSelector, useDispatch} from 'react-redux';
import {Account, Bank, Transaction} from 'thenewboston' 

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
  const friends = useSelector((state: IAppState) => state.friendState.friend);

  console.log('friends', friends);

  const [modalVisible, setModalVisible] = useState(false);   
  const [viewRef, setViewRef] = useState(null);   
  const {nickname, signingKeyHex, signingKey, accounts, bank_url, login} = route.params;   
  const [actName, setActName] = useState('No Friends'); 
  const [balance, setBalance] = useState('0.0');  
  const [actNumber, setActNumber] = useState('');  
  const [actSignKey, setActSignKey] = useState(signingKey); 
  const [doneVisible, setDoneVisible] = useState(login != 'login');  
   
  const handleTransIndex = (index) => { 
    if(friends.length > 0){
      if(friends[index - 1].name == null){
        setActName(index);
      } 
      else{
        setActName(friends[index - 1].name);
      }
      setActNumber(friends[index - 1].account_number); 
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
          <CreateFriendWidget title={"Add Friend"}
            navigation={navigation}
            route = {route} 
            handleCancel={() => {
              setModalVisible(false);
            }}
            />
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
                    message={"Your account has been successfully created!"}
                    navigation={navigation}
                    button={"Ok"} 
                    handleOk={() => {
                    setDoneVisible(false);
                }} />
        </LinearGradient> 
        
        
      </Modal>


    </View>
  );
};

export default FriendsScreen;
