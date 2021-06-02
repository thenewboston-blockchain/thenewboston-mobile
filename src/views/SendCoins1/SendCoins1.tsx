import { Colors, Custom, Typography } from "styles";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

import CustomButton from "../../components/CustomButton";
// components
import CustomInput from "../../components/CustomInput";
import CustomSelect from "../../components/CustomSelect";
import Style from "./Style";

const SendCoins1Screen = (props) => {
  const [memo, setMemo] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [loading, setLoading] = useState(false);
  const [isValid, setValid] = useState(false);

  const froms = [{ label: "HTTP", value: "http" }];
  const tos = [{ label: "HTTP", value: "http" }];

  const handleSubmit = () => {
    props.navigation.navigate("sendcoins2");
  };

  return (
    <View style={Style.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={Style.formView}>
          <CustomSelect
            options={froms}
            selected={from}
            required={true}
            updateSelected={(selected: any) => setFrom(selected)}
            customStyle={[Custom.mb20]}
            placeholder={{ label: "From" }}
          />

          <CustomSelect
            options={tos}
            selected={to}
            required={true}
            updateSelected={(selected: any) => setTo(selected)}
            customStyle={[Custom.mb20]}
            placeholder={{ label: "To" }}
          />

          <CustomInput
            name="memo"
            value={memo}
            staticLabel={false}
            labelText="memo"
            onChangeText={(value: string) => {
              setMemo(value);
            }}
            autoCapitalize="none"
          />

          <CustomButton
            title="Next"
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
