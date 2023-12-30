// TODO download modules /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import React, { FormEvent, useEffect, useState } from "react";
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

  const slice = slices.speed.speedMonitoringDumptrucksStore;
  const store = hooks.useSelectorCustom1(slice);

  const slice2 = slices.speed.speedSendCommentDumptrucksStore;
  const store2 = hooks.useSelectorCustom1(slice2);

  // TODO hooks //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();
  const [state, setState]: any = useState([]);
  const [currentTime, setCurrentTime] = useState(utils.getCurrentDateTime());
  const [form, setForm] = useState({
    param_target_speed: 17.0,
    param_detail: false,
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

  // TODO functions //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function SendComment(event: FormEvent) {
    try {
      event.preventDefault();
      event.stopPropagation();
      const target: any = event.target;
      dispatch(
        slice2.action({
          form: {
            veh_id: target.veh_id.value,
            description: target.description.value,
          },
        })
      );
    } catch (error) {
      if (constants.DEBUG_CONSTANT) {
        console.log("error: ", error);
      }
    }
  }

  // TODO return /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <base.Base2
      title={
        "СКОРОСТЬ АВТОСАМОСВАЛОВ: Мониторинг средней скорости автосамосвалов"
      }
      description={"Мониторинг в реальном времени за текущую смену"}
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
            Выберите требуемый общий уровень скорости:
          </span>
          <select
            value={form.param_target_speed}
            onChange={(event) =>
              setForm({
                ...form,
                param_target_speed: utils.Converting.parseFloat(
                  event.target.value
                ),
              })
            }
            className="form-select form-select-sm"
          >
            <option value={14.0}>14.0</option>
            <option value={15.0}>15.0</option>
            <option value={16.0}>16.0</option>
            <option value={17.0}>17.0</option>
            <option value={18.0}>18.0</option>
            <option value={19.03}>19.03</option>
            <option value={20.0}>20.0</option>
            <option value={25.0}>25.0</option>
          </select>
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
        state.table_speed_dumptrucks_for_now ? (
          <components.Accordion2
            isCollapse={false}
            keyTarget={"Accordion#2"}
            headerClassName={"bg-warning-custom-1"}
            title={"Таблица с значениями"}
            titleTextClassName={"text-dark"}
            bodyClassName={"text-bg-light small"}
          >
            <table className="small table table-light table-hover m-0 p-0">
              <thead>
                <tr>
                  <th scope="col">Группа экс.</th>
                  <th scope="col">Самосвал</th>
                  <th scope="col">Ф.И.О. оператора</th>

                  <th scope="col">Ср. скор. груж.</th>
                  {form.param_detail && <th scope="col">Ср. скор. порожн.</th>}
                  {form.param_detail && <th scope="col">Ср. скор. общ.</th>}

                  <th scope="col">Посл. рейс ср. скор. груж.</th>
                  {form.param_detail && (
                    <th scope="col">Посл. рейс ср. скор. порожн.</th>
                  )}
                  {form.param_detail && (
                    <th scope="col">Посл. рейс ср. скор. общ.</th>
                  )}

                  {form.param_detail && <th scope="col">Ср. скор. план.</th>}
                  {form.param_detail && (
                    <th scope="col">Сум. рейсов под груп. экс.</th>
                  )}
                  {form.param_detail && <th scope="col">Сум. рейсов всего</th>}
                  {form.param_detail && <th scope="col">Ср. масса</th>}
                  {form.param_detail && <th scope="col">Расстояние груж.</th>}
                  {form.param_detail && <th scope="col">Расстояние порожн.</th>}
                  {form.param_detail && <th scope="col">Расстояние общ.</th>}
                  <th scope="col">Комментарий по снижению</th>
                  <th scope="col">Обновить комментарий</th>
                </tr>
              </thead>
              <tbody>
                {state.table_speed_dumptrucks_for_now.length < 1 ? (
                  <tr>
                    <td colSpan={5} className={"text-danger"}>
                      Данных не найдено.
                    </td>
                  </tr>
                ) : (
                  state.table_speed_dumptrucks_for_now.map((item: any) => (
                    <tr key={item.veh_id}>
                      <td>{item.max_shov_id}</td>
                      <td>{item.veh_id}</td>
                      <td>{item.fio}</td>

                      <td
                        className={
                          form.param_target_speed - item.avg_speed_full > 0
                            ? "fw-bold text-bg-danger border border-1 border-danger"
                            : ""
                        }
                      >
                        {item.avg_speed_full}
                      </td>
                      {form.param_detail && <td>{item.avg_speed_empty}</td>}
                      {form.param_detail && <td>{item.avg_speed_all}</td>}

                      <td
                        className={
                          item.avg_speed_all - item.last_avg_speed_full > 0.25
                            ? "fw-bold bg-warning-custom-1 border border-1 border-warning"
                            : ""
                        }
                      >
                        {item.last_avg_speed_full}
                      </td>
                      {form.param_detail && (
                        <td>{item.last_avg_speed_empty}</td>
                      )}
                      {form.param_detail && <td>{item.last_avg_speed_all}</td>}

                      {form.param_detail && <td>{form.param_target_speed}</td>}
                      {form.param_detail && <td>{item.max_shov_id_trips}</td>}
                      {form.param_detail && <td>{item.sum_trips}</td>}
                      {form.param_detail && <td>{item.avg_weight}</td>}
                      {form.param_detail && <td>{item.avg_length_full}</td>}
                      {form.param_detail && <td>{item.avg_length_empty}</td>}
                      {form.param_detail && <td>{item.avg_length_all}</td>}
                      <td>{item.comment_description}</td>
                      <td>
                        <form
                          className={"input-group"}
                          onSubmit={(event) => SendComment(event)}
                        >
                          <input
                            name={"veh_id"}
                            type={"hidden"}
                            value={item.veh_id}
                            required
                          />
                          <input
                            name={"description"}
                            type={"text"}
                            className={"form-control form-control-sm"}
                            required
                          />
                          <button
                            type={"submit"}
                            className={
                              store2.load
                                ? "btn btn-sm btn-secondary disabled"
                                : "btn btn-sm btn-dark"
                            }
                          >
                            сохранить
                          </button>
                        </form>
                      </td>
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

      <hr className={"m-3 p-0"} />

      {/*TODO Отстающие*/}
      <div className={"card m-0 p-0"}>
        {(store.fail === undefined || store.error === undefined) &&
        state &&
        state.rating ? (
          <components.Accordion2
            isCollapse={false}
            keyTarget={"Accordion#3"}
            headerClassName={"bg-danger"}
            title={"Таблица отстающих по скорости в группе экскаваторов"}
            titleTextClassName={"text-white"}
            bodyClassName={"text-bg-light small"}
          >
            <table className="small table table-light table-hover m-0 p-0">
              <thead>
                <tr>
                  <th scope="col">Группа экс.</th>
                  <th scope="col">Самосвал</th>
                  <th scope="col">Ф.И.О. оператора</th>

                  <th scope="col">Ср. скор. груж.</th>
                  {form.param_detail && <th scope="col">Ср. скор. порожн.</th>}
                  {form.param_detail && <th scope="col">Ср. скор. общ.</th>}

                  <th scope="col">Посл. рейс ср. скор. груж.</th>
                  {form.param_detail && (
                    <th scope="col">Посл. рейс ср. скор. порожн.</th>
                  )}
                  {form.param_detail && (
                    <th scope="col">Посл. рейс ср. скор. общ.</th>
                  )}

                  {form.param_detail && <th scope="col">Ср. скор. план.</th>}
                  {form.param_detail && (
                    <th scope="col">Сум. рейсов под груп. экс.</th>
                  )}
                  {form.param_detail && <th scope="col">Сум. рейсов всего</th>}
                  {form.param_detail && <th scope="col">Ср. масса</th>}
                  {form.param_detail && <th scope="col">Расстояние груж.</th>}
                  {form.param_detail && <th scope="col">Расстояние порожн.</th>}
                  {form.param_detail && <th scope="col">Расстояние общ.</th>}
                  <th scope="col">Комментарий по снижению</th>
                </tr>
              </thead>
              <tbody>
                {state.rating.length < 1 ? (
                  <tr>
                    <td colSpan={5} className={"text-danger"}>
                      Данных не найдено.
                    </td>
                  </tr>
                ) : (
                  state.rating.map((item: any) => (
                    <tr key={item.veh_id}>
                      <td>{item.max_shov_id}</td>
                      <td>{item.veh_id}</td>
                      <td>{item.fio}</td>

                      <td
                        className={
                          form.param_target_speed - item.avg_speed_full > 0
                            ? "fw-bold text-bg-danger border border-1 border-danger"
                            : ""
                        }
                      >
                        {item.avg_speed_full}
                      </td>
                      {form.param_detail && <td>{item.avg_speed_empty}</td>}
                      {form.param_detail && <td>{item.avg_speed_all}</td>}

                      <td
                        className={
                          item.avg_speed_full - item.last_avg_speed_full > 0.25
                            ? "fw-bold bg-warning-custom-1 border border-1 border-warning"
                            : ""
                        }
                      >
                        {item.last_avg_speed_full}
                      </td>
                      {form.param_detail && (
                        <td>{item.last_avg_speed_empty}</td>
                      )}
                      {form.param_detail && <td>{item.last_avg_speed_all}</td>}

                      {form.param_detail && <td>{form.param_target_speed}</td>}
                      {form.param_detail && <td>{item.max_shov_id_trips}</td>}
                      {form.param_detail && <td>{item.sum_trips}</td>}
                      {form.param_detail && <td>{item.avg_weight}</td>}
                      {form.param_detail && <td>{item.avg_length_full}</td>}
                      {form.param_detail && <td>{item.avg_length_empty}</td>}
                      {form.param_detail && <td>{item.avg_length_all}</td>}
                      <td>{item.comment_description}</td>
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
