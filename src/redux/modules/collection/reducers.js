import { handleActions } from "redux-actions";
import * as CONSTANTS from "./constants";

const getInitialState = () => {
  return {
    collections: [],
  };
};

export default handleActions(
  {
    [CONSTANTS.SET_COLLECTIONS]: (state, { payload }) => ({
      ...state,
      collections: payload.collections,
    }),
  },
  getInitialState()
);
