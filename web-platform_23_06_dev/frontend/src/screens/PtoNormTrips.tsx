// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as base from "../components/ui/base";
import * as components from "../components/ui/components";
import * as hooks from "../components/hooks";
import * as slices from "../components/slices";
import * as utils from "../components/utils";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function Page(): JSX.Element {
  // TODO store ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const tripsReadListStore = hooks.useSelectorCustom1(
    slices.analyse.tripsReadListStore
  );

  // TODO hook /////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();
  const [monitoring, setMonitoring, resetMonitoring] = hooks.useStateCustom1(
    {}
  );
  const [currentTime, setCurrentTime, resetCurrentTime] = hooks.useStateCustom1(
    // @ts-ignore
    utils.getCurrentDateTime()
  );
  const [getterFormObj, setterFormObj] = useState({
    warningLevel: 100,
    dangerLevel: 90,
    targetAnalyse: "last_hour",
    filter: "Все",
    detail: false,
    highCorrect: "0",
    lengthCorrect: "0",
    weatherCorrect: "100",
    minLength: "1.0",
  });

  // TODO useEffect ////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    setCurrentTime(utils.getCurrentDateTime());
    dispatch(
      slices.analyse.tripsReadListStore.action({
        form: {
          highCorrect: getterFormObj.highCorrect,
          weatherCorrect: getterFormObj.weatherCorrect,
          lengthCorrect: getterFormObj.lengthCorrect,
          minLength: getterFormObj.minLength,
        },
      })
    );
    setTimeout(async () => {
      setCurrentTime(utils.getCurrentDateTime());
    }, 3000);
  }, [currentTime]);

  useEffect(() => {
    if (tripsReadListStore.data) {
      const data = tripsReadListStore.data.data;
      const trips = filterObjects(tripsReadListStore.data.trips);
      setMonitoring({ data: data, trips: trips });
    }
  }, [
    tripsReadListStore.data,
    getterFormObj.filter,
    getterFormObj.dangerLevel,
  ]);

  // useEffect(() => {
  //   console.log(tripsReadListStore);
  // }, [tripsReadListStore]);

  // useEffect(() => {
  //   console.log(monitoring);
  // }, [monitoring]);

  // TODO function /////////////////////////////////////////////////////////////////////////////////////////////////////

  // @ts-ignore
  function filterObjects(arr) {
    // console.log("before Arr: ", arr);
    let newArr = [];
    switch (getterFormObj.filter) {
      case "Все":
        // @ts-ignore
        newArr = arr;
        break;
      case "Опасный уровень":
        newArr = arr.filter(
          // @ts-ignore
          (item, index) => item.kpd <= getterFormObj.warningLevel
        );
        break;
      case getterFormObj.filter:
        newArr = arr.filter(
          // @ts-ignore
          (item, index) => item.shovid === getterFormObj.filter
        );
        break;
      default:
        newArr = arr;
        break;
    }
    // console.log("after Arr: ", newArr);
    return newArr;
  }

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <base.Base1
      title={"ПТО: Нормо-рейсы"}
      description={"Аналитика в реальном времени по КПД рейсов автосамосвалов"}
    >
      <div className={"lead tex-danger fw-bold display-6"}>
        {currentTime && currentTime.length > 0 && currentTime.split(" G")[0]}
      </div>

      <div className={"p-2"}>
        <components.Accordion1
          isCollapse={true}
          key_target={"Accordion#3"}
          title={"Подсказки"}
          text_style={"text-white"}
          header_style={"bg-success"}
          body_style={"bg-light"}
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
                            className={
                              "m-0 p-1 bg-warning bg-gradient text-dark"
                            }
                          >
                            {`последний рейс: кпд  % | время рейса мин.`}
                          </td>
                        </tr>
                        <tr>
                          <td
                            className={
                              "m-0 p-1 bg-danger bg-gradient text-white"
                            }
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
        </components.Accordion1>
      </div>
      <hr />
      <div className={"p-2"}>
        <components.Accordion1
          isCollapse={true}
          key_target={"Accordion#1"}
          title={"Настройка данных и отображения"}
          text_style={"text-white"}
          header_style={"bg-primary"}
          body_style={"bg-light"}
        >
          <div className="container bg-light border border-1 border-dark card">
            <h2 className="pb-2 border-bottom fw-bold">
              Фильтрация и настройки отображения:
            </h2>
            <div className="row row-cols-1 row-cols-lg-2">
              <div className="feature col">
                <h3 className="fs-4 text-body-emphasis">
                  Приоритет отображения:
                </h3>
                <p>
                  <select
                    onChange={(event) =>
                      setterFormObj({
                        ...getterFormObj,
                        targetAnalyse: event.target.value,
                      })
                    }
                    className="form-select form-select-lg mb-1"
                  >
                    <option value={"last_trip"}>последний рейс</option>
                    <option selected value={"last_hour"}>
                      последний час
                    </option>
                    <option value={"last_shift"}>вся смена</option>
                  </select>
                </p>
              </div>
              <div className="feature col">
                <h3 className="fs-4 text-body-emphasis">
                  Выберите "требуемый" уровень КПД (%):
                </h3>
                <p>
                  <select
                    onChange={(event) =>
                      setterFormObj({
                        ...getterFormObj,
                        // @ts-ignore
                        warningLevel: parseInt(event.target.value, 10),
                        dangerLevel: parseInt(event.target.value, 10) - 10,
                      })
                    }
                    className="form-select form-select-lg mb-1 w-50"
                  >
                    <option value={75}>75</option>
                    <option value={80}>80</option>
                    <option value={85}>85</option>
                    <option value={90}>90</option>
                    <option value={95}>95</option>
                    <option selected value={100}>
                      100
                    </option>
                    <option value={110}>110</option>
                    <option value={120}>120</option>
                  </select>
                </p>
              </div>
            </div>
            <div className="row row-cols-1 row-cols-lg-2">
              <div className="feature col bg-warning">
                <h3 className="fs-5 text-body-emphasis">
                  Коэффициент разницы высоты погрузки/разгрузки:
                </h3>
                <p>
                  <select
                    onChange={(event) =>
                      setterFormObj({
                        ...getterFormObj,
                        highCorrect: event.target.value,
                      })
                    }
                    className="form-select form-select-lg mb-1 w-75"
                  >
                    <option selected value={"0"}>
                      + 0 секунд за каждые 10 метров высоты
                    </option>
                    <option value={"1"}>
                      + 1 секунда за каждые 10 метров высоты
                    </option>
                    <option value={"5"}>
                      + 5 секунд за каждые 10 метров высоты
                    </option>
                    <option value={"10"}>
                      + 10 секунд за каждые 10 метров высоты
                    </option>
                    <option value={"15"}>
                      + 15 секунд за каждые 10 метров высоты
                    </option>
                    <option value={"20"}>
                      + 20 секунд за каждые 10 метров высоты
                    </option>
                    <option value={"25"}>
                      + 25 секунд за каждые 10 метров высоты
                    </option>
                    <option value={"30"}>
                      + 30 секунд за каждые 10 метров высоты
                    </option>
                  </select>
                </p>
              </div>
              <div className="feature col bg-warning">
                <h3 className="fs-5 text-body-emphasis">
                  Коэффициент манёвров:
                </h3>
                <p>
                  <select
                    onChange={(event) =>
                      setterFormObj({
                        ...getterFormObj,
                        lengthCorrect: event.target.value,
                      })
                    }
                    className="form-select form-select-lg mb-1 w-75"
                  >
                    <option selected value={"0"}>
                      + 0 секунд за каждые 100 метров пути
                    </option>
                    <option value={"1"}>
                      + 1 секунда за каждые 100 метров пути
                    </option>
                    <option value={"5"}>
                      + 5 секунд за каждые 100 метров пути
                    </option>
                    <option value={"10"}>
                      + 10 секунд за каждые 100 метров пути
                    </option>
                    <option value={"15"}>
                      + 15 секунд за каждые 100 метров пути
                    </option>
                    <option value={"20"}>
                      + 20 секунд за каждые 100 метров пути
                    </option>
                    <option value={"25"}>
                      + 25 секунд за каждые 100 метров пути
                    </option>
                    <option value={"30"}>
                      + 30 секунд за каждые 100 метров пути
                    </option>
                  </select>
                </p>
              </div>
              <div className="feature col bg-warning">
                <h3 className="fs-5 text-body-emphasis">Коэффициент погоды:</h3>
                <p>
                  <select
                    onChange={(event) =>
                      setterFormObj({
                        ...getterFormObj,
                        weatherCorrect: event.target.value,
                      })
                    }
                    className="form-select form-select-lg mb-1 w-50"
                  >
                    <option value={"80"}> 80%</option>
                    <option value={"85"}> 85%</option>
                    <option value={"90"}> 90%</option>
                    <option value={"95"}> 95%</option>
                    <option selected value={"100"}>
                      100% (идеально)
                    </option>
                  </select>
                </p>
              </div>
              <div className="feature col bg-warning">
                <h3 className="fs-5 text-body-emphasis">
                  Минимально учитываемое расстояние:
                </h3>
                <p>
                  <select
                    onChange={(event) =>
                      setterFormObj({
                        ...getterFormObj,
                        minLength: event.target.value,
                      })
                    }
                    className="form-select form-select-lg mb-1 w-50"
                  >
                    <option value={"0.0"}>0.0 км</option>
                    <option value={"0.25"}>0.25 км</option>
                    <option value={"0.5"}>0.5 км</option>
                    <option value={"0.75"}>0.75 км</option>
                    <option selected value={"1.0"}>
                      1.0 км
                    </option>
                    <option value={"1.25"}>1.25 км</option>
                    <option value={"1.5"}>1.5 км</option>
                    <option value={"1.75"}>1.75 км</option>
                    <option value={"2.0"}>2.0 км</option>
                    <option value={"3.0"}>3.0 км</option>
                  </select>
                </p>
              </div>
            </div>
            <div className="row row-cols-1 row-cols-lg-2">
              <div className="feature col">
                <h3 className="fs-4 text-body-emphasis">
                  Фильтрация вывода данных:
                </h3>
                <p>
                  <select
                    onChange={(event) =>
                      setterFormObj({
                        ...getterFormObj,
                        filter: event.target.value,
                      })
                    }
                    className="form-select form-select-lg mb-1"
                  >
                    <option selected value={"Все"}>
                      Все
                    </option>
                    <option value={"Опасный уровень"}>Опасный уровень</option>
                    <option value={"001"}>001 экскаватор</option>
                    <option value={"002"}>002 экскаватор</option>
                    <option value={"003"}>003 экскаватор</option>
                    <option value={"201"}>201 экскаватор</option>
                    <option value={"202"}>202 экскаватор</option>
                    <option value={"203"}>203 экскаватор</option>
                    <option value={"204"}>204 экскаватор</option>
                    <option value={"205"}>205 экскаватор</option>
                    <option value={"206"}>206 экскаватор</option>
                    <option value={"207"}>207 экскаватор</option>
                    <option value={"208"}>208 экскаватор</option>
                    <option value={"255"}>255 экскаватор</option>
                    <option value={"330"}>330 экскаватор</option>
                    <option value={"401"}>401 экскаватор</option>
                    <option value={"402"}>402 экскаватор</option>
                    <option value={"403"}>403 экскаватор</option>
                  </select>
                </p>
              </div>
              <div className="feature col">
                <h3 className="fs-4 text-body-emphasis">
                  Формат отображения рейсов:
                </h3>
                <p className={"text-center"}>
                  {getterFormObj.detail ? (
                    <button
                      onClick={() => {
                        setterFormObj({
                          ...getterFormObj,
                          detail: !getterFormObj.detail,
                        });
                      }}
                      className="btn btn-lg btn-primary"
                    >
                      включён детальный режим
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setterFormObj({
                          ...getterFormObj,
                          detail: !getterFormObj.detail,
                        });
                      }}
                      className="btn btn-lg btn-outline-primary"
                    >
                      включён упрощённый режим
                    </button>
                  )}
                </p>
              </div>
            </div>
          </div>
        </components.Accordion1>
      </div>
      <hr />
      <div className="row row-cols-4 row-cols-sm-2 row-cols-md-4 row-cols-lg-5 text-center m-0 p-0 text-center">
        {tripsReadListStore.fail === undefined &&
        tripsReadListStore.error === undefined &&
        monitoring &&
        monitoring.data &&
        monitoring.data.length > 0
          ? monitoring.data.map(
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
                      <div className={"m-0 p-0 w-75"}>
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
                                    item.ratings.last_hour.rating === 0
                                      ? "m-0 p-3 bg-secondary bg-gradient text-white"
                                      : item.ratings.last_hour.rating <=
                                        getterFormObj.dangerLevel
                                      ? "m-0 p-3 bg-danger bg-gradient text-white"
                                      : item.ratings.last_hour.rating <=
                                        getterFormObj.warningLevel
                                      ? "m-0 p-3 bg-warning bg-gradient text-dark"
                                      : "m-0 p-3 bg-success bg-gradient text-white"
                                  }
                                >
                                  {`${item.ratings.last_hour.count}р./час | ${item.ratings.last_hour.rating}%`}
                                </td>
                              ) : getterFormObj.targetAnalyse ===
                                "last_trip" ? (
                                <td
                                  className={
                                    item.ratings.last_trip.rating === 0
                                      ? "m-0 p-3 bg-secondary bg-gradient text-white"
                                      : item.ratings.last_trip.rating <=
                                        getterFormObj.dangerLevel
                                      ? "m-0 p-3 bg-danger bg-gradient text-white"
                                      : item.ratings.last_trip.rating <=
                                        getterFormObj.warningLevel
                                      ? "m-0 p-3 bg-warning bg-gradient text-dark"
                                      : "m-0 p-3 bg-success bg-gradient text-white"
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
                                        getterFormObj.dangerLevel
                                      ? "m-0 p-3 bg-danger bg-gradient text-white"
                                      : item.ratings.last_shift.rating <=
                                        getterFormObj.warningLevel
                                      ? "m-0 p-3 bg-warning bg-gradient text-dark"
                                      : "m-0 p-3 bg-success bg-gradient text-white"
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
                                      getterFormObj.dangerLevel
                                    ? "m-0 p-1 bg-danger bg-gradient text-white"
                                    : item.ratings.last_trip.rating <=
                                      getterFormObj.warningLevel
                                    ? "m-0 p-1 bg-warning bg-gradient text-dark"
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
                                      getterFormObj.dangerLevel
                                    ? "m-0 p-1 bg-danger bg-gradient text-white"
                                    : item.ratings.last_hour.rating <=
                                      getterFormObj.warningLevel
                                    ? "m-0 p-1 bg-warning bg-gradient text-dark"
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
                                      getterFormObj.dangerLevel
                                    ? "m-0 p-1 bg-danger bg-gradient text-white"
                                    : item.ratings.last_shift.rating <=
                                      getterFormObj.warningLevel
                                    ? "m-0 p-1 bg-warning bg-gradient text-dark"
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
              )
            )
          : "данных нет"}
      </div>
      <hr />
      <div className={"p-2"}>
        <components.Accordion1
          isCollapse={true}
          key_target={"Accordion#2"}
          title={"Рейсы"}
          text_style={"text-dark"}
          header_style={"bg-warning"}
          body_style={"bg-warning"}
        >
          {tripsReadListStore.fail === undefined &&
            tripsReadListStore.error === undefined &&
            monitoring &&
            monitoring.trips &&
            monitoring.trips.length > 0 && (
              <div className="row row-cols-sm-1 row-cols-3 row-cols-md-4 row-cols-lg-5 text-center m-0 p-0">
                <table className="table table-hover table-striped small">
                  <thead>
                    <tr className={"bg-light shadow"}>
                      <th scope="col">№</th>
                      <th scope="col">Время погрузки</th>
                      <th scope="col">Время разгрузки</th>
                      {getterFormObj.detail && <th scope="col">Детально</th>}
                      <th scope="col">Экскаватор</th>
                      <th scope="col">Самосвал</th>
                      <th scope="col">КПД</th>
                      <th scope="col">Место разгрузки</th>
                      <th scope="col">Тип материала</th>
                      <th scope="col">Время от погрузки до разгрузки</th>
                      <th scope="col">
                        Ожидаемое время на весь следующий рейс
                      </th>
                      <th scope="col">Вес</th>
                      {getterFormObj.detail && (
                        <th scope="col">Количество ковшей</th>
                      )}
                      <th scope="col">Средняя скорость</th>
                      <th scope="col">Расстояние от погрузки</th>
                      {getterFormObj.detail && (
                        <th scope="col">Расстояние от разгрузки</th>
                      )}
                      {getterFormObj.detail && (
                        <th scope="col">Высота погрузки</th>
                      )}
                      {getterFormObj.detail && (
                        <th scope="col">Высота разгрузки</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {monitoring &&
                    monitoring.trips &&
                    monitoring.trips.length > 0
                      ? monitoring.trips.map(
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
                              {getterFormObj.detail && <td>{item.detail}</td>}
                              <td>{item.shovid}</td>
                              <td>{item.vehid}</td>
                              <td className={"fw-bold"}>{item.kpd}</td>
                              <td>{item.unloadid}</td>
                              <td>{item.worktype}</td>
                              <td>
                                {item.movetime.split("T")[1].split("+")[0]}
                              </td>
                              <td>{item.promise}</td>
                              <td>{item.weigth}</td>
                              {getterFormObj.detail && (
                                <td>{item.bucketcount}</td>
                              )}
                              <td>{item.avspeed}</td>
                              <td>{item.length}</td>
                              {getterFormObj.detail && (
                                <td>{item.unloadlength}</td>
                              )}
                              {getterFormObj.detail && (
                                <td>{item.loadheight}</td>
                              )}
                              {getterFormObj.detail && (
                                <td>{item.unloadheight}</td>
                              )}
                            </tr>
                          )
                        )
                      : ""}
                  </tbody>
                </table>
              </div>
            )}
        </components.Accordion1>
      </div>
      {tripsReadListStore.fail && (
        <div className={"display-1 text-center text-danger"}>
          ВНИМАНИЕ СВЯЗЬ!
        </div>
      )}
      {tripsReadListStore.error && (
        <div className={"display-1 text-center text-danger"}>
          ВНИМАНИЕ СВЯЗЬ!
        </div>
      )}
    </base.Base1>
  );
}
