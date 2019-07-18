import AppNavigation from "../../Navigation/AppNavigation";

export const reducer = (state, action) => {
  let newState;

  switch (action.type) {
    default :
      newState = AppNavigation.router.getStateForAction(action, state);
      break;
  }
  return newState || state;
};
