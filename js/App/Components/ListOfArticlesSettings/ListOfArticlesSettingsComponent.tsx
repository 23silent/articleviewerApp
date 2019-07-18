import * as React from "react";
import { Component } from "react";
import _ from "lodash";
import { FlatList } from "react-native";
import { NavigationInjectedProps } from "react-navigation";
import { Container, Text, Form, Item, Label, Input, Title, Button, Header, Body, Left, Right, Icon, View, SwipeRow } from "native-base";

// Styles
import styles from "./Styles/ListOfArticlesSettingsStyle";

import BottomDrawerModal from "../BottomDrawerModal";
import { ValidateUrl } from "../../Services/Helpers";
import I18n from "../../I18n";

interface ListOfArticlesSettingsProps {
  sources: Array<any>;
  addSource: (data: string) => void;
  removeSource: (data: string) => void;
  editSource: (data: string) => void;
}
interface ListOfArticlesSettingsState {
  data: any;
}

export default class ListOfArticlesSettingsComponent extends Component <ListOfArticlesSettingsProps
& NavigationInjectedProps,
ListOfArticlesSettingsState> {
  private bottomDrawerModalRef = null;

  constructor (props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  render () {
    const { sources, navigation } = this.props;
    const { data } = this.state;
    return (
      <>
        <Container style={styles.container}>
          <Header>
            <Left>
              <Button transparent onPress={() => { navigation.pop(); }}>
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body><Title>{I18n.t("Settings")}</Title></Body>
            <Right>
              <Button transparent onPress={this.bottomDrawerModalShow.bind(this, { isEdit: false })}>
                <Icon name="ios-add" />
              </Button>
            </Right>
          </Header>
          <FlatList
            contentContainerStyle={sources.length > 0
              ? {}
              : { flex: 1, justifyContent: "center" }}
            data={sources}
            renderItem={this._renderItem}
            keyExtractor={(item) => _.toString(item.id)}
            ListEmptyComponent={this._ListEmptyComponent}
          />
        </Container>
        <BottomDrawerModal getRef={this._getBottomDrawerModalRef}>
          {<Title style={{ color: "#000" }}>{_.isUndefined(data.id) ? I18n.t("Add new source") : I18n.t("Edit source")}</Title>}
          <Form>
            <Item inlineLabel>
              <Label>{I18n.t("Title")}</Label>
              <Input value={data.title} onChangeText={this._onChangeTextTitle} placeholder="mySource"/>
            </Item>
            <Item inlineLabel last error={!!data.url && !ValidateUrl(data.url)}>
              <Label>{I18n.t("Url")}</Label>
              <Input value={data.url} onChangeText={this._onChangeTextUrl} placeholder="http://source.com"/>
            </Item>
            <View style={{ height: 10 }} />
            <Button full success onPress={this._submitAddEditForm} disabled={!data.title || !data.url || !ValidateUrl(data.url)}>
              <Text>{I18n.t("Submit")}</Text>
            </Button>
          </Form>
        </BottomDrawerModal>
      </>
    );
  }
  private _onChangeTextTitle = (title) => this.setState({ data: { ...this.state.data, title} });
  private _onChangeTextUrl = (url) => this.setState({ data: { ...this.state.data, url} });
  private _submitAddEditForm = () => {
    const { data } = this.state;
    const action = _.isUndefined(data.id) ? this.props.addSource : this.props.editSource;
    this.setState({ data: {} }, () => {
      action(data);
      this.bottomDrawerModalRef.hide();
    });
  }
  private _renderItem = ({item}) => (
    <SwipeRow
      rightOpenValue={-75}
      body={
        <View style={{ paddingHorizontal: 10 }}>
          <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
          <Text>{I18n.t("Url")}: {item.url}</Text>
        </View>
      }
      right={
        <Button danger onPress={() => { this.props.removeSource(item); }}>
          <Icon active name="trash" />
        </Button>
      }
    />
  )
  private _ListEmptyComponent = () => (
    <Button style={{ alignSelf: "center" }} transparent onPress={this.bottomDrawerModalShow.bind(this, { isEdit: false })}>
      <Text>{I18n.t("Add source")}</Text>
    </Button>
  )
  private _getBottomDrawerModalRef = ref => {
    this.bottomDrawerModalRef = ref;
  }
  private bottomDrawerModalShow = ({ isEdit }) => {
    if (!isEdit) {
      this.setState({ data: {} }, () => {
        this.bottomDrawerModalRef.show();
      });
    } else {
      this.bottomDrawerModalRef.show();
    }
  }
}
