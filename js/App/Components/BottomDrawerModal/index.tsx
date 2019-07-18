import * as React from "react";
import BottomDrawerModal from "./BottomDrawerModal";
import {ColorScheme} from "../../Themes/Colors";

export interface BottomDrawerModalProps {
  isDarkMode?: boolean;
  colorScheme?: ColorScheme;
  children: any;
  getRef?: any;
  style?: any;
}

export default (props: BottomDrawerModalProps) => <BottomDrawerModal {...props} ref={props.getRef} />;
