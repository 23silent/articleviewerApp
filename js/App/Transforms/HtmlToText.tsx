import _ from "lodash";
import htmlToText from "html-to-text";

const options = {
  wordwrap: 130,
};

export default (html) => _.isString(html) ? htmlToText.fromString(html, options) : "";