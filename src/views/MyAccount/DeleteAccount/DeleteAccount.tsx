import { Colors, Custom, Typography } from "../../../styles";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import Style from "./Style"; 

import ManSvg from "assets/svg/man-circle.svg"
import BalanceSvg from "assets/svg/balance.svg"
import PasswordSvg from "assets/svg/password.svg"   
import CustomButton from "components/CustomButton"; 

interface DoneModal {
  navigation?: any,
  title: string,
  message: string,
  yes: string,
  no: string,
  handleYes:Function,
  handleNo:Function,
  balance:string,
  nickname:string,
  account_number:string,
} 

const DeleteAccountScreen = (props: DoneModal) => {
  return (
    <View style={Style.container}> 
    <ScrollView showsVerticalScrollIndicator={false}>
        <View style={Style.formView}>
           
            <Text style={[Typography.FONT_REGULAR, Style.heading]}>
                {props.title}
            </Text>
            <Text style={[Typography.FONT_REGULAR, Style.message]}>
                {props.message}
            </Text>
            <View style={Style.contentView}>
              <View style={{ flex: 0.25 }}>
                <ManSvg/> 
              </View>
              <View style={{ flex: 0.75, flexDirection:'column'}}>
                <Text style={Style.subHeading}>Nickname</Text>
                <Text style={Style.subName}>{props.nickname}</Text>
              </View> 
            </View>
            <View style={Style.contentView}>
              <View style={{ flex: 0.25 }}>
                <BalanceSvg/> 
              </View>
              <View style={{ flex: 0.75, flexDirection:'column'}}>
                <Text style={Style.subHeading}>Account balance</Text>
                <Text style={Style.subName}>{props.balance}</Text>
              </View> 
            </View>
            <View style={Style.contentView}>
              <View style={{ flex: 0.25 }}>
                <PasswordSvg/> 
              </View>
              <View style={{ flex: 0.75, flexDirection:'column'}}>
                <Text style={Style.subHeading}>Account number</Text>
                <Text style={Style.subName}>{props.account_number}</Text>
              </View> 
            </View>
            <View style={Style.buttonView}>
              <View style={{flex:0.5}}>
              <CustomButton
                  title={props.no} 
                  loading={false}
                  onPress={props.handleNo} 
                  buttonColor={Colors.WHITE}  
                  customStyle={Style.yesButton} /> 
              </View>
              <View style={{flex:0.5}}>
              <CustomButton
                  title={props.yes} 
                  loading={false}
                  onPress={props.handleYes} 
                  buttonColor={Colors.WHITE}  
                  customStyle={Style.noButton} /> 
              </View> 
                
            </View>
         
        </View>
        </ScrollView>
    </View>
 
  );
};

export default DeleteAccountScreen;
