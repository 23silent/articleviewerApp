import { connect } from "react-redux";
import AppSettingsComponent from "../Components/AppSettings/AppSettingsComponent";
import { selectLocale } from "../Redux/AppSettings/AppSettingsAction";

const mapStateToProps = (state) => {
  return {
    currentLocale: state.appSettings.locale,
  };
};

const mapDispatchToProps = {
  selectLocale,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppSettingsComponent);
