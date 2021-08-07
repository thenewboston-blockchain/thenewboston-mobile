import { Colors, Custom, Typography } from "styles";
import React, { useEffect, useState } from "react";
import Style from "./Style";
import { ScrollView, Text, View, Modal, NativeModules, Dimensions, LogBox} from "react-native";
import { useSelector, useDispatch} from 'react-redux';
import { BlurView, VibrancyView } from "@react-native-community/blur";
import {Account, Bank} from 'thenewboston' 
import EncryptedStorage from 'react-native-encrypted-storage'; 
import RNSingleSelect, {
  ISingleSelectDataType,
} from "@freakycoder/react-native-single-select"; 
import LinearGradient from 'react-native-linear-gradient'; 
import RNConfigReader from 'rn-config-reader';

//Component
import CustomButton from "components/CustomButton";
import CustomInput from "components/CustomInput";  
import InfoModalWidget from "components/InfoModalWidgets/InfoModalview"; 
import { IAppState } from 'store/store'; 

import { 
  ProtocolAction, 
  IpAddressAction, 
  PortAction, 
  NickNameAction } 
from 'actions/loginActions'

 
interface connects { 
  navigation: any; // TODO use navigation props type
  route: any;
} 
 
var Aes = NativeModules.Aes 
const { Ed25519JavaBridge } = NativeModules;

const connectScreen = ({navigation: {navigate}}: connects) => { 

  const dispatch = useDispatch(); 
  const { width: ScreenWidth } = Dimensions.get("window");
  const port = useSelector((state: IAppState) => state.loginState.port);
  const nickname = useSelector((state: IAppState) => state.loginState.nickName); 
  const protocol = useSelector((state: IAppState) => state.loginState.protocol);
  const ipAddress = useSelector((state: IAppState) => state.loginState.ipAddress);  
  const [lPort, setlPort] = useState<string>(port)
  const [lProtocol, setlProtocol] = useState<string>(protocol == null ? "http" : protocol)
  const protocolData: Array<ISingleSelectDataType> = [
    { id: 0, value: "HTTP" }, 
    { id: 1, value: "PROTOCOL" }, 
  ];
  const [dynamicData, setDynamicData] = React.useState<Array<ISingleSelectDataType>>([]);
  const [lNickName, setlNickName] = useState<string>(nickname) 
  const [lIpAddress, setlIpAddress] = useState<string>(ipAddress == "" ? RNConfigReader.SERVER_IP : ipAddress)
  const validator_IpAddress = RNConfigReader.VALIDATOR_SERVER_IP 
  const [dlgVisible, setDlgVisible] = useState(false)
  const [dlgMessage, setDlgMessage] = useState("") 
  const [loading, setLoading] = useState(false);
  const [isValid, setValid] = useState(false);    
  const ACCOUNT_MAX = 100; 

  useEffect(() => {   
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    getSeedESP();
    //handleLogin();
  }, []); 

  async function getSeedESP() {  
    setTimeout(() => {
      setDynamicData(protocolData);
    }, 2000);
  }  

  async function setKeyPair(exportPubKey, exportPriKey) {
    try {
      await EncryptedStorage.setItem(
          "keyPair",
          JSON.stringify({ 
            privateKey: exportPriKey,
            publicKey : exportPubKey, 
        })
      ); 
    } catch (error) {
       console.log(error);
    }
  } 

  const handleLogin = () =>{
    if(ipAddress == RNConfigReader.SERVER_IP && nickname != "" && protocol != ""){ 
      let bank_url = lProtocol + '://' + lIpAddress + ':' + port;
       navigate('login', {
        nickname: lNickName,
        accounts: null,
        validator_accounts: null,
        bank_url: bank_url, 
      });  
    }
  }

  const handleSubmit = async()=>{  
    
    if(lIpAddress == "" || lProtocol == null || !(lProtocol == "http" || 
    lProtocol == "HTTP" || lProtocol == "https" || lProtocol == "HTTPS")) {
      setDlgMessage("Please input IP address correctly!");
      setDlgVisible(true);
      return;
    } 

    if(lNickName == ""){ 
      setDlgMessage("Please input nickname!");
      setDlgVisible(true);
      return;
    }
    
    let bank_url = lProtocol + '://' + lIpAddress + ':' + port;
    
    try{  
      setLoading(true)  
      const bank = new Bank(bank_url);  
      const accounts = await bank.getAccounts();    
      let validator_rul = lProtocol + '://' + validator_IpAddress  
      console.log(validator_rul);
      const validator_bank = new Bank(validator_rul);   

      const allAccounts = await validator_bank.getAccounts({ limit: 1, offset: 0 }); 
      var validator_accounts = [];
      let account_size = allAccounts.count; 
      for(let i = 0; i < account_size; i += ACCOUNT_MAX){
        const part_accounts = await validator_bank.getAccounts({ limit: ACCOUNT_MAX, offset: i });  
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
          <RNSingleSelect
            data={dynamicData}
            arrowImageStyle={{width: 15, height: 10}}
            buttonContainerStyle={Style.buttonContainerStyle}
            menuItemTextStyle={Style.menuItemTextStyle}
            menuBarContainerStyle={Style.menuBarContainerStyle}
            placeholderTextStyle={Style.placeholderTextStyle}
            darkMode={true}
            width={ScreenWidth - 20}
            searchEnabled={false}
            menuBarContainerWidth={ScreenWidth - 20}
            menuBarContainerHeight={55 * 2}
            onSelect={(selectedItem: ISingleSelectDataType) => 
              setlProtocol(selectedItem.value) 
            }
            >

          </RNSingleSelect>

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

export default connectScreen
 