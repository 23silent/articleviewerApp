import {colorScheme} from "../../Themes/Colors";
import I18n from "../../I18n";
import { REHYDRATE } from "redux-persist";
import {Reducer} from "redux";
import {AppSettingsState} from "./Types";

const DEFAULT_LOCALE = "en";

export const INITIAL_STATE = {
  locale: DEFAULT_LOCALE,
  colorScheme: colorScheme(false),
};

export const reducer: Reducer<AppSettingsState> = (state: AppSettingsState= INITIAL_STATE, action) => {
  switch (action.type) {
    case "select_locale":
      I18n.locale = action.payload;
      return {...state,
        locale: action.payload,
      };
   case REHYDRATE:
     if (!action.payload) return state;
     I18n.locale = action.payload.appSettings.locale;
     return {...state, ...action.payload.appSettings};
   default:
     I18n.locale = state.locale;
      return {...state};
  }
};
