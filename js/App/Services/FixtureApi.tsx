export default {
  // Functions return fixtures
  getRoot: (xml) => ({
    ok: true,
    data: xml ? rootXml : require("../Fixtures/root.json"),
  }),
  getRate: () => ({
    ok: true,
    data: require("../Fixtures/rateLimit.json"),
  }),
  getUser: (username) => {
    // This fixture only supports gantman or else returns skellock
    const gantmanData = require("../Fixtures/gantman.json");
    const skellockData = require("../Fixtures/skellock.json");
    return {
      ok: true,
      data: username.toLowerCase() === "gantman" ? gantmanData : skellockData,
    };
  },
};

const rootXml = `
  <?xml version="1.0" encoding="UTF-8"?>
  <feed>
    <article>
        <title>Article 1</title>
        <link>https://noveo.ru/</link>
        <date>2019-02-18T15:53:00+05:00</date>
        <shortDescription>
          <![CDATA[
            Lorem
            <b>ipsum dolor</b>
            -- short description
          ]]>
        </shortDescription>
        <imageUrl>https://facebook.github.io/react-native/img/header_logo.png</imageUrl>
        <description>
          <![CDATA[
            Lorem
            <b>ipsum dolor</b>
            sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          ]]>
        </description>
    </article>
    <article>
        <title>Article 2</title>
        <date>2019-02-18T14:53:00+05:00</date>
        <shortDescription>
          <![CDATA[
            Lorem
            <b>ipsum dolor</b>
            -- short description
          ]]>
        </shortDescription>
        <imageUrl>https://facebook.github.io/react-native/img/header_logo.png</imageUrl>
        <description>
          <![CDATA[
            Lorem
            <b>ipsum dolor</b>
            sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          ]]>
        </description>
    </article>
  </feed>
`;
