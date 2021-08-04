import { Colors, Typography } from 'styles';
import { Text, View, Modal} from 'react-native'; 
import { BlurView, VibrancyView } from "@react-native-community/blur";
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import Style from './Style'
import { useState } from 'react';  
import { useSelector, useDispatch} from 'react-redux'; 

import CustomButton from 'components/CustomButton';
import CustomInput from 'components/CustomInput' 
import InfoModalWidget from "components/InfoModalWidgets/InfoModalview"; 
import { IAppState } from 'store/store';
import { ProtocolAction, IpAddressAction, PortAction, NickNameAction } from 'actions/loginActions'

interface EditAccountPayload {
  nickname: string 
}

const EditAccountScreen = ({route, navigation}) => {
  const {nickname, setNickName} = route.params;     
  const dispatch = useDispatch();  
  const lNickname = useSelector((state: IAppState) => state.loginState.nickName);  
  const [data, setData] = useState<EditAccountPayload>({
    nickname: nickname, 
  }) 

  const [dlgMessage, setDlgMessage] = useState("");
  const [dlgVisible, setDlgVisible] = useState(false);

  const onSaveNickName = ()=>{  
    dispatch(NickNameAction(data.nickname)) 
    setDlgMessage("Success to save Nickname!")
    setDlgVisible(true); 
  }
  return (
    <View style={Style.container}>
    <View style={Style.formView}> 
        <CustomInput
            name="nickname"
            value={data.nickname}
            staticLabel={false}
            labelText="nickname"
            customInputStyle={{color:'white', fontSize: 15, fontWeight:'600'}}
            onChangeText={(value: string) => {
                setData({
                    ...data,
                    nickname: value
                });
            }} 
            autoCapitalize="none"
        /> 
            <CustomButton
                title="Save"
                onPress={onSaveNickName} 
                buttonColor={Colors.WHITE}
                loading={false}
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
                    <InfoModalWidget 
                        title={""}
                        message={dlgMessage} 
                        button={"Ok"} 
                        handleOk={() => {
                            setDlgVisible(false); 
                            setNickName(data.nickname)
                            navigation.goBack({nickname: data.nickname});
                    }} /> 
                </LinearGradient>  
            </Modal>
    </View>    
    </View>
);
};
 
export default EditAccountScreen