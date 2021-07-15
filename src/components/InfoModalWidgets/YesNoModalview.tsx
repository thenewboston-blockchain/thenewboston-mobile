import { Colors, Custom, Typography } from "../../styles";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import DoneSvg from "../../assets/svg/Done.svg"
 

// components 

import Style from "./Style";
import CustomButton from "../CustomButton";

interface DoneModal {
  navigation?: any,
  title: string,
  message: string,
  yes: string,
  no: string,
  handleYes:Function,
  handleNo:Function,
} 

const YesNoModalViewScreen = (props: DoneModal) => {
  return (
    <View style={Style.container}> 
        <View style={Style.formView}>
            {/* <DoneSvg width="15%" height="15%"/> */}
            <Text style={[Typography.FONT_REGULAR, Style.heading]}>
                {props.title}
            </Text>
            <Text style={[Typography.FONT_REGULAR, Style.message]}>
                {props.message}
            </Text>
            <View style={Style.buttonView}>
              <View style={{flex:0.5}}>
              <CustomButton
                  title={props.yes} 
                  loading={false}
                  onPress={props.handleYes} 
                  buttonColor={Colors.WHITE}  
                  customStyle={Style.yesButton} /> 
              </View>
              <View style={{flex:0.5}}>
              <CustomButton
                  title={props.no} 
                  loading={false}
                  onPress={props.handleNo} 
                  buttonColor={Colors.WHITE}  
                  customStyle={Style.noButton} /> 
              </View> 
                
            </View>
            
        </View>
    </View>
 
  );
};

export default YesNoModalViewScreen;
