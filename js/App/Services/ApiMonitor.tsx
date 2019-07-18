import * as _ from "lodash";
import { Toast } from "native-base";

import I18n from "../I18n";

export default (response) => {
  let text = "";
  if (!response.ok) {
    switch (response.problem) {
      case "TIMEOUT_ERROR":
      case "CLIENT_ERROR":
      case "SERVER_ERROR":
      case "CONNECTION_ERROR":
      case "NETWORK_ERROR":
        text = I18n.t("Error");
        break;
      default:
        text = response.problem;
        break;
    }
  } else if (!_.get(response, "data.feed.article")) {
    text = `${I18n.t("Invalid data from")} ${response.config.url}`;
  }
  if (text) Toast.show({ text, buttonText: "Ok", type: "danger" });
};