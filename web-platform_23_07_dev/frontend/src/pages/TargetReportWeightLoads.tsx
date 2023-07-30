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
  // TODO store ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const sliceTargetReportWeightLoadsReadListStore =
    slices.target.targetReportWeightLoadsReadListStore;
  const targetReportWeightLoadsReadListStore = hooks.useSelectorCustom1(
    sliceTargetReportWeightLoadsReadListStore
  );

  // TODO hook /////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();
  const [getterFormObj, setterFormObj] = useState({
    paramDateFrom: utils.getCurrentDateForForm(),
    paramDateTo: utils.getCurrentDateForForm(),
    paramShiftFrom: 1,
    paramShiftTo: 2,
  });
  const [monitoring, setMonitoring, resetMonitoring] = hooks.useStateCustom1(
    {}
  );

  // TODO useEffect ////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (targetReportWeightLoadsReadListStore.data) {
      setMonitoring(targetReportWeightLoadsReadListStore.data);
    }
  }, [targetReportWeightLoadsReadListStore.data]);

  // TODO functions ////////////////////////////////////////////////////////////////////////////////////////////////////

  async function GetData() {
    if (
      getterFormObj.paramDateFrom !== "" &&
      getterFormObj.paramDateTo !== ""
    ) {
      dispatch(
        sliceTargetReportWeightLoadsReadListStore.action({
          form: { ...getterFormObj },
        })
      );
    } else {
      window.alert("Заполните все данные!");
    }
  }

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////
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
          header_style={"bg-primary"}
          body_style={"bg-light"}
        >
          <div className={"input-group w-100 shadow p-3"}>
            <span className={"m-1 p-1"}>От какой даты:</span>
            <input
              type={"date"}
              className={"form-control form-control-sm"}
              value={getterFormObj.paramDateFrom}
              onChange={(event) =>
                setterFormObj({
                  ...getterFormObj,
                  // @ts-ignore
                  paramDateFrom: event.target.value,
                })
              }
            />
            <span className={"m-1 p-1"}>От какой смены:</span>
            <select
              className="form-select form-select-sm"
              defaultValue={getterFormObj.paramShiftFrom}
              onChange={(event) =>
                setterFormObj({
                  ...getterFormObj,
                  // @ts-ignore
                  paramShiftFrom: event.target.value,
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
              value={getterFormObj.paramDateTo}
              onChange={(event) =>
                setterFormObj({
                  ...getterFormObj,
                  // @ts-ignore
                  paramDateTo: event.target.value,
                })
              }
            />
            <span className={"m-1 p-1"}>До какой смены:</span>
            <select
              className="form-select form-select-sm"
              defaultValue={getterFormObj.paramShiftTo}
              onChange={(event) =>
                setterFormObj({
                  ...getterFormObj,
                  // @ts-ignore
                  paramShiftTo: event.target.value,
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
                targetReportWeightLoadsReadListStore &&
                targetReportWeightLoadsReadListStore.load === true
                  ? "btn btn-lg btn-primary w-25 disabled"
                  : "btn btn-lg btn-primary w-25"
              }
            >
              обновить данные
            </button>
          </div>
        </components.Accordion1>
      </div>
      {targetReportWeightLoadsReadListStore.fail && (
        <div className={"display-1 text-center text-danger shadow my-1 mb-1"}>
          ВНИМАНИЕ СВЯЗЬ!
        </div>
      )}
      {targetReportWeightLoadsReadListStore.error && (
        <div className={"display-1 text-center text-danger shadow my-1 mb-1"}>
          ВНИМАНИЕ СВЯЗЬ!
        </div>
      )}
      <div className={"lead fw-bold mb-1 d-flex"}>
        <div className={"container display-6 shadow w-75"}>
          {monitoring && monitoring.parameters ? (
            <div>
              {monitoring.parameters.param_shift_from}
              {" смена - "}
              {monitoring.parameters.param_date_from.split("T")[0]}
              {"  |  "}
              {monitoring.parameters.param_shift_to}
              {" смена - "}
              {monitoring.parameters.param_date_to.split("T")[0]}
            </div>
          ) : (
            "--.--.---- --:--:--"
          )}
        </div>
        <div className={"w-25"}>
          <components.StatusStore1
            slice={sliceTargetReportWeightLoadsReadListStore}
            consoleLog={constants.DEBUG_CONSTANT}
            showData={false}
          />
        </div>
      </div>
      <div className="text-center m-0 p-0">
        {targetReportWeightLoadsReadListStore.fail === undefined &&
        targetReportWeightLoadsReadListStore.error === undefined &&
        monitoring &&
        monitoring.data ? (
          <div className={"m-0 p-0"}>
            <components.Accordion1
              isCollapse={false}
              key_target={"Accordion#3"}
              title={"Таблица"}
              text_style={"text-dark"}
              header_style={"bg-warning"}
              body_style={"bg-light"}
            >
              <div className={"m-2 p-2"}>
                <a
                  href={`/${monitoring.path_to_excel_file}`}
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
                    {monitoring.data.map(
                      // @ts-ignore
                      (item1, index1) => (
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
                      )
                    )}
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
