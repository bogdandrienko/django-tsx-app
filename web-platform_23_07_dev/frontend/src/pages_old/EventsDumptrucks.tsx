// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect } from "react";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as base from "../components/ui/bases";
import * as hooks from "../components/hooks";
import * as slices from "../components/slices";
import * as utils from "../components/utils";
import { useDispatch } from "react-redux";
import * as constants from "../components/constants";
import * as components from "../components/ui/components";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function Page(): JSX.Element {
  // TODO store ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dumptrucksReadListStore = hooks.useSelectorCustom1(
    slices.events.dumptrucksReadListStore
  );

  // TODO hook /////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();
  const [monitoring, setMonitoring, resetMonitoring] = hooks.useStateCustom1(
    []
  );
  const [currentTime, setCurrentTime, resetCurrentTime] = hooks.useStateCustom1(
    utils.getCurrentDateTime()
  );

  // TODO useEffect ////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    dispatch(slices.events.dumptrucksReadListStore.action({}));
    setTimeout(async () => {
      setCurrentTime(utils.getCurrentDateTime());
    }, 5000);
  }, [currentTime]);

  useEffect(() => {
    if (dumptrucksReadListStore.data) {
      setMonitoring(dumptrucksReadListStore.data);
    }
  }, [dumptrucksReadListStore.data]);

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <base.Base1
      title={"Показатели: Автосамосвалы"}
      description={
        "Сообщения с автосамосвалов (масса, скорость, время, координаты)"
      }
    >
      <div className={"lead fw-bold mb-1 d-flex"}>
        <div className={"container display-6 shadow w-75"}>
          {currentTime && currentTime.length > 0
            ? currentTime
            : "--.--.---- --:--:--"}
        </div>
        <div className={"w-25"}>
          <components.StatusStore1
            slice={slices.events.dumptrucksReadListStore}
            consoleLog={constants.DEBUG_CONSTANT}
            showData={false}
          />
        </div>
      </div>
      {dumptrucksReadListStore.fail && (
        <div className={"display-1 text-center text-danger shadow my-1 mb-1"}>
          ВНИМАНИЕ СВЯЗЬ!
        </div>
      )}
      {dumptrucksReadListStore.error && (
        <div className={"display-1 text-center text-danger shadow my-1 mb-1"}>
          ВНИМАНИЕ СВЯЗЬ!
        </div>
      )}
      <div>
        {dumptrucksReadListStore.fail === undefined &&
        dumptrucksReadListStore.error === undefined &&
        monitoring &&
        monitoring.data &&
        monitoring.data.length > 0 ? (
          <div className="row row-cols-4 row-cols-sm-1 row-cols-md-5 row-cols-lg-6 text-center m-0 p-0">
            {monitoring.data.map(
              // @ts-ignore
              (item, index) => (
                <div
                  key={index}
                  className={"card col border border-1 border-dark m-0 p-0"}
                >
                  <div className={"card-header lead fw-bold m-0 p-0"}>
                    #{item.vehid}
                    <img
                      src={"/static/img/dumptruck2.png"}
                      className={"p-1"}
                      height={"50"}
                      alt={"img"}
                    />
                  </div>
                  <div className={"card-body m-0 p-0"}>
                    <table className="table table-light table-hover table-striped m-0 p-0">
                      <thead>
                        <tr>
                          <th scope="col">Скорость</th>
                          <th scope="col">Вес</th>
                          <th scope="col">Топливо</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            {item.speed > 25 ? (
                              <span className={"text-danger m-0 p-0"}>
                                {item.speed}
                              </span>
                            ) : item.speed < 15 && item.speed > 0 ? (
                              <span className={"text-warning m-0 p-0"}>
                                {item.speed}
                              </span>
                            ) : (
                              <span className={"text-secondary m-0 p-0"}>
                                {item.speed}
                              </span>
                            )}
                          </td>
                          <td>
                            {item.weight > 92 ? (
                              <span className={"text-danger m-0 p-0"}>
                                {item.weight}
                              </span>
                            ) : item.weight < 80 && item.weight > 2 ? (
                              <span className={"text-warning m-0 p-0"}>
                                {item.weight}
                              </span>
                            ) : (
                              <span className={"text-secondary m-0 p-0"}>
                                {item.weight}
                              </span>
                            )}
                          </td>
                          <td>
                            {item.fuel > 500 ? (
                              <span className={"text-success m-0 p-0"}>
                                {item.fuel}
                              </span>
                            ) : item.fuel < 200 && item.fuel > 50 ? (
                              <span className={"text-warning m-0 p-0"}>
                                {item.fuel}
                              </span>
                            ) : (
                              <span className={"text-secondary m-0 p-0"}>
                                {item.fuel}
                              </span>
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className={"card-footer text-end m-0 p-1"}>
                    {item.time.split("T")[0]}{" "}
                    {item.time.split("T")[1].split("+")[0]}
                  </div>
                </div>
              )
            )}
          </div>
        ) : (
          <div className={"display-1 text-center text-danger shadow my-1 mb-1"}>
            ДАННЫХ НЕТ!
          </div>
        )}
      </div>
    </base.Base1>
  );
}
