// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import axios from "axios";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as base from "../components/ui/base";
import * as hooks from "../components/hooks";
import * as components from "../components/ui/components";
import * as constants from "../components/constants";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function Page(): JSX.Element {
  function format_date() {
    let d = new Date();
    let dd = d.getDate();
    // @ts-ignore
    dd = dd < 10 ? "0" + dd : dd;
    let mm = d.getMonth() + 1;
    // @ts-ignore
    mm = mm < 10 ? "0" + mm : mm;
    let yyyy = d.getFullYear();
    // @ts-ignore
    // let ret = yyyy + "-" + mm + "-" + dd;
    let ret = `${yyyy}-${mm}-${dd}`;

    return ret;
  }

  const [getterFormObj, setterFormObj] = useState({
    dateFrom: format_date(),
    shiftFrom: 1,
    dateTo: format_date(),
    shiftTo: 2,
    selectTechId: "Все",
  });

  const [minVal, setMinVal] = useState(180);
  const [timeDiff, setTimeDiff] = useState(15);
  const [danger, setDanger] = useState(false);

  const [monitoring, setMonitoring, resetMonitoring] = hooks.useStateCustom1(
    {}
  );
  const [currentTime, setCurrentTime, resetCurrentTime] = hooks.useStateCustom1(
    // @ts-ignore
    Date().toString()
  );
  async function GetMonitoringData() {
    try {
      const config = {
        url: `${constants.SERVER_HOST_AND_PORT_CONSTANT}reports/avg_speed/?date=${getterFormObj.dateFrom}&shift=${getterFormObj.shiftFrom}&selectTechId=${getterFormObj.selectTechId}`,
        method: `GET`,
        timeout: 30000,
        headers: {
          Authorization: `;`,
        },
        data: {},
      };
      const response = await axios(config);

      console.log("response: ", response);

      if (response.status === 200) {
        if (
          response.data &&
          response.data.response &&
          response.data.response.data
        ) {
          setMonitoring(response.data.response);
          setDanger(false);
        } else {
          setDanger(true);
        }
      } else {
        setDanger(true);
      }
    } catch (error) {
      setDanger(true);
    }
    // setTimeout(async () => {
    //   setCurrentTime(Date().toString());
    // }, 10000);
  }

  useEffect(() => {
    // GetMonitoringData();
    console.log(monitoring.lines);
  }, [currentTime]);

  function getNormalTime(time: string) {
    return `${time.split("T")[0]} ${time.split("T")[1].split("+")[0]}`;
  }

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////
  // @ts-ignore
  return (
    <base.Base1
      title={"АТЦ: Средняя скорость автосамосвалов"}
      description={
        "Анализ средней скорости автосамосвалов в течении смены и отдельно последний рейс"
      }
    >
      <div className={"lead tex-danger fw-bold display-6"}>
        {currentTime && currentTime.length > 0 && currentTime.split(" G")[0]}
      </div>
      <div>
        <div className={"input-group w-100 shadow p-3 w-25"}>
          <span className={"p-3 w-25"}>Выберите дату: </span>
          <input
            type={"date"}
            className={"form-control w-25"}
            value={getterFormObj.dateFrom}
            onChange={(event) =>
              setterFormObj({
                ...getterFormObj,
                // @ts-ignore
                dateFrom: event.target.value,
              })
            }
          />
          {/*<span className={"p-3"}>Выберите смену: </span>*/}
          {/*<select*/}
          {/*  className="form-select form-select-sm mb-3"*/}
          {/*  defaultValue={getterFormObj.shiftFrom}*/}
          {/*  onChange={(event) =>*/}
          {/*    setterFormObj({*/}
          {/*      ...getterFormObj,*/}
          {/*      // @ts-ignore*/}
          {/*      shiftFrom: event.target.value,*/}
          {/*    })*/}
          {/*  }*/}
          {/*>*/}
          {/*  <option selected value={1}>*/}
          {/*    1*/}
          {/*  </option>*/}
          {/*  <option value={2}>2</option>*/}
          {/*</select>*/}
          <button
            onClick={GetMonitoringData}
            className={"btn btn-lg btn-primary w-50"}
          >
            обновить данные
          </button>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-1 text-center m-0 p-0">
        {monitoring && monitoring.data ? (
          <div className={"card col border border-1 border-dark m-0 p-0"}>
            <div className={"card-header lead display-6 m-0 p-3"}>
              <div className={"display-6 p-3"}>
                {monitoring && monitoring.query ? (
                  <div>
                    {monitoring.query.date.split("T")[0]} (смена с 20:00 сверху)
                  </div>
                ) : (
                  "--:--:--"
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
          <div className={"display-1 text-center text-danger"}>ДАННЫХ НЕТ!</div>
        )}
        {danger && (
          <div className={"display-1 text-center text-danger"}>
            ВНИМАНИЕ СВЯЗЬ!
          </div>
        )}
      </div>
    </base.Base1>
  );
}
