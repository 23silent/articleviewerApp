import * as React from "react";
import {Component} from "react";
import { View } from "react-native";
import Modal from "react-native-modal";

import styles from "./Styles/BottomDrawerModalStyle";
import { BottomDrawerModalProps } from ".";

export default class BottomDrawerModal extends Component<BottomDrawerModalProps> {

  state = { isModalVisible: false };

  render () {
    const { children, style } = this.props;
    const { isModalVisible } = this.state;
    return (
      <Modal
        isVisible={isModalVisible}
        avoidKeyboard
        onBackButtonPress={this.hide}
        onBackdropPress={this.hide}
        backdropOpacity={0.6}
        style={[styles.modalStyle, style]}
        onSwipeComplete={this.hide}
        swipeDirection="down"
      >
        <View style={styles.modalContent}>
          {children}
        </View>
      </Modal>
    );
  }
  public show = () => this.setState({ isModalVisible: true });
  public hide = () => this.setState({ isModalVisible: false });
}
