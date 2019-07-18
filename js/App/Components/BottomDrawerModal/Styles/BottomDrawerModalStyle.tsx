import { StyleSheet } from "react-native";
import { ApplicationStyles, Metrics, Colors } from "../../../Themes";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
    container: {
      flex: 1,
      marginTop: Metrics.navBarHeight,
    },
    modalStyle: {
      justifyContent: "flex-end",
      margin: 0,
    },
    modalContent: {
      backgroundColor: "#fff",
      width: "100%",
      padding: 10,
    },
});
