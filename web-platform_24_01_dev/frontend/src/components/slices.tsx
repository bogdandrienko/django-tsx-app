import { combineReducers } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import axios from "axios";
import * as constants from "./constants";

const reducers: any = {};

export function connectStore(name: string, reducer: object) {
  reducers[name] = reducer;
}

export const center = {
  centerMonitoring: constrSlice("centerMonitoring", function ({ ...args }) {
    return async function (dispatch: Dispatch<any>) {
      dispatch(
        constrAction(
          { ...args.form },
          `${constants.API}/communicator/center_monitoring/`,
          "GET",
          30000,
          constrConstant("centerMonitoring"),
          false,
        ),
      );
    };
  }),
  centerSticking: constrSlice("centerSticking", function ({ ...args }) {
    return async function (dispatch: Dispatch<any>) {
      dispatch(
        constrAction(
          { ...args.form },
          `${constants.API}/communicator/center_sticking/`,
          "GET",
          30000,
          constrConstant("centerSticking"),
          false,
        ),
      );
    };
  }),
};

export const speed = {
  speedReportDumptrucksCustom: constrSlice(
    "speedReportDumptrucksCustom",
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          constrAction(
            { ...args.form },
            `${constants.API}/speed/report/dumptrucks_custom/`,
            "GET",
            30000,
            constrConstant("speedReportDumptrucksCustom"),
            false,
          ),
        );
      };
    },
  ),
};

export const idea = {
  ideaCreate: constrSlice("ideaCreate", function ({ ...args }) {
    return async function (dispatch: Dispatch<any>) {
      dispatch(
        constrAction(
          { ...args.form },
          `${constants.API}/idea/create/`,
          "POST",
          30000,
          constrConstant("ideaCreate"),
          false,
          true,
        ),
      );
    };
  }),
  ideaExport: constrSlice("ideaExport", function ({ ...args }) {
    return async function (dispatch: Dispatch<any>) {
      dispatch(
        constrAction(
          { ...args.form },
          `${constants.API}/idea/export/`,
          "GET",
          30000,
          constrConstant("ideaExport"),
          false,
          true,
        ),
      );
    };
  }),
};

export const claim = {
  claimCreate: constrSlice("claimCreate", function ({ ...args }) {
    return async function (dispatch: Dispatch<any>) {
      dispatch(
        constrAction(
          { ...args.form },
          `${constants.API}/claim/create/`,
          "POST",
          30000,
          constrConstant("claimCreate"),
          false,
          true,
        ),
      );
    };
  }),
  claimList: constrSlice("claimList", function ({ ...args }) {
    return async function (dispatch: Dispatch<any>) {
      dispatch(
        constrAction(
          { ...args.form },
          `${constants.API}/claim/list/`,
          "GET",
          30000,
          constrConstant("claimList"),
          false,
          true,
        ),
      );
    };
  }),
  claimUpdate: constrSlice("claimUpdate", function ({ ...args }) {
    return async function (dispatch: Dispatch<any>) {
      dispatch(
        constrAction(
          { ...args.form },
          `${constants.API}/claim/update/`,
          "PUT",
          30000,
          constrConstant("claimUpdate"),
          false,
          true,
        ),
      );
    };
  }),
};

export const stoppages = {
  emptyPeregonReportDumptrucks: constrSlice(
    "emptyPeregonReportDumptrucks",
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          constrAction(
            { ...args.form },
            `${constants.API}/stoppages/report/empty_peregon/`,
            "GET",
            30000,
            constrConstant("emptyPeregonReportDumptrucks"),
            false,
          ),
        );
      };
    },
  ),
  stoppagesReportVehDvs: constrSlice(
    "stoppagesReportVehDvs",
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          constrAction(
            { ...args.form },
            `${constants.API}/stoppages/report/veh_dvs/`,
            "GET",
            30000,
            constrConstant("stoppagesReportVehDvs"),
            false,
          ),
        );
      };
    },
  ),
};

export const reducer = combineReducers(reducers);

export function constrSlice(constantName: string, actionStore: any) {
  const constantLocal = constrConstant(constantName);
  const reducerLocal = constrReducer(constantLocal);
  connectStore(constantName, reducerLocal);
  return {
    name: constantName,
    constant: constantLocal,
    reducer: reducerLocal,
    action: actionStore,
  };
}

function constrConstant(name: string) {
  return {
    load: `load_${name}`,
    success: `success_${name}`,
    fail: `fail_${name}`,
    error: `error_${name}`,
    reset: `reset_${name}`,
  };
}

function constrReducer(constant: any) {
  return function (state = {}, action: { type: string; payload: any }) {
    switch (action.type) {
      case constant.load:
        return { load: true };
      case constant.success:
        return { load: false, data: action.payload };
      case constant.fail:
        return { load: false, fail: action.payload };
      case constant.error:
        return { load: false, error: action.payload };
      case constant.reset:
        return {};
      default:
        return state;
    }
  };
}

