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

  const slice = slices.pto.ptoMonitoringOperStoppagesStore;
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
    }, 5000);
  }, [currentTime]);

  useEffect(() => {
    if (store.data) {
      setState(store.data);
    }
  }, [store.data]);

  // TODO return /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <base.Base2
      title={"Отчёт по ошибкам в АСД"}
      description={"Отчёт по ошибкам в АСД за выбранный период"}
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
            title={"Таблица с значениями"}
            titleTextClassName={"text-dark"}
            bodyClassName={"text-bg-light small"}
          >
            <table className="small table table-light table-hover m-0 p-0">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Хоз.номер</th>
                  <th scope="col">Время начала</th>
                  <th scope="col">Время окончания</th>
                  <th scope="col">Длительность</th>
                  <th scope="col">Тип</th>
                  <th scope="col">Описание</th>
                  <th scope="col">Запланирован</th>
                </tr>
              </thead>
              <tbody>
                {state.data.length < 1 ? (
                  <tr>
                    <td colSpan={5} className={"text-danger"}>
                      Данных не найдено.
                    </td>
                  </tr>
                ) : (
                  state.data.map((item: any, index: number) => (
                    <tr
                      key={index}
                      className={
                        item.type === "длящийся" ? "bg-warning-custom-1" : ""
                      }
                    >
                      <td># {index + 1}</td>
                      <td>{item.veh_id}</td>
                      <td>{item.timestop}</td>
                      <td>{item.timego}</td>
                      <td>{item.continious}</td>
                      <td>{item.type}</td>
                      <td>{item.description}</td>
                      <td>{item.planned}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
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
