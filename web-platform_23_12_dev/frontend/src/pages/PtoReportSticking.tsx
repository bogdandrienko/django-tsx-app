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

  const slice = slices.pto.ptoReportStickingStore;
  const store = hooks.useSelectorCustom1(slice);

  // TODO hooks //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();
  const [state, setState]: any = useState({});
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
              <div>
                {`${state.parameters.param_shift} смена | `}
                {utils.DateTime.GetCleanDateTime(
                  state.parameters.param_date,
                  false
                )}
              </div>
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

      <hr className={"m-3 p-0"} />

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
            <table className="table table-light table-hover m-0 p-0">
              <thead>
                <tr>
                  <th scope="col">Автосамосвал</th>
                  <th scope="col">Сумма рейсов за смену, шт</th>
                  <th scope="col">
                    Средняя масса налипаний/намерзаний за смену, тонны
                  </th>
                  <th scope="col">
                    Сумма налипаний/намерзаний за смену, тонны
                  </th>
                  <th scope="col">Всего масса за смену, тонны</th>
                  <th scope="col">Процент налипаний/намерзаний за смену, %</th>
                </tr>
              </thead>
              <tbody>
                {state.data.length < 1 ? (
                  <tr>
                    <td colSpan={5} className={"text-danger"}>
                      Данных не найдено.
                    </td>
                  </tr>
                ) : (
                  state.data.map((item: any, index: number) => (
                    <tr
                      key={index}
                      className={
                        item.percent_weight >= form.param_level_danger
                          ? "fw-bold bg-danger text-white border border-1 border-danger"
                          : item.percent_weight >= form.param_level_warning
                          ? "fw-bold bg-warning-custom-1 text-dark border border-1 border-warning"
                          : ""
                      }
                    >
                      <td>{item.veh_id}</td>
                      <td>{item.sum_trips}</td>
                      <td>{item.avg_weight}</td>
                      <td>{item.sum_weight}</td>
                      <td>{item.sum_all_weight}</td>
                      <td>{item.percent_weight}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
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
