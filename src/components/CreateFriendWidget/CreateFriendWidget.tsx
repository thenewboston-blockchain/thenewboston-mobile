import { Colors, Typography } from 'styles';
import { Text, TextPropTypes, View } from 'react-native'; 
import CustomButton from '../CustomButton';
import CustomInput from '../CustomInput' 
import React from 'react';
import Style from './Style'
import { useState } from 'react';  
import {Account, AccountData, BlockData, BlockMessage, AccountPaymentHandlerOptions, SignedMessage, Bank} from 'thenewboston' 
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
        key:"449baf4c0b43f44e9b091947bf36880bf237a91e413adb85ca2ae1f33e239440"
    })
    const [loading, setLoading] = useState<boolean>(false)   

    const handleCreateFriend=async()=>{   
        const friend = {name: data.nickname, account_number: data.key, balance: "0"} 
        let curBalance = "0"; 
        if(friend.name == ""){
            alert("Please input account name!")
            return;
        }
        if(friend.account_number == ""){
            alert("Please input account number!")
            return;
        }   
        if(props.accounts != null){
            props.accounts.results.map((item)=>{
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
        </View>    
        </View>
    );
};
 
export default createFriendWidget

