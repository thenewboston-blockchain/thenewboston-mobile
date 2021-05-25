import { FONT_SIZE_28 } from '../../styles/typography';
import { StyleSheet } from "react-native";
import { Typography } from "../../styles";

const Styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    heading: {
        fontSize: Typography.FONT_SIZE_28,
        fontWeight: Typography.FONT_WEIGHT_BOLD,
        textAlign: "center",
        color:"#FFF"
    },
    accountManagement: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        marginTop: 40,
    },
    accounts: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
    },
    active: {
        color: "#fff",
        backgroundColor: "#DC0D16",
        padding: 10,
        borderRadius: 100,
        width: 60,
        height: 60,
        textAlign: "center",
        textAlignVertical:"center",
        fontSize: 20,
        marginRight:20,
    },
    accountPrefix: {
        color: "#fff",
        backgroundColor: "#1D2731",
        padding: 10,
        borderRadius: 100,
        width: 60,
        height: 60,
        textAlign: "center",
        textAlignVertical:"center",
        fontSize: 20,
        marginRight:20,
    },
    addAccount: {
        color: "#fff",
        backgroundColor: "#1D2731",
        padding: 10,
        borderRadius: 100,
        width: 60,
        height: 60,
        textAlign: "center",
        textAlignVertical:"center",
        fontSize: 20,
    },
    balanceHeading: {
        paddingVertical: "5%",
        color: "#62737E",
        textTransform:'uppercase'
    },
    amountBlock: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    balance: {
        fontSize: Typography.FONT_SIZE_45,
        fontWeight: Typography.FONT_WEIGHT_BOLD,
        color:"#FFF"
    },
    refreshBalance: {
        color: "#fff",
        backgroundColor: "#1D2731",
        padding: 10,
        borderRadius: 100,
        width: 60,
        height: 60,
        textAlign: "center",
        textAlignVertical:"center",
        fontSize: 20,
    },
    panel: {
        backgroundColor: "#1D2731",
        padding: 22,
        borderRadius: 16,
        marginBottom: 10,
        borderWidth: 1,
        borderColor:"#2B4150"
    },
    panelHeader: {
        marginBottom: 10,
        flex: 1,
        flexDirection: "row",
        justifyContent:'space-between'
    },
    panelTitle: {
        color: "#62737E",
        textTransform: "uppercase",
        fontSize: Typography.FONT_SIZE_12,
        fontWeight: Typography.FONT_WEIGHT_BOLD,
        width:"80%"
    },
    panelActions: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between',
        width:"20%"
    },
    panelBody: {
        color: "#63737E",
        textAlign: "justify",
        fontSize: Typography.FONT_SIZE_16,
    },
    actionIcon: {
        marginRight:10
    }
});
  
export default Styles