import { Colors, Typography } from 'styles';
import { Text, View } from 'react-native'; 
import CustomButton from '../CustomButton';
import CustomInput from '../CustomInput' 
import React from 'react';
import Style from './Style'
import { useState } from 'react';  
import {Buffer} from 'buffer'  

interface createFriend {
    title: string,
    navigation: any,  
    route: any,
    handleCancel:Function
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
    const {accounts, bank_url} = props.route.params; 

    const handleCreateFriend=async()=>{   
        props.navigation.navigate('tab', { 
        }); 
    }

    // const handleCancel=()=>{
    //     props.navigation.goBack(null)
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
                labelText="signing key" 
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

