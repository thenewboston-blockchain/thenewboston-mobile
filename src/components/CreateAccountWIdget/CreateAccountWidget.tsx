import { Colors, Typography } from 'styles';
import { Text, View, Modal} from 'react-native'; 
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput' 
import React from 'react';
import Style from './Style'
import { useState } from 'react';  
import {Buffer} from 'buffer' 
import InfoModalWidget from "../../components/InfoModalWidgets/InfoModalview"; 
import { BlurView, VibrancyView } from "@react-native-community/blur";
import LinearGradient from 'react-native-linear-gradient';
import {Account} from 'thenewboston/dist/index.js' 

interface createAccount {
    title: string,
    navigation: any,  
    route: any,
    validator_accounts: [],
    addAccount: Function,
    handleCancel:Function, 
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
        key:""
    }) 
    const [dlgMessage, setDlgMessage] = useState("");
    const [dlgVisible, setDlgVisible] = useState(false);
    const [loading, setLoading] = useState<boolean>(false)  
    //const {accounts, bank_url, validator_accounts} = props.route.params;  

    const handleCreateAccount=async()=>{   
        if(activity == NEW_ACCOUNT){   
            const account = new Account();   
            const signingKey = account.signingKey
            const accountNumber = account.accountNumber;
            const newAccount = {name: data.nickname, sign_key: signingKey, account_number: accountNumber, balance: 0}   
            props.addAccount(newAccount, true);   
        }
        else if(activity == EXISTING_ACCOUNT){
            const account = {name: data.nickname, sign_key: data.key, account_number: null, balance: 0}
            var curBalance = 0;  
            if(account.name == ""){ 
                setDlgMessage("Please input account name!");
                setDlgVisible(false);
                return;
            }
            if(account.sign_key == ""){ 
                setDlgMessage("Please input signing key!");
                setDlgVisible(true);
                return;
            } 
            const newAccount = new Account(data.key); 
            account.account_number = newAccount.accountNumber 
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
 
export default CreateAccountWidget

