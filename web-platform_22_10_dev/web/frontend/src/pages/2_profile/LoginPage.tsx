// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as slice from "../../components/slice";
import * as component from "../../components/ui/component";
import * as constant from "../../components/constant";
import * as hook from "../../components/hook";
import * as util from "../../components/util";

import * as base from "../../components/ui/base";
import * as captcha from "../../components/ui/captcha";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export const LoginPage = () => {
  // TODO store ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const captchaCheck = hook.useSelectorCustom2(slice.captcha.captchaCheckStore);

  // TODO hooks ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();

  const [user, setUser, resetUser] = hook.useStateCustom1({
    username: "",
    password: "",
  });

  // TODO functions ////////////////////////////////////////////////////////////////////////////////////////////////////

  // @ts-ignore
  function Login(event) {
    try {
      event.preventDefault();
      event.stopPropagation();
    } catch (error) {}
    if (captchaCheck.data) {
      dispatch(slice.user.userLoginStore.action({ form: { ...user } }));
    }
  }

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <base.Base1>
      <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center text-center shadow m-0 p-1">
        <form className="m-0 p-0" onSubmit={Login}>
          <div className="card shadow custom-background-transparent-low m-0 p-0">
            <div className="card-header m-0 p-1">
              <h2>?????????? ?? ??????????????</h2>
            </div>
            <div className="card-body m-0 p-0">
              <div className="m-0 p-1">
                <label className="form-control-sm text-center w-75 m-0 p-1">
                  <i className="fa-solid fa-id-card m-0 p-1" />
                  ?????????????? ?????? ??????:
                  <input
                    type="text"
                    className="form-control form-control-sm text-center m-0 p-1"
                    value={user.username}
                    placeholder="?????????????? ?????? ??????..."
                    required
                    minLength={12}
                    maxLength={12}
                    onChange={(event) =>
                      setUser({
                        ...user,
                        username: event.target.value.replace(
                          util.RegularExpression.GetRegexType({
                            numbers: true,
                          }),
                          ""
                        ),
                      })
                    }
                    autoComplete="current-username"
                  />
                  <small className="custom-color-warning-1 m-0 p-0">
                    * ???????????? ??????????
                    <small className="text-muted m-0 p-0">
                      {" "}
                      * ??????????: 12 ????????????????
                    </small>
                  </small>
                </label>
                <label className="form-control-sm text-center w-75 m-0 p-1">
                  <i className="fa-solid fa-key m-0 p-1" />
                  ?????????????? ???????????? ???? ????????????????:
                  <div className="input-group form-control-sm m-0 p-1">
                    <input
                      type="password"
                      className="form-control form-control-sm text-center m-0 p-1"
                      id="password"
                      value={user.password}
                      placeholder="?????????????? ???????????? ??????..."
                      required
                      onChange={(event) =>
                        setUser({
                          ...user,
                          password: event.target.value.replace(
                            util.RegularExpression.GetRegexType({
                              numbers: true,
                              latin: true,
                              lowerSpace: true,
                            }),
                            ""
                          ),
                        })
                      }
                      autoComplete="current-password"
                      minLength={8}
                      maxLength={16}
                    />
                    <span className="">
                      <i
                        className="fa-solid fa-eye-low-vision btn btn-outline-secondary m-0 p-3"
                        onClick={() =>
                          util.ChangePasswordVisibility(["password"])
                        }
                      />
                    </span>
                  </div>
                  <small className="custom-color-warning-1 m-0 p-0">
                    * ???????????? ????????????????
                    <small className="text-muted m-0 p-0">
                      {" "}
                      * ??????????: ???? 8 ???? 16 ????????????????
                    </small>
                  </small>
                </label>
              </div>
              <div className="m-0 p-1">
                <label className="m-0 p-1">
                  <captcha.Captcha1 />
                </label>
              </div>
            </div>
            <div className="card-footer m-0 p-0">
              <component.StatusStore1
                slice={slice.user.userLoginStore}
                consoleLog={constant.DEBUG_CONSTANT}
              />
              <ul className="btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center m-0 p-0">
                <button
                  className="btn btn-sm btn-primary m-1 p-2"
                  type="submit"
                >
                  <i className="fa-solid fa-circle-check m-0 p-1" />
                  ?????????? ?? ??????????????
                </button>
                <button
                  className="btn btn-sm btn-warning m-1 p-2"
                  type="reset"
                  onClick={() => resetUser()}
                >
                  <i className="fa-solid fa-pen-nib m-0 p-1" />
                  ???????????????? ????????????
                </button>
              </ul>
              <ul className="btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center m-0 p-0">
                <Link
                  to="/password/recover"
                  className="btn btn-sm btn-success m-1 p-2"
                >
                  <i className="fa-solid fa-universal-access m-0 p-1" />
                  ???????????????????????? ???????????? ?? ????????????????
                </Link>
              </ul>
            </div>
          </div>
        </form>
      </ul>
    </base.Base1>
  );
};
