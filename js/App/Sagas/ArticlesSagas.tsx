import { call, put, select, all, takeLatest } from "redux-saga/effects";
import { delay } from "redux-saga";
import { parseString } from "react-native-xml2js";
import _ from "lodash";

import DebugConfig from "../Config/DebugConfig";
import ArticlesActions from "../Redux/ArticlesRedux";
import { UserSettingsSelectors } from "../Redux/UserSettingsRedux";
import { ArticlesSelectors } from "../Redux/ArticlesRedux";
import { ArticlesTypes } from "../Redux/ArticlesRedux";
import { UserSettingsTypes } from "../Redux/UserSettingsRedux";

const parseXml = xml => new Promise((resolve, reject) => {
  try {
    parseString(xml, { trim: true, explicitArray: false, ignoreAttrs: true }, (err, result) => resolve(result || err));
  } catch (err) {
    reject(err);
  }
});

const addSource = (data, source) => ({
  feed: {
    article: _.map(data.feed.article, item => ({ ...item, source })),
  },
});

export function * getArticles (api, action) {
  try {
    const { data } = action;
    let i = 0;
    const sources = yield select(UserSettingsSelectors.getSources);
    const prevArticles = yield select(ArticlesSelectors.getArticles);
    if (DebugConfig.useFixtures) yield delay(100);
    if (sources.length) {
      let articles = prevArticles.payload;
      let hasError = false;
      while (sources.length > i) {
        const sourceUrl = sources[i].url;
        const response = yield call(api.getRoot, sourceUrl);
        if (response.ok) {
          if (_.isString(response.data)) {
            const result = yield call(parseXml, response.data);
            if (!_.isError(result) && _.get(result, 'feed.article')) {
              articles = { ...articles, [sourceUrl]: addSource(result, sources[i]) };
            }
          } else if (_.get(response.data, 'feed.article')) {
            articles = { ...articles, [sourceUrl]: addSource(response.data, sources[i]) };
          }
        } else { hasError = true; }
        i++;
      }
      yield put(ArticlesActions.articlesSuccess(articles));
      if (hasError) yield put(ArticlesActions.articlesFailure());
    } else {
      yield put(ArticlesActions.articlesSuccess());
    }
  } catch (err) { console.log(err); }
}

export default function* watchArticles(api) {
  yield all([
    takeLatest(ArticlesTypes.ARTICLES_REQUEST, getArticles, api),
    takeLatest(UserSettingsTypes.ADD_SOURCE, getArticles, api),
    takeLatest(UserSettingsTypes.REMOVE_SOURCE, getArticles, api),
  ]);
}
