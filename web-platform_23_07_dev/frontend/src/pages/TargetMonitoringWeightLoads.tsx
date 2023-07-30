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

  const sliceTargetMonitoringWeightLoadsReadListStore =
    slices.target.targetMonitoringWeightLoadsReadListStore;
  const targetMonitoringWeightLoadsReadListStore = hooks.useSelectorCustom1(
    sliceTargetMonitoringWeightLoadsReadListStore
  );

  // TODO hook /////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();
  const [monitoring, setMonitoring, resetMonitoring] = hooks.useStateCustom1(
    []
  );
  const [currentTime, setCurrentTime, resetCurrentTime] = hooks.useStateCustom1(
    utils.getCurrentDateTime()
  );

  // TODO useEffect ////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    dispatch(sliceTargetMonitoringWeightLoadsReadListStore.action({}));
    setTimeout(async () => {
      setCurrentTime(utils.getCurrentDateTime());
    }, 10000);
  }, [currentTime]);

  useEffect(() => {
    if (targetMonitoringWeightLoadsReadListStore.data) {
      setMonitoring(targetMonitoringWeightLoadsReadListStore.data);
    }
  }, [targetMonitoringWeightLoadsReadListStore.data]);

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <base.Base2
      title={"ПОКАЗАТЕЛИ: Мониторинг недогрузов и перегрузов"}
      description={
        "Отклонения от нормы загрузки автосамосвалов в реальном времени"
      }
    >
      <div className={"lead fw-bold mb-1 d-flex"}>
        <div className={"container display-6 shadow w-75"}>
          {currentTime && currentTime.length > 0
            ? currentTime
            : "--.--.---- --:--:--"}
        </div>
        <div className={"w-25"}>
          <components.StatusStore1
            slice={sliceTargetMonitoringWeightLoadsReadListStore}
            consoleLog={constants.DEBUG_CONSTANT}
            showData={false}
          />
        </div>
      </div>
      {targetMonitoringWeightLoadsReadListStore.fail && (
        <div className={"display-1 text-center text-danger shadow my-1 mb-1"}>
          ВНИМАНИЕ СВЯЗЬ!
        </div>
      )}
      {targetMonitoringWeightLoadsReadListStore.error && (
        <div className={"display-1 text-center text-danger shadow my-1 mb-1"}>
          ВНИМАНИЕ СВЯЗЬ!
        </div>
      )}
      {targetMonitoringWeightLoadsReadListStore.fail === undefined &&
        targetMonitoringWeightLoadsReadListStore.error === undefined &&
        monitoring &&
        monitoring.data &&
        monitoring.data.length > 0 && (
          <div>
            <div>
              {monitoring.data.map(
                // @ts-ignore
                (shovel, index) => (
                  <components.Accordion1
                    isCollapse={true}
                    key_target={`Accordion#${index + 10}`}
                    title={`${shovel.shov_id} экскаватор`}
                    text_style={"text-white"}
                    header_style={"bg-success"}
                    body_style={"bg-light"}
                    key={index}
                  >
                    <div className={"card m-0 p-0"}>
                      <div className={"card-header m-0 p-3"}>
                        {shovel.fio_shov}
                      </div>
                      <div className={"card-body m-0 p-0"}>
                        {utils
                          .arrayToPages(shovel.list_peregruz_and_nedogruz, 60)
                          .map(
                            // @ts-ignore
                            (page, index_p) => (
                              <div
                                className={
                                  "d-flex border border-1 border-dark p-1 m-0"
                                }
                                key={index_p}
                              >
                                {page.map(
                                  // @ts-ignore
                                  (trip, index_t) => (
                                    <div
                                      className={"small col p-0 m-0"}
                                      key={index_t}
                                    >
                                      <div className="d-flex flex-column h-100 p-0 m-0">
                                        <div className="wrapper flex-grow-1 p-0 m-0"></div>
                                        <div
                                          title={`№${
                                            trip.vehid
                                          } | ${utils.getNormalTime(
                                            trip.timeload
                                          )}`}
                                          className={
                                            parseInt(trip.weight) < 92
                                              ? "bg-warning p-0 m-0"
                                              : "bg-danger p-0 m-0"
                                          }
                                          style={{
                                            width: 25,
                                            height: parseInt(trip.weight) * 2,
                                          }}
                                        >
                                          <div className={""}>
                                            {trip.weight}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            )
                          )}
                      </div>
                      <div className={"card-footer m-0 p-0"}></div>
                    </div>
                  </components.Accordion1>
                )
              )}
            </div>
          </div>
        )}
    </base.Base2>
  );
}
