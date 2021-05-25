import { Colors, Custom, Typography } from "../../styles";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";

import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CreateAccountWIdget/CustomInput";
import Style from "./Style";

const LoginPasswordScreen = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(false);
  const [isValid, setValid] = useState(false);

  const login = () => {
    navigation.navigate("login");
  };

  const handleSubmit = () => {
    navigation.navigate("login");
  };

  return (
    <View style={Style.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={Style.formView}>
          <Text style={[Typography.FONT_REGULAR, Style.heading]}>Login</Text>
          <Text
            style={[
              Typography.FONT_REGULAR,
              Custom.mt20,
              Custom.mb40,
              { color: "#63737E" },
            ]}
          >
            Please enter your nickname and password to login
          </Text>

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

          <CustomInput
            name="password"
            value={password}
            staticLabel={false}
            labelText="password"
            onChangeText={(value: string) => {
              setPassword(value);
            }}
            autoCapitalize="none"
            isPassword={true}
          />

          <CustomButton
            title="Login"
            onPress={login}
            disabled={!isValid}
            buttonColor={Colors.WHITE}
            loading={loading}
          />

          <CustomButton
            title="Create account"
            onPress={handleSubmit}
            disabled={!isValid}
            buttonColor={Colors.WHITE}
            loading={loading}
            customStyle={{ backgroundColor: "transparent", marginTop: 0 }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default LoginPasswordScreen;
