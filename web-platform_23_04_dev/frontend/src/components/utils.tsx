// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React from "react";
import { Dispatch } from "redux";
import axios from "axios";
import { FormEvent, MouseEvent } from "react";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as constants from "../components/constants";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export class RegularExpression {
  static haveSmallChar() {
    return /^(?=.*[a-z])/;
  }
  static haveBigChar() {
    return /^(?=.*[A-Z])/;
  }
  static haveInteger() {
    return /^(?=.*\d)/; // /^(?=.*[0-9])/;
  }
  static haveSpecificChar() {
    return /^(?=.*[!@#$%^&*])/;
  }
  static lengthMinAndMax() {
    return /^(?=.{8,})/;
  }
  static haveSmallAndBigChars() {
    return /^(?=.*[a-z])(?=.*[A-Z])/;
  }
  static StrongPassword() {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  }
  static VeryStrongPassword() {
    return new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})", "g");
  }
  static GetRegexType({
    numbers = false,
    latin = false,
    cyrillic = false,
    onlyLowerLetters = false,
    lowerSpace = false,
    space = false,
    punctuationMarks = false,
    email = false,
  }) {
    try {
      let regex = "";
      if (numbers) {
        regex = regex + "0-9";
      }
      if (latin) {
        if (onlyLowerLetters) {
          regex = regex + "a-z";
        } else {
          regex = regex + "A-Za-z";
        }
      }
      if (cyrillic) {
        if (onlyLowerLetters) {
          regex = regex + "а-яё";
        } else {
          regex = regex + "А-ЯЁа-яё";
        }
      }
      if (lowerSpace) {
        regex = regex + "_";
      }
      if (space) {
        regex = regex + " ";
      }
      if (punctuationMarks) {
        regex = regex + "-:;.,!?_";
      }
      if (email) {
        regex = regex + "@.";
      }
      return new RegExp(`[^${regex}]`, "g");
    } catch (error) {
      if (constants.DEBUG_CONSTANT) {
        console.log(error);
      }
      return new RegExp(`[^_]`, "g");
    }
  }
}

export const ChangePasswordVisibility = (objects = [""]) => {
  try {
    objects.forEach(function (object, index, array) {
      const obj = document.getElementById(object);
      const type =
        // @ts-ignore
        obj.getAttribute("type") === "password" ? "text" : "password";
      // @ts-ignore
      obj.setAttribute("type", type);
    });
  } catch (error) {
    if (constants.DEBUG_CONSTANT) {
      console.log(error);
    }
    return null;
  }
};

// @ts-ignore
export const Delay = (callbackAfterDelay, time = 1000) => {
  try {
    // setInterval(() => GetMonitoringData(), 2000);
    new Promise((resolve) => setTimeout(resolve, time)).then(() => {
      callbackAfterDelay();
    });
  } catch (error) {
    if (constants.DEBUG_CONSTANT) {
      console.log(error);
    }
    return null;
  }
};

export function ConstructorSlice1(
  constantName: string,
  connectReducerCallback: any,
  actionStore: any
) {
  const constantLocal = ConstantConstructor1(constantName);
  const reducerLocal = ConstructorReducer1(constantLocal);
  // @ts-ignore
  connectReducerCallback(constantName, reducerLocal);
  return {
    name: constantName,
    constant: constantLocal,
    reducer: reducerLocal,
    action: actionStore,
  };
}

export function ConstantConstructor1(name: string) {
  return {
    load: name + "_LOAD_CONSTANT",
    data: name + "_DATA_CONSTANT",
    error: name + "_ERROR_CONSTANT",
    fail: name + "_FAIL_CONSTANT",
    reset: name + "_RESET_CONSTANT",
  };
}

export function ConstructorReducer1(
  constantStore = { load: {}, data: {}, error: {}, fail: {}, reset: {} }
) {
  return function (state = {}, action = null) {
    // @ts-ignore
    switch (action.type) {
      case constantStore.load:
        return { load: true };
      case constantStore.data:
        return {
          load: false,
          // @ts-ignore
          data: action.payload,
        };
      case constantStore.error:
        return {
          load: false,
          // @ts-ignore
          error: action.payload,
        };
      case constantStore.fail:
        // @ts-ignore
        return { load: false, fail: action.payload };
      case constantStore.reset:
        return {};
      default:
        return state;
    }
  };
}

export function ConstructorAction1(
  form: object,
  url: string,
  method: string,
  timeout: number,
  constantStore = { load: {}, data: {}, error: {}, fail: {}, reset: {} },
  authentication: boolean
) {
  return async function (dispatch: Dispatch<any>, getState: any) {
    try {
      dispatch({
        type: constantStore.load,
      });

      // add "Action-Type" to { url | formData }
      form = {
        ...form,
        // @ts-ignore
        "Action-Type": constantStore.data.split("_")[0],
      };

      // add '/tasks' + '/id'
      Object.entries(form).map(([key, value]) => {
        // console.log(key, value);

        // @ts-ignore
        if (key == "addToUrl") {
          url = url + value;
        }
      });

      // add {form} to "request.GET" GET | DELETE
      if (method === "GET" || method === "DELETE") {
        url = url + `?`;
        // eslint-disable-next-line array-callback-return
        Object.entries(form).map(([key, value]) => {
          if (key != "addToUrl") {
            url = url + `${key}=${value}&`;
          }
        });
        url = url.slice(0, -1);
      }

      const formData = new FormData();
      // add {form} to "request.data" POST | PUT
      if (method === "POST" || method === "PUT") {
        // eslint-disable-next-line array-callback-return
        Object.entries(form).map(([key, value]) => {
          // @ts-ignore
          formData.append(key, value);
        });
      }

      // add Authorization to headers
      let config = {};
      if (authentication) {
        try {
          const {
            userLoginStore: { data: userLogin },
          } = getState();
          config = {
            url: url,
            method: method,
            timeout: timeout,
            timeoutErrorMessage: "timeout error",
            headers: {
              // @ts-ignore
              Authorization: `JWT=${userLogin.access}`,
            },
            data: formData,
          };
        } catch (error) {
          dispatch({
            type: constantStore.fail,
            payload: ConstructorActionFail1(dispatch, error),
          });
        }
      } else {
        config = {
          url: url,
          method: method,
          timeout: timeout,
          timeoutErrorMessage: "timeout error",
          headers: {},
          data: formData,
        };
      }

      // console.log(config)

      // @ts-ignore
      const { data } = await axios(config);

      console.log(data);

      if (data.response) {
        const response = data.response;
        dispatch({
          type: constantStore.data,
          payload: response,
        });
      } else {
        const response = data.error;
        dispatch({
          type: constantStore.error,
          payload: response,
        });
      }
    } catch (error) {
      dispatch({
        type: constantStore.fail,
        payload: ConstructorActionFail1(dispatch, error),
      });
    }
  };
}

