import { Alert, ScrollView, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";

import { Colors } from "../../styles";
import CreateAccountWidget from '../../components/CreateAccountWIdget/CreateAccountWidget';
import CustomButton from "../../components/CustomButton";
import Icon from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";
import { Modalize } from 'react-native-modalize';
import Style from "./Style";

interface createAccount {
  navigation: any // TODO use navigation props type
}

export const sendCoins = () => {
  
}
const OverviewScreen = ({ navigation }: createAccount) => {
  const modalizeRef = useRef<Modalize>(null);
  const [title, setTitle] = useState<String>('John Doe')
  const [loading, setLoading] = useState<boolean>(false)
  
  const addAccount = () => {
    modalizeRef.current?.open();
  };

    return (
      <View style={Style.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Text style={Style.heading}>John Doe</Text>
          </View>
          <ScrollView horizontal={true}>
            <View style={Style.accountManagement}>
              <View style={Style.accounts}>
                <Text adjustsFontSizeToFit={true} style={[Style.active ]}>JD</Text>
                <Text adjustsFontSizeToFit={true} style={Style.accountPrefix}>RT</Text>
                <Text adjustsFontSizeToFit={true} style={Style.accountPrefix}>HJ</Text>
                <Text adjustsFontSizeToFit={true} style={Style.accountPrefix}>BS</Text>
              </View>
              {/* NOTE make last item fix and other items should be scroll able */}
              <Text adjustsFontSizeToFit={true} style={Style.addAccount}><Icon name="add" size={30} color="#FFF" onPress={ () => addAccount()}/></Text>
            </View>
          </ScrollView>
          <View>
            <Text style={Style.balanceHeading}>My Account balance</Text>
            <View style={Style.amountBlock}>
              <Text style={Style.balance}>52.659</Text>
              <Icon name="reload" size={40} color="#62737E" style={Style.refreshBalance}/>
            </View>
          </View>
          <CustomButton
            title="Send coins"
            onPress={sendCoins}
            disabled={false}
            buttonColor={Colors.WHITE}
            loading={loading}
            customStyle={{ width: 170, height:50, marginTop: 20 }}
          />
          <View style={Style.panel}>
            <View style={Style.panelHeader}>
              <Text style={Style.panelTitle}>My Account Number</Text>
              <View style={Style.panelActions}>
                <Icon name="send-outline" size={20} color="#62737E" style={Style.actionIcon}/>
                <Icon name="copy-outline" size={20} color="#62737E"style={Style.actionIcon}/>
              </View>
            </View>
            <Text style={Style.panelBody}>c7c69c0abe97c2e0bbc2394e11e971d3fb0a75ba96c5d7262fb5272bb5ec7f6a</Text>
          </View>
          <View style={Style.panel}>
            <View style={Style.panelHeader}>
              <Text style={Style.panelTitle}>My Sign Key</Text>
              <View style={Style.panelActions}>
                <Icon name="download-outline" size={20} color="#62737E" style={Style.actionIcon} />
                {/* NOTE: Toggle Icon */}
                <Icon name="eye-outline" size={20} color="#62737E" style={Style.actionIcon} />
                <Icon name="copy-outline" size={20} color="#62737E"style={Style.actionIcon} />
              </View>
            </View>
            <Text style={Style.panelBody}>••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••</Text>
          </View>

          <CustomButton
            title="Delete Account"
            onPress={() => {
              Alert.alert("Account deleted")
            }}
            disabled={true}
            buttonColor={Colors.WHITE}
            loading={loading}
            customStyle={{ backgroundColor: "transparent", marginTop: 0, borderWidth:1, borderColor:"#2B4150" }}
          />
        </ScrollView>
        <Modalize
          rootStyle={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 9998,
          }}
          ref={modalizeRef}
          
        >
          {/* TODO: convert this to a reuseable able component */}
          <View>
            <LinearGradient
              colors={["#62737E", "#040505"]}
              style={{ flex: 1, padding: 10,}}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              locations={[0, 0.35]}
            >
              <CreateAccountWidget
                title={`Create or Add Account`}
                navigation={navigation}
              />
            </LinearGradient>
          </View>
        </Modalize>
    </View>
    );
};
 
export default OverviewScreen