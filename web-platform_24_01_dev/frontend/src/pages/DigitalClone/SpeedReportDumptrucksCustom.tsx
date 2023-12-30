// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as base from "../../components/ui/bases";
import * as hooks from "../../components/hooks";
import * as components from "../../components/ui/components";
import * as utils from "../../components/utils";
import * as slices from "../../components/slices";
import * as constants from "../../components/constants";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function Page() {
  // TODO stores /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const slice = slices.speed.speedReportDumptrucksCustom;
  const store = hooks.useSelectorCust(slice);

  // TODO hooks //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();
  const [state, setState]: any = useState({});
  const [form, setForm] = useState({
    param_date: utils.getCurrentDateForForm(),
    param_shift: 1,
    param_detail: false,
    param_target_diff: 3.0,
  });

  // TODO useEffects /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (store.data) {
      setState(store.data);
    }
  }, [store.data]);

  // TODO functions //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async function GetData() {
    if (form.param_date !== "") {
      dispatch(
        slice.action({
          form: { ...form },
        }),
      );
    } else {
      window.alert("Заполните все данные!");
    }
  }

  // TODO return /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <base.Base2>
      <components.Accordion2
        isCollapse={false}
        keyTarget={"Accordion#1"}
        headerClassName={"bg-primary-custom-1"}
        title={"Настройка данных и отображения"}
        titleTextClassName={"text-white"}
        bodyClassName={"text-bg-light small"}
      >
        <div className={"input-group w-100 m-1 p-2"}>
          <span className={"m-1 p-2"}>Дата:</span>
          <input
            type={"date"}
            className={"form-control form-control-sm"}
            value={form.param_date}
            onChange={(event) =>
              setForm({
                ...form,
                param_date: event.target.value,
              })
            }
          />
          <span className={"m-1 p-1"}>Смена:</span>
          <select
            className="form-select form-select-sm"
            value={form.param_shift}
            onChange={(event) =>
              setForm({
                ...form,
                param_shift: utils.Converting.parseInt(event.target.value),
              })
            }
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
          </select>
          <span className={"m-1 p-1"}>Выберите уровень отклонения:</span>
          <select
            value={form.param_target_diff}
            onChange={(event) =>
              setForm({
                ...form,
                param_target_diff: utils.Converting.parseFloat(
                  event.target.value,
                ),
              })
            }
            className="form-select form-select-sm"
          >
            <option value={0.0}>0.0</option>
            <option value={1.0}>1.0</option>
            <option value={2.0}>2.0</option>
            <option value={3.0}>3.0</option>
          </select>
          <button
            onClick={GetData}
            className={
              store && store.load === true
                ? "btn btn-lg btn-primary w-25 disabled"
                : "btn btn-lg btn-primary w-25"
            }
          >
            обновить данные
          </button>
        </div>
        <div className={"input-group w-100 m-1 p-2"}>
          <div className="feature col">
            <h3 className="fs-4 text-body-emphasis">
              Формат отображения рейсов:
            </h3>
            <p className={"text-center"}>
              {form.param_detail ? (
                <button
                  onClick={() => {
                    setForm({
                      ...form,
                      param_detail: !form.param_detail,
                    });
                  }}
                  className="btn btn-lg btn-warning"
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
                  className="btn btn-lg btn-outline-success"
                >
                  включён упрощённый режим
                </button>
              )}
            </p>
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
            {state && state.parameters ? (
              <div>
                {`${state.parameters.param_shift} смена | `}
                {utils.DateTime.GetCleanDateTime(
                  state.parameters.param_date,
                  false,
                )}
              </div>
            ) : (
              "--.--.---- --:--:--"
            )}
          </div>
          <div className={"w-25"}>
            <components.StatusStore1
              slice={slice}
              consoleLog={constants.DEBUG}
              showData={false}
            />
          </div>
        </div>
      </div>

      <hr className={"m-3 p-0"} />

      <div className="m-0 p-0">
        {(store.fail === undefined || store.error === undefined) &&
        state &&
        state.data ? (
          <div>
            <components.Accordion2
              isCollapse={true}
              keyTarget={"Accordion#2"}
              headerClassName={"bg-warning-custom-1"}
              title={"Таблица: РЕЙСЫ"}
              titleTextClassName={"text-dark"}
              bodyClassName={"bg-light"}
            >
              <table className="small table table-light table-hover m-0 p-0">
                <thead>
                  <tr>
                    {form.param_detail && <th scope="col">Экскаватор</th>}
                    {form.param_detail && <th scope="col">Тип</th>}
                    <th scope="col">Самосвал</th>
                    {form.param_detail && <th scope="col">ФИО</th>}
                    {form.param_detail && <th scope="col">Масса груж.</th>}
                    <th scope="col">Расстояние</th>
                    {form.param_detail && (
                      <th scope="col">Время нач.погрузки</th>
                    )}
                    {form.param_detail && (
                      <th scope="col">Время нач.движ после погрузки</th>
                    )}
                    {form.param_detail && (
                      <th scope="col">Время нач.разгрузки</th>
                    )}
                    {form.param_detail && (
                      <th scope="col">Время нач.движ после разгрузки</th>
                    )}
                    {form.param_detail && (
                      <th scope="col">Время нач.след.погрузки</th>
                    )}
                    <th scope="col">Длительность погрузки</th>
                    <th scope="col">Длительность движения груж.</th>
                    <th scope="col">Длительность разгрузки</th>
                    <th scope="col">Длительность движения порожн.</th>
                    <th scope="col">Длительность рейса</th>
                    <th scope="col">Скорость по АСД</th>
                    <th scope="col">Скорость по ФОРМУЛЕ</th>
                    <th scope="col">Разница</th>
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
                    state.data.map((item1: any, index1: number) => (
                      <tr
                        key={index1}
                        className={
                          item1.SPEED_DIFF > form.param_target_diff
                            ? "bg-danger"
                            : ""
                        }
                      >
                        {form.param_detail && (
                          <td title={"Экскаватор"}>{item1.SHOVID}</td>
                        )}
                        {form.param_detail && (
                          <td title={"Тип"}>{item1.WORKTYPE}</td>
                        )}
                        <td title={"Самосвал"}>{item1.VEHID}</td>
                        {form.param_detail && (
                          <td title={"ФИО"}>{item1.FIO}</td>
                        )}
                        {form.param_detail && (
                          <td title={"Масса груж."}>
                            {item1.WEIGHT_MOVE_LOAD}
                          </td>
                        )}
                        <td title={"Расстояние"}>{item1.LENGTH_MOVE_LOAD}</td>
                        {form.param_detail && (
                          <td title={"Время нач.погрузки"}>
                            {item1.TIME_LOAD.split("T")[1]}
                          </td>
                        )}
                        {form.param_detail && (
                          <td title={"Время нач.движ после погрузки"}>
                            {item1.TIME_MOVE_LOAD &&
                              item1.TIME_MOVE_LOAD.split("T")[1]}
                          </td>
                        )}
                        {form.param_detail && (
                          <td title={"Время нач.разгрузки"}>
                            {item1.TIME_UNLOAD.split("T")[1]}
                          </td>
                        )}
                        {form.param_detail && (
                          <td title={"Время нач.движ после разгрузки"}>
                            {item1.TIME_MOVE_UNLOAD.split("T")[1]}
                          </td>
                        )}
                        {form.param_detail && (
                          <td title={"Время нач.след.погрузки"}>
                            {item1.TIME_LOAD_NEXT.split("T")[1]}
                          </td>
                        )}
                        <td title={"Длительность погрузки"}>
                          {item1.DURATION_LOADING}
                        </td>
                        <td title={"Длительность движения груж."}>
                          {item1.DURATION_MOVE_LOAD}
                        </td>
                        <td title={"Длительность разгрузки"}>
                          {item1.DURATION_UNLOADING}
                        </td>
                        <td title={"Длительность движения порожн."}>
                          {item1.DURATION_MOVE_UNLOAD}
                        </td>
                        <td title={"Длительность рейса"}>
                          {item1.DURATION_TRIP}
                        </td>
                        <td title={"Скорость по АСД"}>
                          {item1.SPEED_LOAD_ASD}
                        </td>
                        <td title={"Скорость по ФОРМУЛЕ"}>
                          {item1.SPEED_LOAD_CUSTOM}
                        </td>
                        <td title={"Разница"}>{item1.SPEED_DIFF}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </components.Accordion2>
          </div>
        ) : (
          <div className={"display-1 text-center text-danger"}>ДАННЫХ НЕТ!</div>
        )}
      </div>
    </base.Base2>
  );
}
