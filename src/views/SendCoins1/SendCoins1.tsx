import { Colors, Custom, Typography } from "styles";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, Dimensions } from "react-native"; 
import { useSelector, useDispatch} from 'react-redux'; 
import RNSingleSelect, {
  ISingleSelectDataType,
} from "@freakycoder/react-native-single-select";
import Style from "./Style";  
import CustomButton from "components/CustomButton"; 
import CustomInput from "components/CustomInput"; 
import { IAppState } from 'store/store'; 


const SendCoins1Screen = (props) => {
  const dispatch = useDispatch(); 
  const lAccounts = useSelector((state: IAppState) => state.accountState.account);
  const lFriends = useSelector((state: IAppState) => state.friendState.friend);
  const [myAccounts, setMyAccounts] = useState(lAccounts == null ? [] : lAccounts); 
  const [friends, setFriends] = useState(lFriends == null ? [] : lFriends); 
  const {bank_url} = props.route.params; 
  const [fromData, setFromData] = React.useState<Array<ISingleSelectDataType>>([]);
  const [toData, setToData] = React.useState<Array<ISingleSelectDataType>>([]);
  const [memo, setMemo] = useState(""); 
  const { width: ScreenWidth } = Dimensions.get("window");

  const [loading, setLoading] = useState(false);
  const [isValid, setValid] = useState(false);

  const _from = friends.map(item => ( 
    {  
      label: item.name,
      value: item.account_number,
      balance: item.balance,
      color: "#62737E", 
    }
  ));
  const [froms, setFroms] = useState(_from);  
 

  const _tos = friends.map(item => ( 
    {  
      label: item.name,
      value: item.account_number,
      balance: item.balance,
      color: "#62737E"
    }
  ));
  const [tos, setTos] = useState(_tos);   
  const [from, setFrom] = useState("Select"); 
  const [to, setTo] = useState("To");  

  useEffect(() => {   

    setTimeout(() => {
      var fromDatas: Array<ISingleSelectDataType> = [];
      froms.map((item, i) => {
        let oneData :ISingleSelectDataType = {id: i, data: item.value, value: item.label}
        fromDatas.push(oneData);
      });  
      setFromData(fromDatas);

      var toDatas: Array<ISingleSelectDataType> = [];
      tos.map((item, i) => {
        let oneData :ISingleSelectDataType = {id: i, data: item.value, value: item.label}
        toDatas.push(oneData);
      });  
      setToData(toDatas);

    }, 2000);
  }, []);
 

  const handleSubmit = () => {
    let selectFrom; 
    froms.map(item =>{
      if(item.label == from){
        selectFrom = item
      }
    })
    let selectTo; 
    tos.map(item =>{
      if(item.label == to){
        selectTo = item
      }
    })
    console.log(selectTo)
    if(selectFrom != null && selectTo != null){
      props.navigation.navigate("sendcoins2",{
        from: selectFrom,
        to: selectTo,
        memo: memo,
        bank_url: bank_url,
      });
    }
    
  }; 

  return (
    <View style={Style.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={Style.formView} > 
          <RNSingleSelect
            data={fromData}
            arrowImageStyle={{width: 15, height: 10}}
            buttonContainerStyle={Style.buttonContainerStyle}
            menuItemTextStyle={Style.menuItemTextStyle}
            menuBarContainerStyle={Style.menuBarContainerStyle}
            placeholderTextStyle={Style.placeholderTextStyle}
            darkMode={true}
            width={ScreenWidth - 20}
            searchEnabled={false} 
            menuBarContainerWidth={ScreenWidth - 20}
            spinnerType={"Pulse"} 
            menuBarContainerHeight={95 * fromData.length}  
            onSelect={(selectedItem: ISingleSelectDataType) => {  
              setFrom(selectedItem.value)
            }} 
            >
            </RNSingleSelect> 
          <RNSingleSelect
            data={toData}
            arrowImageStyle={{width: 15, height: 10}}
            buttonContainerStyle={Style.buttonContainerStyle}
            menuItemTextStyle={Style.menuItemTextStyle}
            menuBarContainerStyle={Style.menuBarContainerStyle}
            placeholderTextStyle={Style.placeholderTextStyle}
            darkMode={true}
            width={ScreenWidth - 20}
            searchEnabled={false}
            menuBarContainerWidth={ScreenWidth - 20}
            menuBarContainerHeight={95 * toData.length}
            onSelect={(selectedItem: ISingleSelectDataType) =>  
              setTo(selectedItem.value) 
            }
            > 
            </RNSingleSelect>
          <CustomInput
            name="memo"
            value={memo}
            staticLabel={false}
            labelText="memo"
            onChangeText={(value: string) => {
              setMemo(value);
            }}
            autoCapitalize="none"
          />  

          <CustomButton
            title="Next"
            onPress={handleSubmit}
            disabled={!isValid}
            buttonColor={Colors.WHITE}
            loading={loading}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default SendCoins1Screen;
