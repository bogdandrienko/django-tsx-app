// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as bases from "../components/ui/base";
import * as hooks from "../components/hooks";
import * as utils from "../components/utils";
import * as slices from "../components/slices";
import * as constants from "../components/constants";
import * as components from "../components/ui/components";
import * as messages from "../components/ui/messages";
import * as modals from "../components/ui/modals";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function Page(): JSX.Element {
  // TODO store ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const ideaCreateStore = hooks.useSelectorCustom1(slices.tasks.taskPostStore);

  // TODO hooks ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ideaCreateObject, setIdeaCreateObject, resetIdeaCreateObject] =
    hooks.useStateCustom1({
      title: "",
    });

  const [
    isModalConfirmCreateCreateVisible,
    setIsModalConfirmCreateCreateVisible,
  ] = useState(false);

  // TODO useEffect ////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (ideaCreateStore.data) {
      utils.Delay(() => {
        if (ideaCreateStore.data) {
          resetIdeaCreateObject();
          dispatch({ type: slices.tasks.taskPostStore.constant.reset });
          navigate("/tasks");
        }
      }, 100);
    }
  }, [ideaCreateStore.data]);

  useEffect(() => {
    resetIdeaCreateObject();
    dispatch({ type: slices.tasks.taskPostStore.constant.reset });
  }, []);

  // TODO function /////////////////////////////////////////////////////////////////////////////////////////////////////

  function CreateIdea() {
    dispatch(
      slices.tasks.taskPostStore.action({ form: { ...ideaCreateObject } })
    );
  }

  function FormCreateSubmit(event: FormEvent<HTMLFormElement>) {
    utils.EventForm1(event, true, true, () => {
      setIsModalConfirmCreateCreateVisible(true);
    });
  }

  function FormCreateReset(event: FormEvent<HTMLFormElement>) {
    utils.EventForm1(event, false, true, () => {
      resetIdeaCreateObject();
      dispatch({ type: slices.tasks.taskPostStore.constant.reset });
    });
  }

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    // @ts-ignore
    <bases.Base1 title={"Create task page"} description={"create new task"}>
      <modals.ModalConfirm1
        isModalVisible={isModalConfirmCreateCreateVisible}
        setIsModalVisible={setIsModalConfirmCreateCreateVisible}
        description={"Send new task?"}
        callback={CreateIdea}
      />
      <components.Accordion1
        key_target={"accordion1"}
        isCollapse={false}
        title={"Rules:"}
        text_style="custom-color-warning-1"
        header_style="bg-warning bg-opacity-10 custom-background-transparent-low"
        body_style="bg-light bg-opacity-10 custom-background-transparent-low"
      >
        {
          <div className="text-center m-0 p-1">
            <ul className="text-start m-0 p-0">
              <li className="nav m-0 p-1">
                <h6 className="m-0 p-0">Use the correct data:</h6>
                <p className="small text-muted m-0 p-1">Without bad words</p>
              </li>
            </ul>
          </div>
        }
      </components.Accordion1>
      <components.StatusStore1
        slice={slices.tasks.taskPostStore}
        consoleLog={constants.DEBUG_CONSTANT}
      />
      {!ideaCreateStore.data && !ideaCreateStore.load && (
        <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center text-center shadow m-0 p-1">
          <form
            className="m-0 p-0"
            onSubmit={(event) => {
              FormCreateSubmit(event);
            }}
            onReset={(event) => {
              FormCreateReset(event);
            }}
          >
            <div className="card shadow custom-background-transparent-low m-0 p-0">
              <div className="card-header bg-success bg-opacity-10 m-0 p-2">
                <h6 className="lead fw-bold m-0 p-0">New task</h6>
                <h6 className="lead m-0 p-0">for future</h6>
              </div>
              <div className="card-body m-0 p-0">
                <div className="m-0 p-0">
                  <label className="form-control-sm text-center w-75 m-0 p-1">
                    Title:
                    <input
                      type="text"
                      className="form-control form-control-sm text-center m-0 p-1"
                      placeholder="input title here..."
                      minLength={1}
                      maxLength={200}
                      required
                      value={ideaCreateObject.title}
                      onChange={(event) =>
                        setIdeaCreateObject({
                          ...ideaCreateObject,
                          title: event.target.value.replace(
                            utils.RegularExpression.GetRegexType({
                              numbers: true,
                              latin: true,
                              space: true,
                            }),
                            ""
                          ),
                        })
                      }
                    />
                    <small className="custom-color-warning-1 m-0 p-0">
                      * only latin chars, numbers and space
                      <small className="text-muted m-0 p-0">
                        {" "}
                        * length: from 1 to 200 characters
                      </small>
                    </small>
                  </label>
                </div>
              </div>
              <div className="card-footer m-0 p-0">
                <ul className="btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center m-0 p-0">
                  <button
                    className={
                      "btn btn-sm btn-primary m-1 p-2 custom-z-index-0"
                    }
                    type="submit"
                  >
                    <i className="fa-solid fa-circle-check m-0 p-1" />
                    submit data
                  </button>
                  <button
                    className="btn btn-sm btn-warning m-1 p-2 custom-z-index-0"
                    type="reset"
                  >
                    <i className="fa-solid fa-pen-nib m-0 p-1" />
                    reset data
                  </button>
                </ul>
              </div>
            </div>
          </form>
        </ul>
      )}
    </bases.Base1>
  );
}
