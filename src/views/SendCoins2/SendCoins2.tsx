import { Colors, Custom, Typography } from "styles";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, Modal } from "react-native";
import {Account, Bank, AccountPaymentHandler} from 'thenewboston/dist/index.js';
import Style from "./Style";
import { BlurView } from "@react-native-community/blur";
import LinearGradient from 'react-native-linear-gradient';
import RNConfigReader from 'rn-config-reader';

import CustomButton from "components/CustomButton"; 
import CustomInput from "components/CustomInput"; 
import InfoModalWidget from "components/InfoModalWidgets/InfoModalview";  

const SendCoins1Screen = (props) => {
  const [amount, setAmount] = useState(0); 
  const [loading, setLoading] = useState(false);
  const [isValid, setValid] = useState(false); 
  const [bankFee, setBankFee] = useState(0); 
  const [validatorFee, setValidaterFee] = useState(0); 
  const [dlgMessage, setDlgMessage] = useState("");
  const [dlgVisible, setDlgVisible] = useState(false); 
  const {from, to, bank_url, memo} = props.route.params;
 
  const [accountBalance, setAccountBallance] = useState(from.balance);

  console.log(props.route.params);
  useEffect(() => {  
     getConfig();
    
  }, []);

  const validURL = (url) =>{
    const PROTOCOL = "HTTP";
    const PORT = "80";
    if(url.substr("http") > 0 || url.substr("HTTP") > 0){
      return url;
    }
    if(url == ""){
      url = RNConfigReader.SERVER_IP;
    }
    return PROTOCOL + '://' + url + ':' + PORT;
  }

  async function getConfig() {
    const bank = new Bank(validURL(bank_url))
    const config = await bank.getConfig();
    setBankFee(config.default_transaction_fee);
    setValidaterFee(config.primary_validator.default_transaction_fee)
    console.log(config);
  }

  const handleSendCoins =() =>{

  }

  const handleSubmit = async() => {
    if(amount > 0){
      setLoading(true);
      const sendersAccount = new Account(from.value);  
      const paymentHandlerOptions = {
        account: sendersAccount,
        bankUrl: bank_url,
      }; 
      
      const paymentHandler = new AccountPaymentHandler(paymentHandlerOptions); 
      await paymentHandler.init(); 
      const recipientAccount = new Account(to.value);   
      try {  
        await paymentHandler.sendCoins(recipientAccount, amount, memo).then((result)=>{
          console.log('result = ', result)
          setLoading(false);
          setDlgMessage("Success to send coin!"); 
          setDlgVisible(true); 
          from.Balance = from.Balance - parseFloat(String(amount)) + validatorFee + bankFee
          setAccountBallance(from.Balance);
        });
      }
      catch(err){
        console.log('error = ', err)
        setLoading(false);
        setDlgMessage("Failed to send coin!");
        setDlgVisible(true);
      }
      
    }  
  };

  return (
    <View style={Style.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={Style.formView}>
          <CustomInput
            name="amount"
            value={amount}
            staticLabel={false}
            labelText="amount *"
            onChangeText={(value: number) => {
              if(value <= accountBalance){ 
                setAmount(value);
              }
              
            }}
            customStyles={Style.inputContainerStyle}
            customInputStyle={Style.inputStyle}
            autoCapitalize="none"
            keyboardType="numeric" 
          />

          <View style={Style.balanceContainer}>
            <Text style={Style.balanceHeading}>Account Balance</Text>
            <Text style={{ color: "#FFF" }}> {accountBalance} </Text>
          </View>

          <View style={Style.horizontalLine} />

          <View style={{ width: "100%" }}>
            <Text style={{ color: "#62737E" }}>
              Validator Fee{"   "}
              <Text style={Style.innerText}> {validatorFee} </Text>
            </Text>
            <Text style={Style.alignRight}>
              Total{"   "}
              <Text style={Style.innerText}>{parseFloat(String(amount)) + validatorFee + bankFee}</Text>
            </Text>
          </View>

          <Text style={{ color: "#62737E", width: "100%", marginTop: 10 }}>
            Bank Fee{"   "}
            <Text style={Style.innerText}> {bankFee} </Text>
          </Text>

          <CustomButton
            title="Send"
            onPress={handleSubmit}
            isDisable={amount <= 0}  
            buttonColor={Colors.WHITE}
            loading={loading} 
          /> 
        </View>
        <CustomButton
          title=""
          onPress={handleSendCoins}
          buttonColor={Colors.WHITE}
          loading={loading}
          customStyle={Style.bottomArea}
        />
      </ScrollView>
      <Modal
        animationType="fade"
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

export default SendCoins1Screen;
