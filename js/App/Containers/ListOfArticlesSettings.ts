import { connect } from "react-redux";
import ListOfArticlesSettingsComponent from "../Components/ListOfArticlesSettings/ListOfArticlesSettingsComponent";
import UserSettingsActions from "../Redux/UserSettingsRedux";

const mapStateToProps = (state) => {
  return {
    sources: state.userSettings.sources,
  };
};

const mapDispatchToProps = {
  addSource: UserSettingsActions.addSource,
  removeSource: UserSettingsActions.removeSource,
  editSource: UserSettingsActions.editSource,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListOfArticlesSettingsComponent);
