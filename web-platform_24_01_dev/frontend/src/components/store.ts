import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { reducer } from "./slices";

// export const reducer = combineReducers({
// blocksList: reducers.constructorReducer(constants.blocksList),
// questionsList: reducers.constructorReducer(constants.questionsList),
// resultsList: reducers.constructorReducer(constants.resultsList),
// });

const preloadedState = {
  // from COOKIE
  // userLoginStore: {
  //   data:
  //     accessToken && refreshToken
  //       ? { access: accessToken, refresh: refreshToken }
  //       : undefined,
  // },
};

export const store = configureStore({
  reducer: reducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  preloadedState: preloadedState,
});
