import * as React from "react";
import {Component} from "react";
import { Image, Linking } from "react-native";
import HTML from "react-native-render-html";
import { NavigationInjectedProps } from "react-navigation";

// Styles
import styles from "./Styles/FullArticleStyle";
import { Container, Content, Card, CardItem, Left, Body, Icon, Text, Button, Header, Title, Right, View } from "native-base";
import HumanizeDt from "../../Transforms/HumanizeDt";
import I18n from "../../I18n";

interface FullArticleProps {
}

export default class FullArticleComponent extends Component <FullArticleProps & NavigationInjectedProps> {
  constructor (props) {
    super(props);
    this.state = {};
  }

  render () {
    const { navigation } = this.props;
    const data = navigation.state.params || {};
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => { navigation.pop(); }}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body />
          <Right />
        </Header>
        <Content>
          <Card style={{flex: 0}}>
            <CardItem header>
            </CardItem>
              <Body>
                <Title style={{ color: "#000" }}>{data.title || ""}</Title>
              </Body>
            <CardItem>
              <Body>
                {!!data.imageUrl && <Image
                  source={{uri: data.imageUrl}}
                  style={{height: 200, width: "100%", flex: 1, backgroundColor: "#000", marginBottom: 20}}
                />}
                {!!data.description && <HTML html={(data.description).replace(/(\r\n|\n|\r) +/gm, " ")} />}
                <View style={{ height: 10 }} />
                {!!data.date && <Text style={{ fontSize: 12, color: "#333" }}>{I18n.t("Date")}: {HumanizeDt(data.date)}</Text>}
                {!!data.link && <Button transparent onPress={this._openLink.bind(this, data.link)}>
                  <Text>{I18n.t("Open in browser")}</Text>
                </Button>}
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
  private _openLink = (url) => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  }
}
