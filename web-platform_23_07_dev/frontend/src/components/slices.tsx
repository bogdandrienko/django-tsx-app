import { Dispatch } from "redux";
import * as utils from "./utils";
import * as constants from "./constants";
import { combineReducers } from "@reduxjs/toolkit";

export const reducers = {};

export function ConnectReducer1(name: string, reducer: object) {
  // @ts-ignore
  reducers[name] = reducer;
}

export const captcha = {
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
};

export const user = {
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
};
export const target = {
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
  targetReportAvgSpeedReadListStore: utils.ConstructorSlice1(
    "targetReportAvgSpeedReadListStore",
    ConnectReducer1,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          utils.ConstructorAction1(
            { ...args.form },
            `${constants.SERVER_HOST_AND_PORT_CONSTANT}target/report/avg_speed`,
            constants.HttpMethods.GET(),
            120000,
            utils.ConstantConstructor1("targetReportAvgSpeedReadListStore"),
            false
          )
        );
      };
    }
  ),
};

export const events = {
  drainageReadListStore: utils.ConstructorSlice1(
    "drainageReadListStore",
    ConnectReducer1,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          utils.ConstructorAction1(
            { ...args.form },
            `${constants.SERVER_HOST_AND_PORT_CONSTANT}events/drainage`,
            constants.HttpMethods.GET(),
            10000,
            utils.ConstantConstructor1("drainageReadListStore"),
            false
          )
        );
      };
    }
  ),
  dumptrucksReadListStore: utils.ConstructorSlice1(
    "dumptrucksReadListStore",
    ConnectReducer1,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          utils.ConstructorAction1(
            { ...args.form },
            `${constants.SERVER_HOST_AND_PORT_CONSTANT}events/dumptrucks`,
            constants.HttpMethods.GET(),
            10000,
            utils.ConstantConstructor1("dumptrucksReadListStore"),
            false
          )
        );
      };
    }
  ),
  atcAvgSpeedReadListStore: utils.ConstructorSlice1(
    "atcAvgSpeedReadListStore",
    ConnectReducer1,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          utils.ConstructorAction1(
            { ...args.form },
            `${constants.SERVER_HOST_AND_PORT_CONSTANT}atc/avg_speed`,
            constants.HttpMethods.GET(),
            30000,
            utils.ConstantConstructor1("atcAvgSpeedReadListStore"),
            false
          )
        );
      };
    }
  ),
  atcAuxStoppagesReadListStore: utils.ConstructorSlice1(
    "atcAuxStoppagesReadListStore",
    ConnectReducer1,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          utils.ConstructorAction1(
            { ...args.form },
            `${constants.SERVER_HOST_AND_PORT_CONSTANT}atc/aux_stoppages`,
            constants.HttpMethods.GET(),
            300000,
            utils.ConstantConstructor1("atcAuxStoppagesReadListStore"),
            false
          )
        );
      };
    }
  ),
  atcVehStoppagesReadListStore: utils.ConstructorSlice1(
    "atcVehStoppagesReadListStore",
    ConnectReducer1,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          utils.ConstructorAction1(
            { ...args.form },
            `${constants.SERVER_HOST_AND_PORT_CONSTANT}atc/veh_stoppages`,
            constants.HttpMethods.GET(),
            30000,
            utils.ConstantConstructor1("atcVehStoppagesReadListStore"),
            false
          )
        );
      };
    }
  ),
};

export const analyse = {
  tripsReadListStore: utils.ConstructorSlice1(
    "tripsReadListStore",
    ConnectReducer1,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          utils.ConstructorAction1(
            { ...args.form },
            `${constants.SERVER_HOST_AND_PORT_CONSTANT}analyse/vehtrips`,
            constants.HttpMethods.GET(),
            10000,
            utils.ConstantConstructor1("tripsReadListStore"),
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
  operstoppagesListStore: utils.ConstructorSlice1(
    "operstoppagesListStore",
    ConnectReducer1,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          utils.ConstructorAction1(
            { ...args.form },
            `${constants.SERVER_HOST_AND_PORT_CONSTANT}pto/operative_stoppages`,
            constants.HttpMethods.GET(),
            10000,
            utils.ConstantConstructor1("operstoppagesListStore"),
            false
          )
        );
      };
    }
  ),
};

export const tasks = {
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