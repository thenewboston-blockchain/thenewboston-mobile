import { Colors, Custom, Typography } from "styles";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

// components
import CreateAccountWidget from "components/CreateAccountWIdget/CreateAccountWidget";

import Style from "./Style";

interface createAccount {
  navigation: any; // TODO use navigation props type
}

const CreateAccountScreen = ({ navigation }: createAccount) => {
  return (
    <View style={Style.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CreateAccountWidget
          title={"Create or Add Account"}
          navigation={navigation}
          handleCancel={()=>navigation.goBack(null)}
        />
      </ScrollView>
    </View>
  );
};

export default CreateAccountScreen;
