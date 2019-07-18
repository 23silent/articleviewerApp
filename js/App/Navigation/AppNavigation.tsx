import { createSwitchNavigator, createStackNavigator, createAppContainer } from "react-navigation";
import AppSettings from '../Containers/AppSettings'
import ListOfArticlesSettings from "../Containers/ListOfArticlesSettings";
import FullArticle from "../Containers/FullArticle";
import ListOfArticles from "../Containers/ListOfArticles";
import styles from "./Styles/NavigationStyles";

export const MainNav = createStackNavigator({
  AppSettings: { screen: AppSettings },
  ListOfArticlesSettings: { screen: ListOfArticlesSettings },
  FullArticle: { screen: FullArticle },
  ListOfArticles: { screen: ListOfArticles },
}, {
  // Default config for all screens
  headerMode: "none",
  initialRouteName: "ListOfArticles",
  navigationOptions: {
    headerStyle: styles.header,
  },
});

// Manifest of possible screens
const PrimaryNav = createSwitchNavigator({
  LaunchScreen: { screen: createAppContainer(MainNav) },
}, {
  initialRouteName: "LaunchScreen",
});

export default createAppContainer(PrimaryNav);
