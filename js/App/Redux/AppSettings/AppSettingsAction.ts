export const selectLocale = (locale: string) => {
  return {
    type: "select_locale",
    payload: locale,
  };
};
