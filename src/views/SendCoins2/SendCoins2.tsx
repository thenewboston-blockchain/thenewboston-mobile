import { Colors, Custom, Typography } from "styles";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

import CustomButton from "../../components/CustomButton";
// components
import CustomInput from "../../components/CustomInput";
import CustomSelect from "../../components/CustomSelect";
import Style from "./Style";

const SendCoins1Screen = (props) => {
  const [amount, setAmount] = useState("");

  const [loading, setLoading] = useState(false);
  const [isValid, setValid] = useState(false);

  const froms = [{ label: "HTTP", value: "http" }];
  const tos = [{ label: "HTTP", value: "http" }];

  const handleSubmit = () => {
    props.navigation.navigate("login");
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
            onChangeText={(value: string) => {
              setAmount(value);
            }}
            customStyles={Style.inputContainerStyle}
            customInputStyle={Style.inputStyle}
            autoCapitalize="none"
            keyboardType="numeric"
          />

          <View style={Style.balanceContainer}>
            <Text style={Style.balanceHeading}>Account Balance</Text>
            <Text style={{ color: "#FFF" }}>52.659</Text>
          </View>

          <View style={Style.horizontalLine} />

          <View style={{ width: "100%" }}>
            <Text style={{ color: "#62737E" }}>
              Validator Fee{"   "}
              <Text style={Style.innerText}>1</Text>
            </Text>
            <Text style={Style.alignRight}>
              Total{"   "}
              <Text style={Style.innerText}>22</Text>
            </Text>
          </View>

          <Text style={{ color: "#62737E", width: "100%", marginTop: 10 }}>
            Bank Fee{"   "}
            <Text style={Style.innerText}>1</Text>
          </Text>

          <CustomButton
            title="Send"
            onPress={handleSubmit}
            disabled={!isValid}
            buttonColor={Colors.WHITE}
            loading={loading}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default SendCoins1Screen;
