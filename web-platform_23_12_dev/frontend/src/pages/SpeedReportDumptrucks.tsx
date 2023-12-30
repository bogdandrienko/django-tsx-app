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

  const slice = slices.speed.speedReportDumptrucksStore;
  const store = hooks.useSelectorCustom1(slice);

  // TODO hooks //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();
  const [state, setState]: any = useState({});
  const [form, setForm] = useState({
    param_date: utils.getCurrentDateForForm(),
    param_detail: false,
    param_target_speed: 19.03,
  });

  // TODO useEffects /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (store.data) {
      console.log(store.data);
      setState(store.data);
    }
  }, [store.data]);

  // TODO functions //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async function GetData() {
    if (form.param_date !== "") {
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
      title={
        "СКОРОСТЬ АВТОСАМОСВАЛОВ: Графики средней скорости автосамосвалов по часам за сутки"
      }
      description={"Графики и таблица за сутки средней скорости автосамосвалов"}
    >
      <components.Accordion2
        isCollapse={false}
        keyTarget={"Accordion#1"}
        headerClassName={"bg-primary-custom-1"}
        title={"Настройка данных и отображения"}
        titleTextClassName={"text-white"}
        bodyClassName={"text-bg-light small"}
      >
        <div className={"input-group w-100 m-1 p-2"}>
          <span className={"m-1 p-2"}>Дата:</span>
          <input
            type={"date"}
            className={"form-control form-control-sm"}
            value={form.param_date}
            onChange={(event) =>
              setForm({
                ...form,
                param_date: event.target.value,
              })
            }
          />
          <span className={"m-1 p-1"}>
            Выберите требуемый общий уровень скорости:
          </span>
          <select
            value={form.param_target_speed}
            onChange={(event) =>
              setForm({
                ...form,
                param_target_speed: utils.Converting.parseFloat(
                  event.target.value
                ),
              })
            }
            className="form-select form-select-sm"
          >
            <option value={14.0}>14.0</option>
            <option value={15.0}>15.0</option>
            <option value={16.0}>16.0</option>
            <option value={17.0}>17.0</option>
            <option value={18.0}>18.0</option>
            <option value={19.03}>19.03</option>
            <option value={20.0}>20.0</option>
            <option value={25.0}>25.0</option>
          </select>
          <button
            onClick={GetData}
            className={
              store && store.load === true
                ? "btn btn-lg btn-primary w-25 disabled"
                : "btn btn-lg btn-primary w-25"
            }
          >
            обновить данные
          </button>
        </div>
        <div className={"input-group w-100 m-1 p-2"}>
          <div className="feature col">
            <h3 className="fs-4 text-body-emphasis">
              Формат отображения рейсов:
            </h3>
            <p className={"text-center"}>
              {form.param_detail ? (
                <button
                  onClick={() => {
                    setForm({
                      ...form,
                      param_detail: !form.param_detail,
                    });
                  }}
                  className="btn btn-lg btn-warning"
                >
                  включён детальный режим
                </button>
              ) : (
                <button
                  onClick={() => {
                    setForm({
                      ...form,
                      param_detail: !form.param_detail,
                    });
                  }}
                  className="btn btn-lg btn-outline-success"
                >
                  включён упрощённый режим
                </button>
              )}
            </p>
          </div>
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
            {state && state.parameters ? (
              <div>
                {utils.DateTime.GetCleanDateTime(
                  state.parameters.param_date,
                  false
                )}
              </div>
            ) : (
              "--.--.----"
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

      <div className="m-0 p-0">
        {(store.fail === undefined || store.error === undefined) &&
        state &&
        state.lines ? (
          <div>
            <components.Accordion2
              isCollapse={true}
              keyTarget={"Accordion#2"}
              headerClassName={"bg-primary-custom-1"}
              title={"Графики: скорость автосамосвалов в разрезе суток"}
              titleTextClassName={"text-white"}
              bodyClassName={"text-bg-light"}
            >
              <div className={"display-6 m-3 p-3"}>
                График времени(горизонтальное) к средней скорости
                груж.(вертикальное)
              </div>
              <div className={"row bg-light m-0 p-0"}>
                {state.lines.map((item1: any, index1: number) => (
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
                ))}
              </div>
            </components.Accordion2>

            <hr className={"m-3 p-0"} />

            <components.Accordion2
              isCollapse={true}
              keyTarget={"Accordion#3"}
              headerClassName={"bg-warning-custom-1"}
              title={"Таблица: НОЧНАЯ (1) СМЕНА"}
              titleTextClassName={"text-dark"}
              bodyClassName={"bg-light"}
            >
              <div className={"m-2 p-2"}>
                <a
                  href={`/${state.night.path_to_excel_file}`}
                  className={"btn btn-lg btn-outline-success"}
                >
                  Скачать excel-файл
                </a>
              </div>
              <table className="small table table-light table-hover m-0 p-0">
                <thead>
                  <tr>
                    <th scope="col">Самосвал</th>
                    <th scope="col">ФИО</th>

                    {form.param_detail && <th scope="col">Всего рейсов</th>}
                    <th scope="col">Частый экскаватор</th>
                    {form.param_detail && (
                      <th scope="col">Рейсов под частым экскаватором</th>
                    )}

                    <th scope="col">Ср. груж.</th>
                    <th scope="col">Ср. порожн.</th>
                    <th scope="col">Ср. общ.</th>

                    <th scope="col">Ср. последний рейс груж.</th>
                    <th scope="col">Ср. последний рейс порожн.</th>
                    <th scope="col">Ср. последний рейс общ.</th>

                    {form.param_detail && <th scope="col">Ср. масса.</th>}
                    {form.param_detail && (
                      <th scope="col">Ср. расстояние груж.</th>
                    )}
                    {form.param_detail && (
                      <th scope="col">Ср. расстояние порожн.</th>
                    )}
                    {form.param_detail && (
                      <th scope="col">Ср. расстояние общ.</th>
                    )}

                    {form.param_detail && (
                      <th scope="col">Ср. высота подъёма</th>
                    )}
                    {form.param_detail && (
                      <th scope="col">Ср. время движ. груж.</th>
                    )}
                    {form.param_detail && (
                      <th scope="col">Частый тип материала</th>
                    )}

                    <th scope="col">Комментарий по снижению</th>
                  </tr>
                </thead>
                <tbody>
                  {state.night.data.length < 1 ? (
                    <tr>
                      <td colSpan={5} className={"text-danger"}>
                        Данных не найдено.
                      </td>
                    </tr>
                  ) : (
                    state.night.data.map((item1: any, index1: number) => (
                      <tr key={index1}>
                        <td>{item1.veh_id}</td>
                        <td>{item1.fio}</td>

                        {form.param_detail && <td>{item1.trips_count}</td>}
                        <td>{item1.shov_id}</td>
                        {form.param_detail && (
                          <td>{item1.shov_id_trips_count}</td>
                        )}

                        <td>{item1.avg_speed_load}</td>
                        <td>{item1.avg_speed_empty}</td>
                        <td
                          className={
                            item1.avg_speed < form.param_target_speed
                              ? "fw-bold bg-danger text-white border border-1 border-danger"
                              : ""
                          }
                        >
                          {item1.avg_speed}
                        </td>

                        <td
                          className={
                            item1.avg_speed_load - item1.last_avg_speed_load >
                            0.5
                              ? "fw-bold text-danger"
                              : ""
                          }
                        >
                          {item1.last_avg_speed_load}
                        </td>
                        <td
                          className={
                            item1.avg_speed_empty - item1.last_avg_speed_empty >
                            0.5
                              ? "fw-bold text-danger"
                              : ""
                          }
                        >
                          {item1.last_avg_speed_empty}
                        </td>
                        <td
                          className={
                            item1.avg_speed - item1.last_avg_speed > 0.5
                              ? "fw-bold text-danger"
                              : ""
                          }
                        >
                          {item1.last_avg_speed}
                        </td>

                        {form.param_detail && <td>{item1.avg_weight}</td>}
                        {form.param_detail && <td>{item1.avg_length_load}</td>}
                        {form.param_detail && (
                          <td>{item1.avg_length_unload}</td>
                        )}
                        {form.param_detail && <td>{item1.avg_length}</td>}

                        {form.param_detail && <td>{item1.avg_height}</td>}
                        {form.param_detail && <td>{item1.avg_worktime}</td>}
                        {form.param_detail && <td>{item1.avg_worktype}</td>}

                        <td>{item1.comment_description}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </components.Accordion2>

            <hr className={"m-3 p-0"} />

            <components.Accordion2
              isCollapse={true}
              keyTarget={"Accordion#4"}
              headerClassName={"bg-warning-custom-1"}
              title={"Таблица: ДНЕВНАЯ (2) СМЕНА"}
              titleTextClassName={"text-dark"}
              bodyClassName={"bg-light"}
            >
              <div className={"m-2 p-2"}>
                <a
                  href={`/${state.day.path_to_excel_file}`}
                  className={"btn btn-lg btn-outline-success"}
                >
                  Скачать excel-файл
                </a>
              </div>
              <table className="small table table-light table-hover m-0 p-0">
                <thead>
                  <tr>
                    <th scope="col">Самосвал</th>
                    <th scope="col">ФИО</th>

                    {form.param_detail && <th scope="col">Всего рейсов</th>}
                    <th scope="col">Частый экскаватор</th>
                    {form.param_detail && (
                      <th scope="col">Рейсов под частым экскаватором</th>
                    )}

                    <th scope="col">Ср. груж.</th>
                    <th scope="col">Ср. порожн.</th>
                    <th scope="col">Ср. общ.</th>

                    <th scope="col">Ср. последний рейс груж.</th>
                    <th scope="col">Ср. последний рейс порожн.</th>
                    <th scope="col">Ср. последний рейс общ.</th>

                    {form.param_detail && <th scope="col">Ср. масса.</th>}
                    {form.param_detail && (
                      <th scope="col">Ср. расстояние груж.</th>
                    )}
                    {form.param_detail && (
                      <th scope="col">Ср. расстояние порожн.</th>
                    )}
                    {form.param_detail && (
                      <th scope="col">Ср. расстояние общ.</th>
                    )}

                    {form.param_detail && (
                      <th scope="col">Ср. высота подъёма</th>
                    )}
                    {form.param_detail && (
                      <th scope="col">Ср. время движ. груж.</th>
                    )}
                    {form.param_detail && (
                      <th scope="col">Частый тип материала</th>
                    )}

                    <th scope="col">Комментарий по снижению</th>
                  </tr>
                </thead>
                <tbody>
                  {state.day.data.length < 1 ? (
                    <tr>
                      <td colSpan={5} className={"text-danger"}>
                        Данных не найдено.
                      </td>
                    </tr>
                  ) : (
                    state.day.data.map((item1: any, index1: number) => (
                      <tr key={index1}>
                        <td>{item1.veh_id}</td>
                        <td>{item1.fio}</td>

                        {form.param_detail && <td>{item1.trips_count}</td>}
                        <td>{item1.shov_id}</td>
                        {form.param_detail && (
                          <td>{item1.shov_id_trips_count}</td>
                        )}

                        <td>{item1.avg_speed_load}</td>
                        <td>{item1.avg_speed_empty}</td>
                        <td
                          className={
                            item1.avg_speed < form.param_target_speed
                              ? "fw-bold bg-danger text-white border border-1 border-danger"
                              : ""
                          }
                        >
                          {item1.avg_speed}
                        </td>

                        <td
                          className={
                            item1.avg_speed_load - item1.last_avg_speed_load >
                            0.5
                              ? "fw-bold text-danger"
                              : ""
                          }
                        >
                          {item1.last_avg_speed_load}
                        </td>
                        <td
                          className={
                            item1.avg_speed_empty - item1.last_avg_speed_empty >
                            0.5
                              ? "fw-bold text-danger"
                              : ""
                          }
                        >
                          {item1.last_avg_speed_empty}
                        </td>
                        <td
                          className={
                            item1.avg_speed - item1.last_avg_speed > 0.5
                              ? "fw-bold text-danger"
                              : ""
                          }
                        >
                          {item1.last_avg_speed}
                        </td>

                        {form.param_detail && <td>{item1.avg_weight}</td>}
                        {form.param_detail && <td>{item1.avg_length_load}</td>}
                        {form.param_detail && (
                          <td>{item1.avg_length_unload}</td>
                        )}
                        {form.param_detail && <td>{item1.avg_length}</td>}

                        {form.param_detail && <td>{item1.avg_height}</td>}
                        {form.param_detail && <td>{item1.avg_worktime}</td>}
                        {form.param_detail && <td>{item1.avg_worktype}</td>}

                        <td>{item1.comment_description}</td>
                      </tr>
                    ))
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
