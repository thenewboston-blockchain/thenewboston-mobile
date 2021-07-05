import { Colors, Custom, Typography } from "styles";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import {Account, Bank, AccountPaymentHandler} from 'thenewboston' 
import CustomButton from "../../components/CustomButton";
// components
import CustomInput from "../../components/CustomInput";
import CustomSelect from "../../components/CustomSelect";
import Style from "./Style";

const SendCoins1Screen = (props) => {
  const [amount, setAmount] = useState(0); 
  const [loading, setLoading] = useState(false);
  const [isValid, setValid] = useState(false); 
  const [bankFee, setBankFee] = useState(0); 
  const [validatorFee, setValidaterFee] = useState(0); 
  const {from, to, bank_url, memo} = props.route.params;

  console.log(props.route.params);
  useEffect(() => {  
     getConfig();
    
  }, []);

  async function getConfig() {
    const bank = new Bank(bank_url)
    const config = await bank.getConfig();
    setBankFee(config.default_transaction_fee);
    setValidaterFee(config.primary_validator.default_transaction_fee)
    console.log(config);
  }

  const handleSendCoins =() =>{

  }

  const handleSubmit = async() => {
    setLoading(true);
    const sendersAccount = new Account(from.value); 
    const paymentHandlerOptions = {
      account: sendersAccount,
      bankUrl: bank_url,
    }; 
    
    const paymentHandler = new AccountPaymentHandler(paymentHandlerOptions); 
    await paymentHandler.init();
    
    //This can be a new Account object or just the recipients account number
    const recipientAccount = new Account(to.value); 
    
    try {
      // You can use this method to send memos as well
      await paymentHandler.sendCoins(recipientAccount, amount, memo).then((result)=>{
        console.log(result)
        setLoading(false);
      });
    }
    catch(err){
      console.log(err)
      setLoading(false);
    }
    
     
    //props.navigation.navigate("login");
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
              setAmount(value);
            }}
            customStyles={Style.inputContainerStyle}
            customInputStyle={Style.inputStyle}
            autoCapitalize="none"
            keyboardType="numeric" 
          />

          <View style={Style.balanceContainer}>
            <Text style={Style.balanceHeading}>Account Balance</Text>
            <Text style={{ color: "#FFF" }}> {from.balance} </Text>
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
            disabled={!isValid}  
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
    </View>
  );
};

export default SendCoins1Screen;
