import { Colors, Custom, Typography } from "styles";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

import CustomButton from "../../components/CustomButton";
// components
import CustomInput from "../../components/CustomInput";
import CustomSelect from "../../components/CustomSelect";
import Style from "./Style";

interface connect {
    navigation: any // TODO use navigation props type
}

const connectScreen = ({navigation: {navigate}}: connect) => {
  const [ipAddress, setIpaddress] = useState("");
  const [port, setPort] = useState("");
  const [nickname, setNickname] = useState("");
  const [protocol, setProtocol] = useState("");
  const [loading, setLoading] = useState(false);
  const [isValid,setValid] = useState(false);

  const protocols = [{ label: "HTTP", value: "http" }];

  const handleSubmit=()=>{
    navigate('login')
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
            selected={protocol}
            required={true}
            updateSelected={(selected: any) => setProtocol(selected)}
            customStyle={[Custom.mb20]}
            placeholder={{ label: "Protocol" }}
          />

          <CustomInput
            name="ipAddress"
            value={ipAddress}
            staticLabel={true}
            labelText="ip address"                      
            onChangeText={(value: string) => {
              setIpaddress(value);
            }}
            autoCapitalize="none"
          />

          <CustomInput
            name="port"
            value={port}
            staticLabel={false}
            labelText="port"
            onChangeText={(value: string) => {
              setPort(value);
            }}
            autoCapitalize="none"
          />

          <CustomInput
            name="nickname"
            value={nickname}
            staticLabel={false}
            labelText="nickname"
            onChangeText={(value: string) => {
              setNickname(value);
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
    </View>
  );
};

export default connectScreen;
