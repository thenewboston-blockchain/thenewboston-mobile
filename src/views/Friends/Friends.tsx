import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import AccountNumber from '../../components/AccountNumber/AccountNumber';
import Accounts from '../../components/Accounts/Accounts';
import Copy from "../../assets/svg/Copy.svg";
import { Custom } from '../../styles';
import Refresh from "../../assets/svg/Refresh.svg";
import Style from './Style'

const FriendsScreen = () => {
  const [accounts, setAccoiunts] = useState([
    { active: true, name: "Liam Manson" },
    { active: false, name: "Taylor Swift" },
  ]);

    return (
      <View style={Style.container}>
        <View style={{ alignItems: "center" }}>
          <Text style={Style.heading}>My Friends</Text>
          <Accounts accounts={accounts} />
        </View>
        <View>
            <Text style={[Style.activeAccountHeading]}>Liam 594</Text>
        </View>
        <View style={[Custom.row, Custom.mt30]}>
          <View>
            <Text style={[Style.subHeading]}>Friend’s account balance</Text>
            <Text style={[Style.heading]}>31.856</Text>
          </View>
          <TouchableOpacity
            style={Style.refreshbutton}
            onPress={() => console.log("refresh")}
          >
            <Refresh />
          </TouchableOpacity>
        </View>
        <View style={Style.acountNumber}>
          <AccountNumber
          icons={[<Copy/>]}
          title={'friend’s Account Number'}
          accountNumber={
            "c7c69c0abe97c2e0bbc2394e11e971d3fb0a75ba96c5d7262fb5272bb5ec7f6a"
          }
        />
        </View>
      </View>
    );
};
 
export default FriendsScreen