// @ts-ignore
export function ConstructorActionFail1(dispatch: Dispatch<any>, error: any) {
  try {
    if (constants.DEBUG_CONSTANT) {
      console.log("fail: ", error);
    }
    if (error) {
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
          return "Неизвестная ошибка! Обратитесь к администратору.";
      }
    }
  } catch (error) {
    if (constants.DEBUG_CONSTANT) {
      console.log("ConstructorActionFail1: ", error);
    }
    return "Неизвестная ошибка! Обратитесь к администратору.";
  }
}

export const EventForm1 = (
  event: FormEvent<any>,
  preventDefault = true,
  stropPropagation = true,
  callBack: any
) => {
  try {
    if (preventDefault) {
      event.preventDefault();
    }
    if (stropPropagation) {
      event.stopPropagation();
    }
    callBack();
    return true;
  } catch (error) {
    if (constants.DEBUG_CONSTANT) {
      console.log(error);
    }
    return "";
  }
};

export const ChangeAccordionCollapse = (objects = [""]) => {
  try {
    objects.forEach(function (object, index, array) {
      const obj = document.getElementById(object);
      const classname =
        // @ts-ignore
        obj.getAttribute("class") === "accordion-collapse collapse m-0 p-0"
          ? "accordion-collapse m-0 p-0"
          : "accordion-collapse collapse m-0 p-0";
      // @ts-ignore
      obj.setAttribute("class", classname);
    });
  } catch (error) {
    if (constants.DEBUG_CONSTANT) {
      console.log(error);
    }
    return null;
  }
};

export const GetPagesArray = (totalCount = 0, limit = 1) => {
  try {
    const page = Math.ceil(totalCount / limit);
    let result = [];
    if (totalCount) {
      for (let i = 0; i < page; i++) {
        result.push(i + 1);
      }
    }
    return result;
  } catch (error) {
    if (constants.DEBUG_CONSTANT) {
      console.log(error);
    }
    return [];
  }
};

// @ts-ignore
export const getPageCount = (totalCount, limit) => {
  return Math.ceil(totalCount / limit);
};

// @ts-ignore
export const getPagesArray = (totalPages) => {
  let result = [];
  for (let i = 0; i < totalPages; i++) {
    result.push(i + 1);
  }
  return result;
};

export const GetSliceString = (string = "", length = 30, withDots = true) => {
  try {
    if (string == null || string === "null") {
      return "";
    }
    if (`${string}`.length >= length) {
      if (withDots) {
        return `${string}`.slice(0, length) + "...";
      } else {
        return `${string}`.slice(0, length);
      }
    } else {
      return string;
    }
  } catch (error) {
    if (constants.DEBUG_CONSTANT) {
      console.log(error);
    }
    return "";
  }
};

export const GetStaticFile = (path = "") => {
  try {
    if (path === "null" || path === "/media/null" || path == null) {
      return "";
    }
    return `/static${path}`;
  } catch (error) {
    if (constants.DEBUG_CONSTANT) {
      console.log(error);
    }
    return "";
  }
};

export const GetCleanDateTime = (dateTime: string, withTime = true) => {
  try {
    const date = dateTime.split("T")[0];
    const time = dateTime.split("T")[1].slice(0, 5);
    if (withTime) {
      return `${date} ${time}`;
    } else {
      return `${date}`;
    }
  } catch (error) {
    if (constants.DEBUG_CONSTANT) {
      console.log(error);
    }
    return "";
  }
};

export const EventMouse1 = (
  event: MouseEvent<any>,
  preventDefault = true,
  stropPropagation = true,
  callBack: any
) => {
  try {
    if (preventDefault) {
      event.preventDefault();
    }
    if (stropPropagation) {
      event.stopPropagation();
    }
    callBack();
    return true;
  } catch (error) {
    if (constants.DEBUG_CONSTANT) {
      console.log("EventMouse1: ", error);
    }
    return undefined;
  }
};

export function getCookie(name: string) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(
  name: string,
  value: any,
  options = { expires: Date, path: String }
) {
  // @ts-ignore
  options = {
    // @ts-ignore
    path: "/",
    // при необходимости добавьте другие значения по умолчанию
    ...options,
  };

  if (options.expires instanceof Date) {
    // @ts-ignore
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie =
    encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    // @ts-ignore
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

export function deleteCookie(name: string) {
  document.cookie = name + "=; Max-Age=0";
}
