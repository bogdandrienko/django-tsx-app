// TODO download modules /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// TODO custom modules ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import * as base from "../components/ui/bases";
import * as components from "../components/ui/components";
import * as constants from "../components/constants";
import * as utils from "../components/utils";
import * as hooks from "../components/hooks";
import * as slices from "../components/slices";

// TODO export ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function Page(): JSX.Element {
  // TODO stores /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const slice = slices.centr.centrMonitoringAsm;
  const store = hooks.useSelectorCustom1(slice);

  // TODO hooks //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();
  const [state, setState]: any = useState({});
  const [currentTime, setCurrentTime] = useState(utils.getCurrentDateTime());
  const [form, setForm] = useState({
    minVal: 180,
    timeDiff: 10,
    danger: false,
    commsHealth: "нет данных",
    commsIsCheck: true,
    asmHealth: "нет данных",
    asmIsCheck: true,
    geoHealth: "нет данных",
    geoIsCheck: true,
    drainageHealth: "нет данных",
    drainageIsCheck: true,
  });

  // TODO useEffects /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    dispatch(slice.action({ form: {} }));
    setTimeout(async () => {
      setCurrentTime(utils.getCurrentDateTime());
    }, 9000);
  }, [currentTime]);

  useEffect(() => {
    if (store && store.data) {
      setState(store.data);
    }
  }, [store.data]);

  useEffect(() => {
    if (state && state.data) {
      let comms = "нет данных";
      let asm = "нет данных";
      let drainage = "нет данных";
      if (state.data.communicator_comms_alarms) {
        comms = "";
        if (
          state.data.communicator_comms_alarms.message &&
          state.data.communicator_comms_alarms.message.length > 0
        ) {
          comms = "есть нарушения";
        }
      }
      if (state.data.communicator_asm) {
        asm = "";
      }
      if (state.data.communicator_drainage) {
        drainage = "";
        if (
          state.data.communicator_drainage.message &&
          state.data.communicator_drainage.message.difval < 150
        ) {
          drainage = "низкая производительность";
        }
      }
      setForm({
        ...form,
        commsHealth: comms,
        asmHealth: asm,
        drainageHealth: drainage,
      });
    }
  }, [state.data]);

  useEffect(() => {
    console.log("store.data: ", store.data);
  }, [store.data]);

  // TODO functions //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // TODO return /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <base.Base2
      title={"СИТУАЦИОННЫЙ ЦЕНТР: Центр мониторинга"}
      description={"Мониторинг критических показателей в реальном времени"}
    >
      {/*TODO Статусы*/}
      <div className={"card text-bg-dark m-0 p-1"}>
        {(store.fail || store.error) && (
          <div className={"display-1 text-center text-danger"}>
            ВНИМАНИЕ СВЯЗЬ!
          </div>
        )}
        <div className={"lead fw-bold d-flex"}>
          <div className={"container display-6 w-75"}>
            {currentTime && currentTime.length > 0
              ? currentTime
              : "--.--.---- --:--:--"}
          </div>
          <div className={"w-25"}>
            <components.StatusStore1
              slice={slice}
              consoleLog={constants.DEBUG_CONSTANT}
              showData={false}
            />
          </div>
        </div>
      </div>

      <hr className={"m-1 p-0"} />

      {/*TODO Таблица*/}
      <div className={"card m-0 p-0 bg-dark"}>
        {(store.fail === undefined || store.error === undefined) &&
        state &&
        state.data ? (
          <div className={"shadow album p-1"}>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              <div className={"col"}>
                <div
                  className="dropdown-menu position-static d-flex flex-column flex-lg-row align-items-stretch justify-content-start p-0 rounded-3 shadow-lg"
                  data-bs-theme="dark"
                >
                  <nav
                    className={
                      form.commsHealth !== "" && form.commsIsCheck
                        ? "col-lg-4 bg-danger"
                        : "col-lg-4"
                    }
                  >
                    <ul className="list-unstyled d-flex flex-column text-center text-white">
                      <li>
                        <div>
                          <div className={"text-start"}>
                            <button
                              className={
                                form.commsIsCheck
                                  ? "btn btn-outline-success fa-solid fa-volume-high p-3"
                                  : "btn btn-outline-secondary fa-solid fa-volume-xmark p-3"
                              }
                              onClick={() => {
                                setForm({
                                  ...form,
                                  commsIsCheck: !form.commsIsCheck,
                                });
                              }}
                            ></button>
                          </div>
                          <strong className="d-block">
                            ПОЗИЦИОНИРОВАНИЕ ПЕРСОНАЛА
                          </strong>
                          <small>(буровзрывные работы)</small>
                        </div>
                      </li>
                      {form.commsIsCheck && (
                        <div>
                          <li className={"py-3"}>
                            <div>
                              <strong className="d-block">ВРЕМЯ СВЯЗИ</strong>
                              <small>
                                {
                                  state.data.communicator_comms_alarms.date_time_server.split(
                                    "."
                                  )[0]
                                }
                              </small>
                            </div>
                          </li>
                          <li className={"py-3"}>
                            <div>
                              <strong className="d-block">СТАТУС</strong>
                              <small
                                className={
                                  form.commsHealth === ""
                                    ? "text-success"
                                    : "text-white lead"
                                }
                              >
                                {form.commsHealth === ""
                                  ? "в норме"
                                  : form.commsHealth}
                              </small>
                            </div>
                          </li>
                        </div>
                      )}
                    </ul>
                  </nav>
                  <div className="d-none d-lg-block vr mx-4 opacity-10">
                    &nbsp;
                  </div>
                  <div className="col-lg-auto">
                    {form.commsHealth === "" || !form.commsIsCheck ? (
                      "..."
                    ) : (
                      <nav className="m-0 p-0">
                        <table className="table small table-light m-0 p-0 rounded">
                          <thead>
                            <tr>
                              <th scope="col" className={"text-white"}>
                                Наименование:
                              </th>
                              <th scope="col" className={"text-white"}>
                                Время:
                              </th>
                              <th scope="col" className={"text-white"}>
                                Значение:
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {state.data.communicator_comms_alarms.message.map(
                              (item: any, index: number) => (
                                <tr key={item.id}>
                                  <td className={"text-white"}>{item.name}</td>
                                  <td className={"text-white"}>
                                    {item.position}
                                  </td>
                                  <td className={"text-white"}>
                                    {item.created_at}
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </nav>
                    )}
                  </div>
                </div>
              </div>

              <div className={"col"}>
                <div
                  className="dropdown-menu position-static d-flex flex-column flex-lg-row align-items-stretch justify-content-start p-0 rounded-3 shadow-lg"
                  data-bs-theme="dark"
                >
                  <nav
                    className={
                      form.asmHealth !== "" && form.asmIsCheck
                        ? "col-lg-4 bg-danger"
                        : "col-lg-4"
                    }
                  >
                    <ul className="list-unstyled d-flex flex-column text-center text-white">
                      <li>
                        <div>
                          <div className={"text-start"}>
                            <button
                              className={
                                form.asmIsCheck
                                  ? "btn btn-outline-success fa-solid fa-volume-high p-3"
                                  : "btn btn-outline-secondary fa-solid fa-volume-xmark p-3"
                              }
                              onClick={() => {
                                setForm({
                                  ...form,
                                  asmIsCheck: !form.asmIsCheck,
                                });
                              }}
                            ></button>
                          </div>
                          <strong className="d-block">ЭКОЛОГИЯ</strong>
                          <small>
                            (автоматизированная станция мониторинга)
                          </small>
                        </div>
                      </li>
                      {form.asmIsCheck && (
                        <div>
                          <li className={"py-3"}>
                            <div>
                              <strong className="d-block">ВРЕМЯ СВЯЗИ</strong>
                              <small>
                                {
                                  state.data.communicator_asm.date_time_server.split(
                                    "."
                                  )[0]
                                }
                              </small>
                            </div>
                          </li>
                          <li className={"py-3"}>
                            <div>
                              <strong className="d-block">СТАТУС</strong>
                              <small
                                className={
                                  form.asmHealth === ""
                                    ? "text-success"
                                    : "text-white lead"
                                }
                              >
                                {form.asmHealth === ""
                                  ? "в норме"
                                  : form.asmHealth}
                              </small>
                            </div>
                          </li>
                        </div>
                      )}
                    </ul>
                  </nav>
                  <div className="d-none d-lg-block vr mx-4 opacity-10">
                    &nbsp;
                  </div>
                  <div className="col-lg-auto">
                    {form.asmHealth !== "" || !form.asmIsCheck ? (
                      "..."
                    ) : (
                      <nav className="m-0 p-0">
                        <table className="table small table-light m-0 p-0 rounded">
                          <thead>
                            <tr>
                              <th scope="col" className={"text-white"}>
                                Наименование:
                              </th>
                              <th scope="col" className={"text-white"}>
                                Время:
                              </th>
                              <th scope="col" className={"text-white"}>
                                Значение:
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {state.data.communicator_asm.message.map(
                              (item: any, index: number) => (
                                <tr key={item.id}>
                                  <td className={"text-white"}>{item.name}</td>
                                  <td className={"text-white"}>
                                    {item.timestamp.split(".")[0]}
                                  </td>
                                  <td className={"text-white"}>{item.value}</td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </nav>
                    )}
                  </div>
                </div>
              </div>

              <div className={"col"}>
                <div
                  className="dropdown-menu position-static d-flex flex-column flex-lg-row align-items-stretch justify-content-start p-0 rounded-3 shadow-lg"
                  data-bs-theme="dark"
                >
                  <nav
                    className={
                      form.drainageHealth !== "" && form.drainageIsCheck
                        ? "col-lg-4 bg-danger"
                        : "col-lg-4"
                    }
                  >
                    <ul className="list-unstyled d-flex flex-column text-center text-white">
                      <li>
                        <div>
                          <div className={"text-start"}>
                            <button
                              className={
                                form.drainageIsCheck
                                  ? "btn btn-outline-success fa-solid fa-volume-high p-3"
                                  : "btn btn-outline-secondary fa-solid fa-volume-xmark p-3"
                              }
                              onClick={() => {
                                setForm({
                                  ...form,
                                  drainageIsCheck: !form.drainageIsCheck,
                                });
                              }}
                            ></button>
                          </div>
                          <strong className="d-block">
                            РАСХОДОМЕР ВОДООТЛИВА
                          </strong>
                          <small>(асд)</small>
                        </div>
                      </li>
                      {form.drainageIsCheck && (
                        <div>
                          <li className={"py-3"}>
                            <div>
                              <strong className="d-block">ВРЕМЯ СВЯЗИ</strong>
                              <small>
                                {
                                  state.data.communicator_drainage.date_time_server.split(
                                    "."
                                  )[0]
                                }
                              </small>
                            </div>
                          </li>
                          <li className={"py-3"}>
                            <div>
                              <strong className="d-block">СТАТУС</strong>
                              <small
                                className={
                                  form.drainageHealth === ""
                                    ? "text-success"
                                    : "text-white lead"
                                }
                              >
                                {form.drainageHealth === ""
                                  ? "в норме"
                                  : form.drainageHealth}
                              </small>
                            </div>
                          </li>
                        </div>
                      )}
                    </ul>
                  </nav>
                  <div className="d-none d-lg-block vr mx-4 opacity-10">
                    &nbsp;
                  </div>
                  <div className="col-lg-auto">
                    {!form.drainageIsCheck ? (
                      "..."
                    ) : (
                      <nav className="m-0 p-0">
                        <table className="table small table-light m-0 p-0 rounded">
                          <thead>
                            <tr>
                              <th scope="col" className={"text-white"}>
                                Время:
                              </th>
                              <th scope="col" className={"text-white"}>
                                Значение:
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className={"text-white"}>
                                {
                                  state.data.communicator_drainage.message
                                    .maxtime
                                }
                              </td>
                              <td className={"text-white"}>
                                {
                                  state.data.communicator_drainage.message
                                    .maxfuel
                                }
                              </td>
                            </tr>
                            <tr>
                              <td className={"text-white"}>
                                {
                                  state.data.communicator_drainage.message
                                    .mintime
                                }
                              </td>
                              <td className={"text-white"}>
                                {
                                  state.data.communicator_drainage.message
                                    .minfuel
                                }
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={2} className={"text-white"}>
                                Производительность(в час):{" "}
                                {state.data.communicator_drainage.message
                                  .difval < 180 ? (
                                  <span
                                    className={
                                      "text-danger lead fw-bold m-0 p-0 text-white"
                                    }
                                  >
                                    {
                                      state.data.communicator_drainage.message
                                        .difval
                                    }
                                  </span>
                                ) : state.data.communicator_drainage.message
                                    .difval -
                                    20 <
                                  180 ? (
                                  <span
                                    className={
                                      "text-warning lead fw-bold m-0 p-0 text-white"
                                    }
                                  >
                                    {
                                      state.data.communicator_drainage.message
                                        .difval
                                    }
                                  </span>
                                ) : (
                                  <span
                                    className={
                                      "text-success lead fw-bold m-0 p-0 text-white"
                                    }
                                  >
                                    {
                                      state.data.communicator_drainage.message
                                        .difval
                                    }
                                  </span>
                                )}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </nav>
                    )}
                  </div>
                </div>
              </div>

              <div className={"col"}>
                <div
                  className="dropdown-menu position-static d-flex flex-column flex-lg-row align-items-stretch justify-content-start p-0 rounded-3 shadow-lg"
                  data-bs-theme="dark"
                >
                  <nav
                    className={
                      form.geoHealth !== "" && form.geoIsCheck
                        ? "col-lg-4 bg-danger"
                        : "col-lg-4"
                    }
                  >
                    <ul className="list-unstyled d-flex flex-column text-center text-white">
                      <li>
                        <div>
                          <div className={"text-start"}>
                            <button
                              className={
                                form.geoIsCheck
                                  ? "btn btn-outline-success fa-solid fa-volume-high p-3"
                                  : "btn btn-outline-secondary fa-solid fa-volume-xmark p-3"
                              }
                              onClick={() => {
                                setForm({
                                  ...form,
                                  geoIsCheck: !form.geoIsCheck,
                                });
                              }}
                            ></button>
                          </div>
                          <strong className="d-block">
                            ДВИЖЕНИЕ БОРТОВ КАРЬЕРА
                          </strong>
                          <small>(маркшейдеры)</small>
                        </div>
                      </li>
                      <li className={"py-3"}>
                        <div>
                          <strong className="d-block">ВРЕМЯ СВЯЗИ</strong>
                          <small>--.--.---- --:--:--</small>
                        </div>
                      </li>
                      <li className={"py-3"}>
                        <div>
                          <strong className="d-block">СТАТУС</strong>
                          <small className={"text-secondary"}>
                            в разработке
                          </small>
                        </div>
                      </li>
                    </ul>
                  </nav>
                  <div className="d-none d-lg-block vr mx-4 opacity-10">
                    &nbsp;
                  </div>
                  <div className="col-lg-auto">...</div>
                </div>
              </div>

              <div className={"col"}>
                <div
                  className="dropdown-menu position-static d-flex flex-column flex-lg-row align-items-stretch justify-content-start p-0 rounded-3 shadow-lg"
                  data-bs-theme="dark"
                >
                  <nav className="col-lg-4">
                    <ul className="list-unstyled d-flex flex-column text-center text-white">
                      <li>
                        <div>
                          <div className={"text-start"}>
                            <button className="btn btn-outline-secondary fa-solid fa-volume-xmark p-3"></button>
                          </div>
                          <strong className="d-block">
                            МОНИТОРИНГ УСТАЛОСТИ ПЕРСОНАЛА
                          </strong>
                          <small>(умные камеры)</small>
                        </div>
                      </li>
                      <li className={"py-3"}>
                        <div>
                          <strong className="d-block">ВРЕМЯ СВЯЗИ</strong>
                          <small>--.--.---- --:--:--</small>
                        </div>
                      </li>
                      <li className={"py-3"}>
                        <div>
                          <strong className="d-block">СТАТУС</strong>
                          <small className={"text-secondary"}>
                            в разработке
                          </small>
                        </div>
                      </li>
                    </ul>
                  </nav>
                  <div className="d-none d-lg-block vr mx-4 opacity-10">
                    &nbsp;
                  </div>
                  <div className="col-lg-auto">...</div>
                </div>
              </div>

              <div className={"col"}>
                <div
                  className="dropdown-menu position-static d-flex flex-column flex-lg-row align-items-stretch justify-content-start p-0 rounded-3 shadow-lg"
                  data-bs-theme="dark"
                >
                  <nav className="col-lg-4">
                    <ul className="list-unstyled d-flex flex-column text-center text-white">
                      <li>
                        <div>
                          <div className={"text-start"}>
                            <button className="btn btn-outline-secondary fa-solid fa-volume-xmark p-3"></button>
                          </div>
                          <strong className="d-block">
                            УЧЁТ ЭЛЕКТРО - ЭНЕРГИИ
                          </strong>
                          <small>(энергетики)</small>
                        </div>
                      </li>
                      <li className={"py-3"}>
                        <div>
                          <strong className="d-block">ВРЕМЯ СВЯЗИ</strong>
                          <small>--.--.---- --:--:--</small>
                        </div>
                      </li>
                      <li className={"py-3"}>
                        <div>
                          <strong className="d-block">СТАТУС</strong>
                          <small className={"text-secondary"}>
                            в разработке
                          </small>
                        </div>
                      </li>
                    </ul>
                  </nav>
                  <div className="d-none d-lg-block vr mx-4 opacity-10">
                    &nbsp;
                  </div>
                  <div className="col-lg-auto">...</div>
                </div>
              </div>

              <div className={"col"}>
                <div
                  className="dropdown-menu position-static d-flex flex-column flex-lg-row align-items-stretch justify-content-start p-0 rounded-3 shadow-lg"
                  data-bs-theme="dark"
                >
                  <nav className="col-lg-4">
                    <ul className="list-unstyled d-flex flex-column text-center text-white">
                      <li>
                        <div>
                          <div className={"text-start"}>
                            <button className="btn btn-outline-secondary fa-solid fa-volume-xmark p-3"></button>
                          </div>
                          <strong className="d-block">
                            ПОЖАРНАЯ БЕЗОПАСНОСТЬ
                          </strong>
                          <small>(удалённые пульты ПБ)</small>
                        </div>
                      </li>
                      <li className={"py-3"}>
                        <div>
                          <strong className="d-block">ВРЕМЯ СВЯЗИ</strong>
                          <small>--.--.---- --:--:--</small>
                        </div>
                      </li>
                      <li className={"py-3"}>
                        <div>
                          <strong className="d-block">СТАТУС</strong>
                          <small className={"text-secondary"}>
                            в разработке
                          </small>
                        </div>
                      </li>
                    </ul>
                  </nav>
                  <div className="d-none d-lg-block vr mx-4 opacity-10">
                    &nbsp;
                  </div>
                  <div className="col-lg-auto">...</div>
                </div>
              </div>
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
    </base.Base2>
  );
}
