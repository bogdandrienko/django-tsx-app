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

  const slice = slices.stoppages.stoppagesReportVehDvsStore;
  const store = hooks.useSelectorCustom1(slice);

  // TODO hooks //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();
  const [state, setState]: any = useState({});
  const [form, setForm] = useState({
    paramDate: utils.getCurrentDateForForm(),
    paramShift: "1",
    paramTarget: "20",
  });

  // TODO useEffects /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (store.data) {
      console.log(store.data);
      setState(store.data);
    }
  }, [store.data]);

  // TODO functions //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async function GetData() {
    if (form.paramDate !== "") {
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
      title={"ПРОСТОИ: Отчёт по холостым простоям ДВС автосамосвалов"}
      description={"Нулевая скорость и включённый ДВС за выбранную смену"}
    >
      <components.Accordion2
        isCollapse={false}
        keyTarget={"Accordion#1"}
        headerClassName={"bg-primary-custom-1"}
        title={"Настройка данных и отображения"}
        titleTextClassName={"text-white"}
        bodyClassName={"text-bg-light small"}
      >
        <div className={"input-group w-100 m-1 p-2"}>
          <span className={"m-1 p-2"}>Дата:</span>
          <input
            type={"date"}
            className={"form-control form-control-sm"}
            value={form.paramDate}
            onChange={(event) =>
              setForm({
                ...form,
                paramDate: event.target.value,
              })
            }
          />
          <span className={"m-1 p-2"}>Смена:</span>
          <select
            className="form-select form-select-sm"
            value={form.paramShift}
            onChange={(event) =>
              setForm({
                ...form,
                paramShift: event.target.value,
              })
            }
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
          </select>
          <span className={"m-1 p-2"}>Минимальный порог:</span>
          <select
            className="form-select form-select-sm"
            value={form.paramTarget}
            onChange={(event) =>
              setForm({
                ...form,
                paramTarget: event.target.value,
              })
            }
          >
            <option value={"5"}>5 минут</option>
            <option value={"10"}>10 минут</option>
            <option value={"15"}>15 минут</option>
            <option value={"20"}>20 минут</option>
            <option value={"25"}>25 минут</option>
            <option value={"30"}>30 минут</option>
            <option value={"60"}>60 минут</option>
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

      <div className={"card text-bg-light m-0 p-0 pt-1"}>
        {(store.fail || store.error) && (
          <div className={"display-1 text-center text-danger my-1 mb-1"}>
            ВНИМАНИЕ СВЯЗЬ!
          </div>
        )}
        <div
          className={
            "lead fw-bold mb-1 d-flex shadow custom-background-transparent-hard"
          }
        >
          <div className={"container display-6 w-75"}>
            {state && state.parameters ? (
              <div>
                {utils.DateTime.GetCleanDateTime(
                  state.parameters.param_date,
                  false
                )}
                {` | ${state.parameters.param_shift} смена | ${state.parameters.param_target} минут`}
              </div>
            ) : (
              "--.--.---- | - | -"
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

      <div className="card text-bg-light m-0 p-0">
        {(store.fail === undefined || store.error === undefined) &&
        state &&
        state.data ? (
          <components.Accordion2
            isCollapse={false}
            keyTarget={"Accordion#2"}
            headerClassName={"bg-warning-custom-1"}
            title={"Таблица со значениями"}
            titleTextClassName={"text-dark"}
            bodyClassName={"bg-light"}
          >
            <div className={"m-2 p-2"}>
              <a
                href={`/${state.extra.path_to_excel_file}`}
                className={"btn btn-lg btn-outline-success"}
              >
                Скачать excel-файл
              </a>
            </div>
            <table className="table table-light table-hover table-striped m-0 p-0">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Хоз. номер</th>
                  <th scope="col">Водитель</th>
                  <th scope="col">Начало простоя</th>
                  <th scope="col">Окончание простоя</th>
                  <th scope="col">Длительность простоя ДВС, часы</th>
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
                    <tr key={index + 1}>
                      <td>{index + 1}</td>
                      <td>{item.veh_id}</td>
                      <td>{item.veh_id_fio}</td>
                      <td>
                        {item.from.split("T")[0]} {item.from.split("T")[1]}
                      </td>
                      <td>
                        {item.to.split("T")[0]} {item.to.split("T")[1]}
                      </td>
                      <td>{item.duration}</td>
                    </tr>
                  ))
                )}
                {state.extra && (
                  <tr className={"fw-bold"}>
                    <td>#</td>
                    <td>Итого</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{state.extra.summary_duration}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </components.Accordion2>
        ) : (
          <div className={"display-1 text-center text-danger"}>ДАННЫХ НЕТ!</div>
        )}
      </div>
    </base.Base2>
  );
}
