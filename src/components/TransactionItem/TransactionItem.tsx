import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import Style from "./Style";
import { Custom } from "styles";

// svg
import Outbox from "../../assets/svg/Outbox.svg";
import Inbox from "../../assets/svg/Inbox.svg";
import ArrowUp from "../../assets/svg/ArrowUp.svg";
import ArrowDown from "../../assets/svg/ArrowDown.svg";

interface TransactionProps {
  transaction: any;
  showDate: Boolean;
}

const TransactionItem = ({ transaction, showDate }: TransactionProps) => {
  const [open, toggleOpen] = useState(false);

  return (
    <TouchableOpacity style={Style.container} onPress={() => toggleOpen(!open)}>
      {showDate ? (
        <View style={Style.dateContainer}>
          <Text style={Style.dateText}>{transaction.date}</Text>
        </View>
      ) : null}

      <View style={[Style.transactionContent, open ? Style.openContent : null]}>
        <View style={{ flex: 0.2 }}>
          {transaction.sent ? <Outbox /> : <Inbox />}
        </View>
        <View style={{ flex: 0.4, justifyContent: "space-between" }}>
          <Text style={Style.subHeading}>SENDER</Text>
          <Text style={Style.heading}>{transaction.sender}</Text>
        </View>
        <View style={{ flex: 0.35, justifyContent: "space-between" }}>
          <Text style={Style.subHeading}>AMOUNT</Text>
          <Text style={Style.heading}>
            {transaction.sent
              ? "-" + transaction.amount
              : "+" + transaction.amount}
          </Text>
        </View>
        <View
          style={{
            flex: 0.05,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {open ? <ArrowUp /> : <ArrowDown />}
        </View>
      </View>
      {open ? (
        <View style={Style.detailsContainer}>
          <Text style={[Style.subHeading, Custom.mb10]}>RECIPIENT</Text>
          <Text style={[Style.heading, Custom.mb10]}>
            {transaction.recipient}
          </Text>
          <Text style={[Style.subHeading, Custom.mb10]}>MEMO</Text>
          <Text style={[Style.heading, Custom.mb10]}>{transaction.memo}</Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

export default TransactionItem;
