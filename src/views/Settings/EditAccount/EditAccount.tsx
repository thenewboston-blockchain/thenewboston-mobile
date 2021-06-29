import { Colors, Typography } from 'styles';
import { Text, View } from 'react-native'; 
import CustomButton from '../../../components/CustomButton';
import CustomInput from '../../../components/CustomInput' 
import React from 'react';
import Style from './Style'
import { useState } from 'react';  
import { IAppState } from '../../../store/store';
import { useSelector, useDispatch} from 'react-redux'; 
import { ProtocolAction, IpAddressAction, PortAction, NickNameAction } from '../../../actions/loginActions'

interface EditAccountPayload {
  nickname: string 
}

const EditAccountScreen = ({route, navigation}) => {
  const {nickname, navigationPanel} = route.params;    
  const dispatch = useDispatch();  
  const lNickname = useSelector((state: IAppState) => state.loginState.nickName);  
  const [data, setData] = useState<EditAccountPayload>({
    nickname: nickname, 
  }) 

  const onSaveNickName = ()=>{ 
    dispatch(NickNameAction(data.nickname)) 
    alert("Success to save Nickname!")
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
    </View>    
    </View>
);
};
 
export default EditAccountScreen