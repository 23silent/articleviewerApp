import {MainNav} from "../../Navigation/AppNavigation";

export const reducer = (state, action) => {
  let newState;

  switch (action.type) {
    default :
      newState = MainNav.router.getStateForAction(action, state);
      break;
  }
  return newState || state;
};
