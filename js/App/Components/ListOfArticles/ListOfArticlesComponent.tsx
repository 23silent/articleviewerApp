import * as React from "react";
import {Component} from "react";
import _ from "lodash";
import { FlatList, RefreshControl } from "react-native";
import { Container, Header, Left, Button, Icon, Title, Body, Right, Card, CardItem, Text, View, Thumbnail } from "native-base";
import { NavigationInjectedProps } from "react-navigation";

// Styles
import styles from "./Styles/ListOfArticlesStyle";

import HtmlToText from "../../Transforms/HtmlToText";
import I18n from "../../I18n";

interface ListOfArticlesProps {
  getArticles: () => void;
  articles: {
    fetching: boolean;
    data: Array<any>;
  };
  sources: Array<any>;
}
interface ListOfArticlesState {
  refreshing: boolean;
}

export default class ListOfArticlesComponent extends Component <ListOfArticlesProps
& NavigationInjectedProps,
ListOfArticlesState> {
  constructor (props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  public componentDidMount() {
    this.props.getArticles();
  }
  public componentDidUpdate(prevProps) {
    if (prevProps.articles.fetching && !this.props.articles.fetching) {
      this.setState({ refreshing: false });
    }
  }

  render () {
    const {
      navigation,
      articles,
    } = this.props;
    const { data } = articles;
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => { navigation.navigate("AppSettings"); }}>
              <Icon name="settings" />
            </Button>
          </Left>
          <Body><Title>{I18n.t("Articles")}</Title></Body>
          <Right>
            <Button transparent onPress={() => { navigation.navigate("ListOfArticlesSettings"); }}>
              {/* <Icon name="settings" /> */}
              <Text>{I18n.t("Sources")}</Text>
            </Button>
          </Right>
        </Header>
        {_.get(this.props.articles, "error")
          ? <View style={{ backgroundColor: "#f009", alignItems: "center", padding: 5 }}>
              <Text style={{ color: "#fff" }} onPress={this._onRefresh}>{I18n.t("Articles load error, retry")}</Text>
            </View>
          : null
        }
        <FlatList
          contentContainerStyle={data.length > 0
            ? {}
            : { flex: 1, alignItems: "center", justifyContent: "center" }}
          data={data}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => `${item.date}${index}`}
          extraData={articles}
          ListEmptyComponent={this._ListEmptyComponent}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        />
      </Container>
    );
  }
  private _renderItem = ({item}) => (
    <Card>
      <CardItem button onPress={this._onPressFullArticle.bind(this, item)}>
        {!!item.imageUrl && <Thumbnail source={{uri: item.imageUrl}} style={{ backgroundColor: "#000", marginRight: 10 }} />}
        <Body style={{ justifyContent: "center" }}>
          <Text style={{ fontWeight: "bold" }}>{HtmlToText(item.title)}</Text>
          <View style={{ height: 5 }} />
          <Text>{HtmlToText(item.shortDescription)}</Text>
        </Body>
      </CardItem>
    </Card>
  )
  private _ListEmptyComponent = () => (this.props.sources.length
    ? <View>
        <Text>{I18n.t("Articles is not defined")}</Text>
      </View>
    : <View>
        <Text>{I18n.t("Sources is not defined")}</Text>
        <Button transparent onPress={() => { this.props.navigation.navigate("ListOfArticlesSettings"); }}>
          <Text>{I18n.t("Setup the sources")}</Text>
        </Button>
      </View>)
  private _onPressFullArticle = (article) => {
    this.props.navigation.navigate("FullArticle", article);
  }
  private _onRefresh = () => this.setState({ refreshing: true }, () => {
    this.props.getArticles();
  })
}
