import * as ActionTypes from "./ActionTypes";

export const Staffs = (
  state = { isLoading: true, errMess: null, staffs: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_STAFFS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        staffs: action.payload,
      };
    case ActionTypes.STAFFS_LOADING:
      return { ...state, isLoading: true, errMess: null, staffs: [] };

    case ActionTypes.STAFFS_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };
    case ActionTypes.ADD_STAFF:
      var staff = action.payload;

      return { ...state, status: state.staffs.concat(staff) };
    case ActionTypes.SPLICE_STAFF:
      var staff = action.payload;

      return { ...state, status: state.staffs.splice(staff.id, 1, staff) };
    default:
      return state;
  }
};
