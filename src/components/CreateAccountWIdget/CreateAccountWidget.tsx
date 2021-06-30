import { Colors, Typography } from 'styles';
import { Text, View } from 'react-native'; 
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput' 
import React from 'react';
import Style from './Style'
import { useState } from 'react';  
import {Buffer} from 'buffer' 
import {Account, AccountData, BlockData, BlockMessage, AccountPaymentHandlerOptions, SignedMessage, Bank} from 'thenewboston' 
interface createAccount {
    title: string,
    navigation: any,  
    route: any,
    validator_accounts: [],
    addAccount: Function,
    handleCancel:Function
}

interface createAccountPayload {
    nickname: string
    key?: string
}

const NEW_ACCOUNT: string = "new"
const EXISTING_ACCOUNT: string = "add"

const CreateAccountWidget = (props: createAccount) => {
    const [activity, setActivity] = useState<string>(NEW_ACCOUNT)
    const [isValid,setValid] = useState(false);
    const [data, setData] = useState<createAccountPayload>({
        nickname: "",
        key:"f111e3eaa9d04fbc9352b1f33e5e672793ae06e4b79e6c73457327431df5ddc5"
    })
    const [loading, setLoading] = useState<boolean>(false)  
    //const {accounts, bank_url, validator_accounts} = props.route.params; 

    const handleCreateAccount=async()=>{   
        if(activity == NEW_ACCOUNT){ 
            const account = new Account(data.key); 
            const signingKeyHex = account.signingKey
            const accountNumberHex = account.accountNumberHex
            console.log('signingKeyHex = ' + signingKeyHex)
            console.log('accountNumberHex = ' + accountNumberHex)
            account.createSignedMessage({ name: data.nickname }); 
            props.navigation.navigate('tab') 
        }
        else if(activity == EXISTING_ACCOUNT){
            const account = {name: data.nickname, sign_key: data.key, account_number: "", balance: 0}
            var curBalance = 0;  
            if(account.name == ""){
                alert("Please input account name!")
                return;
            }
            if(account.sign_key == ""){
                alert("Please input signing key!")
                return;
            } 
            const newAccount = new Account(data.key); 
            account.account_number = newAccount.accountNumberHex 
            if(props.validator_accounts != null){
                props.validator_accounts.map((item)=>{
                    if(account.account_number == item.account_number){
                        curBalance = item.balance    ///how to get balance?
                    } 
                })
               
                account.balance = curBalance 
                props.addAccount(account, true);  
            }  
        }
        
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
            <View style={Style.switch}>
                <Text style={activity===NEW_ACCOUNT?Style.active:Style.inactive } onPress={ () => { setActivity(NEW_ACCOUNT) } }>Create New Account</Text>
                <Text style={activity===EXISTING_ACCOUNT?Style.active:Style.inactive } onPress={ () => { setActivity(EXISTING_ACCOUNT) } }>Add Existing Account</Text>
            </View>
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
            {activity === EXISTING_ACCOUNT &&
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
                }
                <CustomButton
                    title="Create"
                    onPress={handleCreateAccount}
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
 
export default CreateAccountWidget

