// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, MouseEvent } from "react";
import { useDispatch } from "react-redux";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as component from "./component";
import * as constant from "../constant";
import * as hook from "../hook";
import * as util from "../util";

import * as slice from "../slice";
import * as action from "../action";
import axios from "axios";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export const Captcha1 = () => {
  const dispatch = useDispatch();

  //const captchaCheck = hook.useSelectorCustom2(slice.captcha.captchaCheckStore);
  const captchaCheck = { data: undefined, load: undefined, error: undefined };

  useEffect(() => {
    if (captchaCheck.data) {
      util.Delay(
        () =>
          dispatch({ type: slice.captcha.captchaCheckStore.constant.reset }),
        30000
      );
    }
  }, [captchaCheck.data]);

  async function Check(event: MouseEvent<HTMLDivElement>) {
    // Equivalent to `axios.get('https://httpbin.org/get?answer=42')`
    //     const res = await axios.get('https://httpbin.org/get', { params: { answer: 42 } });
    //     const params = new URLSearchParams([['answer', 42]]);
    //     const res = await axios.get('https://httpbin.org/get', { params });
    // const action = "GetOneTodo"
    // const token = "12345Qw!"
    // const config = {
    //   url: `api/todo/?page=1&limit=10`,
    //   method: `GET`,
    //   timeout: 3000,
    //   headers: {
    //     Authorization: `action=${action};token=${token};`,
    //     'Content-Type': 'application/json',
    //     'X-Requested-With': 'XMLHttpRequest',
    //   },
    //   data: {},
    // };
    // const response = await axios(config)
    // console.log("response: ", response)
    //
    // const formData = new FormData();
    // const config = {
    //   url: `api/captcha/`,
    //   method: `GET`,
    //   timeout: 3000,
    //   headers: {
    //     Authorization: `Bearer 12345Qw!`,
    //   },
    //   data: formData,
    // };
    // const response = await axios(config);
    // console.log("response: ", response);
    //
    const formData = new FormData();
    formData.append("action", "Send Mail");
    formData.append("title", "11111111111");
    formData.append("description", "22222222222222");
    // @ts-ignore
    formData.append("is_completed", true);
    const config = {
      url: `api/todo/?action=Send Mail`,
      method: `POST`,
      timeout: 3000,
      headers: {
        Authorization: `action=_;token=12345Qw!;`,
      },
      data: formData,
    };
    const response = await axios(config);
    console.log("response: ", response);
    //
    // util.EventMouse1(event, true, true, () => {
    //   // dispatch(slice.captcha.captchaCheckStore.action({}));
    //   dispatch(
    //     slice.captcha.captchaCheckStore.action({
    //       id: 12,
    //       form: { search: "1234" },
    //     })
    //   );
    //   // dispatch(action.captcha.captchaCheckStore(1, { name: "00000000" }));
    // });
  }

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="card">
      {!captchaCheck.data && (
        <div className="card-header bg-danger bg-opacity-10 text-danger m-0 p-1">
          <i className="fa-solid fa-robot m-0 p-1 fw-bold lead" />
          Пройдите проверку на робота!
        </div>
      )}
      {captchaCheck.data && (
        <div className="card-header bg-success bg-opacity-10 text-success m-0 p-1">
          <i className={"fa-solid fa-user-check m-0 p-1 fw-bold lead"} />
          Вы успешно прошли проверку!
        </div>
      )}
      {/* <component.StatusStore1
        slice={slice.captcha.captchaCheckStore}
        consoleLog={constant.DEBUG_CONSTANT}
        showData={false}
      /> */}
      {!captchaCheck.load && !captchaCheck.data && (
        <div className="card-body m-1 p-3" onClick={(event) => Check(event)}>
          <i className="fa-solid fa-person btn btn-lg btn-outline-danger lead">
            <small className="m-1 p-3">я не робот!</small>
          </i>
        </div>
      )}
    </div>
  );
};

export const Captcha2 = () => {
  const dispatch = useDispatch();

  //const captchaCheck = hook.useSelectorCustom2(slice.captcha.captchaCheckStore);
  const captchaCheck = { data: undefined, load: undefined, error: undefined };

  useEffect(() => {
    if (captchaCheck.data) {
      util.Delay(
        () =>
          dispatch({ type: slice.captcha.captchaCheckStore.constant.reset }),
        20000
      );
    }
  }, [captchaCheck.data]);

  async function Check(event: MouseEvent<HTMLDivElement>) {
    // Equivalent to `axios.get('https://httpbin.org/get?answer=42')`
    //     const res = await axios.get('https://httpbin.org/get', { params: { answer: 42 } });
    //     const params = new URLSearchParams([['answer', 42]]);
    //     const res = await axios.get('https://httpbin.org/get', { params });
    // const action = "GetOneTodo"
    // const token = "12345Qw!"
    // const config = {
    //   url: `api/todo/?page=1&limit=10`,
    //   method: `GET`,
    //   timeout: 3000,
    //   headers: {
    //     Authorization: `action=${action};token=${token};`,
    //     'Content-Type': 'application/json',
    //     'X-Requested-With': 'XMLHttpRequest',
    //   },
    //   data: {},
    // };
    // const response = await axios(config)
    // console.log("response: ", response)
    //
    // const formData = new FormData();
    // const config = {
    //   url: `api/captcha/`,
    //   method: `GET`,
    //   timeout: 3000,
    //   headers: {
    //     Authorization: `Bearer 12345Qw!`,
    //   },
    //   data: formData,
    // };
    // const response = await axios(config);
    // console.log("response: ", response);
    //
    const formData = new FormData();
    formData.append("action", "Send Mail");
    formData.append("title", "11111111111");
    formData.append("description", "22222222222222");
    // @ts-ignore
    formData.append("is_completed", true);
    const config = {
      url: `api/todo/?action=Send Mail`,
      method: `POST`,
      timeout: 3000,
      headers: {
        Authorization: `action=_;token=12345Qw!;`,
      },
      data: formData,
    };
    const response = await axios(config);
    console.log("response: ", response);
    //
    // util.EventMouse1(event, true, true, () => {
    //   // dispatch(slice.captcha.captchaCheckStore.action({}));
    //   dispatch(
    //     slice.captcha.captchaCheckStore.action({
    //       id: 12,
    //       form: { search: "1234" },
    //     })
    //   );
    //   // dispatch(action.captcha.captchaCheckStore(1, { name: "00000000" }));
    // });
  }

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="card">
      {!captchaCheck.data && (
        <div className="card-header bg-danger bg-opacity-10 text-danger m-0 p-1">
          <i className="fa-solid fa-robot m-0 p-1 fw-bold lead" />
          Пройдите проверку на робота!
        </div>
      )}
      {captchaCheck.data && (
        <div className="card-header bg-success bg-opacity-10 text-success m-0 p-1">
          <i className={"fa-solid fa-user-check m-0 p-1 fw-bold lead"} />
          Вы успешно прошли проверку!
        </div>
      )}
      {/* <component.StatusStore1
        slice={slice.captcha.captchaCheckStore}
        consoleLog={constant.DEBUG_CONSTANT}
        showData={false}
      /> */}
      {!captchaCheck.load && !captchaCheck.data && (
        <div className="card-body m-1 p-3" onClick={(event) => Check(event)}>
          <i className="fa-solid fa-person btn btn-lg btn-outline-danger lead">
            <small className="m-1 p-3">я не робот!</small>
          </i>
        </div>
      )}
    </div>
  );
};
