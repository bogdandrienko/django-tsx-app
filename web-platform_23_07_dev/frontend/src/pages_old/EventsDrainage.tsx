// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect } from "react";
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
  // TODO store ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const drainageReadListStore = hooks.useSelectorCustom1(
    slices.events.drainageReadListStore
  );

  // TODO hook /////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();
  const [monitoring, setMonitoring, resetMonitoring] = hooks.useStateCustom1(
    {}
  );
  const [currentTime, setCurrentTime, resetCurrentTime] = hooks.useStateCustom1(
    utils.getCurrentDateTime()
  );
  const [getterFormObj, setterFormObj, resetterFormObj] = hooks.useStateCustom1(
    {
      minVal: 180,
      timeDiff: 10,
      danger: false,
    }
  );

  // TODO useEffect ////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    dispatch(
      slices.events.drainageReadListStore.action({
        form: { ...getterFormObj },
      })
    );
    setTimeout(async () => {
      setCurrentTime(utils.getCurrentDateTime());
    }, 10000);
  }, [currentTime]);

  useEffect(() => {
    if (drainageReadListStore.data) {
      setMonitoring(drainageReadListStore.data);
    }
  }, [drainageReadListStore.data]);

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <base.Base1
      title={"Показатели: Водоотлив"}
      description={
        "Производительность и дата последней связи водоотлива (показания расходомера)"
      }
    >
      <div className={"mb-2"}>
        <components.Accordion1
          isCollapse={true}
          key_target={"Accordion#1"}
          title={"Настройка данных и отображения"}
          text_style={"text-white"}
          header_style={"bg-primary"}
          body_style={"bg-light"}
        >
          <div className={"input-group w-100 bg-light p-3 my-2 mb-2"}>
            <span className={"w-25"}>
              Выберите минимальный уровень производительности:{" "}
            </span>
            <select
              onChange={(event) =>
                setterFormObj({
                  ...getterFormObj,
                  minVal: parseInt(event.target.value, 10),
                })
              }
              className="form-select w-25 form-select-lg"
            >
              <option value={30}>30</option>
              <option value={120}>120</option>
              <option value={150}>150</option>
              <option value={160}>160</option>
              <option value={170}>170</option>
              <option selected value={180}>
                180
              </option>
              <option value={210}>210</option>
              <option value={240}>240</option>
              <option value={270}>270</option>
              <option value={300}>300</option>
              <option value={330}>330</option>
              <option value={360}>360</option>
            </select>
            <span className={"w-25"}>Выберите разницу времени, минут: </span>
            <select
              onChange={(event) =>
                setterFormObj({
                  ...getterFormObj,
                  timeDiff: parseInt(event.target.value, 10),
                })
              }
              className="form-select w-25 form-select-lg"
            >
              <option value={5}>5</option>
              <option selected value={10}>
                10
              </option>
              <option value={15}>15</option>
              <option value={30}>30</option>
              <option value={60}>60</option>
              <option value={120}>120</option>
              <option value={1240}>1240</option>
            </select>
          </div>
        </components.Accordion1>
      </div>
      <div className={"lead fw-bold mb-1 d-flex"}>
        <div className={"container display-6 shadow w-75"}>
          {currentTime && currentTime.length > 0
            ? currentTime
            : "--.--.---- --:--:--"}
        </div>
        <div className={"w-25"}>
          <components.StatusStore1
            slice={slices.events.drainageReadListStore}
            consoleLog={constants.DEBUG_CONSTANT}
            showData={false}
          />
        </div>
      </div>
      {drainageReadListStore.fail && (
        <div className={"display-1 text-center text-danger shadow my-1 mb-1"}>
          ВНИМАНИЕ СВЯЗЬ!
        </div>
      )}
      {drainageReadListStore.error && (
        <div className={"display-1 text-center text-danger shadow my-1 mb-1"}>
          ВНИМАНИЕ СВЯЗЬ!
        </div>
      )}
      <div className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-1 text-center m-0 p-0">
        {drainageReadListStore.fail === undefined &&
        drainageReadListStore.error === undefined &&
        monitoring &&
        monitoring.data ? (
          <div className={"m-0 p-0"}>
            <div className={"card-footer text-end m-0 p-0"}>
              {monitoring.data.difval < getterFormObj.minVal && (
                <div className={"display-1 text-center text-danger"}>
                  ВНИМАНИЕ ПРОИЗВОДИТЕЛЬНОСТЬ!
                </div>
              )}
            </div>
            <div className={"card col border border-1 border-dark m-0 p-0"}>
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
                      <td>{utils.getNormalTime(monitoring.data.maxtime)}</td>
                      <td>{monitoring.data.maxfuel}</td>
                    </tr>
                    <tr>
                      <td>{utils.getNormalTime(monitoring.data.mintime)}</td>
                      <td>{monitoring.data.minfuel}</td>
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
                      <td>Разница: {monitoring.data.diffuel}</td>
                      <td>
                        Производительность:{" "}
                        {monitoring.data.difval < getterFormObj.minVal ? (
                          <span
                            className={
                              "text-danger lead fw-bold m-0 p-0 display-6"
                            }
                          >
                            {monitoring.data.difval}
                          </span>
                        ) : monitoring.data.difval - 20 <
                          getterFormObj.minVal ? (
                          <span
                            className={
                              "text-warning lead fw-bold m-0 p-0 display-6"
                            }
                          >
                            {monitoring.data.difval}
                          </span>
                        ) : (
                          <span
                            className={
                              "text-success lead fw-bold m-0 p-0 display-6"
                            }
                          >
                            {monitoring.data.difval}
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
          <div className={"display-1 text-center text-danger shadow my-1 mb-1"}>
            ДАННЫХ НЕТ!
          </div>
        )}
      </div>
    </base.Base1>
  );
}
