// TODO download modules /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// TODO custom modules ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import * as base from "../../components/ui/bases";
import * as components from "../../components/ui/components";
import * as utils from "../../components/utils";
import * as hooks from "../../components/hooks";
import * as slices from "../../components/slices";

// TODO export ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function Page() {
  // TODO stores /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const slice = slices.claim.claimList;
  const slice2 = slices.claim.claimUpdate;
  const store = hooks.useSelectorCust(slice);
  const store2 = hooks.useSelectorCust(slice2);

  // TODO hooks //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();
  const [state, setState]: any = useState(undefined);
  const [currentTime, setCurrentTime] = useState(utils.getCurrentDateTime());
  // TODO useEffects /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (store.data) {
      setState(store.data);
    }
  }, [store.data]);

  useEffect(() => {
    dispatch(slice.action({ form: {} }));
    setTimeout(async () => {
      setCurrentTime(utils.getCurrentDateTime());
    }, 10000);
  }, [currentTime]);

  useEffect(() => {
    if (store2.data) {
      setCurrentTime(utils.getCurrentDateTime());
    }
  }, [store2.data]);

  // TODO functions //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async function ChangeStatus(param_id: any) {
    dispatch(
      slice2.action({
        form: { param_id: param_id },
      }),
    );
  }

  // TODO return /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <base.Base3>
      <div className="bg-light container card">
        <div className="container mt-5">
          <div className="container-fluid">
            <div className="text-center">
              <h1 className="display-5 fw-bold fst-italic">Список заявок:</h1>
              <div className="col-lg-6 mx-auto">
                <p className="lead mb-1">
                  эта страница содержит список со всеми поданными заявками
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={"m-0 p-0 pt-1"}>
          <div>
            <div className="container-fluid text-center">
              <div className={"w-100"}>
                <components.StatusStore1
                  slice={slice}
                  // consoleLog={constants.DEBUG}
                  consoleLog={false}
                  showLoad={false}
                  showData={false}
                  showError={true}
                  showFail={true}
                />
              </div>
              <div className={"w-100"}>
                <components.StatusStore1
                  slice={slice2}
                  // consoleLog={constants.DEBUG}
                  consoleLog={false}
                  showLoad={false}
                  showData={false}
                  showError={true}
                  showFail={true}
                />
              </div>
              <button
                className="btn btn-lg btn-outline-primary w-50"
                onClick={() => {
                  setCurrentTime(utils.getCurrentDateTime());
                }}
              >
                обновить
              </button>
            </div>
          </div>
        </div>

        <hr className={"m-3 p-0"} />

        <div className="small m-0 p-0">
          {(store.fail === undefined || store.error === undefined) &&
          state &&
          state.data ? (
            <div>
              <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-body-tertiary">
                <div className="list-group list-group-flush border-bottom scrollarea">
                  {state.data.map((item: any, index: number) => (
                    <div
                      key={item.id}
                      className={
                        item.is_active
                          ? "card rounded-3 shadow-sm border-danger border-3 m-0 p-0 mb-3"
                          : "card rounded-3 shadow-sm border-success border-3 m-0 p-0 mb-3"
                      }
                    >
                      <div className="card-header text-bg-secondary border-primary m-0 p-1">
                        <div className="d-flex w-100 align-items-center justify-content-between m-0 p-1">
                          <strong className="text-start lead small">
                            {item.author}
                          </strong>
                          <small className={"text-center"}>{item.tech}</small>
                          <small className={"text-end"}>
                            <button
                              className={
                                item.is_active
                                  ? "btn btn-sm btn-danger"
                                  : "btn btn-sm btn-success"
                              }
                              onClick={() => ChangeStatus(item.id)}
                            >
                              {item.is_active ? (
                                <i className="fa-solid fa-xmark"></i>
                              ) : (
                                <i className="fa-solid fa-check"></i>
                              )}
                            </button>
                          </small>
                        </div>
                      </div>

                      <div className="card-body m-0 p-1">
                        <div className="d-flex w-100 align-items-center justify-content-between m-0 p-1">
                          <h6 className="card-title pricing-card-title">
                            {utils.DateTime.GetCleanDateTime(
                              item.created,
                              true,
                            )}
                            <small className="text-body-secondary fw-light">
                              /подано
                            </small>
                          </h6>
                          {!item.is_active && (
                            <h6 className="card-title pricing-card-title">
                              {utils.DateTime.GetCleanDateTime(
                                item.updated,
                                true,
                              )}
                              <small className="text-body-secondary fw-light">
                                /выполнено
                              </small>
                            </h6>
                          )}
                        </div>
                        <ul className="list-unstyled m-0 p-1">
                          <li>{item.description}</li>
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className={"display-1 text-center text-danger"}>
              ДАННЫХ НЕТ!
            </div>
          )}
        </div>
      </div>
    </base.Base3>
  );
}
