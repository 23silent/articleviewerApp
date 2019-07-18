import * as React from "react";
import {Component} from "react";
import {Provider} from "react-redux";
import { StyleProvider, Root } from "native-base";

import RootContainer from "../../Containers/RootContainer";
import createStore from "../../Redux/index";
import getTheme from "../../../theme/components";
import theme from "../../../theme/variables/platform";

export const store = createStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <StyleProvider style={getTheme(theme)}>
          <Root>
            <RootContainer/>
          </Root>
        </StyleProvider>
      </Provider>
    );
  }
}
