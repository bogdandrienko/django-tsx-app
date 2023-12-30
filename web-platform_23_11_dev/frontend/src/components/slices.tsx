// TODO download modules /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { Dispatch } from "redux";
import { combineReducers } from "@reduxjs/toolkit";

// TODO custom modules ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import * as utils from "./utils";
import * as constants from "./constants";

// TODO export ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const reducers = {};

export function ConnectReducer1(name: string, reducer: object) {
  // @ts-ignore
  reducers[name] = reducer;
}

export const centr = {
  centrMonitoringAsm: utils.ConstructorSlice1(
    "centrMonitoringAsm",
    ConnectReducer1,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          utils.ConstructorAction1(
            { ...args.form },
            `${constants.SERVER_HOST_AND_PORT_CONSTANT}communicator`, // ?param_subsystem=asm
            constants.HttpMethods.GET(),
            60000,
            utils.ConstantConstructor1("centrMonitoringAsm"),
            false
          )
        );
      };
    }
  ),
};
export const events = {
  eventsMonitoringDrainageStore: utils.ConstructorSlice1(
    "eventsMonitoringDrainageStore",
    ConnectReducer1,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          utils.ConstructorAction1(
            { ...args.form },
            `${constants.SERVER_HOST_AND_PORT_CONSTANT}events/monitoring/drainage`,
            constants.HttpMethods.GET(),
            60000,
            utils.ConstantConstructor1("eventsMonitoringDrainageStore"),
            false
          )
        );
      };
    }
  ),
  eventsMonitoringDumptrucksStore: utils.ConstructorSlice1(
    "eventsMonitoringDumptrucksStore",
    ConnectReducer1,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          utils.ConstructorAction1(
            { ...args.form },
            `${constants.SERVER_HOST_AND_PORT_CONSTANT}events/monitoring/dumptrucks`,
            constants.HttpMethods.GET(),
            60000,
            utils.ConstantConstructor1("eventsMonitoringDumptrucksStore"),
            false
          )
        );
      };
    }
  ),
};

export const speed = {
  speedMonitoringDumptrucksStore: utils.ConstructorSlice1(
    "speedMonitoringDumptrucksStore",
    ConnectReducer1,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          utils.ConstructorAction1(
            { ...args.form },
            `${constants.SERVER_HOST_AND_PORT_CONSTANT}speed/monitoring/dumptrucks`,
            constants.HttpMethods.GET(),
            60000,
            utils.ConstantConstructor1("speedMonitoringDumptrucksStore"),
            false
          )
        );
      };
    }
  ),
  speedSendCommentDumptrucksStore: utils.ConstructorSlice1(
    "speedSendCommentDumptrucksStore",
    ConnectReducer1,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          utils.ConstructorAction1(
            { ...args.form },
            `${constants.SERVER_HOST_AND_PORT_CONSTANT}speed/send_comment/dumptrucks`,
            constants.HttpMethods.POST(),
            60000,
            utils.ConstantConstructor1("speedSendCommentDumptrucksStore"),
            false
          )
        );
      };
    }
  ),
  speedReportDumptrucksStore: utils.ConstructorSlice1(
    "speedReportDumptrucksStore",
    ConnectReducer1,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          utils.ConstructorAction1(
            { ...args.form },
            `${constants.SERVER_HOST_AND_PORT_CONSTANT}speed/report/dumptrucks`,
            constants.HttpMethods.GET(),
            300000,
            utils.ConstantConstructor1("speedReportDumptrucksStore"),
            false
          )
        );
      };
    }
  ),
};
export const pto = {
  ptoMonitoringNormTripsStore: utils.ConstructorSlice1(
    "ptoMonitoringNormTripsStore",
    ConnectReducer1,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          utils.ConstructorAction1(
            { ...args.form },
            `${constants.SERVER_HOST_AND_PORT_CONSTANT}pto/monitoring/norm_trips`,
            constants.HttpMethods.GET(),
            60000,
            utils.ConstantConstructor1("ptoMonitoringNormTripsStore"),
            false
          )
        );
      };
    }
  ),
  ptoReportAsdErrorsStore: utils.ConstructorSlice1(
    "ptoReportAsdErrorsStore",
    ConnectReducer1,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          utils.ConstructorAction1(
            { ...args.form },
            `${constants.SERVER_HOST_AND_PORT_CONSTANT}pto/reports/asd_errors`,
            constants.HttpMethods.GET(),
            60000,
            utils.ConstantConstructor1("ptoReportAsdErrorsStore"),
            false
          )
        );
      };
    }
  ),
  ptoReportStickingStore: utils.ConstructorSlice1(
    "ptoReportStickingStore",
    ConnectReducer1,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          utils.ConstructorAction1(
            { ...args.form },
            `${constants.SERVER_HOST_AND_PORT_CONSTANT}pto/reports/sticking`,
            constants.HttpMethods.GET(),
            60000,
            utils.ConstantConstructor1("ptoReportStickingStore"),
            false
          )
        );
      };
    }
  ),
  ptoMonitoringOperStoppagesStore: utils.ConstructorSlice1(
    "ptoMonitoringOperStoppagesStore",
    ConnectReducer1,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          utils.ConstructorAction1(
            { ...args.form },
            `${constants.SERVER_HOST_AND_PORT_CONSTANT}pto/monitoring/oper_stoppages`,
            constants.HttpMethods.GET(),
            60000,
            utils.ConstantConstructor1("ptoMonitoringOperStoppagesStore"),
            false
          )
        );
      };
    }
  ),
  ptoReportTimeWaitToLoadStore: utils.ConstructorSlice1(
    "ptoReportTimeWaitToLoadStore",
    ConnectReducer1,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          utils.ConstructorAction1(
            { ...args.form },
            `${constants.SERVER_HOST_AND_PORT_CONSTANT}pto/reports/time_wait_to_load`,
            constants.HttpMethods.GET(),
            60000,
            utils.ConstantConstructor1("ptoReportTimeWaitToLoadStore"),
            false
          )
        );
      };
    }
  ),
};

