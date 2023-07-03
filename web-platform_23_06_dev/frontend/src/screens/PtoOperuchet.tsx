// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import axios from "axios";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as base from "../components/ui/base";
import * as hooks from "../components/hooks";
import * as constants from "../components/constants";

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

    // let date = new Date(Date.UTC(2015, 5, 27))
    // date.toLocaleDateString("ru-RU", {
    //   weekday: "short",
    //   month: "short",
    //   day: "numeric",
    // })

    console.log(ret);

    return ret;
  }

  const [getterFormObj, setterFormObj] = useState({
    dateFrom: format_date(),
    shiftFrom: 1,
    dateTo: format_date(),
    shiftTo: 2,
    selectTechId: "Все",
    roundPoint: 3,
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
        url:
          `${constants.SERVER_HOST_AND_PORT_CONSTANT}reports/operuchet/dumptrucks/?dateFrom=${getterFormObj.dateFrom}&shiftFrom=${getterFormObj.shiftFrom}` +
          `&dateTo=${getterFormObj.dateTo}&shiftTo=${getterFormObj.shiftTo}` +
          `&selectTechId=${getterFormObj.selectTechId}&roundPoint=${getterFormObj.roundPoint}`,
        method: `GET`,
        timeout: 60000,
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
  }, [currentTime]);

  function getNormalTime(time: string) {
    return `${time.split("T")[0]} ${time.split("T")[1].split("+")[0]}`;
  }

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////
  // @ts-ignore
  return (
    <base.Base1 title={"ПТО: Оперучёт"} description={"Отчёт"}>
      <div className={"lead tex-danger fw-bold display-6"}>
        {currentTime && currentTime.length > 0 && currentTime.split(" G")[0]}
      </div>
      <div>
        <div className={"input-group w-100 shadow p-3"}>
          <span>Выберите дату от: </span>
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
          <span>Выберите смену от: </span>
          <select
            className="form-select form-select-sm mb-3"
            defaultValue={getterFormObj.shiftFrom}
            onChange={(event) =>
              setterFormObj({
                ...getterFormObj,
                // @ts-ignore
                shiftFrom: event.target.value,
              })
            }
          >
            <option selected value={1}>
              1
            </option>
            <option value={2}>2</option>
          </select>
        </div>
        <div className={"input-group w-100 shadow p-3"}>
          <span>Выберите дату до: </span>
          <input
            type={"date"}
            className={"form-control w-25"}
            value={getterFormObj.dateTo}
            onChange={(event) =>
              setterFormObj({
                ...getterFormObj,
                // @ts-ignore
                dateTo: event.target.value,
              })
            }
          />
          <span>Выберите смену до: </span>
          <select
            className="form-select form-select-sm mb-3"
            defaultValue={getterFormObj.shiftTo}
            onChange={(event) =>
              setterFormObj({
                ...getterFormObj,
                // @ts-ignore
                shiftTo: event.target.value,
              })
            }
          >
            <option value={1}>1</option>
            <option selected value={2}>
              2
            </option>
          </select>
        </div>
        <div className={"input-group w-100 shadow p-3"}>
          <span>Выберите количество знаков: </span>
          <select
            className="form-select form-select-sm mb-3"
            defaultValue={getterFormObj.roundPoint}
            onChange={(event) =>
              setterFormObj({
                ...getterFormObj,
                // @ts-ignore
                roundPoint: event.target.value,
              })
            }
          >
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option selected value={3}>
              3
            </option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <button
            onClick={GetMonitoringData}
            className={"btn btn-lg btn-outline-primary"}
          >
            обновить данные
          </button>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-1 text-center m-0 p-0">
        {monitoring && monitoring.data ? (
          <div className={"card col border border-1 border-dark m-0 p-0"}>
            <div className={"card-header lead m-0 p-0"}>
              Оперучёт за период по автосамосвалам
            </div>
            <div className={"card-body m-0 p-0"}>
              <table className="table table-light table-hover table-striped m-0 p-0">
                <thead>
                  <tr>
                    <th scope="col">Хоз. номер: </th>
                    <th scope="col">Тип:</th>
                    <th scope="col">Тип:</th>
                    <th scope="col">Объём:</th>
                    <th scope="col">Расстояние:</th>
                    <th scope="col">Удельный вес:</th>
                    <th scope="col">Объёмный вес:</th>
                    <th scope="col">Грузооборот:</th>
                    <th scope="col">Тонны:</th>
                    <th scope="col">Км:</th>
                  </tr>
                </thead>
                <tbody>
                  {monitoring.data.map(
                    // @ts-ignore
                    (item1, index1) => (
                      <tr>
                        {item1.map(
                          // @ts-ignore
                          (item2, index2) => (
                            <td>{item2.toString().replace(/[.]/g, ",")}</td>
                          )
                        )}
                      </tr>
                    )
                  )}
                </tbody>
              </table>
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
