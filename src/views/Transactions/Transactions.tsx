import { Colors, Custom, Typography } from "styles";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
} from "react-native";
import Style from "./Style";

// components
import TransactionItem from "../../components/TransactionItem/TransactionItem";

// svg

const TransactionsScreen = () => {
  const [transactions, setTransactions] = useState(testTransactions);

  return (
    <View style={Style.container}>
      <View style={{ alignItems: "center" }}>
        <Text style={[Custom.mb10, { color: "#62737E" }]}>John Doe,</Text>
        <Text style={Style.heading}>Transactions</Text>
      </View>

      <FlatList
        data={transactions}
        renderItem={({ item, index }) => (
          <TransactionItem
            transaction={item}
            showDate={
              index == 0 || item.date != transactions[index - 1].date
                ? true
                : false
            }
          />
        )}
        keyExtractor={(item, index) => "key" + index}
      />
    </View>
  );
};

export default TransactionsScreen;

const testTransactions = [
  {
    sender: "John Doe",
    amount: 0.5,
    recipient: "Kevin459",
    memo: "09012913798728648298391032",
    date: "04.30.2021",
    sent: true,
  },
  {
    sender: "John Doe",
    amount: 0.5,
    recipient: "Kevin459",
    memo: "09012913798728648298391032",
    date: "04.30.2021",
    sent: true,
  },
  {
    sender: "John Doe",
    amount: 0.5,
    recipient: "Kevin459",
    memo: "09012913798728648298391032",
    date: "04.30.2021",
    sent: false,
  },
  {
    sender: "Steven789",
    amount: 0.5,
    recipient: "Kevin459",
    memo: "09012913798728648298391032",
    date: "05.30.2021",
    sent: false,
  },
  {
    sender: "John Doe",
    amount: 0.5,
    recipient: "Kevin459",
    memo: "09012913798728648298391032",
    date: "05.30.2021",
    sent: true,
  },
  {
    sender: "John Doe",
    amount: 0.5,
    recipient: "Kevin459",
    memo: "09012913798728648298391032",
    date: "05.30.2021",
    sent: true,
  },
];
