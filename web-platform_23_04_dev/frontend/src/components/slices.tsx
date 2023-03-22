import { Dispatch } from "redux";
import * as utils from "./utils";
import * as constants from "./constants";
import { combineReducers } from "@reduxjs/toolkit";

export const reducers = {};

export function ConnectReducer1(name: string, reducer: object) {
  // @ts-ignore
  reducers[name] = reducer;
}

export const captcha = {
  captchaCheckStore: utils.ConstructorSlice1(
    "captchaCheckStore", // const constantName = randomUUID();
    ConnectReducer1,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          utils.ConstructorAction1(
            { ...args.form },
            `/api/users/check_captcha`,
            constants.HttpMethods.GET(),
            5000,
            utils.ConstantConstructor1("captchaCheckStore"), // const constantName = randomUUID();
            false
          )
        );
      };
    }
  ),
};

export const user = {
  userRegisterStore: utils.ConstructorSlice1(
    "userRegisterStore",
    ConnectReducer1,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          utils.ConstructorAction1(
            { ...args.form },
            `/api/users/register`,
            constants.HttpMethods.POST(),
            10000,
            utils.ConstantConstructor1("userRegisterStore"),
            false
          )
        );
      };
    }
  ),
  userLoginStore: utils.ConstructorSlice1(
    "userLoginStore",
    ConnectReducer1,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          utils.ConstructorAction1(
            { ...args.form },
            `/api/users/login`,
            constants.HttpMethods.POST(),
            10000,
            utils.ConstantConstructor1("userLoginStore"),
            false
          )
        );
      };
    }
  ),
  userReadListStore: utils.ConstructorSlice1(
    "userReadListStore",
    ConnectReducer1,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          utils.ConstructorAction1(
            { ...args.form },
            `/api/users/`,
            constants.HttpMethods.GET(),
            10000,
            utils.ConstantConstructor1("userReadListStore"),
            false
          )
        );
      };
    }
  ),
};

export const tasks = {
  taskReadStore: utils.ConstructorSlice1(
    "taskReadStore",
    ConnectReducer1,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          utils.ConstructorAction1(
            { ...args.form },
            `/api/tasks`,
            constants.HttpMethods.GET(),
            10000,
            utils.ConstantConstructor1("taskReadStore"),
            true
          )
        );
      };
    }
  ),
  taskReadListStore: utils.ConstructorSlice1(
    "taskReadListStore",
    ConnectReducer1,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          utils.ConstructorAction1(
            { ...args.form },
            `/api/tasks`,
            constants.HttpMethods.GET(),
            10000,
            utils.ConstantConstructor1("taskReadListStore"),
            true
          )
        );
      };
    }
  ),
  taskPostStore: utils.ConstructorSlice1(
    "taskPostStore",
    ConnectReducer1,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          utils.ConstructorAction1(
            { ...args.form },
            `/api/tasks`,
            constants.HttpMethods.POST(),
            10000,
            utils.ConstantConstructor1("taskPostStore"),
            true
          )
        );
      };
    }
  ),
  taskUpdateStore: utils.ConstructorSlice1(
    "taskUpdateStore",
    ConnectReducer1,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          utils.ConstructorAction1(
            { ...args.form },
            `/api/tasks`,
            constants.HttpMethods.PUT(),
            10000,
            utils.ConstantConstructor1("taskUpdateStore"),
            true
          )
        );
      };
    }
  ),
  taskDeleteStore: utils.ConstructorSlice1(
    "taskDeleteStore",
    ConnectReducer1,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          utils.ConstructorAction1(
            { ...args.form },
            `/api/tasks`,
            constants.HttpMethods.DELETE(),
            10000,
            utils.ConstantConstructor1("taskDeleteStore"),
            true
          )
        );
      };
    }
  ),
};

export const reducer = combineReducers(reducers);
