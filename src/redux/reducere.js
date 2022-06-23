import { actions } from "react-redux-form";
import { DEPARTMENTS, STAFFS } from "../shared/staffs";

export const initialState = {
  staffs: STAFFS,
  departments: DEPARTMENTS,
};

export const Reducer = (state = initialState, actions) => {
  return state;
};
