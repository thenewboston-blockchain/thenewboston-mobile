// @flow
import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Platform,
} from "react-native";
import { Avatar } from "react-native-elements";
import Style from "./Style";

interface ListItem {
  active?: boolean;
  onPress: () => void;
  text?: string;
  style: any;
  icon?: any;
  noname?:boolean; 
}

const Touchable = Platform.select({
  web: ({ ...props }) => (
    <TouchableHighlight underlayColor="#6284d7" {...props} />
  ),
  default: TouchableOpacity,
});

const getInitials = (name, noname) => {
  if(noname == true){
    return name;
  }
  else{
    var matches = name.match(/\b(\w)/g);
    return matches.join("").toUpperCase();
  }
  
};
const ListItemButton = ({ active, onPress, text, style, icon , noname}: ListItem, props) => {
  const textStyle = [Style.text];
  style = [style];

  if (active) {
    // containerStyle.push(Style.containerActive);
    textStyle.push(Style.textActive);
    style.push(Style.activeButton);
  }

  return (
    <Touchable
      style={style}
      onPress={() => {
        onPress && onPress();
      }}
    >
      {text ? (
        <View style={{ alignItems: "center" }}>
          <Avatar
            size={56}
            rounded
            title={getInitials(text, noname)} 
            activeOpacity={0.7}
            titleStyle={{ fontSize: 18, fontWeight: "600" }}
            containerStyle={{
              borderColor: "#2B4150",
              borderWidth: 0.7,
              backgroundColor: active ? "#DC0D16" : null,
            }}
          />
          {active ? (
            <Text style={{ color: "#62737E", fontSize: 10, margin: 10 }}>
              {text}
            </Text>
          ) : null}
        </View>
      ) : (
        <View style={Style.listItemStyle}>{icon && icon}</View>
      )}
    </Touchable>
  );
};

export default ListItemButton;
