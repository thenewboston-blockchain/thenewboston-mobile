import { Colors, Custom, Typography } from "styles";
import React, { useEffect, useState } from "react";

import { ScrollView, Text, TouchableOpacity, View, Modal, ActivityIndicator} from "react-native";
import Style from "./Style"; 
import Accounts from "../../components/Accounts/Accounts";
import CustomButton from "../../components/CustomButton";
import FriendNumber from "../../components/FriendNumber/FriendNumber";  
import CreateFriendWidget from "../../components/CreateFriendWidget/CreateFriendWidget";
import InfoModalWidget from "../../components/InfoModalWidgets/InfoModalview"; 
import DoneModalViewWidget from "../../components/CustomWidgets/DoneModalview"; 
import { BlurView, VibrancyView } from "@react-native-community/blur";
import LinearGradient from 'react-native-linear-gradient';
import { IAppState } from '../../store/store';
import { useSelector, useDispatch} from 'react-redux';
import { FriendAction } from '../../actions/friendActions'
// svg
import Refresh from "../../assets/svg/Refresh.svg";
 

const FriendsScreen = ({ route, navigation }) => {
 
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch(); 
  const lFriends = useSelector((state: IAppState) => state.friendState.friend);

  const [friends, setFriends] = useState(lFriends == null ? [] : lFriends); 

  const [modalVisible, setModalVisible] = useState(false);   
  const [viewRef, setViewRef] = useState(null);   
  const {nickname, signingKeyHex, signingKey, accounts, validator_accounts, bank_url, login} = route.params;   
  const [actName, setActName] = useState((friends == null || friends.length == 0) ? 'No Friends' : friends[0].name); 
  const [balance, setBalance] = useState((friends == null || friends.length == 0) ? '0.0' : friends[0].balance);  
  const [actNumber, setActNumber] = useState((friends == null || friends.length == 0) ? '0.0' : friends[0].account_number);   
  const [doneVisible, setDoneVisible] = useState(login != 'login');  
  const [dlgMessage, setDlgMessage] = useState("");
  const [dlgVisible, setDlgVisible] = useState(false);
  const [spinVisible, setSpinVisible] = useState(false)
   
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

  const onRefresh = () => {
    if(validator_accounts != null){ 
      setSpinVisible(true);
      let cusFriends = friends.map((friend)=>{
        validator_accounts.forEach(item => {
          if(item.account_number == friend.account_number){
            friend.balance = item.balance; 
            return false;
          }
        }); 
        return friend 
      }) 
     dispatch(FriendAction(cusFriends));  
     setFriends(cusFriends);
     setSpinVisible(false);
   }  
  }

  const handleFunction =() => {

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
      {spinVisible && <ActivityIndicator size="large" color="white" style={{justifyContent:'center', marginTop:'32%'}}></ActivityIndicator>}
      {!spinVisible && <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[Custom.row, Custom.mt30, Custom.mb20]}>
          <View>
           <Text style={Style.heading}>{actName}</Text> 
            <Text style={[Style.subHeading]}>FRIEND'S ACCOUNT BALANCE</Text>
            <Text style={[Style.heading]}>{balance}</Text>
          </View>
          <TouchableOpacity
            style={Style.refreshbutton}
            onPress={onRefresh}
          >
            <Refresh />
          </TouchableOpacity>
        </View> 

        <FriendNumber
          friendNumber={
            actNumber
          }
        />  
         <CustomButton
          title=""
          onPress={handleFunction}
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
