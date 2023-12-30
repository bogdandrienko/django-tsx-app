// TODO download modules /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// TODO custom modules ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import * as base from "../../components/ui/bases";
import * as components from "../../components/ui/components";
import * as constants from "../../components/constants";
import * as utils from "../../components/utils";
import * as hooks from "../../components/hooks";
import * as slices from "../../components/slices";

// TODO export ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function Page(): JSX.Element {
  // TODO stores /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const slice = slices.stoppages.emptyPeregonReportDumptrucks;
  const store = hooks.useSelectorCust(slice);

  // TODO hooks //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();
  const [state, setState]: any = useState({});
  const [form, setForm] = useState({
    param_date: utils.getCurrentDateForForm(),
    param_shift: "1",
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
        }),
      );
    } else {
      window.alert("Заполните все данные!");
    }
  }

  // TODO return /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <base.Base2>
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
            value={form.param_date}
            onChange={(event) =>
              setForm({
                ...form,
                param_date: event.target.value,
              })
            }
          />
          <span className={"m-1 p-2"}>Смена:</span>
          <select
            className="form-select form-select-sm"
            value={form.param_shift}
            onChange={(event) =>
              setForm({
                ...form,
                param_shift: event.target.value,
              })
            }
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
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
        <hr className={"m-2 p-0"} />
        <div className={"fs-4 text-danger m-0 p-3"}>
          Внимание, выгрузка ВСЕЙ техники может занять до 5 минут!
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
                  false,
                )}
                {` | ${state.parameters.param_shift} смена`}
              </div>
            ) : (
              "--.--.---- | 0"
            )}
          </div>
          <div className={"w-25"}>
            <components.StatusStore1
              slice={slice}
              // consoleLog={constants.DEBUG}
              consoleLog={false}
              showData={false}
              showError={true}
              showFail={true}
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
            title={"Таблица: Простои автосамосвалов"}
            titleTextClassName={"text-dark"}
            bodyClassName={"bg-light"}
          >
            {state.extra && state.extra.path_to_excel_file && (
              <div className={"m-2 p-2"}>
                <a
                  href={`/${state.extra.path_to_excel_file}`}
                  className={"btn btn-lg btn-outline-success"}
                >
                  Скачать excel-файл
                </a>
              </div>
            )}
            <table className="table table-light table-hover table-striped m-0 p-0">
              <thead>
                <tr>
                  <th scope="col">Хоз. номер</th>
                  <th scope="col">Время пересечения</th>
                  <th scope="col">Направление</th>
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
                      <td>{item.veh_id}</td>
                      <td>
                        {utils.DateTime.GetCleanDateTime(item.date_time, true)}
                      </td>
                      <td>{item.target}</td>
                    </tr>
                  ))
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
