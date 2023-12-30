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

  const slice = slices.pto.ptoMonitoringStickingStore;
  const store = hooks.useSelectorCustom1(slice);

  // TODO hooks //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();
  const [state, setState]: any = useState({});
  const [currentTime, setCurrentTime] = useState(utils.getCurrentDateTime());
  const [form, setForm] = useState({
    param_date: utils.getCurrentDateForForm(),
    param_shift: 1,
    param_min_speed: 2,
    param_min_weight: 3,
    param_max_weight: 10,
    param_level_warning: 5,
    param_level_danger: 10,
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
      })
    );
    setTimeout(async () => {
      setCurrentTime(utils.getCurrentDateTime());
    }, 9000);
  }, [currentTime]);

  // TODO functions //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async function GetData() {
    if (form.param_date !== "") {
      dispatch(
        slice.action({
          form: { ...form },
        })
      );
    } else {
      window.alert("Заполните все данные!");
    }
  }

  // TODO return /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <base.Base2
      title={"Отчёт по налипаниям и намерзаниям"}
      description={"Отчёт по налипаниям и намерзаниям за выбранный период"}
    >
      {/*TODO Настройки*/}
      <components.Accordion2
        isCollapse={false}
        keyTarget={"Accordion#1"}
        headerClassName={"bg-primary-custom-1"}
        title={"Настройка данных и отображения"}
        titleTextClassName={"text-white"}
        bodyClassName={"text-bg-light small"}
      >
        <div className={"input-group w-100 shadow p-3"}>
          <span className={"m-1 p-1"}>Дата:</span>
          <input
            type={"date"}
            className={"form-control form-control-sm"}
            value={form.param_date}
            onChange={(event) =>
              setForm({
                ...form,
                param_date: event.target.value,
              })
            }
          />
          <span className={"m-1 p-1"}>Смена:</span>
          <select
            className="form-select form-select-sm"
            value={form.param_shift}
            onChange={(event) =>
              setForm({
                ...form,
                param_shift: utils.Converting.parseInt(event.target.value),
              })
            }
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
          </select>
        </div>
        <div className={"input-group w-100 shadow p-3"}>
          <span className={"m-1 p-1"}>Минимальный порог скорости:</span>
          <select
            className="form-select form-select-sm"
            value={form.param_min_speed}
            onChange={(event) =>
              setForm({
                ...form,
                param_min_speed: utils.Converting.parseInt(event.target.value),
              })
            }
          >
            <option value={0}>0 км/ч</option>
            <option value={1}>1 км/ч</option>
            <option value={2}>2 км/ч</option>
            <option value={3}>3 км/ч</option>
            <option value={4}>4 км/ч</option>
            <option value={5}>5 км/ч</option>
            <option value={10}>10 км/ч</option>
          </select>
          <span className={"m-1 p-1"}>Минимальный порог массы:</span>
          <select
            className="form-select form-select-sm"
            value={form.param_min_weight}
            onChange={(event) =>
              setForm({
                ...form,
                param_min_weight: utils.Converting.parseInt(event.target.value),
              })
            }
          >
            <option value={0}>0 тонн</option>
            <option value={1}>1 тонна</option>
            <option value={2}>2 тонны</option>
            <option value={3}>3 тонны</option>
            <option value={4}>4 тонны</option>
            <option value={5}>5 тонн</option>
            <option value={10}>10 тонн</option>
          </select>
          <span className={"m-1 p-1"}>Максимальный порог массы:</span>
          <select
            className="form-select form-select-sm"
            value={form.param_max_weight}
            onChange={(event) =>
              setForm({
                ...form,
                param_max_weight: utils.Converting.parseInt(event.target.value),
              })
            }
          >
            <option value={0}>0 тонн</option>
            <option value={1}>1 тонна</option>
            <option value={2}>2 тонны</option>
            <option value={3}>3 тонны</option>
            <option value={4}>4 тонны</option>
            <option value={5}>5 тонн</option>
            <option value={10}>10 тонн</option>
            <option value={20}>20 тонн</option>
            <option value={30}>30 тонн</option>
            <option value={40}>40 тонн</option>
            <option value={50}>50 тонн</option>
            <option value={70}>70 тонн</option>
          </select>
          <button
            onClick={GetData}
            className={
              store && store.load === true
                ? "btn btn-lg btn-primary w-25 disabled"
                : "btn btn-lg btn-primary w-25"
            }
          >
            обновить данные
          </button>
        </div>
        <div className={"input-group w-100 shadow p-3"}>
          <span className={"m-1 p-1"}>Жёлтый уровень:</span>
          <select
            className="form-select form-select-sm"
            value={form.param_level_warning}
            onChange={(event) =>
              setForm({
                ...form,
                param_level_warning: utils.Converting.parseInt(
                  event.target.value
                ),
              })
            }
          >
            <option value={0}>0 %</option>
            <option value={1}>1 %</option>
            <option value={2}>2 %</option>
            <option value={3}>3 %</option>
            <option value={4}>4 %</option>
            <option value={5}>5 %</option>
            <option value={10}>10 %</option>
            <option value={20}>20 %</option>
            <option value={30}>30 %</option>
            <option value={40}>40 %</option>
            <option value={50}>50 %</option>
          </select>
          <span className={"m-1 p-1"}>Красный уровень:</span>
          <select
            className="form-select form-select-sm"
            value={form.param_level_danger}
            onChange={(event) =>
              setForm({
                ...form,
                param_level_danger: utils.Converting.parseInt(
                  event.target.value
                ),
              })
            }
          >
            <option value={0}>0 %</option>
            <option value={1}>1 %</option>
            <option value={2}>2 %</option>
            <option value={3}>3 %</option>
            <option value={4}>4 %</option>
            <option value={5}>5 %</option>
            <option value={10}>10 %</option>
            <option value={20}>20 %</option>
            <option value={30}>30 %</option>
            <option value={40}>40 %</option>
            <option value={50}>50 %</option>
          </select>
        </div>
      </components.Accordion2>

      <hr className={"m-3 p-0"} />

      {/*TODO Статусы*/}
      <div className={"card text-bg-light m-0 p-1"}>
        {(store.fail || store.error) && (
          <div className={"display-1 text-center text-danger"}>
            ВНИМАНИЕ СВЯЗЬ!
          </div>
        )}
        <div
          className={"lead fw-bold d-flex custom-background-transparent-hard"}
        >
          <div className={"container display-6 w-75"}>
            {state && state.parameters ? (
              <div>{currentTime}</div>
            ) : (
              "--.--.---- --:--:--"
            )}
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
      <div className={"card m-0 p-0"}>
        {(store.fail === undefined || store.error === undefined) &&
        state &&
        state.data ? (
          <components.Accordion2
            isCollapse={false}
            keyTarget={"Accordion#2"}
            headerClassName={"bg-warning-custom-1"}
            title={"Таблица с значениями"}
            titleTextClassName={"text-dark"}
            bodyClassName={"text-bg-light small"}
          >
            <div className={"bg-dark m-0 p-1"}>
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 m-0 p-2">
                {state.data.map((item: any, index: number) => (
                  <div key={index} className={"col m-0 p-2"}>
                    <div
                      className="dropdown-menu position-static d-flex flex-column flex-lg-row align-items-stretch justify-content-start p-0 rounded-3 shadow-lg"
                      data-bs-theme="dark"
                    >
                      <nav
                        className={
                          item.count_sticking >= 3
                            ? "col-lg-8 bg-danger"
                            : "col-lg-8"
                        }
                      >
                        <ul className="list-unstyled d-flex flex-column text-center text-white">
                          <li>
                            <div className={"display-6"}>{item.vehid}</div>
                          </li>
                        </ul>
                      </nav>
                      <nav className={"col-lg-4"}>
                        <ul className="list-unstyled d-flex flex-column text-center text-white">
                          <li>
                            <div>
                              <p className={"m-0 p-0"}>
                                {item.count_sticking} шт.
                              </p>
                              <p className={"m-0 p-0"}>
                                {item.weight_sticking} т. (
                                {item.timeload.split("T")[1]})
                              </p>
                            </div>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </components.Accordion2>
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
