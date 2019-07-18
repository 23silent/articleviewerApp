import * as React from "react";
import {Component} from "react";
import { Container, Header, Left, Icon, Title, Body, Right, Button, Picker, Form, Item, Label } from "native-base";

// Styles
import styles from "./Styles/AppSettingsStyle";

import I18n from "../../I18n";
import { NavigationInjectedProps } from "react-navigation";

interface AppSettingsProps {
  currentLocale: string;
  selectLocale(locale: string): void;
}

export default class AppSettingsComponent extends Component <AppSettingsProps & NavigationInjectedProps> {
  constructor (props) {
    super(props);
    this.state = {};
  }

  render () {
    const { navigation } = this.props;
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => { navigation.pop(); }}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body><Title>{I18n.t("App settings")}</Title></Body>
          <Right />
        </Header>
        <Form>
          <Item picker style={{ paddingHorizontal: 10 }}>
            <Label style={{ flex: 1 }}>{I18n.t("Locale")}</Label>
            <Picker
              style={{ width: 120 }}
              mode="dropdown"
              headerBackButtonText={I18n.t("Back")}
              iosHeader={I18n.t("Select one")}
              iosIcon={<Icon name="arrow-down" />}
              selectedValue={this.props.currentLocale}
              onValueChange={this._onValueChange}
            >
              <Picker.Item label={I18n.t("Ru")} value="ru" />
              <Picker.Item label={I18n.t("En")} value="en" />
            </Picker>
          </Item>
        </Form>
      </Container>
    );
  }
  private _onValueChange = (value: string) => {
    this.props.selectLocale(value);
  }
}
