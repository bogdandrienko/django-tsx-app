// TODO download modules /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// TODO custom modules ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import * as utils from "../../components/utils";
import * as hooks from "../../components/hooks";
import * as slices from "../../components/slices";
import * as bases from "../../components/ui/bases";

// TODO export ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function Page() {
  // TODO stores /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const slice = slices.center.centerSticking;
  const store = hooks.useSelectorCust(slice);

  // TODO hooks //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();
  const [state, setState]: any = useState({});
  const [currentTime, setCurrentTime] = useState(utils.getCurrentDateTime());
  const [form, setForm] = useState({
    param_show_all: false,
  });

  // TODO useEffects /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (store.data) {
      setState(store.data);
    }
  }, [store.data]);

  useEffect(() => {
    dispatch(
      slice.action({
        form: { ...form },
      }),
    );
    setTimeout(async () => {
      setCurrentTime(utils.getCurrentDateTime());
    }, 9000);
  }, [currentTime]);

  // TODO return /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <bases.Base3>
      {/*TODO Статусы*/}
      <div className={"card text-bg-dark m-0 p-0"}>
        {(store.fail || store.error) && (
          <div className={"display-1 text-center text-danger"}>
            ВНИМАНИЕ СВЯЗЬ!
          </div>
        )}
        <div className={"lead fw-bold d-flex p-3"}>
          <div className={"container display-6 w-75"}>
            {currentTime && currentTime.length > 0
              ? currentTime
              : "--.--.---- --:--:--"}
          </div>
          <div className={"w-25"}>
            <div className="m-0 p-0">
              {store.load && (
                <div className="row justify-content-center m-0 p-0">
                  <div className="text-center m-0 p-0">
                    <div className="justify-content-center text-center d-flex">
                      <div className="loader_2" />
                    </div>
                  </div>
                </div>
              )}
              {store.error && (
                <div
                  className={
                    "container-fluid container text-center row justify-content-center m-0 p-0"
                  }
                >
                  <div
                    className={
                      "card w-75 bg-light text-center border border-1 border-danger m-0 p-0"
                    }
                  >
                    <div
                      className={
                        "card-header bg-danger lead text-white m-0 p-1"
                      }
                    >
                      внимание!
                    </div>
                    <div
                      className={"card-body bg-danger bg-opacity-10 m-0 p-0"}
                    >
                      {store.error}
                    </div>
                  </div>
                </div>
              )}
              {store.fail && (
                <div
                  className={
                    "container-fluid container text-center row justify-content-center m-0 p-0"
                  }
                >
                  <div
                    className={
                      "card w-75 bg-light text-center border border-1 border-danger m-0 p-0"
                    }
                  >
                    <div
                      className={
                        "card-header bg-danger lead text-white m-0 p-1"
                      }
                    >
                      внимание!
                    </div>
                    <div
                      className={"card-body bg-danger bg-opacity-10 m-0 p-0"}
                    >
                      {store.fail}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={"input-group w-100 m-1 p-2"}>
          <div className="feature col">
            <p className={"text-center"}>
              <button
                onClick={() => {
                  //@ts-ignore
                  setForm({
                    ...form,
                    param_show_all: !form.param_show_all,
                  });
                }}
                className={
                  form.param_show_all
                    ? "btn btn-lg btn-warning"
                    : "btn btn-lg btn-outline-success"
                }
              >
                {form.param_show_all
                  ? "показывать все"
                  : "показывать только отклонения"}
              </button>
            </p>
          </div>
        </div>
      </div>

      <hr className={"m-0 p-0"} />

      {/*TODO Таблица*/}
      <div className={"card m-0 p-0"}>
        {(store.fail === undefined || store.error === undefined) &&
        state &&
        state.data &&
        state.data.message ? (
          <div className={"bg-dark m-0 p-1"}>
            <div className="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-3 m-0 p-1">
              {state.data.message.map((item: any, index: number) =>
                form.param_show_all || item.value.is_danger ? (
                  <div key={item.vehid} className={"col m-0 p-1"}>
                    <div
                      className="dropdown-menu position-static d-flex flex-column flex-lg-row align-items-stretch justify-content-start p-0 rounded-0 shadow-lg"
                      data-bs-theme="dark"
                    >
                      <nav
                        className={
                          item.value.is_danger
                            ? "col-lg-12 bg-danger p-1"
                            : "col-lg-12 bg-dark p-1"
                        }
                      >
                        <div className="list-unstyled d-flex flex-column text-center text-white">
                          <div className={""}>
                            <span className={"display-6 lead"}>
                              {item.vehid}
                            </span>
                            {item.value.is_danger && (
                              <button
                                onClick={() => {}}
                                className={"btn btn-sm btn-outline-dark"}
                                disabled={true}
                              >
                                отреагировал
                              </button>
                            )}
                          </div>
                        </div>
                        <div className="row p-1 row-cols-3 row-cols-sm-3 row-cols-md-3 row-cols-lg-3">
                          {item.value.trips.map(
                            (item2: any, index2: number) => (
                              <div
                                key={index2}
                                className="col d-flex align-items-center small"
                              >
                                <div>
                                  <small
                                    title={`${item2.worktype} | ${item2.datetime}`}
                                    className={
                                      item2.weight > 7
                                        ? "fs-6 text-body-emphasis fw-bold small"
                                        : "fs-6 text-body-emphasis small"
                                    }
                                  >
                                    {item2.weight} т.
                                  </small>
                                </div>
                              </div>
                            ),
                          )}
                        </div>
                      </nav>
                    </div>
                  </div>
                ) : (
                  ""
                ),
              )}
            </div>
          </div>
        ) : (
          <div
            className={
              "display-1 text-bg-light text-center text-danger shadow my-1"
            }
          >
            ДАННЫХ НЕТ!
          </div>
        )}
      </div>
    </bases.Base3>
  );
}
