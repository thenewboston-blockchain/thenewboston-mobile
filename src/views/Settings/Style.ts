import { Colors, Typography } from "../../styles";

import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
    body: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        height:'90%'
    },
    heading: {
        fontSize: Typography.FONT_SIZE_28,
        fontWeight: Typography.FONT_WEIGHT_BOLD,
        color: Colors.WHITE,
    },
    myAccount: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 50,
        color: '#fff',
        backgroundColor: "#1E323A",
        padding: 15,
        borderRadius: 15,
        alignItems:'center'
    },
    avatarName: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    nameGroup: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        marginLeft:20,
    },
    nickname: {
        color: "#62737E",
        fontSize: Typography.FONT_SIZE_12
    },
    accountName: {
        color: "#fff",
        fontSize: Typography.FONT_SIZE_16,
        fontWeight: Typography.FONT_WEIGHT_BOLD,
    },
    exit: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "#1E323A",
        marginTop: 2,
        height: 50,
        justifyContent: "flex-start",
        paddingHorizontal: 20,
    },
    containExit: {
        alignSelf: 'flex-end',
        width: '100%',
    }
});
  
export default Styles