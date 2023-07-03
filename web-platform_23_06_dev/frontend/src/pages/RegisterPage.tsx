// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as base from "../components/ui/base";
import * as hooks from "../components/hooks";
import * as utils from "../components/utils";
import * as captchas from "../components/ui/captchas";
import * as slices from "../components/slices";
import * as constants from "../components/constants";
import * as components from "../components/ui/components";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function Page(): JSX.Element {
  // TODO store ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const captchaCheckStore = hooks.useSelectorCustom1(
    slices.captcha.captchaCheckStore
  );
  const userRegisterStore = hooks.useSelectorCustom1(
    slices.user.userRegisterStore
  );

  // TODO hooks ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser, resetUser] = hooks.useStateCustom1({
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
    if (captchaCheckStore.data) {
      dispatch(slices.user.userRegisterStore.action({ form: { ...user } }));
    }
  }

  useEffect(() => {
    if (captchaCheckStore.data) {
      utils.Delay(
        () =>
          dispatch({ type: slices.captcha.captchaCheckStore.constant.reset }),
        60000
      );
    }
  }, [captchaCheckStore.data]);

  useEffect(() => {
    if (userRegisterStore.data) {
      utils.Delay(() => navigate("/login"), 1000);
    }
  }, [userRegisterStore.data]);

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <base.Base1
      title={"Register page"}
      description={"please register new account"}
    >
      <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center text-center shadow m-0 p-1">
        <form className="m-0 p-0" onSubmit={Login}>
          <div className="card shadow custom-background-transparent-low m-0 p-0">
            <div className="card-header m-0 p-1">
              <h2>Register in app</h2>
            </div>
            <div className="card-body m-0 p-0">
              <div className="m-0 p-1">
                <label className="form-control-sm text-center w-75 m-0 p-1">
                  <i className="fa-solid fa-id-card m-0 p-1" />
                  Enter your username:
                  <input
                    type="text"
                    className="form-control form-control-sm text-center m-0 p-1"
                    value={user.username}
                    placeholder="enter username here..."
                    required
                    minLength={1}
                    maxLength={20}
                    onChange={(event) =>
                      setUser({
                        ...user,
                        username: event.target.value.replace(
                          utils.RegularExpression.GetRegexType({
                            numbers: true,
                            latin: true,
                            lowerSpace: true,
                          }),
                          ""
                        ),
                      })
                    }
                    autoComplete="current-username"
                  />
                  <small className="custom-color-warning-1 m-0 p-0">
                    * only numbers, latin character and lower space
                    <small className="text-muted m-0 p-0">
                      {" "}
                      * length: from 1 to 20 characters
                    </small>
                  </small>
                </label>
                <label className="form-control-sm text-center w-75 m-0 p-1">
                  <i className="fa-solid fa-key m-0 p-1" />
                  Enter password for account:
                  <div className="input-group form-control-sm m-0 p-1">
                    <input
                      type="password"
                      className="form-control form-control-sm text-center m-0 p-1"
                      id="password"
                      value={user.password}
                      placeholder="enter password here..."
                      required
                      onChange={(event) =>
                        setUser({
                          ...user,
                          password: event.target.value.replace(
                            utils.RegularExpression.GetRegexType({
                              numbers: true,
                              latin: true,
                              lowerSpace: true,
                            }),
                            ""
                          ),
                        })
                      }
                      autoComplete="current-password"
                      minLength={12}
                      maxLength={16}
                    />
                    <span className="">
                      <i
                        className="fa-solid fa-eye-low-vision btn btn-outline-secondary m-0 p-3"
                        onClick={() =>
                          utils.ChangePasswordVisibility(["password"])
                        }
                      />
                    </span>
                  </div>
                  <small className="custom-color-warning-1 m-0 p-0">
                    * only numbers, latin character and lower space
                    <small className="text-muted m-0 p-0">
                      {" "}
                      * length: from 12 to 16 characters
                    </small>
                  </small>
                </label>
              </div>
              <div className="m-0 p-1">
                <label className="m-0 p-1">
                  <captchas.Captcha1 />
                </label>
              </div>
            </div>
            <div className="card-footer m-0 p-0">
              <components.StatusStore1
                slice={slices.user.userRegisterStore}
                consoleLog={constants.DEBUG_CONSTANT}
                showData={false}
              />
              <ul className="btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center m-0 p-0">
                <button
                  className="btn btn-sm btn-primary m-1 p-2"
                  type="submit"
                >
                  <i className="fa-solid fa-circle-check m-0 p-1" />
                  войти в систему
                </button>
                <button
                  className="btn btn-sm btn-warning m-1 p-2"
                  type="reset"
                  onClick={() => resetUser()}
                >
                  <i className="fa-solid fa-pen-nib m-0 p-1" />
                  сбросить данные
                </button>
              </ul>
              <ul className="btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center m-0 p-0">
                <Link
                  to="/password/recover"
                  className="btn btn-sm btn-success m-1 p-2"
                >
                  <i className="fa-solid fa-universal-access m-0 p-1" />
                  Восстановить доступ к аккаунту
                </Link>
              </ul>
            </div>
          </div>
        </form>
      </ul>
    </base.Base1>
  );
}
