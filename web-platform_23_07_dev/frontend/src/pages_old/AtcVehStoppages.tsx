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
import { fa } from "@faker-js/faker";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function Page(): JSX.Element {
  // TODO store ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const atcVehStoppagesReadListStore = hooks.useSelectorCustom1(
    slices.events.atcVehStoppagesReadListStore
  );

  // TODO hook /////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();
  const [getterFormObj, setterFormObj] = useState({
    date: utils.getCurrentDateForForm(),
    shift: "1",
    target: "10",
    selectTechId: "145",
  });
  const [monitoring, setMonitoring, resetMonitoring] = hooks.useStateCustom1(
    {}
  );

  // TODO useEffect ////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (atcVehStoppagesReadListStore.data) {
      setMonitoring(atcVehStoppagesReadListStore.data);
    }
  }, [atcVehStoppagesReadListStore.data]);

  // TODO functions ////////////////////////////////////////////////////////////////////////////////////////////////////

  async function GetMonitoringData() {
    dispatch(
      slices.events.atcVehStoppagesReadListStore.action({
        form: { ...getterFormObj },
      })
    );
  }

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <base.Base1 title={"АТЦ: Простои автосамосвалов"} description={"..."}>
      <div className={"mb-2"}>
        <components.Accordion1
          isCollapse={false}
          key_target={"Accordion#1"}
          title={"Настройка данных и отображения"}
          text_style={"text-white"}
          header_style={"bg-primary"}
          body_style={"bg-light"}
        >
          <div className={"input-group w-100 bg-light p-3 my-2 mb-2"}>
            <div className={"input-group w-100 bg-light p-3 my-2 mb-2"}>
              <span className={"p-2"}>Выберите дату: </span>
              <input
                type={"date"}
                className={"form-control form-control-sm"}
                value={getterFormObj.date}
                onChange={(event) =>
                  setterFormObj({
                    ...getterFormObj,
                    // @ts-ignore
                    date: event.target.value,
                  })
                }
              />
              <span className={"p-2"}>Выберите смену: </span>
              <select
                className="form-select form-select-sm mb-3"
                defaultValue={getterFormObj.shift}
                onChange={(event) =>
                  setterFormObj({
                    ...getterFormObj,
                    // @ts-ignore
                    shift: event.target.value,
                  })
                }
              >
                <option selected value={1}>
                  1
                </option>
                <option value={2}>2</option>
              </select>
            </div>
            <span className={"p-3"}>
              Выберите "минимальный порог" простоя:{" "}
            </span>
            <select
              className="form-select form-select-sm mb-3"
              defaultValue={getterFormObj.target}
              onChange={(event) =>
                setterFormObj({
                  ...getterFormObj,
                  // @ts-ignore
                  target: event.target.value,
                })
              }
            >
              <option value={"3"}>3 минуты</option>
              <option value={"5"}>5 минут</option>
              <option value={"7"}>7 минут</option>
              <option selected value={"10"}>
                10 минут
              </option>
              <option value={"15"}>15 минут</option>
              <option value={"20"}>20 минут</option>
              <option value={"30"}>30 минут</option>
            </select>
            <span className={"p-3"}>Выберите транспорт: </span>
            <select
              className="form-select form-select-sm mb-3"
              defaultValue={getterFormObj.selectTechId}
              onChange={(event) =>
                setterFormObj({
                  ...getterFormObj,
                  // @ts-ignore
                  selectTechId: event.target.value,
                })
              }
            >
              {
                // @ts-ignore
                [...Array(44).keys()]
                  .map((i) => i + 101)
                  .map((item, index) => (
                    <option value={`${item}`}>{item}</option>
                  ))
              }
              <option selected value={"145"}>
                145
              </option>
            </select>
            <button
              onClick={GetMonitoringData}
              className={
                atcVehStoppagesReadListStore &&
                atcVehStoppagesReadListStore.load === true
                  ? "btn btn-lg btn-primary w-25 disabled"
                  : "btn btn-lg btn-primary w-25"
              }
            >
              обновить данные
            </button>
          </div>
        </components.Accordion1>
      </div>
      {atcVehStoppagesReadListStore.fail && (
        <div className={"display-1 text-center text-danger shadow my-1 mb-1"}>
          ВНИМАНИЕ СВЯЗЬ!
        </div>
      )}
      {atcVehStoppagesReadListStore.error && (
        <div className={"display-1 text-center text-danger shadow my-1 mb-1"}>
          ВНИМАНИЕ СВЯЗЬ!
        </div>
      )}
      <components.StatusStore1
        slice={slices.events.atcAvgSpeedReadListStore}
        consoleLog={constants.DEBUG_CONSTANT}
        showData={false}
      />

      <div className={"lead fw-bold mb-1 d-flex"}>
        <div className={"container display-6 shadow w-75"}>
          {monitoring && monitoring.query ? (
            <div>
              {monitoring.query.date.split("T")[0]} | {monitoring.query.shift}{" "}
              смена
            </div>
          ) : (
            "--.--.---- --:--:--"
          )}
        </div>
        <div className={"w-25"}>
          <components.StatusStore1
            slice={slices.events.atcAuxStoppagesReadListStore}
            consoleLog={constants.DEBUG_CONSTANT}
            showData={false}
          />
        </div>
      </div>

      <div className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-1 text-center m-0 p-0">
        {atcVehStoppagesReadListStore.fail === undefined &&
        atcVehStoppagesReadListStore.error === undefined &&
        monitoring &&
        monitoring.data ? (
          <div className={"p-0"}>
            <components.Accordion1
              isCollapse={false}
              key_target={"Accordion#3"}
              title={"Простои вспомогательной техники"}
              text_style={"text-white"}
              header_style={"bg-success"}
              body_style={"bg-light"}
            >
              <div className={"row bg-light m-0 p-0"}>
                <table className="table table-light table-hover table-striped m-0 p-0">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Хоз. номер</th>
                      <th scope="col">Начало простоя</th>
                      <th scope="col">Окончание простоя</th>
                      <th scope="col">Длительность простоя</th>
                      <th scope="col">Топливо</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monitoring.data.map(
                      // @ts-ignore
                      (item1, index1) => (
                        <tr>
                          <td>#{index1 + 1}</td>
                          <td>{item1.tech}</td>
                          <td>
                            {item1.from.split("T")[0]}{" "}
                            {item1.from.split("T")[1]}
                          </td>
                          <td>
                            {item1.to.split("T")[0]} {item1.to.split("T")[1]}
                          </td>
                          <td>{item1.diff}</td>
                          <td>{item1.fuel}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </components.Accordion1>
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