export const stoppages = {
  stoppagesReportAuxDvsStore: utils.ConstructorSlice1(
    "stoppagesReportAuxDvsStore",
    ConnectReducer1,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          utils.ConstructorAction1(
            { ...args.form },
            `${constants.SERVER_HOST_AND_PORT_CONSTANT}stoppages/report/aux_dvs`,
            constants.HttpMethods.GET(),
            120000,
            utils.ConstantConstructor1("stoppagesReportAuxDvsStore"),
            false
          )
        );
      };
    }
  ),
  stoppagesReportVehDvsStore: utils.ConstructorSlice1(
    "stoppagesReportVehDvsStore",
    ConnectReducer1,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          utils.ConstructorAction1(
            { ...args.form },
            `${constants.SERVER_HOST_AND_PORT_CONSTANT}stoppages/report/veh_dvs`,
            constants.HttpMethods.GET(),
            120000,
            utils.ConstantConstructor1("stoppagesReportVehDvsStore"),
            false
          )
        );
      };
    }
  ),
  emptyPeregonReportDumptrucksStore: utils.ConstructorSlice1(
    "emptyPeregonReportDumptrucksStore",
    ConnectReducer1,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          utils.ConstructorAction1(
            { ...args.form },
            `${constants.SERVER_HOST_AND_PORT_CONSTANT}stoppages/report/empty_peregon`,
            constants.HttpMethods.GET(),
            120000,
            utils.ConstantConstructor1("emptyPeregonReportDumptrucksStore"),
            false
          )
        );
      };
    }
  ),
};

export const gto = {
  gtoReportDumptrucksStore: utils.ConstructorSlice1(
    "gtoReportDumptrucksStore",
    ConnectReducer1,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          utils.ConstructorAction1(
            { ...args.form },
            `${constants.SERVER_HOST_AND_PORT_CONSTANT}gto/report/dumptrucks`,
            constants.HttpMethods.GET(),
            300000,
            utils.ConstantConstructor1("gtoReportDumptrucksStore"),
            false
          )
        );
      };
    }
  ),
};

export const develop = {
  targetReportWeightLoadsReadListStore: utils.ConstructorSlice1(
    "targetReportWeightLoadsReadListStore",
    ConnectReducer1,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          utils.ConstructorAction1(
            { ...args.form },
            `${constants.SERVER_HOST_AND_PORT_CONSTANT}target/report/weight_loads`,
            constants.HttpMethods.GET(),
            120000,
            utils.ConstantConstructor1("targetReportWeightLoadsReadListStore"),
            false
          )
        );
      };
    }
  ),
  targetMonitoringWeightLoadsReadListStore: utils.ConstructorSlice1(
    "targetMonitoringWeightLoadsReadListStore",
    ConnectReducer1,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          utils.ConstructorAction1(
            { ...args.form },
            `${constants.SERVER_HOST_AND_PORT_CONSTANT}target/monitoring/weight_loads`,
            constants.HttpMethods.GET(),
            60000,
            utils.ConstantConstructor1(
              "targetMonitoringWeightLoadsReadListStore"
            ),
            false
          )
        );
      };
    }
  ),
  tripsAnalyticListStore: utils.ConstructorSlice1(
    "tripsAnalyticListStore",
    ConnectReducer1,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          utils.ConstructorAction1(
            { ...args.form },
            `${constants.SERVER_HOST_AND_PORT_CONSTANT}pto/analytic_tech`,
            constants.HttpMethods.GET(),
            20000,
            utils.ConstantConstructor1("tripsAnalyticListStore"),
            false
          )
        );
      };
    }
  ),
};

