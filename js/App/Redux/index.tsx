import {combineReducers, Reducer} from "redux";
import { persistReducer } from "redux-persist";
import configureStore from "./CreateStore";
import rootSaga from "../Sagas/index";
import ReduxPersist from "../Config/ReduxPersist";

export interface ApplicationState {
  bootstrapped: any;
  nav: any;
  mainNav: any;
  appSettings: any;
  userSettings: any;
  articles: any;
}
/* ------------- Assemble The Reducers ------------- */
export const reducers: Reducer<ApplicationState> = combineReducers({
  bootstrapped: require("./StartupRedux").reducer,
  nav: require("./Navigation/NavigationRedux").reducer,
  mainNav: require("./Navigation/MainNavigationRedux").reducer,
  appSettings: require("./AppSettings/AppSettingsRedux").reducer,
  userSettings: require("./UserSettingsRedux").reducer,
  articles: require("./ArticlesRedux").reducer,
});

export default () => {
  let finalReducers = reducers;
  // If rehydration is on use persistReducer otherwise default combineReducers
  if (ReduxPersist.active) {
    const persistConfig = ReduxPersist.storeConfig;
    finalReducers = persistReducer(persistConfig, reducers);
  }

  let { store, sagasManager, sagaMiddleware } = configureStore(finalReducers, rootSaga);

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require("./").reducers;
      store.replaceReducer(nextRootReducer);

      const newYieldedSagas = require("../Sagas/index").default;
      sagasManager.cancel();
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas);
      });
    });
  }
// create our store

  return  store;
};
