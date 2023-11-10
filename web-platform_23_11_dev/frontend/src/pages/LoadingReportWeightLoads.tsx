// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as base from "../components/ui/bases";
import * as hooks from "../components/hooks";
import * as components from "../components/ui/components";
import * as utils from "../components/utils";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import * as slices from "../components/slices";
import { useDispatch } from "react-redux";
import * as constants from "../components/constants";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function Page(): JSX.Element {
  // TODO stores /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const slice = slices.develop.targetReportWeightLoadsReadListStore;
  const store = hooks.useSelectorCustom1(slice);

  // TODO hooks //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();
  const [state, setState]: any = useState({});
  const [form, setForm] = useState({
    paramDateFrom: utils.getCurrentDateForForm(),
    paramShiftFrom: 1,
    paramDateTo: utils.getCurrentDateForForm(),
    paramShiftTo: 2,
  });

  // TODO useEffects /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (store.data) {
      setState(store.data);
    }
  }, [store.data]);

  // TODO functions //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async function GetData() {
    if (form.paramDateFrom !== "" && form.paramDateTo !== "") {
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
      title={"ПОКАЗАТЕЛИ: Отчёт по недогрузам и перегрузам"}
      description={"Отклонения от нормы загрузки автосамосвалов за период"}
    >
      <div className={"mb-2"}>
        <components.Accordion1
          isCollapse={false}
          key_target={"Accordion#1"}
          title={"Настройка данных и отображения"}
          text_style={"text-white"}
          header_style={"bg-primary-custom-1"}
          body_style={"bg-light"}
        >
          <div className={"input-group w-100 shadow p-3"}>
            <span className={"m-1 p-1"}>От какой даты:</span>
            <input
              type={"date"}
              className={"form-control form-control-sm"}
              value={form.paramDateFrom}
              onChange={(event) =>
                setForm({
                  ...form,
                  paramDateFrom: event.target.value,
                })
              }
            />
            <span className={"m-1 p-1"}>От какой смены:</span>
            <select
              className="form-select form-select-sm"
              value={form.paramShiftFrom}
              onChange={(event) =>
                setForm({
                  ...form,
                  paramShiftFrom: utils.Converting.parseInt(event.target.value),
                })
              }
            >
              <option selected value={1}>
                1
              </option>
              <option value={2}>2</option>
            </select>
            <span className={"m-1 p-1"}>До какой даты:</span>
            <input
              type={"date"}
              className={"form-control form-control-sm"}
              value={form.paramDateTo}
              onChange={(event) =>
                setForm({
                  ...form,
                  paramDateTo: event.target.value,
                })
              }
            />
            <span className={"m-1 p-1"}>До какой смены:</span>
            <select
              className="form-select form-select-sm"
              defaultValue={form.paramShiftTo}
              onChange={(event) =>
                setForm({
                  ...form,
                  paramShiftTo: utils.Converting.parseInt(event.target.value),
                })
              }
            >
              <option value={1}>1</option>
              <option selected value={2}>
                2
              </option>
            </select>
            <button
              onClick={GetData}
              className={
                state && state.load === true
                  ? "btn btn-lg btn-primary w-25 disabled"
                  : "btn btn-lg btn-primary w-25"
              }
            >
              обновить данные
            </button>
          </div>
        </components.Accordion1>
      </div>

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
                {`от ${state.parameters.param_shift_from} смены `}
                {utils.DateTime.GetCleanDateTime(
                  state.parameters.param_date_from,
                  false
                )}
                {` | до ${state.parameters.param_shift_to} смены `}
                {utils.DateTime.GetCleanDateTime(
                  state.parameters.param_date_to,
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

      <div className="text-center m-0 p-0">
        {state.fail === undefined &&
        state.error === undefined &&
        state &&
        state.data ? (
          <div className={"m-0 p-0"}>
            <components.Accordion1
              isCollapse={false}
              key_target={"Accordion#3"}
              title={"Таблица"}
              text_style={"text-dark"}
              header_style={"bg-warning-custom-1"}
              body_style={"bg-light"}
            >
              <div className={"m-2 p-2"}>
                <a
                  href={`/${state.path_to_excel_file}`}
                  className={"btn btn-lg btn-outline-success"}
                >
                  Скачать excel-файл
                </a>
              </div>
              <div className={"card-body m-0 p-0"}>
                <table className="small table table-light table-hover table-striped m-0 p-0">
                  <thead>
                    <tr>
                      <th scope="col">Дата</th>
                      <th scope="col">Смена</th>
                      <th scope="col">Экскаватор</th>
                      <th scope="col">Машинист</th>
                      <th scope="col">Самосвал</th>
                      <th scope="col">Оператор</th>
                      <th scope="col">Горизонт</th>
                      <th scope="col">Материал</th>
                      <th scope="col">Место разгрузки</th>
                      <th scope="col">Время погрузки</th>
                      <th scope="col">Ср. скорость</th>
                      <th scope="col">Масса</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.data.map((item1: any) => (
                      <tr>
                        <td>{item1.date.split("T")[0]}</td>
                        <td>{item1.shift}</td>
                        <td>{item1.shov_id}</td>
                        <td>{item1.shov_driver}</td>
                        <td>{item1.veh_id}</td>
                        <td>{item1.veh_driver}</td>
                        <td>{item1.area}</td>
                        <td>{item1.worktype}</td>
                        <td>{item1.unloadid}</td>
                        <td>
                          {item1.timeload.split("T")[0]}{" "}
                          {item1.timeload.split("T")[1]}
                        </td>
                        <td>{item1.avspeed}</td>
                        <td
                          className={
                            item1.weigth >= 100 ? "text-danger fw-bold" : ""
                          }
                        >
                          {item1.weigth}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </components.Accordion1>
          </div>
        ) : (
          <div className={"display-1 text-center text-danger shadow my-1 mb-1"}>
            ДАННЫХ НЕТ!
          </div>
        )}
      </div>
    </base.Base2>
  );
}