export const old = {
  captchaCheckStore: utils.ConstructorSlice1(
    "captchaCheckStore", // const constantName = randomUUID();
    ConnectReducer1,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          utils.ConstructorAction1(
            { ...args.form },
            `${constants.SERVER_HOST_AND_PORT_CONSTANT}captcha`,
            constants.HttpMethods.GET(),
            5000,
            utils.ConstantConstructor1("captchaCheckStore"), // const constantName = randomUUID();
            false
          )
        );
      };
    }
  ),
  userRegisterStore: utils.ConstructorSlice1(
    "userRegisterStore",
    ConnectReducer1,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          utils.ConstructorAction1(
            { ...args.form },
            `${constants.SERVER_HOST_AND_PORT_CONSTANT}users/register`,
            constants.HttpMethods.POST(),
            10000,
            utils.ConstantConstructor1("userRegisterStore"),
            false
          )
        );
      };
    }
  ),
  userLoginStore: utils.ConstructorSlice1(
    "userLoginStore",
    ConnectReducer1,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          utils.ConstructorAction1(
            { ...args.form },
            `${constants.SERVER_HOST_AND_PORT_CONSTANT}login`,
            constants.HttpMethods.POST(),
            10000,
            utils.ConstantConstructor1("userLoginStore"),
            false,
            true
          )
        );
      };
    }
  ),
  userReadListStore: utils.ConstructorSlice1(
    "userReadListStore",
    ConnectReducer1,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          utils.ConstructorAction1(
            { ...args.form },
            `${constants.SERVER_HOST_AND_PORT_CONSTANT}users`,
            constants.HttpMethods.GET(),
            10000,
            utils.ConstantConstructor1("userReadListStore"),
            false
          )
        );
      };
    }
  ),
  taskReadStore: utils.ConstructorSlice1(
    "taskReadStore",
    ConnectReducer1,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          utils.ConstructorAction1(
            { ...args.form },
            `${constants.SERVER_HOST_AND_PORT_CONSTANT}tasks`,
            constants.HttpMethods.GET(),
            10000,
            utils.ConstantConstructor1("taskReadStore"),
            true
          )
        );
      };
    }
  ),
  taskReadListStore: utils.ConstructorSlice1(
    "taskReadListStore",
    ConnectReducer1,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          utils.ConstructorAction1(
            { ...args.form },
            `${constants.SERVER_HOST_AND_PORT_CONSTANT}tasks`,
            constants.HttpMethods.GET(),
            10000,
            utils.ConstantConstructor1("taskReadListStore"),
            true
          )
        );
      };
    }
  ),
  taskPostStore: utils.ConstructorSlice1(
    "taskPostStore",
    ConnectReducer1,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          utils.ConstructorAction1(
            { ...args.form },
            `${constants.SERVER_HOST_AND_PORT_CONSTANT}tasks`,
            constants.HttpMethods.POST(),
            10000,
            utils.ConstantConstructor1("taskPostStore"),
            true
          )
        );
      };
    }
  ),
  taskUpdateStore: utils.ConstructorSlice1(
    "taskUpdateStore",
    ConnectReducer1,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          utils.ConstructorAction1(
            { ...args.form },
            `${constants.SERVER_HOST_AND_PORT_CONSTANT}tasks`,
            constants.HttpMethods.PUT(),
            10000,
            utils.ConstantConstructor1("taskUpdateStore"),
            true
          )
        );
      };
    }
  ),
  taskDeleteStore: utils.ConstructorSlice1(
    "taskDeleteStore",
    ConnectReducer1,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          utils.ConstructorAction1(
            { ...args.form },
            `${constants.SERVER_HOST_AND_PORT_CONSTANT}tasks`,
            constants.HttpMethods.DELETE(),
            10000,
            utils.ConstantConstructor1("taskDeleteStore"),
            true
          )
        );
      };
    }
  ),
};

export const reducer = combineReducers(reducers);
