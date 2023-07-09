// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as base from "../components/ui/base";
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

  const atcAvgSpeedReadListStore = hooks.useSelectorCustom1(
    slices.events.atcAvgSpeedReadListStore
  );

  // TODO hook /////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();
  const [getterFormObj, setterFormObj] = useState({
    date: utils.getCurrentDateForForm(),
  });
  const [monitoring, setMonitoring, resetMonitoring] = hooks.useStateCustom1(
    {}
  );

  // TODO useEffect ////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (atcAvgSpeedReadListStore.data) {
      setMonitoring(atcAvgSpeedReadListStore.data);
    }
  }, [atcAvgSpeedReadListStore.data]);

  useEffect(() => {
    console.log(atcAvgSpeedReadListStore);
  }, [atcAvgSpeedReadListStore]);

  // TODO functions ////////////////////////////////////////////////////////////////////////////////////////////////////

  async function GetMonitoringData() {
    dispatch(
      slices.events.atcAvgSpeedReadListStore.action({
        form: { ...getterFormObj },
      })
    );
  }

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <base.Base1
      title={"АТЦ: Средняя скорость автосамосвалов"}
      description={
        "Анализ средней скорости автосамосвалов в течении смены и отдельно последний рейс"
      }
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
          <div className={"input-group w-100 bg-light p-3 my-2 mb-2"}>
            <span className={"w-25 p-2"}>Выберите дату: </span>
            <input
              type={"date"}
              className={"form-control w-25"}
              value={getterFormObj.date}
              onChange={(event) =>
                setterFormObj({
                  ...getterFormObj,
                  // @ts-ignore
                  date: event.target.value,
                })
              }
            />
            <button
              onClick={GetMonitoringData}
              className={
                atcAvgSpeedReadListStore &&
                atcAvgSpeedReadListStore.load === true
                  ? "btn btn-lg btn-primary w-50 disabled"
                  : "btn btn-lg btn-primary w-50"
              }
            >
              обновить данные
            </button>
          </div>
        </components.Accordion1>
      </div>
      {atcAvgSpeedReadListStore.fail && (
        <div className={"display-1 text-center text-danger shadow my-1 mb-1"}>
          ВНИМАНИЕ СВЯЗЬ!
        </div>
      )}
      {atcAvgSpeedReadListStore.error && (
        <div className={"display-1 text-center text-danger shadow my-1 mb-1"}>
          ВНИМАНИЕ СВЯЗЬ!
        </div>
      )}
      <components.StatusStore1
        slice={slices.events.atcAvgSpeedReadListStore}
        consoleLog={constants.DEBUG_CONSTANT}
        showData={false}
      />
      <div className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-1 text-center m-0 p-0">
        {atcAvgSpeedReadListStore.fail === undefined &&
        atcAvgSpeedReadListStore.error === undefined &&
        monitoring &&
        monitoring.data ? (
          <div className={"card col border border-1 border-dark m-0 p-0"}>
            <div className={"card-header lead display-6 m-0 p-3"}>
              <div className={"display-6 p-3"}>
                {monitoring && monitoring.query ? (
                  <div>
                    {monitoring.query.date.split("T")[0]} (смена с 20:00 сверху)
                  </div>
                ) : (
                  "--.--.---- --:--:--"
                )}
              </div>
            </div>

            <hr />

            <div className={"p-2"}>
              <components.Accordion1
                isCollapse={true}
                key_target={"Accordion#3"}
                title={"Графики почасовой скорости"}
                text_style={"text-white"}
                header_style={"bg-success"}
                body_style={"bg-light"}
              >
                <div className={"row bg-light"}>
                  <div className={"col"}>
                    <div className={"lead"}>
                      График времени(горизонтальное) к объёмам (вертикальное)
                    </div>
                    <div className={"row bg-light"}>
                      {monitoring.lines.map(
                        // @ts-ignore
                        (item1, index1) => (
                          <div className={"col border border-1 border-dark"}>
                            <strong>{item1.tech}</strong>
                            <LineChart
                              width={800}
                              height={300}
                              data={item1.value}
                              margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                            >
                              <Line
                                type="monotone"
                                dataKey="скорость груж."
                                stroke="#8884d8"
                              />
                              <CartesianGrid
                                stroke="#ccc"
                                strokeDasharray="5 5"
                              />
                              <XAxis dataKey="time_group" />
                              <YAxis />
                              <Tooltip />
                            </LineChart>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </components.Accordion1>
            </div>

            <hr />

            <div className={"p-2"}>
              <components.Accordion1
                isCollapse={true}
                key_target={"Accordion#1"}
                title={"Таблица"}
                text_style={"text-dark"}
                header_style={"bg-warning"}
                body_style={"bg-light"}
              >
                <div className={"card-body m-0 p-0"}>
                  <table className="table table-light table-hover table-striped m-0 p-0">
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
                      {monitoring.data.map(
                        // @ts-ignore
                        (item1, index1) => (
                          <tr>
                            <td>
                              {`${item1.tech}`.split(" | ")[0]}
                              <br />
                              {`${item1.tech}`.split(" | ")[1]}
                            </td>
                            <td>
                              {`${item1.value.fio}`.split(" | ")[0]}
                              <br />
                              {`${item1.value.fio}`.split(" | ")[1]}
                            </td>
                            <td>
                              {`${item1.value.avgloadspeed}`.split(" | ")[0]}
                              <br />
                              {`${item1.value.avgloadspeed}`.split(" | ")[1]}
                            </td>
                            <td>
                              {`${item1.value.avgemptyspeed}`.split(" | ")[0]}
                              <br />
                              {`${item1.value.avgemptyspeed}`.split(" | ")[1]}
                            </td>
                            <td>
                              {`${item1.value.avgspeed}`.split(" | ")[0]}
                              <br />
                              {`${item1.value.avgspeed}`.split(" | ")[1]}
                            </td>
                            <td
                              className={
                                item1.value.last_loadspeed >
                                item1.value.avgloadspeed
                                  ? ""
                                  : "text-danger fw-bold"
                              }
                            >
                              {`${item1.value.last_loadspeed}`.split(" | ")[0]}
                              <br />
                              {`${item1.value.last_loadspeed}`.split(" | ")[1]}
                            </td>
                            <td
                              className={
                                item1.value.last_emptyspeed >
                                item1.value.avgemptyspeed
                                  ? ""
                                  : "text-danger fw-bold"
                              }
                            >
                              {`${item1.value.last_emptyspeed}`.split(" | ")[0]}
                              <br />
                              {`${item1.value.last_emptyspeed}`.split(" | ")[1]}
                            </td>
                            <td
                              className={
                                item1.value.last_speed > item1.value.avgspeed
                                  ? ""
                                  : "text-danger fw-bold"
                              }
                            >
                              {`${item1.value.last_speed}`.split(" | ")[0]}
                              <br />
                              {`${item1.value.last_speed}`.split(" | ")[1]}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </components.Accordion1>
            </div>
          </div>
        ) : (
          <div className={"display-1 text-center text-danger shadow my-1 mb-1"}>
            ДАННЫХ НЕТ!
          </div>
        )}
      </div>
    </base.Base1>
  );
}
