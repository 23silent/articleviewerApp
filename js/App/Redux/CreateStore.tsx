import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { createReactNavigationReduxMiddleware } from "react-navigation-redux-helpers";
import Rehydration from "../Services/Rehydration";
import ReduxPersist from "../Config/ReduxPersist";
import Config from "../Config/DebugConfig";
import ScreenTracking from "./ScreenTrackingMiddleware";
import {ApplicationState} from "./index";

// creates the store
export default (rootReducer, rootSaga) => {
  /* ------------- Redux Configuration ------------- */

  const middleware = [];
  const enhancers = [];

  /* ------------- Navigation Middleware ------------ */
  const navigationMiddleware = createReactNavigationReduxMiddleware(
    "root",
    (state: ApplicationState) => state.nav,
  );
  middleware.push(navigationMiddleware);
  /* ------------- Analytics Middleware ------------- */
  middleware.push(ScreenTracking);

  /* ------------- Saga Middleware ------------- */

  const sagaMonitor = null;
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor} );
  middleware.push(sagaMiddleware);

  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middleware));

  const createAppropriateStore = createStore;
  const composer = Config.useReduxDevTools ? composeWithDevTools({}) : compose;
  const store = createAppropriateStore(rootReducer, undefined, composer(...enhancers));

  // configure persistStore and check reducer version number
  if (ReduxPersist.active) {
    Rehydration.updateReducers(store);
  }
  // kick off root saga
  const sagasManager = sagaMiddleware.run(rootSaga);

  return {
    store,
    sagasManager,
    sagaMiddleware,
  };
};
