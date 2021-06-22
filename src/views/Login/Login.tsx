import { Colors, Custom, Typography } from "styles";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

// components
import CustomButton from "../../components/CustomButton";
// svgs
import FingerPrint from "../../assets/svg/FingerPrint.svg";
import Style from "./Style";
import { TouchableOpacity } from "react-native-gesture-handler";

interface login {
  navigation: any,
  route: any
}

const LoginScreen = ({ navigation, route }:login) => {
  const [loading, setLoading] = useState(false);
  const [isValid, setValid] = useState(false);
 
  const goToPasswordLogin = () => { 
    navigation.navigate("loginPassword", {
      accounts: route.params.accounts,
      bank_url: route.params.bank_url, 
    });
  };

  const handleSubmit = () => {
    navigation.navigate("createAccount");
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
            Please scan your fingerprint to login
          </Text>

          <View style={[Custom.m40, Custom.mb40]}>
            <TouchableOpacity
              onPress={() => console.log("Scan fingerpring...")}
            >
              <FingerPrint />
            </TouchableOpacity>
          </View>

          <CustomButton
            title="Login with password"
            onPress={goToPasswordLogin}
            disabled={!isValid}
            buttonColor={Colors.WHITE}
            loading={loading}
            customStyle={{ marginTop: "30%" }}
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

export default LoginScreen;
