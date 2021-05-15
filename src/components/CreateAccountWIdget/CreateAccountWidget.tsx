import { Colors, Typography } from 'styles';
import { Text, View } from 'react-native';

import CustomButton from 'components/CustomButton';
import CustomInput from 'components/CustomInput';
import React from 'react';
import Style from './Style'
import { useState } from 'react';

interface createAccount {
    title: string,
    navigation: any
}

interface createAccountPayload {
    nickname: string
    key?: string
}

const NEW_ACCOUNT: string = "new"
const EXISTING_ACCOUNT: string = "add"

const CreateAccountWidget = (props: createAccount) => {
    const [activity, setActivity] = useState<string>(NEW_ACCOUNT)
    const [isValid,setValid] = useState(false);
    const [data, setData] = useState<createAccountPayload>({
        nickname: "",
        key:""
    })
    const [loading, setLoading] = useState<boolean>(false)

    const handleCreateAccount=()=>{
        props.navigation.navigate('overview')
    }

    const handleCancel=()=>{
        props.navigation.goBack(null)
    }
    
    return (
        <View style={Style.container}>
        <View style={Style.formView}>
          <Text style={[Typography.FONT_REGULAR, Style.heading]}>
            {props.title}
          </Text>
        <View style={Style.switch}>
            <Text style={activity===NEW_ACCOUNT?Style.active:Style.inactive } onPress={ () => { setActivity(NEW_ACCOUNT) } }>Create New Account</Text>
            <Text style={activity===EXISTING_ACCOUNT?Style.active:Style.inactive } onPress={ () => { setActivity(EXISTING_ACCOUNT) } }>Add Existing Account</Text>
        </View>
            <CustomInput
                name="nickname"
                value={data.nickname}
                staticLabel={false}
                labelText="nickname"
                onChangeText={(value: string) => {
                    setData({
                        ...data,
                        nickname: value
                    });
                }}
                autoCapitalize="none"
            />
            {activity === EXISTING_ACCOUNT &&
                <CustomInput
                    name="key"
                    value={data.key}
                    staticLabel={false}
                    labelText="signing key"
                    onChangeText={(value: string) => {
                        setData({
                            ...data,
                            key: value
                        });
                    }}
                    autoCapitalize="none"
                /> 
                }
                <CustomButton
                    title="Create"
                    onPress={handleCreateAccount}
                    disabled={!isValid}
                    buttonColor={Colors.WHITE}
                    loading={loading}
                />
                <CustomButton
                    title="Cancel"
                    onPress={handleCancel}
                    disabled={false}
                    buttonColor={Colors.WHITE}
                    loading={false}
                    customStyle={{ backgroundColor: "transparent", marginTop: 0 }}
                />
        </View>    
        </View>
    );
};
 
export default CreateAccountWidget