export function constrAction(
  form: object,
  url: string,
  method: string,
  timeout: number,
  constantStore: any,
  authentication: boolean,
  is_json_send: boolean = true,
) {
  return async function (dispatch: Dispatch<any>, getState: any) {
    try {
      dispatch({
        type: constantStore.load,
      });

      // console.log("url: ", url);

      // add "Action-Type" to { url | formData }
      form = {
        ...form,
        // @ts-ignore
        // "Action-Type": constantStore.data.split("_")[0],
      };

      // add '/tasks' + '/id'
      Object.entries(form).map(([key, value]) => {
        // console.log(key, value);

        // @ts-ignore
        if (key === "addToUrl") {
          url = url + value;
        }
      });

      // add {form} to "request.GET" GET | DELETE
      if (method === "GET" || method === "DELETE") {
        url = url + `?`;
        // eslint-disable-next-line array-callback-return
        Object.entries(form).map(([key, value]) => {
          if (key !== "addToUrl") {
            url = url + `${key}=${value}&`;
          }
        });
        url = url.slice(0, -1);
      }

      let formData = new FormData();
      if (is_json_send) {
        // @ts-ignore
        formData = {};
        // add {form} to "request.data" POST | PUT
        if (method === "POST" || method === "PUT") {
          // eslint-disable-next-line array-callback-return
          Object.entries(form).map(([key, value]) => {
            // @ts-ignore
            formData[key] = value;
          });
        }
      } else {
        // add {form} to "request.data" POST | PUT
        if (method === "POST" || method === "PUT") {
          // eslint-disable-next-line array-callback-return
          Object.entries(form).map(([key, value]) => {
            // @ts-ignore
            formData.append(key, value);
          });
        }
      }
      // console.log("formData: ", formData);

      // add Authorization to headers
      let config = {};
      if (authentication) {
        try {
          // const {
          //   userLoginStore: { data: userLogin },
          // } = getState();
          config = {
            url: url,
            method: method,
            timeout: timeout,
            timeoutErrorMessage: "timeout error",
            headers: {
              // @ts-ignore
              Authorization: `Token=auth_token`,
            },
            data: formData,
          };
        } catch (error) {
          dispatch({
            type: constantStore.fail,
            payload: constrActionFail(dispatch, error),
          });
        }
      } else {
        config = {
          url: url,
          method: method,
          timeout: timeout,
          timeoutErrorMessage: "timeout error",
          headers: { Authorization: `Token=auth_token` },
          data: formData,
        };
      }

      const { data } = await axios(config);
      // console.log("web response", data);

      // fix
      if (typeof data === "string") {
        if (data.search("<title>Цифровой Двойник КГП</title>") !== -1) {
          throw new Error("Path not found");
        }
      }
      if (data.response) {
        dispatch({
          type: constantStore.success,
          payload: data.response,
        });
      } else {
        dispatch({
          type: constantStore.error,
          payload: data.error,
        });
      }
    } catch (error: any) {
      // console.log("error: ", error.toString());
      dispatch({
        type: constantStore.fail,
        // payload: error.toString(),
        payload: constrActionFail(dispatch, error.toString()),
      });
    }
  };
}

function constrActionFail(dispatch: Dispatch<any>, error: any) {
  try {
    if (constants.DEBUG) {
      console.log("web-request-fail: ", error);
    }
    if (error) {
      // console.log("typeof error: ", typeof error);
      if (typeof error === "string") {
        return "Неизвестная ошибка! Попробуйте ещё раз или обратитесь к администратору.";
      }

      let status = error.response.status
        ? error.response.status
        : error.response.message
          ? error.response.message
          : error.response.data.detail;
      if (status && `${status}___________`.slice(0, 7) === "timeout") {
        status = "timeout";
      }
      switch (status) {
        case 401:
          // dispatch(action.users.logout());
          return "Ваши данные для входа не получены! Попробуйте выйти из системы и снова войти.";
        case 413:
          return "Ваш файл слишком большой! Измените его размер и перезагрузите страницу перед отправкой.";
        case 500:
          // dispatch(action.users.logout());
          return "Ваши данные для входа не получены! Попробуйте выйти из системы и снова войти.";
        case "timeout":
          return "Превышено время ожидания! Попробуйте повторить действие или ожидайте исправления.";
        default:
          return "Неизвестная ошибка! Попробуйте ещё раз или обратитесь к администратору.";
      }
    }
  } catch (error) {
    if (constants.DEBUG) {
      console.log("constrActionFail: ", error);
    }
    return "Неизвестная ошибка! Обратитесь к администратору.";
  }
}
