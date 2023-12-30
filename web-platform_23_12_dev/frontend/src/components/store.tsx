// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
// @ts-ignore
import { reducer } from "./slices";

import * as utils from "./utils";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

// TODO localStorage ///////////////////////////////////////////////////////////////////////////////////////////////////

// @ts-ignore
const accessToken = utils.getCookie("userAccessToken");
// @ts-ignore
const refreshToken = utils.getCookie("userRefreshToken");

// TODO initial state //////////////////////////////////////////////////////////////////////////////////////////////////

const preloadedState = {
  // @ts-ignore
  userLoginStore: {
    data:
      accessToken && refreshToken
        ? { access: accessToken, refresh: refreshToken }
        : undefined,
  },
};

function reloadPage() {
  setInterval(() => {
    window.location.reload();
  }, 1000 * 60 * 60 * 24); // 1000 ms * 60 s * 60 m * 12 h
}

reloadPage();

export const store = configureStore({
  reducer: reducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  preloadedState: preloadedState,
});
