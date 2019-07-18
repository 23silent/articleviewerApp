import { createReducer, createActions } from "reduxsauce";
import _ from "lodash";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  addSource: ["data"],
  removeSource: ["data"],
  editSource: ["data"],
});

export const UserSettingsTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  sources: [],
};

/* ------------- Selectors ------------- */

export const UserSettingsSelectors = {
  getSources: state => state.userSettings.sources,
};

/* ------------- Reducers ------------- */

export const addSource = (state, { data }) => (data
  ? { ...state, sources: [...state.sources, { ...data, id: state.sources.length ? state.sources[state.sources.length - 1].id + 1 : 0 }] }
  : state);

export const removeSource = (state, { data }) =>
  ({ ...state, sources: _.filter(state.sources, (item) => !_.isEqual(item, data)) });

export const editSource = (state, { data }) =>
  ({ ...state, sources: data ? _.map(state.sources, (item) => (item.id === data.id ? { ...item, ...data } : item)) : state.sources });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_SOURCE]: addSource,
  [Types.REMOVE_SOURCE]: removeSource,
  [Types.EDIT_SOURCE]: editSource,
});
