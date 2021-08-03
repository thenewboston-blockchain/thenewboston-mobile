import { Colors, Custom, Typography } from "styles";
import React, { useEffect, useState } from "react"; 
import { ScrollView, Text, View, BackHandler, Modal} from "react-native";
import Style from "./Style";  
import LinearGradient from 'react-native-linear-gradient';
import { BlurView, VibrancyView } from "@react-native-community/blur"; 

import CustomButton from "components/CustomButton";   
import YesNoModalViewScreen from "components/InfoModalWidgets/YesNoModalview";  
import SettingPanel from "components/SettingPanel/SettingPanel"; 
 

const SettingsScreen = ({ route, navigation }) => {

    const [viewRef, setViewRef] = useState(null);  
    const {nickname} = route.params;    
    const [dlgMessage, setDlgMessage] = useState("Are you sure want to exit?");
    const [dlgVisible, setDlgVisible] = useState(false);
    const handleExit = () => { 
        BackHandler.exitApp();
    };
    
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
            <CustomButton
                title="Exit"
                onPress={()=>{setDlgVisible(true)}}
                buttonColor={Colors.WHITE}
                loading={false}
                customStyle={Style.deleteButton}
            />
             <CustomButton
                title=""
                onPress={()=>{}} 
                loading={false}
                customStyle={Style.bottomArea}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={dlgVisible}  
                onRequestClose={() => {
        
                }}  
            >
                <BlurView
                style={Style.absolute}
                blurType="dark"
                blurAmount={5}
                reducedTransparencyFallbackColor="white"
                />
                    
                <LinearGradient start={{x: 0, y: 1}} end={{x: 0, y: 0}} colors={['rgba(29, 39, 49, 0.9)', 'rgba(53, 96, 104, 0.9)']} style={Style.doInofContainer}>
                    <YesNoModalViewScreen 
                        title={""}
                        message={dlgMessage} 
                        yes={"Yes"} 
                        no={"No"} 
                        handleYes={() => {
                            handleExit();
                            setDlgVisible(false);
                        }}
                        handleNo={() => {
                            setDlgVisible(false);
                        }}
                    /> 
                </LinearGradient>  
            </Modal>
    </View> 
    );
};

export default SettingsScreen;
