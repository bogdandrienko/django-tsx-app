// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as base from "../components/ui/bases";
import * as hooks from "../components/hooks";
import * as slices from "../components/slices";
import * as utils from "../components/utils";
import * as components from "../components/ui/components";
import * as constants from "../components/constants";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function Page(): JSX.Element {
  // TODO stores /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const slice = slices.develop.targetMonitoringWeightLoadsReadListStore;
  const store = hooks.useSelectorCustom1(slice);

  // TODO hooks //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();
  const [state, setState]: any = useState({});
  const [currentTime, setCurrentTime] = useState(utils.getCurrentDateTime());
  const [form, setForm] = useState({
    minVal: 180,
    timeDiff: 10,
    danger: false,
    lower: 20,
    higher: 20,
    avg_loads: 5,
  });

  // TODO useEffects /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    dispatch(slice.action({ form: { ...form } }));
    setTimeout(async () => {
      setCurrentTime(utils.getCurrentDateTime());
    }, 10000);
  }, [currentTime]);

  useEffect(() => {
    if (store.data) {
      setState(store.data);
    }
  }, [store.data]);

  // TODO return /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <base.Base2
      title={"ПОКАЗАТЕЛИ: Мониторинг недогрузов и перегрузов"}
      description={
        "Отклонения от нормы загрузки автосамосвалов в реальном времени"
      }
    >
      {/*TODO Настройки*/}
      <components.Accordion2
        isCollapse={false}
        keyTarget={"Accordion#1"}
        headerClassName={"bg-primary-custom-1"}
        title={"Настройка данных и отображения"}
        titleTextClassName={"text-white"}
        bodyClassName={"text-bg-light small"}
      >
        <div className={"input-group w-100 shadow p-3"}>
          <span className={"m-1 p-1"}>Норма недогрузов(%):</span>
          <select
            value={form.lower}
            onChange={(event) =>
              setForm({
                ...form,
                lower: parseInt(event.target.value, 10),
              })
            }
            className="form-select form-select-sm"
          >
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={25}>25</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
          </select>
          <span className={"m-1 p-1"}>Норма перегрузов(%):</span>
          <select
            value={form.higher}
            onChange={(event) =>
              setForm({
                ...form,
                higher: parseInt(event.target.value, 10),
              })
            }
            className="form-select form-select-sm"
          >
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={25}>25</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
          </select>
          <span className={"m-1 p-1"}>Норма погрузок в час(шт):</span>
          <select
            value={form.avg_loads}
            onChange={(event) =>
              setForm({
                ...form,
                avg_loads: parseInt(event.target.value, 10),
              })
            }
            className="form-select form-select-sm"
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={8}>8</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={30}>30</option>
          </select>
        </div>
      </components.Accordion2>

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
            {currentTime && currentTime.length > 0
              ? currentTime
              : "--.--.---- --:--:--"}
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

      <components.Accordion2
        isCollapse={false}
        keyTarget={"Accordion#2"}
        headerClassName={"bg-warning-custom-1"}
        title={"Показатели"}
        titleTextClassName={"text-dark"}
        bodyClassName={"text-bg-light small"}
      >
        <div className="row row-cols-3 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 text-center m-0 p-0">
          {state &&
            state.shovels &&
            state.shovels.length > 0 &&
            state.shovels.map((item: any, index: number) => (
              <div
                key={index}
                className={"card col border border-1 border-dark m-0 p-0"}
              >
                <div className={"card-header lead fw-bold m-0 p-0 d-flex"}>
                  <div className={"w-75 text-center"}>
                    <div className={"display-6 lead fw-bold "}>
                      #{item.shov_id}
                    </div>
                    <p className={"lead"}>{item.fio}</p>
                  </div>
                  <img
                    src={"/static/img/shov1.jpg"}
                    className={"w-25 p-1 img-thumbnail img-fluid"}
                    width={"200px"}
                    alt={"img"}
                  />
                </div>
                <div className={"card-body m-0 p-0"}>
                  <table className="table table-light m-0 p-0">
                    <tbody>
                      <tr>
                        <td
                          title={"в нормальном диапазоне"}
                          className={
                            item.normal.trips_count /
                              item.hour_from_start_shift <
                            form.avg_loads
                              ? "w-50 m-0 p-3 bg-danger text-white"
                              : "w-50 m-0 p-3 bg-success-custom-1 text-white"
                          }
                        >
                          Норма:{" "}
                          <p className={"fw-bold m-0 p-0"}>
                            {item.normal.trips_count} шт.({item.normal.percent}
                            %)
                          </p>
                        </td>
                        <td
                          title={"повышает износ оборудования"}
                          className={
                            item.higher.percent > form.higher
                              ? "w-50 m-0 p-3 bg-danger text-white"
                              : "w-50 m-0 p-3 bg-success-custom-1 text-white"
                          }
                        >
                          Перегрузы:{" "}
                          <p className={"fw-bold m-0 p-0"}>
                            {item.higher.trips_count} шт.({item.higher.percent}
                            %)
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td
                          title={"влияет на производительность"}
                          className={
                            item.lower.percent > form.lower
                              ? "w-50 m-0 p-3 bg-danger text-white"
                              : "w-50 m-0 p-3 bg-success-custom-1 text-white"
                          }
                        >
                          Недогрузы:{" "}
                          <p className={"fw-bold m-0 p-0"}>
                            {item.lower.trips_count} шт.({item.lower.percent}%)
                          </p>
                        </td>
                        <td
                          title={"'недополученные' рейсы"}
                          className={
                            item.lower.negative_trips > 0
                              ? "w-50 m-0 p-3 bg-danger text-white"
                              : "w-50 m-0 p-3 bg-success-custom-1 text-white"
                          }
                        >
                          Недополученная масса:{" "}
                          <p className={"fw-bold m-0 p-0"}>
                            {item.lower.negative_weight} тонн (
                            {item.lower.negative_trips} рейс)
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td
                          title={""}
                          className={
                            "w-100 m-0 p-3 bg-primary-custom-1 text-white"
                          }
                          colSpan={2}
                        >
                          <ul>
                            {item.volumes_by_worktype.map((item3: any) => (
                              <li key={item3.name}>
                                {item3.name} {item3.value}
                              </li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
        </div>
      </components.Accordion2>

      <hr className={"m-3 p-0"} />

      <components.Accordion2
        isCollapse={false}
        keyTarget={"Accordion#3"}
        headerClassName={"bg-danger"}
        title={"Таблица"}
        titleTextClassName={"text-white"}
        bodyClassName={"text-bg-light small"}
      >
        {state && state.data && state.data.length > 0 && (
          <div>
            <div>
              {state.data.map((shovel: any, index: number) => (
                <components.Accordion2
                  key={index}
                  isCollapse={true}
                  keyTarget={`Accordion#${index + 10}`}
                  headerClassName={"bg-success-custom-1"}
                  title={`${shovel.shov_id} экскаватор`}
                  titleTextClassName={"text-white"}
                  bodyClassName={"text-bg-light small"}
                >
                  <div className={"card m-0 p-0"}>
                    <div className={"card-header m-0 p-3"}>
                      {shovel.fio} {shovel.hour_from_start_shift}
                    </div>
                    <div className={"card-body m-0 p-0"}>
                      {utils
                        .arrayToPages(shovel.trips, 50)
                        .map((page: any, index_p: number) => (
                          <div
                            className={
                              "d-flex border border-1 border-dark p-1 m-0"
                            }
                            key={index_p}
                          >
                            {page.map((trip: any, index_t: number) => (
                              <div
                                className={"small col p-0 m-0"}
                                key={index_t}
                              >
                                <div className="d-flex flex-column h-100 p-0 m-0">
                                  <div className="wrapper flex-grow-1 p-0 m-0"></div>
                                  <div
                                    title={`№${
                                      trip.veh_id
                                    } | ${utils.DateTime.getNormalTime(
                                      trip.time_load
                                    )}`}
                                    className={
                                      parseInt(trip.weight) < 92
                                        ? "bg-warning-custom-1 p-0 m-0 text-dark"
                                        : "bg-danger p-0 m-0 text-white"
                                    }
                                    style={{
                                      width: 30,
                                      height: parseInt(trip.weight) * 2,
                                    }}
                                  >
                                    <div className={""}>{trip.weight}</div>
                                  </div>
                                  <div className="text-start p-0 m-0">
                                    {trip.veh_id}
                                  </div>
                                  <div className="text-start p-0 m-0">
                                    {utils.DateTime.GetCleanDateTime(
                                      trip.time_load,
                                      true,
                                      true
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ))}
                    </div>
                    <div className={"card-footer m-0 p-0"}></div>
                  </div>
                </components.Accordion2>
              ))}
            </div>
          </div>
        )}
      </components.Accordion2>
    </base.Base2>
  );
}
