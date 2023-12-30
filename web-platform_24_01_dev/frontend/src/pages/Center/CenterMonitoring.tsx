import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as utils from "../../components/utils";
import * as slices from "../../components/slices";
import * as hooks from "../../components/hooks";
import * as bases from "../../components/ui/bases";

export default function Page() {
  const slice = slices.center.centerMonitoring;
  const store = hooks.useSelectorCust(slice);
  const dispatch = useDispatch();

  // TODO useEffects /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [state, setState]: any = useState(undefined);
  const [currentTime, setCurrentTime] = useState(utils.getCurrentDateTime());
  const [form, setForm] = useState({
    commsHealth: "нет данных",
    commsIsCheck: true,
    asmHealth: "нет данных",
    asmIsCheck: true,
    drainageHealth: "нет данных",
    drainageIsCheck: true,
  });

  useEffect(() => {
    if (store.data) {
      setState(store.data);
    }
  }, [store.data]);

  useEffect(() => {
    dispatch(slice.action({ form: {} }));
    setTimeout(async () => {
      setCurrentTime(utils.getCurrentDateTime());
    }, 10000);
  }, [currentTime]);

  useEffect(() => {
    if (store && store.data) {
      const now = new Date();
      // @ts-ignore
      const criticalDate = new Date(now - 10 * 60 * 1000);
      let comms = "нет данных";
      let asm = "нет данных";
      let drainage = "нет данных";
      //
      if (store.data.communicator_comms_alarms) {
        comms = "";
        if (
          store.data.communicator_comms_alarms.message &&
          store.data.communicator_comms_alarms.message.length > 0
        ) {
          comms = "есть нарушения";
        }
        if (
          criticalDate >
          new Date(store.data.communicator_comms_alarms.date_time_subsystem)
        ) {
          comms = "устаревшие данные";
        }
      }
      if (store.data.communicator_asm) {
        asm = "";
        if (
          criticalDate >
          new Date(store.data.communicator_asm.date_time_subsystem)
        ) {
          asm = "устаревшие данные";
        }
      }
      if (store.data.communicator_drainage) {
        drainage = "";
        if (
          store.data.communicator_drainage.message &&
          store.data.communicator_drainage.message.difval < 150
        ) {
          drainage = "низкая производительность";
        }
        if (
          criticalDate >
          new Date(store.data.communicator_drainage.date_time_subsystem)
        ) {
          drainage = "устаревшие данные";
        }
      }
      setForm({
        ...form,
        commsHealth: comms,
        asmHealth: asm,
        drainageHealth: drainage,
      });
    }
  }, [store.data]);

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
      </div>

      <hr className={"m-0 p-0"} />

      {/*TODO Таблица*/}
      <div className={"card m-0 p-0 bg-dark"}>
        {store.fail === undefined && store.error === undefined && state ? (
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
                                {state.communicator_comms_alarms &&
                                  state.communicator_comms_alarms.date_time_subsystem.split(
                                    ".",
                                  )[0]}
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
                            {state.communicator_comms_alarms &&
                              state.communicator_comms_alarms.message
                                .slice(0, 10)
                                .map((item: any, index: number) => (
                                  <tr key={item.id}>
                                    <td className={"text-white"}>
                                      {item.name}
                                    </td>
                                    <td className={"text-white"}>
                                      {item.position}
                                    </td>
                                    <td className={"text-white"}>
                                      {item.created_at}
                                    </td>
                                  </tr>
                                ))}
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
                                {state.communicator_asm &&
                                  state.communicator_asm.date_time_subsystem.split(
                                    ".",
                                  )[0]}
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
                            {state.communicator_asm.message.map(
                              (item: any, index: number) => (
                                <tr key={item.id}>
                                  <td className={"text-white"}>{item.name}</td>
                                  <td className={"text-white"}>
                                    {item.timestamp.split(".")[0]}
                                  </td>
                                  <td className={"text-white"}>{item.value}</td>
                                </tr>
                              ),
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
                                {state.communicator_drainage &&
                                  state.communicator_drainage
                                    .date_time_subsystem &&
                                  state.communicator_drainage.date_time_subsystem.split(
                                    ".",
                                  )[0]}
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
                                {state.communicator_drainage.message.maxtime}
                              </td>
                              <td className={"text-white"}>
                                {state.communicator_drainage.message.maxfuel}
                              </td>
                            </tr>
                            <tr>
                              <td className={"text-white"}>
                                {state.communicator_drainage.message.mintime}
                              </td>
                              <td className={"text-white"}>
                                {state.communicator_drainage.message.minfuel}
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={2} className={"text-white"}>
                                Производительность(в час):{" "}
                                {state.communicator_drainage.message.difval <
                                180 ? (
                                  <span
                                    className={
                                      "text-danger lead fw-bold m-0 p-0 text-white"
                                    }
                                  >
                                    {state.communicator_drainage.message.difval}
                                  </span>
                                ) : state.communicator_drainage.message.difval -
                                    20 <
                                  180 ? (
                                  <span
                                    className={
                                      "text-warning lead fw-bold m-0 p-0 text-white"
                                    }
                                  >
                                    {state.communicator_drainage.message.difval}
                                  </span>
                                ) : (
                                  <span
                                    className={
                                      "text-success lead fw-bold m-0 p-0 text-white"
                                    }
                                  >
                                    {state.communicator_drainage.message.difval}
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
                  <nav className="col-lg-4">
                    <ul className="list-unstyled d-flex flex-column text-center text-white">
                      <li>
                        <div>
                          <div className={"text-start"}>
                            <button className="btn btn-outline-secondary fa-solid fa-volume-xmark p-3"></button>
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
    </bases.Base3>
  );
}
