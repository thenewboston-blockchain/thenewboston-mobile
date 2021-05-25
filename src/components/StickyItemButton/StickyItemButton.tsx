// @flow
import React from "react";
import Style from './Style';

// svg
import Add from '../../assets/svg/Add.svg';
import ListItemButton from "../ListItemButton/ListItemButton";

interface StickyItem {
  onPress: () => void;
}

const StickyItemButton = ({ onPress }: StickyItem) => (
  <ListItemButton style={Style.button} onPress={onPress} icon={<Add />} />
);



export default StickyItemButton;
