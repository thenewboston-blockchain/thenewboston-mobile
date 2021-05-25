import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

import CreateAccountWidget from "../../components/CreateAccountWIdget/CreateAccountWidget";
import Style from "./Style";

interface createAccount {
  navigation: any // TODO use navigation props type
}

const CreateAccountScreen = ({navigation}: createAccount) => {
    return (
      <View style={Style.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
          <CreateAccountWidget
            title={`Create or Add \nAccount`}
            navigation={navigation}
          />
      </ScrollView>
    </View>
    );
};
 
export default CreateAccountScreen