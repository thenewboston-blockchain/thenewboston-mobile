import React, { useState } from 'react';

import { Colors } from '../../styles';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import Style from './Style'
import { View } from 'react-native';

interface editAccountPayload {
  nickname: string
  key?: string
}

const EditAccountScreen = () => {
  const [data, setData] = useState<editAccountPayload>({
    nickname: "",
    key:""
  })
  
  const handleCreateAccount=()=>{
    console.log('account edited')
}
    return (
      <View style={Style.container}>
        <CustomInput
          name="key"
          value={data.key}
          staticLabel={false}
          labelText="NICKNAME"
          onChangeText={(value: string) => {
              setData({
                  ...data,
                  key: value
              });
          }}
          autoCapitalize="none"
        /> 
        <CustomButton
            title="Save"
            onPress={handleCreateAccount}
            disabled={false}
            buttonColor={Colors.WHITE}
            loading={false}
        />
      </View>
    );
};
 
export default EditAccountScreen