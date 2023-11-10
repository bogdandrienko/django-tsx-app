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

  const slice = slices.events.eventsMonitoringDrainageStore;
  const store = hooks.useSelectorCustom1(slice);

  // TODO hooks //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();
  const [state, setState]: any = useState({});
  const [currentTime, setCurrentTime] = useState(utils.getCurrentDateTime());
  const [form, setForm] = useState({
    minVal: 180,
    timeDiff: 10,
    danger: false,
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
      title={"Мгновенные показатели: Мониторинг производительности водоотлива"}
      description={
        "Производительность и дата последней связи водоотлива (показания расходомера)"
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
          <span className={"m-1 p-1"}>
            Выберите минимальный уровень производительности:
          </span>
          <select
            value={form.minVal}
            onChange={(event) =>
              setForm({
                ...form,
                minVal: parseInt(event.target.value, 10),
              })
            }
            className="form-select form-select-sm"
          >
            <option value={30}>30</option>
            <option value={120}>120</option>
            <option value={150}>150</option>
            <option value={160}>160</option>
            <option value={170}>170</option>
            <option value={180}>180</option>
            <option value={210}>210</option>
            <option value={240}>240</option>
            <option value={270}>270</option>
            <option value={300}>300</option>
            <option value={330}>330</option>
            <option value={360}>360</option>
          </select>
          <span className={"m-1 p-1"}>Выберите разницу времени, минут:</span>
          <select
            value={form.timeDiff}
            onChange={(event) =>
              setForm({
                ...form,
                timeDiff: parseInt(event.target.value, 10),
              })
            }
            className="form-select form-select-sm"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={30}>30</option>
            <option value={60}>60</option>
            <option value={120}>120</option>
            <option value={1240}>1240</option>
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

      {/*TODO Таблица*/}
      <div className={"card m-0 p-0"}>
        {(store.fail === undefined || store.error === undefined) &&
        state &&
        state.data ? (
          <div>
            <div>
              {state.data.difval < form.minVal && (
                <div className={"display-1 text-center text-danger"}>
                  ВНИМАНИЕ ПРОИЗВОДИТЕЛЬНОСТЬ!
                </div>
              )}
            </div>
            <div className={"card col m-0 p-0"}>
              <div className={"card-header lead fw-bold m-0 p-0"}>
                <img
                  src={"/static/img/водоотлив.jpg"}
                  className={"p-1"}
                  height={"250"}
                  alt={"водоотлив"}
                />
              </div>
              <div className={"card-body m-0 p-0"}>
                <table className="table table-light table-hover table-striped m-0 p-0">
                  <thead>
                    <tr>
                      <th scope="col">Время: </th>
                      <th scope="col">Объём:</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        {utils.DateTime.getNormalTime(state.data.maxtime)}
                      </td>
                      <td>{state.data.maxfuel}</td>
                    </tr>
                    <tr>
                      <td>
                        {utils.DateTime.getNormalTime(state.data.mintime)}
                      </td>
                      <td>{state.data.minfuel}</td>
                    </tr>
                    <tr>
                      <td>
                        <hr />
                      </td>
                      <td>
                        <hr />
                      </td>
                    </tr>
                    <tr>
                      <td>Разница: {state.data.diffuel}</td>
                      <td>
                        Производительность:{" "}
                        {state.data.difval < form.minVal ? (
                          <span
                            className={
                              "text-danger lead fw-bold m-0 p-0 display-6"
                            }
                          >
                            {state.data.difval}
                          </span>
                        ) : state.data.difval - 20 < form.minVal ? (
                          <span
                            className={
                              "text-warning lead fw-bold m-0 p-0 display-6"
                            }
                          >
                            {state.data.difval}
                          </span>
                        ) : (
                          <span
                            className={
                              "text-success lead fw-bold m-0 p-0 display-6"
                            }
                          >
                            {state.data.difval}
                          </span>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
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
