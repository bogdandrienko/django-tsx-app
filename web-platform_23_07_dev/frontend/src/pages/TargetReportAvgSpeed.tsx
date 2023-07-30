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

  const sliceTargetReportAvgSpeedReadListStore =
    slices.target.targetReportAvgSpeedReadListStore;
  const targetReportAvgSpeedReadListStore = hooks.useSelectorCustom1(
    sliceTargetReportAvgSpeedReadListStore
  );

  // TODO hook /////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();
  const [getterFormObj, setterFormObj] = useState({
    paramDate: utils.getCurrentDateForForm(),
  });
  const [monitoring, setMonitoring, resetMonitoring] = hooks.useStateCustom1(
    {}
  );

  // TODO useEffect ////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (targetReportAvgSpeedReadListStore.data) {
      setMonitoring(targetReportAvgSpeedReadListStore.data);
    }
  }, [targetReportAvgSpeedReadListStore.data]);

  // TODO functions ////////////////////////////////////////////////////////////////////////////////////////////////////

  async function GetData() {
    if (getterFormObj.paramDate !== "") {
      dispatch(
        sliceTargetReportAvgSpeedReadListStore.action({
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
      title={"ПОКАЗАТЕЛИ: Отчёт по средней скорости автосамосвалов"}
      description={
        "Отчёт по средней скорости автосамосвалов в течении суток, по часам и отдельно последний рейс"
      }
    >
      <components.Accordion2
        isCollapse={false}
        keyTarget={"Accordion#1"}
        headerClassName={"bg-primary"}
        title={"Настройка данных и отображения"}
        titleTextClassName={"text-white"}
        bodyClassName={"text-bg-light small"}
      >
        <div className={"input-group w-100 m-1 p-2"}>
          <span className={"m-1 p-2"}>Дата:</span>
          <input
            type={"date"}
            className={"form-control form-control-sm"}
            value={getterFormObj.paramDate}
            onChange={(event) =>
              setterFormObj({
                ...getterFormObj,
                // @ts-ignore
                paramDate: event.target.value,
              })
            }
          />
          <button
            onClick={GetData}
            className={
              targetReportAvgSpeedReadListStore &&
              targetReportAvgSpeedReadListStore.load === true
                ? "btn btn-lg btn-primary w-25 disabled"
                : "btn btn-lg btn-primary w-25"
            }
          >
            обновить данные
          </button>
        </div>
        <hr className={"m-2 p-0"} />
        <div className={"fs-4 text-danger m-0 p-3"}>
          Внимание, выгрузка выбранной единицы может занять до 1 минуты,
          выгрузка ВСЕЙ техники до 5 минут!
        </div>
      </components.Accordion2>

      <hr className={"m-3 p-0"} />

      <div className={"card text-bg-light m-0 p-0 pt-1"}>
        {(targetReportAvgSpeedReadListStore.fail ||
          targetReportAvgSpeedReadListStore.error) && (
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
            {monitoring && monitoring.parameters ? (
              <div>{monitoring.parameters.param_date.split("T")[0]}</div>
            ) : (
              "--.--.---- --:--:--"
            )}
          </div>
          <div className={"w-25"}>
            <components.StatusStore1
              slice={sliceTargetReportAvgSpeedReadListStore}
              consoleLog={constants.DEBUG_CONSTANT}
              showData={false}
            />
          </div>
        </div>
      </div>

      <hr className={"m-3 p-0"} />

      <div className="card text-bg-light m-0 p-0">
        {(targetReportAvgSpeedReadListStore.fail === undefined ||
          targetReportAvgSpeedReadListStore.error === undefined) &&
        monitoring &&
        monitoring.data ? (
          <div>
            <components.Accordion2
              isCollapse={false}
              keyTarget={"Accordion#2"}
              headerClassName={"text-bg-success"}
              title={"Графики: скорость автосамосвалов в разрезе суток"}
              titleTextClassName={"text-white"}
              bodyClassName={"text-bg-light"}
            >
              <div className={"display-6 m-3 p-3"}>
                График времени(горизонтальное) к средней скорости
                груж.(вертикальное)
              </div>
              <div className={"row bg-light m-0 p-0"}>
                {monitoring.lines.map(
                  // @ts-ignore
                  (item1, index1) => (
                    <div
                      className={"col border border-1 border-dark m-0 p-0"}
                      key={index1}
                    >
                      <strong>{item1.tech}</strong>
                      <LineChart
                        width={900}
                        height={150}
                        data={item1.value}
                        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                      >
                        <Line
                          type="monotone"
                          dataKey="скорость груж."
                          stroke="#8884d8"
                        />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis dataKey="time_group" />
                        <YAxis />
                        <Tooltip />
                      </LineChart>
                    </div>
                  )
                )}
              </div>
            </components.Accordion2>

            <hr className={"m-3 p-0"} />

            <components.Accordion2
              isCollapse={false}
              keyTarget={"Accordion#3"}
              headerClassName={"bg-warning"}
              title={
                "Таблица: скорость автосамосвалов за смену и за последний рейс"
              }
              titleTextClassName={"text-dark"}
              bodyClassName={"bg-light"}
            >
              <div className={"display-6 m-3 p-3"}>
                Cмена с 20:00 до 08:00 (1) сверху
              </div>
              <table className="small table table-light table-hover table-striped m-0 p-0">
                <thead>
                  <tr>
                    <th scope="col">Хоз. номер: </th>
                    <th scope="col">ФИО</th>
                    <th scope="col">Общая ср. скорость груж.</th>
                    <th scope="col">Общая ср. скорость порожн.</th>
                    <th scope="col">Общая ср. скорость общ</th>
                    <th scope="col">Последний рейс ср. скорость груж.</th>
                    <th scope="col">Последний рейс ср. скорость порожн.</th>
                    <th scope="col">Последний рейс ср. скорость общ</th>
                  </tr>
                </thead>
                <tbody>
                  {monitoring.data.length < 1 ? (
                    <tr>
                      <td colSpan={5} className={"text-danger"}>
                        Данных не найдено.
                      </td>
                    </tr>
                  ) : (
                    monitoring.data.map(
                      // @ts-ignore
                      (item1, index1) => (
                        <tr key={index1}>
                          <td>
                            {`${item1.tech}`.split(" | ")[0]}
                            {" | "}
                            {`${item1.value.shovid}`.split(" | ")[0]}
                            <hr className={"m-0 p-0"} />
                            {`${item1.tech}`.split(" | ")[1]}
                            {" | "}
                            {`${item1.value.shovid}`.split(" | ")[1]}
                          </td>
                          <td>
                            {`${item1.value.fio}`.split(" | ")[0]}
                            <hr className={"m-0 p-0"} />
                            {`${item1.value.fio}`.split(" | ")[1]}
                          </td>
                          <td>
                            {`${item1.value.avgloadspeed}`.split(" | ")[0]}
                            <hr className={"m-0 p-0"} />
                            {`${item1.value.avgloadspeed}`.split(" | ")[1]}
                          </td>
                          <td>
                            {`${item1.value.avgemptyspeed}`.split(" | ")[0]}
                            <hr className={"m-0 p-0"} />
                            {`${item1.value.avgemptyspeed}`.split(" | ")[1]}
                          </td>
                          <td>
                            {`${item1.value.avgspeed}`.split(" | ")[0]}
                            <hr className={"m-0 p-0"} />
                            {`${item1.value.avgspeed}`.split(" | ")[1]}
                          </td>
                          <td>
                            <div
                              className={
                                parseFloat(
                                  `${item1.value.avgloadspeed}`.split(" | ")[0]
                                ) -
                                  parseFloat(
                                    `${item1.value.last_loadspeed}`.split(
                                      " | "
                                    )[0]
                                  ) <
                                0.5
                                  ? ""
                                  : "text-danger fw-bold"
                              }
                            >
                              {`${item1.value.last_loadspeed}`.split(" | ")[0]}
                            </div>
                            <hr className={"m-0 p-0"} />
                            <div
                              className={
                                parseFloat(
                                  `${item1.value.avgloadspeed}`.split(" | ")[1]
                                ) -
                                  parseFloat(
                                    `${item1.value.last_loadspeed}`.split(
                                      " | "
                                    )[1]
                                  ) <
                                0.5
                                  ? ""
                                  : "text-danger fw-bold"
                              }
                            >
                              {`${item1.value.last_loadspeed}`.split(" | ")[1]}
                            </div>
                          </td>
                          <td>
                            <div
                              className={
                                parseFloat(
                                  `${item1.value.avgemptyspeed}`.split(" | ")[0]
                                ) -
                                  parseFloat(
                                    `${item1.value.last_emptyspeed}`.split(
                                      " | "
                                    )[0]
                                  ) <
                                0.5
                                  ? ""
                                  : "text-danger fw-bold"
                              }
                            >
                              {`${item1.value.last_emptyspeed}`.split(" | ")[0]}
                            </div>
                            <hr className={"m-0 p-0"} />
                            <div
                              className={
                                parseFloat(
                                  `${item1.value.avgemptyspeed}`.split(" | ")[1]
                                ) -
                                  parseFloat(
                                    `${item1.value.last_emptyspeed}`.split(
                                      " | "
                                    )[1]
                                  ) <
                                0.5
                                  ? ""
                                  : "text-danger fw-bold"
                              }
                            >
                              {`${item1.value.last_emptyspeed}`.split(" | ")[1]}
                            </div>
                          </td>
                          <td>
                            <div
                              className={
                                parseFloat(
                                  `${item1.value.avgspeed}`.split(" | ")[0]
                                ) -
                                  parseFloat(
                                    `${item1.value.last_speed}`.split(" | ")[0]
                                  ) <
                                0.5
                                  ? ""
                                  : "text-danger fw-bold"
                              }
                            >
                              {`${item1.value.last_speed}`.split(" | ")[0]}
                            </div>
                            <hr className={"m-0 p-0"} />
                            <div
                              className={
                                parseFloat(
                                  `${item1.value.avgspeed}`.split(" | ")[1]
                                ) -
                                  parseFloat(
                                    `${item1.value.last_speed}`.split(" | ")[1]
                                  ) <
                                0.5
                                  ? ""
                                  : "text-danger fw-bold"
                              }
                            >
                              {`${item1.value.last_speed}`.split(" | ")[1]}
                            </div>
                          </td>
                        </tr>
                      )
                    )
                  )}
                </tbody>
              </table>
            </components.Accordion2>
          </div>
        ) : (
          <div className={"display-1 text-center text-danger"}>ДАННЫХ НЕТ!</div>
        )}
      </div>
    </base.Base2>
  );
}
