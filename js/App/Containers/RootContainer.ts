import { connect } from "react-redux";
import {RootContainerComponent} from "../Components/RootContainer/index";
import StartupActions from "../Redux/StartupRedux";

const mapStateToProps = (state) => {
  return {
    bootstrapped: state.bootstrapped,
  };
};
// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = dispatch => ({
  startup: () => dispatch(StartupActions.startup()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RootContainerComponent);
