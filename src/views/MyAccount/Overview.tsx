import { Colors, Custom, Typography } from "styles";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import AccountNumber from "../../components/AccountNumber/AccountNumber";
// components
import Accounts from "../../components/Accounts/Accounts";
import Copy from "../../assets/svg/Copy.svg";
import CustomButton from "../../components/CustomButton";
// svg
import Refresh from "../../assets/svg/Refresh.svg";
import Share from "../../assets/svg/Share.svg";
import SignKey from "../../components/SignKey/SignKey";
import Style from "./Style";

const OverviewScreen = () => {
  const [accounts, setAccoiunts] = useState([
    { active: true, name: "John Doe" },
    { active: false, name: "Rob Tin" },
    { active: false, name: "Hissein Johnson" },
    { active: false, name: "Brad Scott" },
  ]);
  const [loading, setLoading] = useState(false);

  const handleSendCoins = () => {
    console.log("send coins");
  };

  return (
    <View style={Style.container}>
      <View style={{ alignItems: "center" }}>
        <Text style={Style.heading}>John Doe</Text>
        <Accounts accounts={accounts} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[Custom.row, Custom.mt30]}>
          <View>
            <Text style={[Style.subHeading]}>MY ACCOUNT BALANCE</Text>
            <Text style={[Style.heading]}>52.659</Text>
          </View>
          <TouchableOpacity
            style={Style.refreshbutton}
            onPress={() => console.log("refresh")}
          >
            <Refresh />
          </TouchableOpacity>
        </View>

        {/* send coins  */}
        <CustomButton
          title="Send Coins"
          onPress={handleSendCoins}
          buttonColor={Colors.WHITE}
          loading={loading}
          customStyle={{ width: "35%" }}
        />

        <AccountNumber
          title={'MY ACCOUNT NUMBER'}
          icons={[<Share/>, <Copy/>]}
          accountNumber={
            "c7c69c0abe97c2e0bbc2394e11e971d3fb0a75ba96c5d7262fb5272bb5ec7f6a"
          }
        />
        <SignKey
          signKey={
            "................................................................................"
          }
        />

        <CustomButton
          title="Delete Account"
          onPress={handleSendCoins}
          buttonColor={Colors.WHITE}
          loading={loading}
          customStyle={Style.deleteButton}
        />
      </ScrollView>
    </View>
  );
};

export default OverviewScreen;
