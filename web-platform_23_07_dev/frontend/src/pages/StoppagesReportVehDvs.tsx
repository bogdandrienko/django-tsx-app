// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as base from "../components/ui/bases";
import * as hooks from "../components/hooks";
import * as components from "../components/ui/components";
import * as utils from "../components/utils";
import * as slices from "../components/slices";
import * as constants from "../components/constants";
import { Accordion3 } from "../components/ui/components";
import { getAllDumptrucks } from "../components/utils";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function Page(): JSX.Element {
  // TODO store ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const sliceStoppagesReportVehDvsStore =
    slices.stoppages.stoppagesReportVehDvsStore;
  const stoppagesReportVehDvsStore = hooks.useSelectorCustom1(
    sliceStoppagesReportVehDvsStore
  );

  // TODO hook /////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();
  const [getterFormObj, setterFormObj] = useState({
    paramDate: utils.getCurrentDateForForm(),
    paramShift: "1",
    paramTarget: "10",
    paramSelectTechId: "Все",
  });
  const [monitoring, setMonitoring, resetMonitoring] = hooks.useStateCustom1(
    {}
  );

  // TODO useEffect ////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (stoppagesReportVehDvsStore.data) {
      setMonitoring(stoppagesReportVehDvsStore.data);
    }
  }, [stoppagesReportVehDvsStore.data]);

  // TODO functions ////////////////////////////////////////////////////////////////////////////////////////////////////

  async function GetData() {
    if (getterFormObj.paramDate !== "") {
      dispatch(
        sliceStoppagesReportVehDvsStore.action({
          form: { ...getterFormObj },
        })
      );
    } else {
      window.alert("Заполните все данные!");
    }
  }

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <base.Base2
      title={"ПРОСТОИ: Отчёт по простоям автосамосвалов"}
      description={"Нулевая скорость и включённый ДВС за выбранный период"}
    >
      <components.Accordion2
        isCollapse={false}
        keyTarget={"Accordion#1"}
        headerClassName={"bg-primary"}
        title={"Настройка данных и отображения"}
        titleTextClassName={"text-white"}
        bodyClassName={"text-bg-light small"}
      >
        <div className={"input-group w-100 m-1 p-2"}>
          <span className={"m-1 p-2"}>Дата:</span>
          <input
            type={"date"}
            className={"form-control form-control-sm"}
            value={getterFormObj.paramDate}
            onChange={(event) =>
              setterFormObj({
                ...getterFormObj,
                // @ts-ignore
                paramDate: event.target.value,
              })
            }
          />
          <span className={"m-1 p-2"}>Смена:</span>
          <select
            className="form-select form-select-sm"
            value={getterFormObj.paramShift}
            onChange={(event) =>
              setterFormObj({
                ...getterFormObj,
                // @ts-ignore
                paramShift: event.target.value,
              })
            }
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
          </select>
        </div>
        <div className={"input-group w-100 m-1 p-2"}>
          <span className={"m-1 p-2"}>"Минимальный порог" простоя:</span>
          <select
            className="form-select form-select-sm"
            value={getterFormObj.paramTarget}
            onChange={(event) =>
              setterFormObj({
                ...getterFormObj,
                // @ts-ignore
                paramTarget: event.target.value,
              })
            }
          >
            <option value={"1"}>1 минута</option>
            <option value={"5"}>5 минут</option>
            <option value={"7"}>7 минут</option>
            <option value={"10"}>10 минут</option>
            <option value={"15"}>15 минут</option>
            <option value={"30"}>30 минут</option>
          </select>
          <span className={"m-1 p-2"}>Техника:</span>
          <select
            className="form-select form-select-sm"
            value={getterFormObj.paramSelectTechId}
            onChange={(event) =>
              setterFormObj({
                ...getterFormObj,
                // @ts-ignore
                paramSelectTechId: event.target.value,
              })
            }
          >
            <option value={"Все"}>Все</option>
            {utils.getAllDumptrucks(["100"]).map((tech) => (
              <option key={tech.tech} value={tech.tech}>
                {tech.tech} {tech.type}
              </option>
            ))}
          </select>
          <button
            onClick={GetData}
            className={
              stoppagesReportVehDvsStore &&
              stoppagesReportVehDvsStore.load === true
                ? "btn btn-lg btn-primary w-25 disabled"
                : "btn btn-lg btn-primary w-25"
            }
          >
            обновить данные
          </button>
        </div>
        <hr className={"m-2 p-0"} />
        <div className={"fs-4 text-danger m-0 p-3"}>
          Внимание, выгрузка выбранной единицы может занять до 1 минуты,
          выгрузка ВСЕЙ техники до 5 минут!
        </div>
      </components.Accordion2>

      <hr className={"m-3 p-0"} />

      <div className={"card text-bg-light m-0 p-0 pt-1"}>
        {(stoppagesReportVehDvsStore.fail ||
          stoppagesReportVehDvsStore.error) && (
          <div className={"display-1 text-center text-danger my-1 mb-1"}>
            ВНИМАНИЕ СВЯЗЬ!
          </div>
        )}
        <div
          className={
            "lead fw-bold mb-1 d-flex shadow custom-background-transparent-hard"
          }
        >
          <div className={"container display-6 w-75"}>
            {monitoring && monitoring.parameters ? (
              <div>
                {monitoring.parameters.param_date.split("T")[0]}
                {" | "}
                {monitoring.parameters.param_shift}
                {" смена | "}
                {monitoring.parameters.param_select_tech_id}
              </div>
            ) : (
              "--.--.---- --:--:--"
            )}
          </div>
          <div className={"w-25"}>
            <components.StatusStore1
              slice={sliceStoppagesReportVehDvsStore}
              consoleLog={constants.DEBUG_CONSTANT}
              showData={false}
            />
          </div>
        </div>
      </div>

      <hr className={"m-3 p-0"} />

      <div className="card text-bg-light m-0 p-0">
        {(stoppagesReportVehDvsStore.fail === undefined ||
          stoppagesReportVehDvsStore.error === undefined) &&
        monitoring &&
        monitoring.data ? (
          <components.Accordion2
            isCollapse={false}
            keyTarget={"Accordion#2"}
            headerClassName={"bg-warning"}
            title={"Таблица: Простои автосамосвалов"}
            titleTextClassName={"text-dark"}
            bodyClassName={"bg-light"}
          >
            <table className="table table-light table-hover table-striped m-0 p-0">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Хоз. номер</th>
                  <th scope="col">Начало простоя</th>
                  <th scope="col">Окончание простоя</th>
                  <th scope="col">Длительность простоя</th>
                </tr>
              </thead>
              <tbody>
                {monitoring.data.length < 1 ? (
                  <tr>
                    <td colSpan={5} className={"text-danger"}>
                      Данных не найдено.
                    </td>
                  </tr>
                ) : (
                  monitoring.data.map(
                    // @ts-ignore
                    (item, index) => (
                      <tr key={index}>
                        <td>#{index + 1}</td>
                        <td>{item.tech}</td>
                        <td>
                          {item.from.split("T")[0]} {item.from.split("T")[1]}
                        </td>
                        <td>
                          {item.to.split("T")[0]} {item.to.split("T")[1]}
                        </td>
                        <td>{item.diff}</td>
                      </tr>
                    )
                  )
                )}
              </tbody>
            </table>
          </components.Accordion2>
        ) : (
          <div className={"display-1 text-center text-danger"}>ДАННЫХ НЕТ!</div>
        )}
      </div>
    </base.Base2>
  );
}
