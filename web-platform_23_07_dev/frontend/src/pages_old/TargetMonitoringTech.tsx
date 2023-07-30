// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as base from "../components/ui/bases";
import * as hooks from "../components/hooks";
import * as slices from "../components/slices";
import * as utils from "../components/utils";
import * as components from "../components/ui/components";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function Page(): JSX.Element {
  // TODO store ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const tripsAnalyticListStore = hooks.useSelectorCustom1(
    slices.analyse.tripsAnalyticListStore
  );

  // TODO hook /////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();
  const [monitoring, setMonitoring, resetMonitoring] = hooks.useStateCustom1(
    {}
  );
  const [currentTime, setCurrentTime, resetCurrentTime] = hooks.useStateCustom1(
    Date().toString()
  );
  const [getterFormObj, setterFormObj] = useState({
    warningLevel: 90,
    dangerLevel: 80,
    targetAnalyse: "last_hour",
  });

  // TODO useEffect ////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    dispatch(slices.analyse.tripsAnalyticListStore.action({}));
    setTimeout(async () => {
      setCurrentTime(Date().toString());
    }, 3000);
  }, [currentTime]);

  useEffect(() => {
    if (tripsAnalyticListStore.data) {
      setMonitoring(tripsAnalyticListStore.data);
    }
  }, [tripsAnalyticListStore.data]);

  // TODO function /////////////////////////////////////////////////////////////////////////////////////////////////////

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <base.Base1
      title={"Аналитика технологического процесса"}
      description={
        "Аналитика в реальном времени по всему технологическому процессу"
      }
    >
      <div className={"lead tex-danger fw-bold display-6"}>
        {currentTime && currentTime.length > 0 && currentTime.split(" G")[0]}
      </div>

      <hr />

      {monitoring &&
        monitoring.list_of_shovels &&
        monitoring.list_of_shovels.length > 0 && (
          <div>
            <div>
              {monitoring.list_of_shovels.map(
                // @ts-ignore
                (shovel, index) => (
                  <components.Accordion1
                    isCollapse={true}
                    key_target={`Accordion#${index + 10}`}
                    title={`${shovel.shov_id} экскаватор`}
                    text_style={"text-white"}
                    header_style={"bg-success"}
                    body_style={"bg-light"}
                  >
                    <div className={"card m-0 p-0"}>
                      <div className={"card-header m-0 p-3"}>
                        {shovel.fio_shov}
                      </div>
                      <div className={"card-body m-0 p-0"}>
                        <div
                          className={
                            "d-flex border border-1 border-dark p-1 m-0"
                          }
                        >
                          {utils.arrayToPages(
                            shovel.list_peregruz_and_nedogruz
                          )}
                          {shovel.list_peregruz_and_nedogruz.map(
                            // @ts-ignore
                            (trip, index) => (
                              <div className={"small col p-0 m-0"}>
                                <div className="d-flex flex-column h-100 p-0 m-0">
                                  <div className="wrapper flex-grow-1 p-0 m-0"></div>
                                  <div
                                    title={`${utils.getNormalTime(
                                      trip.timeload
                                    )}`}
                                    className={
                                      parseInt(trip.weight) < 92
                                        ? "bg-warning p-0 m-0"
                                        : "bg-danger p-0 m-0"
                                    }
                                    style={{
                                      width:
                                        1500 /
                                        shovel.list_peregruz_and_nedogruz
                                          .length,
                                      height: parseInt(trip.weight) * 2,
                                    }}
                                  >
                                    {trip.weight}
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                      <div className={"card-footer m-0 p-0"}></div>
                    </div>
                  </components.Accordion1>
                )
              )}
            </div>
          </div>
        )}

      <hr />

      {tripsAnalyticListStore.fail === undefined &&
        tripsAnalyticListStore.error === undefined &&
        monitoring &&
        monitoring.data &&
        monitoring.data.length > 0 && (
          <div>
            <div className="w-100 shadow bg-secondary m-0 p-0">
              <label
                htmlFor="disabledRange"
                className="form-label text-white lead"
              >
                Осталось до конца смены ({monitoring.extra.elapsed_time}{" "}
                часа(-ов))
              </label>
              <input
                type="range"
                className="form-range"
                id="disabledRange"
                value={80}
                disabled
              />
            </div>

            <hr />

            <div className={"row bg-light"}>
              <div className={"col"}>
                <div className={"lead"}>
                  График времени(горизонтальное) к объёмам (вертикальное)
                </div>
                <LineChart
                  width={1200}
                  height={300}
                  data={monitoring.extra.volumes_by_hours}
                  margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                >
                  <Line type="monotone" dataKey="объём" stroke="#8884d8" />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                </LineChart>
              </div>
              <div className={"col"}>
                <div className={"lead"}>Объёмы по типам материала</div>
                <BarChart
                  width={600}
                  height={300}
                  data={monitoring.extra.volumes_by_category}
                >
                  <XAxis dataKey="name" stroke="#8884d8" />
                  <YAxis />
                  <Tooltip />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <Bar dataKey="объём" fill="#8884d8" barSize={30} />
                </BarChart>
              </div>
            </div>
          </div>
        )}
      <hr />

      <div className="row row-cols-sm-1 row-cols-2 row-cols-md-2 row-cols-lg-2 text-center m-0 p-0">
        <div className={"col bg-success text-white p-1"}>
          <div className={"lead"}>наибольший вклад самосвалы</div>
          <table className="table table-hover table-striped small">
            <thead>
              <tr className={"bg-dark text-white"}>
                <th scope="col">№</th>
                <th scope="col">Самосвал</th>
                <th scope="col">ФИО</th>
                <th scope="col">Рейсы</th>
                <th scope="col">Вес</th>
                <th scope="col">Расстояние</th>
                <th scope="col">Объём</th>
              </tr>
            </thead>
            <tbody>
              <tr className={"m-0 p-1 bg-light bg-gradient text-dark"}>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
                <td>6</td>
                <td>7</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={"col bg-warning p-1"}>
          <div className={"lead"}>наибольший вклад экскаватор</div>
          <table className="table table-hover table-striped small">
            <thead>
              <tr className={"bg-dark text-white"}>
                <th scope="col">№</th>
                <th scope="col">Экскаватор</th>
                <th scope="col">ФИО</th>
                <th scope="col">Рейсы</th>
                <th scope="col">Вес</th>
                <th scope="col">Расстояние</th>
                <th scope="col">Объём</th>
              </tr>
            </thead>
            <tbody>
              <tr className={"m-0 p-1 bg-light bg-gradient text-dark"}>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
                <td>6</td>
                <td>7</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <hr />

      {tripsAnalyticListStore.fail === undefined &&
        tripsAnalyticListStore.error === undefined &&
        monitoring &&
        monitoring.trips &&
        monitoring.trips.length > 0 && (
          <div className="row row-cols-sm-1 row-cols-3 row-cols-md-4 row-cols-lg-5 text-center m-0 p-0">
            <table className="table table-hover table-striped small">
              <thead>
                <tr className={"bg-dark text-white"}>
                  <th scope="col">№</th>
                  <th scope="col">Время погрузки</th>
                  <th scope="col">Время разгрузки</th>
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
                {monitoring && monitoring.trips && monitoring.trips.length > 0
                  ? monitoring.trips.map(
                      // @ts-ignore
                      (item, index) => (
                        <tr
                          className={"m-0 p-1 bg-light bg-gradient text-dark"}
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

      <hr />

      {tripsAnalyticListStore.fail && (
        <div className={"display-1 text-center text-danger"}>
          ВНИМАНИЕ СВЯЗЬ!
        </div>
      )}
      {tripsAnalyticListStore.error && (
        <div className={"display-1 text-center text-danger"}>
          ВНИМАНИЕ СВЯЗЬ!
        </div>
      )}
    </base.Base1>
  );
}
