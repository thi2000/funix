import { createStore } from "redux";
import { Reducer, initialState } from "./reducere";

export const ConfigureStore = () => {
  const store = createStore(Reducer, initialState);
  return store;
};
