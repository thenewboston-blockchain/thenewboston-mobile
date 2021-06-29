import { Colors, Custom, Typography } from "styles";
import React, { useEffect, useState } from "react";

import { ScrollView, Text, TouchableOpacity, View, Modal } from "react-native";
import Style from "./Style";


// components
import Accounts from "../../components/Accounts/Accounts";
import CustomButton from "../../components/CustomButton";
import AccountNumber from "../../components/AccountNumber/AccountNumber";
import SignKey from "../../components/SignKey/SignKey";

import CreateAccountWidget from "../../components/CreateAccountWIdget/CreateAccountWidget";
import DoneModalViewWidget from "../../components/CustomWidgets/DoneModalview";
import BottomDrawer from "react-native-bottom-drawer-view";
import { BlurView, VibrancyView } from "@react-native-community/blur";
 
import SettingPanel from "../../components/SettingPanel/SettingPanel";

const TAB_BAR_HEIGHT = 20;
const DOWN_DISPLAY = 50;
 

const SettingsScreen = ({ route, navigation }) => {

    const [viewRef, setViewRef] = useState(null);  
    const {nickname} = route.params;    
    
    return (
        <View style={Style.container}  ref={(viewRef) => { setViewRef(viewRef); }}> 
            <View style={{ alignItems: "center"}} >
            <Text style={Style.heading}>{'Settings'}</Text>  
            </View>  

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={[Custom.row, Custom.mt30]}> 
                    <SettingPanel
                        nickname={nickname}
                        onEditAccount={() => {  
                            navigation.navigate('editaccount'); 
                        }}
                    /> 
                </View>  
            </ScrollView>  
    </View> 
    );
};

export default SettingsScreen;
