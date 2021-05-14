import React, { useState, useEffect } from "react";
import Style from "./Style";
import { View, Text, ScrollView } from "react-native";
import { Custom, Typography,Colors } from "styles";

// components
import CustomInput from "../../components/CustomInput";
import CustomSelect from "../../components/CustomSelect";
import CustomButton from "../../components/CustomButton";


const CreateAccountScreen = ({navigation}) => {
  const [ipAddress, setIpaddress] = useState("");
  const [port, setPort] = useState("");
  const [nickname, setNickname] = useState("");
  const [protocol, setProtocol] = useState("");
  const [loading, setLoading] = useState(false);
  const [isValid,setValid] = useState(false);

  const protocols = [{ label: "HTTP", value: "http" }];

  const handleSubmit=()=>{
    navigation.navigate('login')
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
            labelText={
              <View style={Custom.row}>
                <Text style={Style.labelStyle}>ip address</Text>
                <Text style={(Style.labelStyle, { color: "red" })}>*</Text>
              </View>
            }
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

export default CreateAccountScreen;
