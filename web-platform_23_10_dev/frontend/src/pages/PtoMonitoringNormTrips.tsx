// TODO download modules /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// TODO custom modules ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import * as base from "../components/ui/bases";
import * as components from "../components/ui/components";
import * as constants from "../components/constants";
import * as utils from "../components/utils";
import * as hooks from "../components/hooks";
import * as slices from "../components/slices";

// TODO export ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function Page(): JSX.Element {
  // TODO stores /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const slice = slices.pto.ptoMonitoringNormTripsStore;
  const store = hooks.useSelectorCustom1(slice);

  // TODO hooks //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();
  const [state, setState]: any = useState([]);
  const [currentTime, setCurrentTime] = useState(utils.getCurrentDateTime());
  const [form, setForm] = useState({
    param_warning_level: 100,
    param_danger_level: 90,
    param_target_analyse: "last_hour",
    param_filter: "Все",
    param_detail: false,
    param_high_correct: 0,
    param_length_correct: 0,
    param_weather_correct: 100,
    param_min_length: 0.75,
  });

  // TODO useEffects /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    setCurrentTime(utils.getCurrentDateTime());
    dispatch(slice.action({ form: { ...form } }));
    setTimeout(async () => {
      setCurrentTime(utils.getCurrentDateTime());
    }, 10000);
  }, [currentTime]);

  useEffect(() => {
    if (store.data) {
      setState({
        data: store.data.data,
        trips: filterObjects(store.data.trips),
      });
    }
  }, [store.data, form.param_filter, form.param_danger_level]);

  // TODO functions //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function filterObjects(arr: any) {
    switch (form.param_filter) {
      case "Все":
        return arr;
      case "Опасный уровень":
        return arr.filter((item: any) => item.kpd <= form.param_warning_level);
      case form.param_filter:
        return arr.filter((item: any) => item.shovid === form.param_filter);
      default:
        return arr;
    }
  }

  // TODO return /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <base.Base2
      title={"ПТО: Мониторинг нормо-рейсов автосамосвалов"}
      description={"Мониторинг в реальном по КПД рейсов автосамосвалов"}
    >
      {/*TODO Настройки*/}
      <components.Accordion2
        isCollapse={true}
        keyTarget={"Accordion#1"}
        headerClassName={"bg-primary-custom-1"}
        title={"Настройка данных и отображения"}
        titleTextClassName={"text-white"}
        bodyClassName={"text-bg-light small"}
      >
        <div className={"input-group w-100 shadow p-3"}>
          <span className={"m-1 p-1"}>Приоритет отображения:</span>
          <select
            value={form.param_target_analyse}
            onChange={(event) =>
              setForm({
                ...form,
                param_target_analyse: event.target.value,
              })
            }
            className="form-select form-select-sm"
          >
            <option value={"last_trip"}>последний рейс</option>
            <option value={"last_hour"}>последний час</option>
            <option value={"last_shift"}>вся смена</option>
          </select>
          <span className={"m-1 p-1"}>
            Выберите "требуемый" уровень КПД (%):
          </span>
          <select
            value={form.param_warning_level}
            onChange={(event) =>
              setForm({
                ...form,
                param_warning_level: utils.Converting.parseInt(
                  event.target.value,
                  10
                ),
                param_danger_level:
                  utils.Converting.parseInt(event.target.value, 10) - 10,
              })
            }
            className="form-select form-select-sm"
          >
            <option value={85}>85</option>
            <option value={90}>90</option>
            <option value={95}>95</option>
            <option value={100}>100</option>
            <option value={105}>105</option>
            <option value={110}>110</option>
            <option value={115}>115</option>
          </select>
        </div>
        <div className={"input-group w-100 shadow p-3"}>
          <span className={"m-1 p-1"}>
            Коэффициент разницы высоты погрузки/разгрузки:
          </span>
          <select
            value={form.param_high_correct}
            onChange={(event) =>
              setForm({
                ...form,
                param_high_correct: utils.Converting.parseInt(
                  event.target.value,
                  10
                ),
              })
            }
            className="form-select form-select-sm"
          >
            <option value={-10}>- 10 секунд за каждые 10 метров высоты</option>
            <option value={0}>+ 0 секунд за каждые 10 метров высоты</option>
            <option value={1}>+ 1 секунда за каждые 10 метров высоты</option>
            <option value={5}>+ 5 секунд за каждые 10 метров высоты</option>
            <option value={10}>+ 10 секунд за каждые 10 метров высоты</option>
            <option value={15}>+ 15 секунд за каждые 10 метров высоты</option>
          </select>
          <span className={"m-1 p-1"}>Коэффициент манёвров:</span>
          <select
            value={form.param_length_correct}
            onChange={(event) =>
              setForm({
                ...form,
                param_length_correct: utils.Converting.parseInt(
                  event.target.value,
                  10
                ),
              })
            }
            className="form-select form-select-sm"
          >
            <option value={-10}>- 10 секунд за каждые 100 метров пути</option>
            <option value={0}>+ 0 секунд за каждые 100 метров пути</option>
            <option value={1}>+ 1 секунда за каждые 100 метров пути</option>
            <option value={5}>+ 5 секунд за каждые 100 метров пути</option>
            <option value={10}>+ 10 секунд за каждые 100 метров пути</option>
            <option value={15}>+ 15 секунд за каждые 100 метров пути</option>
          </select>
        </div>
        <div className={"input-group w-100 shadow p-3"}>
          <span className={"m-1 p-1"}>Коэффициент погоды:</span>
          <select
            value={form.param_weather_correct}
            onChange={(event) =>
              setForm({
                ...form,
                param_weather_correct: utils.Converting.parseInt(
                  event.target.value,
                  10
                ),
              })
            }
            className="form-select form-select-sm"
          >
            <option value={80}> 80%</option>
            <option value={85}> 85%</option>
            <option value={90}> 90%</option>
            <option value={95}> 95%</option>
            <option value={100}>100% (идеально)</option>
          </select>
          <span className={"m-1 p-1"}>Минимально учитываемое расстояние:</span>
          <select
            value={form.param_min_length}
            onChange={(event) =>
              setForm({
                ...form,
                param_min_length: utils.Converting.parseFloat(
                  event.target.value
                ),
              })
            }
            className="form-select form-select-sm"
          >
            <option value={0.0}>Все расстояния</option>
            <option value={0.25}>0.25 км</option>
            <option value={0.5}>0.5 км</option>
            <option value={0.75}>0.75 км</option>
            <option value={1.0}>1 км</option>
            <option value={1.5}>1.5 км</option>
            <option value={2.0}>2 км</option>
            <option value={2.5}>2.5 км</option>
            <option value={3.0}>3 км</option>
            <option value={3.5}>3.5 км</option>
            <option value={4.0}>4 км</option>
          </select>
        </div>
        <div className={"input-group w-100 shadow p-3"}>
          <span className={"m-1 p-1"}>Фильтрация вывода данных:</span>
          <select
            value={form.param_filter}
            onChange={(event) =>
              setForm({
                ...form,
                param_filter: event.target.value,
              })
            }
            className="form-select form-select-sm"
          >
            <option value={"Все"}>Отключить фильтрацию (Все)</option>
            <option value={"Опасный уровень"}>
              Показывать только "плохие" рейсы
            </option>
            {utils.getAllShovels(["330", "Неопр."]).map((tech) => (
              <option key={tech.tech} value={tech.tech}>
                {tech.tech} {tech.type}
              </option>
            ))}
          </select>
          <span className={"m-1 p-1"}>Формат отображения рейсов:</span>
          <div className="form-control form-control-sm">
            {form.param_detail ? (
              <button
                onClick={() => {
                  setForm({
                    ...form,
                    param_detail: !form.param_detail,
                  });
                }}
                className="btn btn-sm btn-primary w-100"
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
                className="btn btn-sm btn-outline-primary w-100"
              >
                включён упрощённый режим
              </button>
            )}
          </div>
        </div>
      </components.Accordion2>

      <hr className={"m-3 p-0"} />

      {/*TODO Легенда*/}
      <components.Accordion2
        isCollapse={true}
        keyTarget={"Accordion#2"}
        headerClassName={"bg-success-custom-1"}
        title={"Подсказки"}
        titleTextClassName={"text-white"}
        bodyClassName={"text-bg-light small"}
      >
        <div className="row row-cols-4 row-cols-sm-2 row-cols-md-5 row-cols-lg-6 text-center m-0 p-0 text-center">
          <div
            className={
              "card col border border-1 border-dark m-0 p-0 small w-50"
            }
          >
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
                            "m-0 p-1 bg-success-custom-1 bg-gradient text-white"
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
                          className={
                            "m-0 p-1 bg-warning-custom-1 bg-gradient text-dark"
                          }
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
          <div
            className={
              "card col border border-1 border-dark m-0 p-0 small w-50"
            }
          >
            <div className={"card-header"}>Формула расчёта:</div>
            <div className={"card-body"}>
              (("Плечо откатки" / "Ср. скорость гружённый") * 60) * "Состояние
              самосвала, %" * "Погода, %" = <br /> "НОРМА"
            </div>
            <div className={"card-footer"}>
              округлить(("Время движения" / "НОРМА") * 100) = <br /> "КПД"
            </div>
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

      {/*TODO Показатели*/}
      <components.Accordion2
        isCollapse={false}
        keyTarget={"Accordion#3"}
        headerClassName={"bg-warning-custom-1"}
        title={"Показатели"}
        titleTextClassName={"text-dark"}
        bodyClassName={"text-bg-light small"}
      >
        {state && state.data && (
          <div className="row row-cols-4 row-cols-sm-2 row-cols-md-4 row-cols-lg-6 m-0 p-0 text-center">
            {state.data.map((item: any) => (
              <div
                key={item.tech_id}
                className={"card col border border-1 border-dark m-0 p-0 small"}
              >
                <div className={"card-body"}>
                  <div className={"d-flex w-100"}>
                    <div className={"m-0 p-0 w-75"}>
                      <div className={"m-0 p-0 display-6 fw-bold"}>
                        {item.tech_id}
                      </div>
                      <hr className={"m-0 p-0"} />
                      <table className="table table-light table-hover m-0 p-0">
                        <tbody>
                          <tr>
                            {form.param_target_analyse === "last_hour" ? (
                              <td
                                className={
                                  item.ratings.last_hour.rating === 0
                                    ? "m-0 p-3 bg-secondary bg-gradient text-white"
                                    : item.ratings.last_hour.rating <=
                                      form.param_danger_level
                                    ? "m-0 p-3 bg-danger bg-gradient text-white"
                                    : item.ratings.last_hour.rating <=
                                      form.param_warning_level
                                    ? "m-0 p-3 bg-warning-custom-1 bg-gradient text-dark"
                                    : "m-0 p-3 bg-success-custom-1 bg-gradient text-white"
                                }
                              >
                                {`${item.ratings.last_hour.count}р./час | ${item.ratings.last_hour.rating}%`}
                              </td>
                            ) : form.param_target_analyse === "last_trip" ? (
                              <td
                                className={
                                  item.ratings.last_trip.rating === 0
                                    ? "m-0 p-3 bg-secondary bg-gradient text-white"
                                    : item.ratings.last_trip.rating <=
                                      form.param_danger_level
                                    ? "m-0 p-3 bg-danger bg-gradient text-white"
                                    : item.ratings.last_trip.rating <=
                                      form.param_warning_level
                                    ? "m-0 p-3 bg-warning-custom-1 bg-gradient text-dark"
                                    : "m-0 p-3 bg-success-custom-1 bg-gradient text-white"
                                }
                              >
                                {`${item.ratings.last_trip.count}минут/последний | ${item.ratings.last_trip.rating}%`}
                              </td>
                            ) : (
                              <td
                                className={
                                  item.ratings.last_shift.rating === 0
                                    ? "m-0 p-3 bg-secondary bg-gradient text-white"
                                    : item.ratings.last_shift.rating <=
                                      form.param_danger_level
                                    ? "m-0 p-3 bg-danger bg-gradient text-white"
                                    : item.ratings.last_shift.rating <=
                                      form.param_warning_level
                                    ? "m-0 p-3 bg-warning-custom-1 bg-gradient text-dark"
                                    : "m-0 p-3 bg-success-custom-1 bg-gradient text-white"
                                }
                              >
                                {`${item.ratings.last_shift.count}р./смену | ${item.ratings.last_shift.rating}%`}
                              </td>
                            )}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className={"m-1 p-0 small"}>
                      <table className="table table-light table-hover m-0 p-0">
                        <tbody>
                          <tr>
                            <td
                              className={
                                item.ratings.last_trip.rating === 0
                                  ? "m-0 p-1 bg-secondary bg-gradient text-white"
                                  : item.ratings.last_trip.rating <=
                                    form.param_danger_level
                                  ? "m-0 p-1 bg-danger bg-gradient text-white"
                                  : item.ratings.last_trip.rating <=
                                    form.param_warning_level
                                  ? "m-0 p-1 bg-warning-custom-1 bg-gradient text-dark"
                                  : "m-0 p-1 bg-light bg-gradient text-dark"
                              }
                            >
                              {`${item.ratings.last_trip.count}минут/последний | ${item.ratings.last_trip.rating}%`}
                            </td>
                          </tr>
                          <tr>
                            <td
                              className={
                                item.ratings.last_hour.rating === 0
                                  ? "m-0 p-1 bg-secondary bg-gradient text-white"
                                  : item.ratings.last_hour.rating <=
                                    form.param_danger_level
                                  ? "m-0 p-1 bg-danger bg-gradient text-white"
                                  : item.ratings.last_hour.rating <=
                                    form.param_warning_level
                                  ? "m-0 p-1 bg-warning-custom-1 bg-gradient text-dark"
                                  : "m-0 p-1 bg-light bg-gradient text-dark"
                              }
                            >
                              {`${item.ratings.last_hour.count}р./час | ${item.ratings.last_hour.rating}%`}
                            </td>
                          </tr>
                          <tr>
                            <td
                              className={
                                item.ratings.last_shift.rating === 0
                                  ? "m-0 p-1 bg-secondary bg-gradient text-white"
                                  : item.ratings.last_shift.rating <=
                                    form.param_danger_level
                                  ? "m-0 p-1 bg-danger bg-gradient text-white"
                                  : item.ratings.last_shift.rating <=
                                    form.param_warning_level
                                  ? "m-0 p-1 bg-warning-custom-1 bg-gradient text-dark"
                                  : "m-0 p-1 bg-light bg-gradient text-dark"
                              }
                            >
                              {`${item.ratings.last_shift.count}р./смену | ${item.ratings.last_shift.rating}%`}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </components.Accordion2>

      <hr className={"m-3 p-0"} />

      {/*TODO Таблица*/}
      <components.Accordion2
        isCollapse={true}
        keyTarget={"Accordion#4"}
        headerClassName={"bg-danger"}
        title={"Таблица с рейсами"}
        titleTextClassName={"text-white"}
        bodyClassName={"text-bg-light small"}
      >
        <table className="small table table-light table-hover m-0 p-0">
          <thead>
            {form.param_detail ? (
              <tr className={"bg-light shadow"}>
                <th scope="col">№</th>
                <th scope="col">Время погрузки</th>
                <th scope="col">Время разгрузки</th>
                <th scope="col">Детально</th>
                <th scope="col">Экскаватор</th>
                <th scope="col">Самосвал</th>
                <th scope="col">КПД</th>
                <th scope="col">Место разгрузки</th>
                <th scope="col">Тип материала</th>
                <th scope="col">Время от погрузки до разгрузки</th>
                <th scope="col">Ожидаемое время на весь следующий рейс</th>
                <th scope="col">Вес</th>
                <th scope="col">Количество ковшей</th>
                <th scope="col">Средняя скорость</th>
                <th scope="col">Расстояние от погрузки</th>
                <th scope="col">Расстояние от разгрузки</th>
                <th scope="col">Высота погрузки</th>
                <th scope="col">Высота разгрузки</th>
              </tr>
            ) : (
              <tr className={"bg-light shadow"}>
                <th scope="col">№</th>
                <th scope="col">Время погрузки</th>
                <th scope="col">Время разгрузки</th>
                <th scope="col">Экскаватор</th>
                <th scope="col">Самосвал</th>
                <th scope="col">КПД</th>
                <th scope="col">Место разгрузки</th>
                <th scope="col">Тип материала</th>
                <th scope="col">Время от погрузки до разгрузки</th>
                <th scope="col">Ожидаемое время на весь следующий рейс</th>
                <th scope="col">Вес</th>
                <th scope="col">Средняя скорость</th>
                <th scope="col">Расстояние от погрузки</th>
              </tr>
            )}
          </thead>
          <tbody>
            {state && state.trips && state.trips.length > 0 ? (
              state.trips.map((item: any, index: number) =>
                form.param_detail ? (
                  <tr
                    className={
                      item.kpd <= form.param_danger_level
                        ? "m-0 p-1 bg-danger bg-gradient text-white"
                        : item.kpd <= form.param_warning_level
                        ? "m-0 p-1 bg-warning-custom-1 bg-gradient text-white"
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
                    <td>{item.detail}</td>
                    <td>{item.shovid}</td>
                    <td>{item.vehid}</td>
                    <td className={"fw-bold"}>{item.kpd}</td>
                    <td>{item.unloadid}</td>
                    <td>{item.worktype}</td>
                    <td>{item.movetime.split("T")[1].split("+")[0]}</td>
                    <td>{item.promise}</td>
                    <td>{item.weigth}</td>
                    <td>{item.bucketcount}</td>
                    <td>{item.avspeed}</td>
                    <td>{item.length}</td>
                    <td>{item.unloadlength}</td>
                    <td>{item.loadheight}</td>
                    <td>{item.unloadheight}</td>
                  </tr>
                ) : (
                  <tr
                    className={
                      item.kpd <= form.param_danger_level
                        ? "m-0 p-1 bg-danger bg-gradient text-white"
                        : item.kpd <= form.param_warning_level
                        ? "m-0 p-1 bg-warning-custom-1 bg-gradient text-white"
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
                    <td>{item.shovid}</td>
                    <td>{item.vehid}</td>
                    <td className={"fw-bold"}>{item.kpd}</td>
                    <td>{item.unloadid}</td>
                    <td>{item.worktype}</td>
                    <td>{item.movetime.split("T")[1].split("+")[0]}</td>
                    <td>{item.promise}</td>
                    <td>{item.weigth}</td>
                    <td>{item.avspeed}</td>
                    <td>{item.length}</td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td colSpan={5} className={"text-danger"}>
                  Данных не найдено.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </components.Accordion2>
    </base.Base2>
  );
}
