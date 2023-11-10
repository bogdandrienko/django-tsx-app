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
import * as constants from "../components/constants";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function Page(): JSX.Element {
  // TODO stores /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const slice = slices.develop.tripsAnalyticListStore;
  const store = hooks.useSelectorCustom1(slice);

  // TODO hooks //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();
  const [state, setState]: any = useState({});
  const [currentTime, setCurrentTime] = useState(utils.getCurrentDateTime());

  // TODO useEffects /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    dispatch(slice.action({ form: {} }));
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
      title={"Мониторинг технологического процесса"}
      description={"Мониторинг технологического процесса"}
    >
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

      {state && state.list_of_shovels && state.list_of_shovels.length > 0 && (
        <div>
          <div>
            {state.list_of_shovels.map(
              // @ts-ignore
              (shovel, index) => (
                <components.Accordion1
                  isCollapse={true}
                  key_target={`Accordion#${index + 10}`}
                  title={`${shovel.shov_id} экскаватор`}
                  text_style={"text-white"}
                  header_style={"bg-success-custom-1"}
                  body_style={"bg-light"}
                  key={index}
                >
                  <div className={"card m-0 p-0"}>
                    <div className={"card-header m-0 p-3"}>
                      {shovel.fio_shov}
                    </div>
                    <div className={"card-body m-0 p-0"}>
                      {utils
                        .arrayToPages(shovel.list_peregruz_and_nedogruz, 60)
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
                                      trip.vehid
                                    } | ${utils.DateTime.getNormalTime(
                                      trip.timeload
                                    )}`}
                                    className={
                                      parseInt(trip.weight) < 92
                                        ? "bg-warning-custom-1 p-0 m-0"
                                        : "bg-danger p-0 m-0"
                                    }
                                    style={{
                                      width: 25,
                                      height: parseInt(trip.weight) * 2,
                                    }}
                                  >
                                    <div>{trip.weight}</div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ))}
                    </div>
                    <div className={"card-footer m-0 p-0"}></div>
                  </div>
                </components.Accordion1>
              )
            )}
          </div>
        </div>
      )}

      <hr className={"m-3 p-0"} />

      {state && state.extra && (
        <div>
          <div className="w-100 shadow bg-secondary m-0 p-0">
            <label
              htmlFor="disabledRange"
              className="form-label text-white lead"
            >
              Осталось до конца смены ({state.extra.elapsed_time} часа(-ов))
            </label>
            <input
              type="range"
              className="form-range"
              id="disabledRange"
              value={80}
              disabled
            />
          </div>

          <hr className={"m-3 p-0"} />

          <div className={"row bg-light"}>
            <div className={"col"}>
              <div className={"lead"}>
                График времени(горизонтальное) к объёмам (вертикальное)
              </div>
              <LineChart
                width={1200}
                height={300}
                data={state.extra.volumes_by_hours}
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
                data={state.extra.volumes_by_category}
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

      <hr className={"m-3 p-0"} />

      <div className="row row-cols-sm-1 row-cols-2 row-cols-md-2 row-cols-lg-2 text-center m-0 p-0">
        <div className={"col bg-success-custom-1 text-white p-1"}>
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
        <div className={"col bg-warning-custom-1 p-1"}>
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
    </base.Base2>
  );
}
