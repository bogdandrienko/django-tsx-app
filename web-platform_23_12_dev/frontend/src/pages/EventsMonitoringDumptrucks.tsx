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

  const slice = slices.events.eventsMonitoringDumptrucksStore;
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
      title={"Мгновенные показатели: Автосамосвалы"}
      description={
        "Сообщения с автосамосвалов (масса, скорость, время, координаты)"
      }
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

      {/*TODO Таблица*/}
      <div className={"card m-0 p-0"}>
        {(store.fail === undefined || store.error === undefined) &&
        state &&
        state.data ? (
          <components.Accordion2
            isCollapse={false}
            keyTarget={"Accordion#1"}
            headerClassName={"bg-warning-custom-1"}
            title={"Показатели"}
            titleTextClassName={"text-dark"}
            bodyClassName={"text-bg-light small"}
          >
            <div className="row row-cols-4 row-cols-sm-1 row-cols-md-5 row-cols-lg-6 text-center m-0 p-0">
              {state.data.map((item: any, index: number) => (
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
              ))}
            </div>
          </components.Accordion2>
        ) : (
          <div
            className={
              "display-1 text-bg-light text-center text-danger shadow my-1"
            }
          >
            ДАННЫХ НЕТ!
          </div>
        )}
      </div>
    </base.Base2>
  );
}
