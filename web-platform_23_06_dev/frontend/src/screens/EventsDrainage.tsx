// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as base from "../components/ui/base";
import * as hooks from "../components/hooks";
import * as slices from "../components/slices";
import * as utils from "../components/utils";

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
    Date().toString()
  );
  const [
    getFilterDrainageListForm,
    setFilterDrainageListForm,
    resetFilterDrainageListForm,
  ] = hooks.useStateCustom1({
    minVal: 180,
    timeDiff: 15,
    danger: false,
  });

  // TODO useEffect ////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    dispatch(
      slices.events.drainageReadListStore.action({
        form: { timeDiff: getFilterDrainageListForm.timeDiff },
      })
    );
    setTimeout(async () => {
      setCurrentTime(Date().toString());
    }, 10000);
  }, [currentTime]);

  useEffect(() => {
    console.log(drainageReadListStore);
    if (drainageReadListStore.data) {
      setMonitoring(drainageReadListStore.data);
    }
  }, [drainageReadListStore.data]);

  // TODO function /////////////////////////////////////////////////////////////////////////////////////////////////////

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <base.Base1
      title={"Показатели: Водоотлив"}
      description={
        "Производительность и дата последней связи водоотлива (показания расходомера)"
      }
    >
      <div className={"lead tex-danger fw-bold display-6"}>
        {currentTime && currentTime.length > 0 && currentTime.split(" G")[0]}
      </div>
      <div>
        <div className={"input-group w-100 shadow p-3"}>
          <span>Выберите минимальный уровень производительности: </span>
          <select
            onChange={(event) =>
              setFilterDrainageListForm({
                ...getFilterDrainageListForm,
                minVal: parseInt(event.target.value, 10),
              })
            }
            className="form-select w-25 form-select-lg mb-3"
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
          <span>Выберите разницу времени, минут: </span>
          <select
            onChange={(event) =>
              setFilterDrainageListForm({
                ...getFilterDrainageListForm,
                timeDiff: parseInt(event.target.value, 10),
              })
            }
            className="form-select w-25 form-select-lg mb-3"
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
      </div>
      <div className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-1 text-center m-0 p-0">
        {drainageReadListStore.fail === undefined &&
        drainageReadListStore.error === undefined &&
        monitoring &&
        monitoring.data ? (
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
                      {monitoring.data.difval <
                      getFilterDrainageListForm.minVal ? (
                        <span className={"text-danger lead fw-bold m-0 p-0"}>
                          {monitoring.data.difval}
                        </span>
                      ) : monitoring.data.difval - 20 <
                        getFilterDrainageListForm.minVal ? (
                        <span className={"text-warning lead fw-bold m-0 p-0"}>
                          {monitoring.data.difval}
                        </span>
                      ) : (
                        <span className={"text-success lead fw-bold m-0 p-0"}>
                          {monitoring.data.difval}
                        </span>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={"card-footer text-end m-0 p-1"}>
              {monitoring.data.difval < getFilterDrainageListForm.minVal && (
                <div className={"display-1 text-center text-danger"}>
                  ВНИМАНИЕ ПРОИЗВОДИТЕЛЬНОСТЬ!
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className={"display-1 text-center text-danger"}>ДАННЫХ НЕТ!</div>
        )}
        {drainageReadListStore.fail && (
          <div className={"display-1 text-center text-danger"}>
            ВНИМАНИЕ СВЯЗЬ!
          </div>
        )}
        {drainageReadListStore.error && (
          <div className={"display-1 text-center text-danger"}>
            ВНИМАНИЕ СВЯЗЬ!
          </div>
        )}
      </div>
    </base.Base1>
  );
}
