import * as React from "react";
import { Component } from "react";
import { StatusBar, ActivityIndicator, StyleSheet } from "react-native";
import ReduxNavigation from "../../Navigation/ReduxNavigation";

// Styles
import styles from "./Styles/RootContainerStyles";
import { View } from "native-base";

interface RootContainerProps {
  bootstrapped: boolean;
  startup(): void;
}

export default class RootContainer extends Component<RootContainerProps> {
  constructor(props) {
    super(props);
  }

  render() {
    const { bootstrapped } = this.props;
    return bootstrapped
      ? (
          <>
            <StatusBar barStyle="light-content" />
            <ReduxNavigation />
          </>
        )
      : <View style={[StyleSheet.absoluteFillObject, { justifyContent: "center", alignItems: "center" }]}>
          <ActivityIndicator/>
        </View>;
  }
}
