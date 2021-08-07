import { Colors, Custom, Typography } from "styles";
import React, { useEffect, useState } from "react"; 
import { ScrollView, Text, View, BackHandler, Modal} from "react-native";
import Style from "./Style";  
import LinearGradient from 'react-native-linear-gradient';
import { BlurView, VibrancyView } from "@react-native-community/blur"; 
import GestureRecognizer from 'react-native-swipe-gestures';

import CustomButton from "components/CustomButton";   
import YesNoModalViewScreen from "components/InfoModalWidgets/YesNoModalview";  
import SettingPanel from "components/SettingPanel/SettingPanel"; 
 

const SettingsScreen = ({ route, navigation }) => {

    const [viewRef, setViewRef] = useState(null);  
    const {nickname} = route.params 
    const [lNickname, setlNickName] = useState(nickname);    
    const [dlgMessage, setDlgMessage] = useState("Are you sure want to exit?");
    const [dlgVisible, setDlgVisible] = useState(false);
    const handleExit = () => { 
        BackHandler.exitApp();
    };

    const onSetNickName = (updateName) =>{
        setlNickName(updateName)
    } 

    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 50
    };

    const onSwipeRight = (state) =>{
        navigation.navigate('friends')
    }
    
    return (
        <View style={Style.container}  ref={(viewRef) => { setViewRef(viewRef); }}> 
        <GestureRecognizer  
            onSwipeRight={(state) => onSwipeRight(state)} 
            config={config} 
            style={Style.container}
        >
            <View style={{ alignItems: "center"}} >
            <Text style={Style.heading}>{'Settings'}</Text>  
            </View>  

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={[Custom.row, Custom.mt30]}> 
                    <SettingPanel
                        nickname={lNickname}  
                        onEditAccount={() => {  
                            navigation.navigate('editaccount', {nickname: lNickname, setNickName: onSetNickName}); 
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
        </GestureRecognizer>
    </View> 
    );
};

export default SettingsScreen;
