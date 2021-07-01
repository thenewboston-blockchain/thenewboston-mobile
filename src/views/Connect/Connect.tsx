import { Colors, Custom, Typography } from "styles";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, Modal} from "react-native";
import {Account, Bank} from 'thenewboston' 
import CustomButton from "../../components/CustomButton";
// components
import CustomInput from "../../components/CustomInput";
import CustomSelect from "../../components/CustomSelect";
import LinearGradient from 'react-native-linear-gradient';
import DoneModalViewWidget from "../../components/CustomWidgets/DoneModalview";
import Style from "./Style";
import { IAppState } from '../../store/store';
import { useSelector, useDispatch} from 'react-redux';
import { BlurView, VibrancyView } from "@react-native-community/blur";
import { ProtocolAction, IpAddressAction, PortAction, NickNameAction } from '../../actions/loginActions'

interface connects { 
  navigation: any; // TODO use navigation props type
}
 

const connectScreen = ({navigation: {navigate}}: connects) => { 

  const dispatch = useDispatch(); 

  const port = useSelector((state: IAppState) => state.loginState.port);
  const nickname = useSelector((state: IAppState) => state.loginState.nickName); 
  const protocol = useSelector((state: IAppState) => state.loginState.protocol);
  const ipAddress = useSelector((state: IAppState) => state.loginState.ipAddress); 
 
  const [lPort, setlPort] = useState<string>(port)
  const [lProtocol, setlProtocol] = useState<string>(protocol == null ? "http" : protocol)
  const [lNickName, setlNickName] = useState<string>(nickname)
  const [lIpAddress, setlIpAddress] = useState<string>(ipAddress == null ? "54.177.121.3" : ipAddress)
  const validator_IpAddress = "54.219.183.128"

  const [dlgVisible, setDlgVisible] = useState(false)
  const [dlgMessage, setDlgMessage] = useState("") 
  const [loading, setLoading] = useState(false);
  const [isValid, setValid] = useState(false); 
  const protocols = [{ label: "HTTP", value: "http" }];

  const handleSubmit = async()=>{ 
    let bank_url = lProtocol + '://' + lIpAddress 
    try{
      setLoading(true)
      const bank = new Bank(bank_url);
      const accounts = await bank.getAccounts();

      let validator_rul = lProtocol + '://' + validator_IpAddress  
      const validator_bank = new Bank(validator_rul); 
      const Aaccount = await validator_bank.getAccounts({ limit: 1, offset: 0 }); 
      var validator_accounts = [];
      let account_size = Aaccount.count; 
      for(let i = 0; i < account_size; i+=100){
        const part_accounts = await validator_bank.getAccounts({ limit: 100, offset: i });  
        validator_accounts = [...validator_accounts, ...part_accounts.results]; 
      }  

      dispatch(ProtocolAction(lProtocol));
      dispatch(IpAddressAction(lIpAddress))
      dispatch(NickNameAction(lNickName))
      dispatch(PortAction(lPort))
      setLoading(false)
      navigate('login', {
        nickname: lNickName,
        accounts: accounts,
        validator_accounts: validator_accounts,
        bank_url: bank_url, 
      });  
    } catch(err){
      setLoading(false)
      setDlgMessage(err);
      setDlgVisible(true)
      console.log(err)
    }
     
  }

  return (
    <View style={Style.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={Style.formView}>
          <Text style={[Typography.FONT_REGULAR, Style.heading]}>
            Connect to the network
          </Text>
          <Text
            style={[
              Typography.FONT_REGULAR,
              Custom.mt20,
              Custom.mb40,
              { color: "#63737E" },
            ]}
          >
            Please enter the address of a bank
          </Text>

          <CustomSelect
            options={protocols}
            selected={lProtocol}
            required={true}
            updateSelected={(selected: any) => {
              setlProtocol(selected) 
            }}
            customStyle={[Custom.mb20]}
            placeholder={{ label: "Protocol" }}
          />

          <CustomInput
            name="ipAddress"
            value={lIpAddress}
            staticLabel={false}
            labelText="ip address"                      
            onChangeText={(value: string) => {  
              setlIpAddress(value); 
            }}
            autoCapitalize="none"
          />

          <CustomInput
            name="port"
            value={lPort}
            staticLabel={false}
            labelText="port"
            onChangeText={(value: string) => { 
              setlPort(value);
            }}
            autoCapitalize="none"
          />

          <CustomInput
            name="nickname"
            value={lNickName}
            staticLabel={false}
            labelText="nickname"
            onChangeText={(value: string) => { 
              setlNickName(value); 
            }}
            autoCapitalize="none"
          />

          <CustomButton
            title="Connect To The Network"
            onPress={handleSubmit}
            disabled={!isValid}
            buttonColor={Colors.WHITE}
            loading={loading}
          />
        </View>
      </ScrollView>
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
             
         <LinearGradient start={{x: 0, y: 1}} end={{x: 0, y: 0}} colors={['rgba(29, 39, 49, 0.9)', 'rgba(53, 96, 104, 0.9)']} style={Style.doModalContainer}>
            <DoneModalViewWidget 
                    title={"Done"}
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

export default connectScreen
 