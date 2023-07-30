// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as base from "../components/ui/bases";
import * as components from "../components/ui/components";
import * as hooks from "../components/hooks";
import * as slices from "../components/slices";
import * as utils from "../components/utils";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function Page(): JSX.Element {
  // TODO store ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const operstoppagesListStore = hooks.useSelectorCustom1(
    slices.analyse.operstoppagesListStore
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
      slices.analyse.operstoppagesListStore.action({
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
    if (operstoppagesListStore.data) {
      const data = operstoppagesListStore.data.data;
      const trips = filterObjects(operstoppagesListStore.data.trips);
      setMonitoring({ data: data, trips: trips });
    }
  }, [
    operstoppagesListStore.data,
    getterFormObj.filter,
    getterFormObj.dangerLevel,
  ]);

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
      title={"ПТО: Оперативный контроль простоев"}
      description={
        "Оперативный контроль длящихся простоев и ожидания под погрузку"
      }
    >
      <div className={"lead tex-danger fw-bold display-6"}>
        {currentTime && currentTime.length > 0 && currentTime.split(" G")[0]}
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
            ...
          </div>
        </components.Accordion1>
      </div>

      <hr />

      <div className={"p-2"}>
        <components.Accordion1
          isCollapse={false}
          key_target={"Accordion#2"}
          title={"Рейсы"}
          text_style={"text-white"}
          header_style={"bg-success"}
          body_style={"bg-light"}
        >
          {operstoppagesListStore.fail === undefined &&
            operstoppagesListStore.error === undefined &&
            monitoring &&
            monitoring.data &&
            monitoring.data.length > 0 && (
              <div className="row row-cols-sm-1 row-cols-3 row-cols-md-4 row-cols-lg-5 text-center m-0 p-0">
                <table className="table table-hover table-striped small">
                  <thead>
                    <tr className={"bg-light shadow"}>
                      <th scope="col">№</th>
                      <th scope="col">Самосвал</th>
                      <th scope="col">Время начала</th>
                      <th scope="col">Время окончания</th>
                      <th scope="col">Длительность, минут</th>
                      <th scope="col">Тип</th>
                      <th scope="col">Описание</th>
                      <th scope="col">Запланирован или нет</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monitoring && monitoring.data && monitoring.data.length > 0
                      ? monitoring.data.map(
                          // @ts-ignore
                          (item, index) => (
                            <tr
                              className={
                                item.type === "длящийся"
                                  ? "m-0 p-1 bg-warning bg-gradient"
                                  : "m-0 p-1 bg-light bg-gradient"
                              }
                              key={index}
                            >
                              <th># {index + 1}</th>
                              <td>{item.vehid}</td>
                              <td>{item.timestop}</td>
                              <td>{item.timego}</td>
                              <td className={"fw-bold"}>{item.continious}</td>
                              <td>{item.type}</td>
                              <td>{item.description}</td>
                              <td>{item.planned}</td>
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
      {operstoppagesListStore.fail && (
        <div className={"display-1 text-center text-danger"}>
          ВНИМАНИЕ СВЯЗЬ!
        </div>
      )}
      {operstoppagesListStore.error && (
        <div className={"display-1 text-center text-danger"}>
          ВНИМАНИЕ СВЯЗЬ!
        </div>
      )}
    </base.Base1>
  );
}
