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

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function Page(): JSX.Element {
  // TODO stores /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const slice = slices.gto.gtoReportDumptrucksStore;
  const store = hooks.useSelectorCustom1(slice);

  // TODO hooks //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();
  const [state, setState]: any = useState({});
  const [form, setForm] = useState({
    param_date: utils.getCurrentDateForForm(),
    param_shift: 1,
    param_detail: false,
  });

  // TODO useEffects /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (store.data) {
      console.log(store.data);
      setState(store.data);
    }
  }, [store.data]);

  // TODO functions //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async function GetData() {
    if (form.param_date !== "") {
      dispatch(
        slice.action({
          form: { ...form },
        })
      );
    } else {
      window.alert("Заполните все данные!");
    }
  }

  // TODO return /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <base.Base2
      title={"ОБЗОРНЫЙ АНАЛИЗ ГТО: Отчёт по всем показателям автосамосвалов"}
      description={"Показатели за смену"}
    >
      <components.Accordion2
        isCollapse={false}
        keyTarget={"Accordion#1"}
        headerClassName={"bg-primary-custom-1"}
        title={"Настройка данных и отображения"}
        titleTextClassName={"text-white"}
        bodyClassName={"text-bg-light small"}
      >
        <div className={"input-group w-100 m-0 p-2"}>
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
            <h3 className="fs-4 text-body-emphasis">Формат отображения:</h3>
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
        <div className={"container"}>
          <div className={"card lead p-3"}>
            На "производительность" ГТО со стороны автосамосвалов влияют
            множество факторов, часть из них можно отразить как "разницу" плана
            (допустимые значения) и факта
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
                {utils.DateTime.GetCleanDateTime(
                  state.parameters.param_date,
                  false
                )}
                {" | "}
                {state.parameters.param_shift}
              </div>
            ) : (
              "--.--.----"
            )}
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

      <div className="m-0 p-0">
        {(store.fail === undefined || store.error === undefined) &&
        state &&
        state.data ? (
          <div>
            <components.Accordion2
              isCollapse={false}
              keyTarget={"Accordion#3"}
              headerClassName={"bg-warning-custom-1"}
              title={"Таблица: ПОКАЗАТЕЛИ ЗА СМЕНУ"}
              titleTextClassName={"text-dark"}
              bodyClassName={"bg-light"}
            >
              <table className="small table table-light table-hover m-0 p-0">
                <thead>
                  <tr>
                    <th className={"bg-success-custom-1"}>Самосвал</th>
                    {form.param_detail && (
                      <th className={"bg-warning-custom-1"}>
                        Оператор самосвала
                      </th>
                    )}
                    <th className={"bg-success-custom-1"}>Экскаватор</th>
                    {form.param_detail && (
                      <th className={"bg-warning-custom-1"}>
                        Машинист экскаватора
                      </th>
                    )}
                    <th className={"bg-success-custom-1"}>Сум. рейсов, шт</th>
                    <th className={"bg-success-custom-1"}>
                      Ср. загрузка (вес), тонн
                    </th>
                    <th className={"bg-success-custom-1"}>
                      Ср. скорость, км/ч
                    </th>
                    <th className={"bg-success-custom-1"}>
                      Ср. расстояние рейса, км
                    </th>
                    <th className={"bg-success-custom-1"}>
                      Ср. произв., м3/час
                    </th>
                    <th className={"bg-success-custom-1"}>
                      Ср. произв., тонн*км/час
                    </th>
                    {form.param_detail && (
                      <th className={"bg-warning-custom-1"}>Ср. объём, м3</th>
                    )}
                    {form.param_detail && (
                      <th className={"bg-warning-custom-1"}>
                        Ср. время погрузки, мин
                      </th>
                    )}
                    {form.param_detail && (
                      <th className={"bg-warning-custom-1"}>
                        Ср. время разгрузки, мин
                      </th>
                    )}
                    {form.param_detail && (
                      <th className={"bg-warning-custom-1"}>
                        Ср. время движения груж., мин
                      </th>
                    )}
                    {form.param_detail && (
                      <th className={"bg-warning-custom-1"}>Недогрузы, шт</th>
                    )}
                    {form.param_detail && (
                      <th className={"bg-warning-custom-1"}>Перегрузы, шт</th>
                    )}
                    {form.param_detail && (
                      <th className={"bg-warning-custom-1"}>Налипания, тонн</th>
                    )}
                    {form.param_detail && (
                      <th className={"bg-warning-custom-1"}>
                        Ожидание под погрузку, мин
                      </th>
                    )}
                    {form.param_detail && (
                      <th className={"bg-warning-custom-1"}>
                        Ср. высота подъёма, м
                      </th>
                    )}
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
                      <tr key={index1}>
                        <td width={1}>{item1.veh_id}</td>
                        {form.param_detail && (
                          <td width={1}>{item1.veh_id_fio}</td>
                        )}
                        <td width={1}>{item1.shov_id}</td>
                        {form.param_detail && (
                          <td width={1}>{item1.shov_id_fio}</td>
                        )}
                        <td>{item1.sum_trips}</td>
                        <td
                          title={`сум.: ${item1.sum_weight} | норма: ${item1.plan_weight}`}
                          className={
                            item1.diff_avg_weight < 0
                              ? "fw-bold text-danger"
                              : item1.diff_avg_weight > 1
                              ? ""
                              : ""
                          }
                        >
                          {item1.avg_weight}
                          {` (${item1.diff_avg_weight}%)`}
                        </td>
                        <td
                          title={`груж: ${item1.avg_speed_load} | порожн: ${item1.avg_speed_unload} | норма: ${item1.plan_speed_all} | комментарий: ${item1.speed_comment}`}
                          className={
                            item1.diff_speed_all < 0
                              ? "fw-bold text-danger"
                              : item1.diff_speed_all > 1
                              ? ""
                              : ""
                          }
                        >
                          {item1.avg_speed_all}
                          {` (${item1.diff_speed_all}%)`}
                        </td>
                        <td
                          title={`груж: ${item1.avg_length_load} | порожн: ${item1.avg_length_unload} | норма: ${item1.plan_length_all}`}
                          className={
                            item1.diff_length_all < 0
                              ? "fw-bold text-danger"
                              : item1.diff_length_all > 1
                              ? ""
                              : ""
                          }
                        >
                          {item1.avg_length_all}
                          {` (${item1.diff_length_all}%)`}
                        </td>
                        <td title={`cум.: ? | ср.: ? | норма: ?%`}>? (?%)</td>
                        <td title={`cум.: ? | ср.: ? | норма: ?%`}>? (?%)</td>
                        {form.param_detail && (
                          <td
                            title={`сум.: ${item1.sum_volume} | норма: ${item1.plan_avg_volume}`}
                            className={
                              item1.diff_avg_volume < 0
                                ? "fw-bold text-danger"
                                : item1.diff_avg_volume > 1
                                ? ""
                                : ""
                            }
                          >
                            {item1.avg_volume}
                            {` (${item1.diff_avg_volume}%)`}
                          </td>
                        )}
                        {form.param_detail && (
                          <td
                            title={`сум.: ${item1.sum_time_loading} | норма: ${item1.plan_time_loading}`}
                            className={
                              item1.diff_avg_time_loading < 0
                                ? "fw-bold text-danger"
                                : item1.diff_avg_time_loading > 1
                                ? ""
                                : ""
                            }
                          >
                            {item1.avg_time_loading}
                            {` (${item1.diff_avg_time_loading}%)`}
                          </td>
                        )}
                        {form.param_detail && (
                          <td
                            title={`сум.: ${item1.sum_time_unloading} | норма: ${item1.plan_time_unloading}`}
                            className={
                              item1.diff_avg_time_unloading < 0
                                ? "fw-bold text-danger"
                                : item1.diff_avg_time_unloading > 1
                                ? ""
                                : ""
                            }
                          >
                            {item1.avg_time_unloading}
                            {` (${item1.diff_avg_time_unloading}%)`}
                          </td>
                        )}
                        {form.param_detail && (
                          <td
                            title={`сум.: ${item1.sum_time_move} | норма: ${item1.plan_time_move_to_lenght}`}
                            className={
                              item1.diff_avg_time_move_to_lenght < 0
                                ? "fw-bold text-danger"
                                : item1.diff_avg_time_move_to_lenght > 1
                                ? ""
                                : ""
                            }
                          >
                            {item1.avg_time_move}
                            {` (${item1.diff_avg_time_move_to_lenght}%)`}
                          </td>
                        )}
                        {form.param_detail && (
                          <td title={`cум.: ? | ср.: ? | норма: ?%`}>? (?%)</td>
                        )}
                        {form.param_detail && (
                          <td title={`cум.: ? | ср.: ? | норма: ?%`}>? (?%)</td>
                        )}
                        {form.param_detail && (
                          <td title={`cум.: ? | ср.: ? | норма: ?%`}>? (?%)</td>
                        )}
                        {form.param_detail && (
                          <td title={`cум.: ? | ср.: ? | норма: ?%`}>? (?%)</td>
                        )}
                        {form.param_detail && <td>{item1.diff_height}</td>}
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
