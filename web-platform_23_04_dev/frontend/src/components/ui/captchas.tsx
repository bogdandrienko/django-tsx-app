// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState, MouseEvent } from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as slices from "../slices";
import * as hooks from "../hooks";
import * as utils from "../utils";
import * as constants from "../constants";
import * as components from "../ui/components";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

// TODO EXTRA ///

// export const LOAD_CAPTCHA = "ERROR";
// export const SUCCESS_CAPTCHA = "ERROR";
// export const ERROR_FRONTEND_CAPTCHA = "ERROR";
// export const ERROR_BACKEND_CAPTCHA = "ERROR";
// export const RESET_CAPTCHA = "ERROR";

// TODO EXTRA ///
export function CaptchaReducer (state = {}, action: { type: string; payload: any }) {
    switch (action.type) {
        case "LOAD_CAPTCHA": {
            return { load: true, data: undefined, error: undefined };
        }
        case "SUCCESS_CAPTCHA": {
            return { load: false, data: action.payload, error: undefined }; // action.payload = await axios.get('/token').data
        }
        case "ERROR_FRONTEND_CAPTCHA": {
            return { load: false, data: undefined, error: "Произошла ошибка (frontend)" };
        }
        case "ERROR_BACKEND_CAPTCHA": {
            return { load: false, data: undefined, error: "Произошла ошибка (backend)" };
        }
        case "RESET_CAPTCHA": {
            return { load: false, data: undefined, error: undefined };
        }
        default: {
            return state;
        }
    }
}


export const Captcha1 = () => {
    const dispatch = useDispatch();
    const captchaCheckStore = hooks.useSelectorCustom1(slices.captcha.captchaCheckStore);

    async function Check2(event: MouseEvent<HTMLDivElement>) {
        dispatch(slices.captcha.captchaCheckStore.action({id: 666}));
    }

    useEffect(() => {
        console.log("captchaCheckStore: ", captchaCheckStore)
    }, [captchaCheckStore]);

    useEffect(() => {
        if (captchaCheckStore.data) {
            utils.Delay(
                () =>
                    dispatch({ type: slices.captcha.captchaCheckStore.constant.reset }),
                60000
            );
        }
    }, [captchaCheckStore.data]);

    // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <div className="card">
            {!captchaCheckStore.data ? (
                <div className="card-header bg-danger bg-opacity-10 text-white m-0 p-1">
                    <i className="fa-solid fa-robot m-0 p-1 fw-bold lead" />
                    Пройдите проверку на робота!
                </div>
            ) : (
                <div className="card-header bg-success bg-opacity-10 text-white m-0 p-1">
                    <i className={"fa-solid fa-user-check m-0 p-1 fw-bold lead"} />
                    Вы успешно прошли проверку!
                </div>
            )}
            <components.StatusStore1
                slice={slices.captcha.captchaCheckStore}
                consoleLog={constants.DEBUG_CONSTANT}
                showData={false}
              />
            {!captchaCheckStore.load && !captchaCheckStore.data && (
                <div className="card-body m-1 p-3" onClick={(event) => Check2(event)}>
                    <i className="fa-solid fa-person btn btn-lg btn-outline-danger lead">
                        <small className="m-1 p-3">я не робот!</small>
                    </i>
                </div>
            )}
        </div>
    );
};
