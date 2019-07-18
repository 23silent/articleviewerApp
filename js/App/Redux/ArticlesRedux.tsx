import { createReducer, createActions } from "reduxsauce";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  articlesRequest: ["data"],
  articlesSuccess: ["payload"],
  articlesFailure: null,
});

export const ArticlesTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  data: null,
  fetching: null,
  payload: null,
  error: null,
};

/* ------------- Selectors ------------- */

export const ArticlesSelectors = {
  getArticles: state => state.articles,
};

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  ({ ...state, fetching: true, data });

// successful api lookup
export const success = (state, action) => {
  const { payload } = action;
  return ({ ...state, fetching: false, error: null, payload });
};

// Something went wrong somewhere.
export const failure = state =>
  ({ ...state, fetching: false, error: true });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ARTICLES_REQUEST]: request,
  [Types.ARTICLES_SUCCESS]: success,
  [Types.ARTICLES_FAILURE]: failure,
});
