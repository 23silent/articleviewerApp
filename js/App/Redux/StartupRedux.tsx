import { createReducer, createActions } from "reduxsauce";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  startup: null,
});

export const StartupTypes = Types;
export default Creators;

export const INITIAL_STATE = false;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.STARTUP]: () => true,
});
