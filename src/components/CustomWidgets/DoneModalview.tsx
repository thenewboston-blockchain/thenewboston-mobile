import { Colors, Custom, Typography } from "../../styles";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import DoneSvg from "assets/svg/Done.svg"
 

// components 

import Style from "./Style";
import CustomButton from "../CustomButton";

interface DoneModal {
  navigation?: any,
  title: string,
  message: string,
  button: string,
  handleOk:Function
} 

const DoneModalScreen = (props: DoneModal) => {
  return (
    <View style={Style.container}> 
        <View style={Style.formView}>
            <DoneSvg width="15%" height="15%"/>
            <Text style={[Typography.FONT_REGULAR, Style.heading]}>
                {props.title}
            </Text>
            <Text style={[Typography.FONT_REGULAR, Style.message]}>
                {props.message}
            </Text>
            <CustomButton
                title={props.button} 
                loading={false}
                onPress={props.handleOk} 
                buttonColor={Colors.WHITE}  
                customStyle={Style.button} /> 
        </View>
    </View>
 
  );
};

export default DoneModalScreen;
