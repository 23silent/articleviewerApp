import { connect } from "react-redux";
import _ from "lodash";
import ListOfArticlesComponent from "../Components/ListOfArticles/ListOfArticlesComponent";
import ArticlesActions from "../Redux/ArticlesRedux";

const mapStateToProps = state => ({
  articles: {
    ...state.articles,
    data: _.chain(state.articles.payload).values().map(o => o.feed.article).flatten().sortBy("date").value(),
  },
  sources: state.userSettings.sources,
});

const mapDispatchToProps = {
  getArticles: ArticlesActions.articlesRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListOfArticlesComponent);
