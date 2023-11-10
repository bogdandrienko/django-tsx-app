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

  const slice = slices.pto.ptoReportTimeWaitToLoadStore;
  const store = hooks.useSelectorCustom1(slice);

  // TODO hooks //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();
  const [state, setState]: any = useState({});
  const [form, setForm] = useState({
    param_date: utils.getCurrentDateForForm(),
    param_shift: 1,
    param_target: 4,
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
    <base.Base2 title={"..."} description={"..."}>
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
          <span className={"m-1 p-1"}>Выберите минимальный порог простоя:</span>
          <select
            className="form-select form-select-sm"
            value={form.param_target}
            onChange={(event) =>
              setForm({
                ...form,
                param_target: utils.Converting.parseInt(event.target.value),
              })
            }
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={10}>10</option>
            <option value={13}>13</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
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
                )}{" "}
                {` | порог ${state.parameters.param_target} минут(-а)`}
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
            {state && state.idle && (
              <div className="card-header lead m-0 p-3 shadow border border-1 border-dark">
                <table className="table table-light table-hover table-striped m-0 p-0">
                  <thead>
                    <tr>
                      <th scope="col">Общее время ожидания под погрузку:</th>
                      <th scope="col">Среднее время ожидания под погрузку</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td
                        className={
                          state.idle.sum_idles > 1500 ? "text-danger" : ""
                        }
                      >
                        {state.idle.sum_idles}
                      </td>
                      <td
                        className={
                          state.idle.avg_wait > 4.5 ? "text-danger" : ""
                        }
                      >
                        {state.idle.avg_wait}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            <table className="small table table-light table-hover m-0 p-0">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Хоз. номер</th>
                  <th scope="col">Начало простоя</th>
                  <th scope="col">Окончание простоя</th>
                  <th scope="col">Длительность, минут</th>
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
                    <tr key={index}>
                      <td># {index + 1}</td>
                      <td>{item.veh_id}</td>
                      <td>
                        {utils.DateTime.GetCleanDateTime(item.timeFrom, true)}
                      </td>
                      <td>
                        {utils.DateTime.GetCleanDateTime(item.timeTo, true)}
                      </td>
                      <td>{item.time}</td>
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
