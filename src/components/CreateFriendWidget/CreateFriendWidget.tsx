import { Colors, Typography } from 'styles';
import { Text, TextPropTypes, View, Modal} from 'react-native'; 
import CustomButton from '../CustomButton';
import CustomInput from '../CustomInput' 
import React from 'react';
import Style from './Style'
import { useState } from 'react';  
import InfoModalWidget from "../../components/InfoModalWidgets/InfoModalview"; 
import { BlurView, VibrancyView } from "@react-native-community/blur";
import LinearGradient from 'react-native-linear-gradient';
import {Account, AccountData, BlockData, BlockMessage, AccountPaymentHandlerOptions, SignedMessage, Bank} from 'thenewboston/dist/index.js';
import {Buffer} from 'buffer'  

interface createFriend {
    title: string,
    navigation: any,  
    route: any,
    handleCancel: Function,
    addFirends: Function,
    accounts: [],
}

interface createFriendPayload {
    nickname: string
    key?: string
} 

const createFriendWidget = (props: createFriend) => { 
    const [isValid,setValid] = useState(false);
    const [data, setData] = useState<createFriendPayload>({
        nickname: "",
        key:""
    })
    const [loading, setLoading] = useState<boolean>(false)   
    const [dlgMessage, setDlgMessage] = useState("");
    const [dlgVisible, setDlgVisible] = useState(false);

    const handleCreateFriend=async()=>{   
        const friend = {name: data.nickname, account_number: data.key, balance: "0"} 
        let curBalance = "0"; 
        if(friend.name == ""){ 
            setDlgMessage("Please input account name!");
            setDlgVisible(true);
            return;
        }
        if(friend.account_number == ""){ 
            setDlgMessage("Please input account number!");
            setDlgVisible(true);
            return;
        }   
        if(props.accounts != null){
            props.accounts.map((item)=>{
                if(item.account_number == friend.account_number){
                    curBalance = item.balance    ///how to get balance?
                }
            }) 
            friend.balance = curBalance;
            props.addFirends(friend);   
        } 
        
    }

    // const handleCancel=()=>{
    //     //props.navigation.goBack(null)
    // }
    
    return (
        <View style={Style.container}>
        <View style={Style.formView}>
          <Text style={[Typography.FONT_REGULAR, Style.heading]}>
            {props.title}
          </Text>
             
            <CustomInput
                name="nickname"
                value={data.nickname}
                staticLabel={false}
                labelText="nickname"
                customInputStyle={{color:'white'}}
                onChangeText={(value: string) => {
                    setData({
                        ...data,
                        nickname: value
                    });
                }} 
                autoCapitalize="none"
            /> 
            <CustomInput
                name="key"
                value={data.key} 
                staticLabel={false}
                labelText="Friend's account number" 
                customInputStyle={{color:'white'}}  
                customStyles = {Style.customStyle}
                numberOfLines = {3}
                multiline = {true}
                onChangeText={(value: string) => {
                    setData({
                        ...data,
                        key: value
                    });
                }}
                autoCapitalize="none"
            />  
            <CustomButton
                title="Create"
                onPress={handleCreateFriend}
                disabled={!isValid}
                buttonColor={Colors.WHITE}
                loading={loading}
            />
            <CustomButton
                title="Cancel"
                onPress={props.handleCancel}
                disabled={false}
                buttonColor={Colors.WHITE}
                loading={false}
                customStyle={{ backgroundColor: "transparent", marginTop: 0 }}
            />
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
        </View>
    );
};
 
export default createFriendWidget

