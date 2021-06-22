import React from "react";
import {
  View,
  Dimensions,
  Animated,
  ScrollView,
} from "react-native";
import ListItemButton from "../ListItemButton/ListItemButton";
import StickyItemButton from "../StickyItemButton/StickyItemButton";
import Style from './Style';

interface Account {
  name: string;
  active: boolean;
}

interface Accounts {
  accounts: Account[];
  handleTransIndex: Function;
  addAccount:Function;
  
}

const ACCOUNTS_ICON_WIDTH = 44;
const ACCOUNTS_BUTTON_WIDTH = 130;
const SCREEN_WIDTH = Dimensions.get("screen").width;

const Accounts = (props: Accounts) => {
  var animatedWidth = new Animated.Value(0);
  var scrollViewRef = React.createRef();
  var account_index = 1;

  const onAccountsScroll = (event) => {
    const eventX = event.nativeEvent.contentOffset.x;
    const direction = eventX > 0 ? 1 : -1;

    const offsetX = Math.min(
      Math.abs(eventX),
      ACCOUNTS_BUTTON_WIDTH - ACCOUNTS_ICON_WIDTH
    );

    animatedWidth.setValue(ACCOUNTS_BUTTON_WIDTH - offsetX * direction);
  };

  const onScrollEndSnapToEdge = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const maxOffset = ACCOUNTS_BUTTON_WIDTH - ACCOUNTS_ICON_WIDTH;
    const velocityFactor = Math.abs(event.nativeEvent.velocity.x * 30);

    if (offsetX > 0 && offsetX < maxOffset / 2 - velocityFactor) {
      scrollViewRef.current && scrollViewRef.current.scrollTo({ x: 0 });
    } else if (
      maxOffset / 2 + velocityFactor <= offsetX &&
      offsetX < maxOffset
    ) {
      scrollViewRef.current &&
        scrollViewRef.current.scrollTo({
          x: ACCOUNTS_BUTTON_WIDTH,
        });
    }
  };
 

  const { accounts } = props; 
  const scrollViewPaddingRight = ACCOUNTS_BUTTON_WIDTH - 18; 
  return (
    <View style={Style.container}>
      <ScrollView
        horizontal
        style={Style.scrollView}
        contentContainerStyle={[
          Style.scrollViewContent,
          { paddingRight: scrollViewPaddingRight },
        ]}
        showsHorizontalScrollIndicator={false}
        onScroll={onAccountsScroll}
        onScrollEndDrag={onScrollEndSnapToEdge}
        scrollEventThrottle={16}
        ref={scrollViewRef}
      >
        {accounts.map((results, i) => (
          <ListItemButton
            style={results.trust != 0 ? Style.activeButton : Style.button} 
            onPress={() => props.handleTransIndex(i)}
            key={i}
            active={results.trust != 0}
            text={results.name == null ? String(++i) : results.name}
            noname={results.name == null} 
          />
        ))}
      </ScrollView>
      <View style={Style.stickyItem}>
        {/* <Animated.View
          style={[
            Style.stickyItemMask,
            { width: animatedWidth, maxWidth: ACCOUNTS_BUTTON_WIDTH },
          ]}
        > */}

          <StickyItemButton onPress={() => props.addAccount()} />
        {/* </Animated.View> */}
      </View>
    </View>
  );
};

export default Accounts;
