import { put, select } from "redux-saga/effects";
import SplashScreen from "react-native-splash-screen";

// process STARTUP actions
export function* startup() {
  SplashScreen.hide();
}
