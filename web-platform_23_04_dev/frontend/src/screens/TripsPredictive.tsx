// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import axios from "axios";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as base from "../components/ui/base";
import * as hooks from "../components/hooks";
import { Link } from "react-router-dom";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function Page(): JSX.Element {
  const [trips, setTrips, resetTrips] = hooks.useStateCustom1([]);
  const [currentTime, setCurrentTime, resetCurrentTime] = hooks.useStateCustom1(
    // @ts-ignore
    Date().toString()
  );
  const [danger, setDanger] = useState(false);

  const [getterFormObj, setterFormObj] = useState({
    warningLevel: 90,
    dangerLevel: 80,
    targetAnalyse: "last_hour",
  });

  async function GetTripsData() {
    try {
      const config = {
        url: `api/analyse/predictive/`,
        method: `GET`,
        timeout: 5000,
        headers: {
          Authorization: `;`,
        },
        data: {},
      };
      const response = await axios(config);
      if (response.status === 200) {
        if (
          response.data &&
          response.data.response &&
          response.data.response.data
        ) {
          setTrips(response.data.response);
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
    setTimeout(async () => {
      setCurrentTime(Date().toString());
    }, 1000);
  }

  useEffect(() => {
    GetTripsData();
  }, [currentTime]);

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////
  // @ts-ignore
  return (
    <base.Base1
      title={"Анализ рейсов"}
      description={
        "на этой странице автоматически происходит обновление показателей КПД рейсов"
      }
    >
      <div className={"lead tex-danger fw-bold display-6"}>
        {currentTime && currentTime.length > 0 && currentTime.split(" G")[0]}
      </div>
      <div>
        <div className="row row-cols-4 row-cols-sm-2 row-cols-md-5 row-cols-lg-6 text-center m-0 p-0 text-center">
          <div className={"card col border border-1 border-dark m-0 p-0 small"}>
            <div className={"card-header"}>Легенда:</div>
            <div className={"card-body"}>
              <div className={"d-flex w-100"}>
                <div className={"m-0 p-0 w-50"}>
                  <div className={"m-0 p-0 display-6 fw-bold"}>
                    номер самосвала
                  </div>
                  <hr className={"m-0 p-0"} />
                  <table className="table table-light table-hover m-0 p-0">
                    <tbody>
                      <tr>
                        <td
                          className={
                            "m-0 p-1 bg-success bg-gradient text-white"
                          }
                        >
                          цель анализа
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className={"m-1 p-0"}>
                  <table className="table table-light table-hover m-0 p-0">
                    <tbody>
                      <tr>
                        <td
                          className={"m-0 p-1 bg-warning bg-gradient text-dark"}
                        >
                          {`последний рейс: кпд  % | время рейса мин.`}
                        </td>
                      </tr>
                      <tr>
                        <td
                          className={"m-0 p-1 bg-danger bg-gradient text-white"}
                        >
                          {`за час:  кпд % | количество рейсов`}
                        </td>
                      </tr>
                      <tr>
                        <td
                          className={
                            "m-0 p-1 bg-secondary bg-gradient text-white"
                          }
                        >
                          {`за смену: кпд % | количество рейсов`}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={"input-group shadow p-3"}>
          <span>Выберите целевой показатель: </span>
          <select
            onChange={(event) =>
              setterFormObj({
                ...getterFormObj,
                targetAnalyse: event.target.value,
              })
            }
            className="form-select form-select-lg mb-3"
          >
            <option value={"last_trip"}>последний рейс</option>
            <option selected value={"last_hour"}>
              последний час
            </option>
            <option value={"last_shift"}>вся смена</option>
          </select>
          <span>Выберите опасный уровень (%) </span>
          <select
            onChange={(event) =>
              setterFormObj({
                ...getterFormObj,
                // @ts-ignore
                warningLevel: event.target.value,
              })
            }
            className="form-select form-select-lg mb-3"
          >
            <option value={75}>75</option>
            <option value={80}>80</option>
            <option value={85}>85</option>
            <option selected value={90}>
              90
            </option>
            <option value={95}>95</option>
            <option value={100}>100</option>
            <option value={110}>110</option>
            <option value={120}>120</option>
          </select>
          <span>Выберите критический уровень (%) </span>
          <select
            onChange={(event) =>
              setterFormObj({
                ...getterFormObj,
                // @ts-ignore
                dangerLevel: event.target.value,
              })
            }
            className="form-select form-select-lg mb-3"
          >
            <option value={75}>75</option>
            <option selected value={80}>
              80
            </option>
            <option value={85}>85</option>
            <option value={90}>90</option>
            <option value={95}>95</option>
            <option value={100}>100</option>
            <option value={110}>110</option>
            <option value={120}>120</option>
          </select>
        </div>
      </div>
      <div className="row row-cols-4 row-cols-sm-2 row-cols-md-5 row-cols-lg-6 text-center m-0 p-0 text-center">
        {trips && trips.data && trips.data.length > 0
          ? trips.data.map(
              // @ts-ignore
              (item, index) => (
                <div
                  key={item.tech_id}
                  className={
                    "card col border border-1 border-dark m-0 p-0 small"
                  }
                >
                  <div className={"card-body"}>
                    <div className={"d-flex w-100"}>
                      <div className={"m-0 p-0 w-50"}>
                        <div className={"m-0 p-0 display-6 fw-bold"}>
                          {item.tech_id}
                        </div>
                        <hr className={"m-0 p-0"} />
                        <table className="table table-light table-hover m-0 p-0">
                          <tbody>
                            <tr>
                              {getterFormObj.targetAnalyse === "last_hour" ? (
                                <td
                                  className={
                                    item.ratings.last_hour.rating == 0
                                      ? "m-0 p-1 bg-secondary bg-gradient text-white"
                                      : item.ratings.last_hour.rating <=
                                        getterFormObj.dangerLevel
                                      ? "m-0 p-1 bg-danger bg-gradient text-white"
                                      : item.ratings.last_hour.rating <=
                                        getterFormObj.warningLevel
                                      ? "m-0 p-1 bg-warning bg-gradient text-dark"
                                      : "m-0 p-1 bg-success bg-gradient text-white"
                                  }
                                >
                                  {`${item.ratings.last_hour.rating}% | ${item.ratings.last_hour.count}р.`}
                                </td>
                              ) : getterFormObj.targetAnalyse ===
                                "last_trip" ? (
                                <td
                                  className={
                                    item.ratings.last_trip.rating == 0
                                      ? "m-0 p-1 bg-secondary bg-gradient text-white"
                                      : item.ratings.last_trip.rating <=
                                        getterFormObj.dangerLevel
                                      ? "m-0 p-1 bg-danger bg-gradient text-white"
                                      : item.ratings.last_trip.rating <=
                                        getterFormObj.warningLevel
                                      ? "m-0 p-1 bg-warning bg-gradient text-dark"
                                      : "m-0 p-1 bg-success bg-gradient text-white"
                                  }
                                >
                                  {`${item.ratings.last_trip.rating}% | ${item.ratings.last_trip.count}мин.`}
                                </td>
                              ) : (
                                <td
                                  className={
                                    item.ratings.last_shift.rating == 0
                                      ? "m-0 p-1 bg-secondary bg-gradient text-white"
                                      : item.ratings.last_shift.rating <=
                                        getterFormObj.dangerLevel
                                      ? "m-0 p-1 bg-danger bg-gradient text-white"
                                      : item.ratings.last_shift.rating <=
                                        getterFormObj.warningLevel
                                      ? "m-0 p-1 bg-warning bg-gradient text-dark"
                                      : "m-0 p-1 bg-success bg-gradient text-white"
                                  }
                                >
                                  {`${item.ratings.last_shift.rating}% | ${item.ratings.last_shift.count}р.`}
                                </td>
                              )}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className={"m-1 p-0"}>
                        <table className="table table-light table-hover m-0 p-0">
                          <tbody>
                            <tr>
                              <td
                                className={
                                  item.ratings.last_trip.rating == 0
                                    ? "m-0 p-1 bg-secondary bg-gradient text-white"
                                    : item.ratings.last_trip.rating <=
                                      getterFormObj.dangerLevel
                                    ? "m-0 p-1 bg-danger bg-gradient text-white"
                                    : item.ratings.last_trip.rating <=
                                      getterFormObj.warningLevel
                                    ? "m-0 p-1 bg-warning bg-gradient text-dark"
                                    : "m-0 p-1 bg-light bg-gradient text-dark"
                                }
                              >
                                {`${item.ratings.last_trip.rating}% | ${item.ratings.last_trip.count}мин.`}
                              </td>
                            </tr>
                            <tr>
                              <td
                                className={
                                  item.ratings.last_hour.rating == 0
                                    ? "m-0 p-1 bg-secondary bg-gradient text-white"
                                    : item.ratings.last_hour.rating <=
                                      getterFormObj.dangerLevel
                                    ? "m-0 p-1 bg-danger bg-gradient text-white"
                                    : item.ratings.last_hour.rating <=
                                      getterFormObj.warningLevel
                                    ? "m-0 p-1 bg-warning bg-gradient text-dark"
                                    : "m-0 p-1 bg-light bg-gradient text-dark"
                                }
                              >
                                {`${item.ratings.last_hour.rating}% | ${item.ratings.last_hour.count}р.`}
                              </td>
                            </tr>
                            <tr>
                              <td
                                className={
                                  item.ratings.last_shift.rating == 0
                                    ? "m-0 p-1 bg-secondary bg-gradient text-white"
                                    : item.ratings.last_shift.rating <=
                                      getterFormObj.dangerLevel
                                    ? "m-0 p-1 bg-danger bg-gradient text-white"
                                    : item.ratings.last_shift.rating <=
                                      getterFormObj.warningLevel
                                    ? "m-0 p-1 bg-warning bg-gradient text-dark"
                                    : "m-0 p-1 bg-light bg-gradient text-dark"
                                }
                              >
                                {`${item.ratings.last_shift.rating}% | ${item.ratings.last_shift.count}р.`}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )
          : "данных нет"}
      </div>
      {trips && trips.trips && trips.trips.length > 0 && (
        <div className="row row-cols-sm-1 row-cols-3 row-cols-md-4 row-cols-lg-5 text-center m-0 p-0">
          <table className="table table-hover table-striped small">
            <thead>
              <tr className={"bg-dark text-white"}>
                <th scope="col">№</th>
                <th scope="col">Время погрузки</th>
                <th scope="col">Время разгрузки</th>
                <th scope="col">КПД</th>
                <th scope="col">Экскаватор</th>
                <th scope="col">Самосвал</th>
                <th scope="col">Место разгрузки</th>
                <th scope="col">Тип материала</th>
                <th scope="col">Время движения</th>
                <th scope="col">Вес</th>
                <th scope="col">Количество ковшей</th>
                <th scope="col">Средняя скорость</th>
                <th scope="col">Расстояние от погрузки</th>
                <th scope="col">Расстояние от разгрузки</th>
                <th scope="col">Высота погрузки</th>
                <th scope="col">Высота разгрузки</th>
              </tr>
            </thead>
            <tbody>
              {trips && trips.trips
                ? trips.trips.map(
                    // @ts-ignore
                    (item, index) => (
                      <tr
                        className={
                          item.kpd == 0
                            ? "m-0 p-1 bg-secondary bg-gradient text-white"
                            : item.kpd <= getterFormObj.dangerLevel
                            ? "m-0 p-1 bg-danger bg-gradient text-white"
                            : item.kpd <= getterFormObj.warningLevel
                            ? "m-0 p-1 bg-warning bg-gradient text-dark"
                            : "m-0 p-1 bg-light bg-gradient text-dark"
                        }
                        key={index}
                      >
                        <th># {index + 1}</th>
                        <td>
                          {item.timeload.split("T")[0]}{" "}
                          {item.timeload.split("T")[1].split("+")[0]}
                        </td>
                        <td>
                          {item.timeunload.split("T")[0]}{" "}
                          {item.timeunload.split("T")[1].split("+")[0]}
                        </td>
                        <td>{item.kpd}</td>
                        <td>{item.shovid}</td>
                        <td>{item.vehid}</td>
                        <td>{item.unloadid}</td>
                        <td>{item.worktype}</td>
                        <td>{item.movetime.split("T")[1].split("+")[0]}</td>
                        <td>{item.weigth}</td>
                        <td>{item.bucketcount}</td>
                        <td>{item.avspeed}</td>
                        <td>{item.length}</td>
                        <td>{item.unloadlength}</td>
                        <td>{item.loadheight}</td>
                        <td>{item.unloadheight}</td>
                      </tr>
                    )
                  )
                : ""}
            </tbody>
          </table>
        </div>
      )}
      {danger && (
        <div className={"display-1 text-center text-danger"}>
          ВНИМАНИЕ СВЯЗЬ!
        </div>
      )}
    </base.Base1>
  );
}
