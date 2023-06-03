// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as bases from "../components/ui/base";
import * as hooks from "../components/hooks";
import * as utils from "../components/utils";
import * as slices from "../components/slices";
import * as constants from "../components/constants";
import * as components from "../components/ui/components";
import * as modals from "../components/ui/modals";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function Page(): JSX.Element {
  // TODO store ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const taskReadStore = hooks.useSelectorCustom1(slices.tasks.taskReadStore);
  const taskUpdateStore = hooks.useSelectorCustom1(
    slices.tasks.taskUpdateStore
  );

  // TODO hooks ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();
  const id = useParams().id;

  const [ideaUpdateObject, setIdeaUpdateObject, resetIdeaUpdateObject] =
    hooks.useStateCustom1({
      title: "",
    });

  const [isModalConfirmIdeaUpdateVisible, setIsModalConfirmIdeaUpdateVisible] =
    useState(false);

  // TODO useEffect ////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (!taskReadStore.data) {
      dispatch(
        slices.tasks.taskReadStore.action({ form: { addToUrl: `/${id}` } })
      );
    }
  }, [taskReadStore.data]);

  useEffect(() => {
    resetIdea();
  }, []);

  useEffect(() => {
    resetIdea();
  }, [id]);

  useEffect(() => {
    if (taskUpdateStore.data) {
      resetIdea();
    }
  }, [taskUpdateStore.data]);

  useEffect(() => {
    if (taskReadStore.data) {
      setIdeaUpdateObject({
        ...ideaUpdateObject,
        title: taskReadStore.data.title,
      });
    }
  }, [taskReadStore.data]);

  // TODO function /////////////////////////////////////////////////////////////////////////////////////////////////////

  function resetIdea() {
    resetIdeaUpdateObject();
    dispatch({ type: slices.tasks.taskReadStore.constant.reset });
    dispatch({ type: slices.tasks.taskUpdateStore.constant.reset });
  }

  function UpdateIdea() {
    dispatch(
      slices.tasks.taskUpdateStore.action({
        form: { ...ideaUpdateObject, addToUrl: `/${id}` },
      })
    );
  }

  function FormIdeaUpdateSubmit(event: FormEvent<HTMLFormElement>) {
    utils.EventForm1(event, true, true, () => {
      setIsModalConfirmIdeaUpdateVisible(true);
    });
  }

  function FormIdeaUpdateReset(event: FormEvent<HTMLFormElement>) {
    utils.EventForm1(event, false, true, () => {
      resetIdea();
    });
  }

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    // @ts-ignore
    <bases.Base1
      title={"Change task page"}
      description={"change selected task"}
    >
      <modals.ModalConfirm1
        isModalVisible={isModalConfirmIdeaUpdateVisible}
        setIsModalVisible={setIsModalConfirmIdeaUpdateVisible}
        description={"Change task?"}
        callback={UpdateIdea}
      />
      <div className="btn-group m-0 p-1 text-start w-100">
        <Link to={"/tasks"} className="btn btn-sm btn-primary m-1 p-2">
          {"<="} назад к списку
        </Link>
      </div>
      <components.StatusStore1
        slice={slices.tasks.taskReadStore}
        consoleLog={constants.DEBUG_CONSTANT}
        showLoad={true}
        loadText={""}
        showData={false}
        dataText={""}
        showError={true}
        errorText={""}
        showFail={true}
        failText={""}
      />
      <components.StatusStore1
        slice={slices.tasks.taskUpdateStore}
        consoleLog={constants.DEBUG_CONSTANT}
        showLoad={true}
        loadText={""}
        showData={false}
        dataText={""}
        showError={true}
        errorText={""}
        showFail={true}
        failText={""}
      />
      {taskReadStore.data && (
        <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center text-center shadow m-0 p-1">
          <form
            className="m-0 p-0"
            onSubmit={(event) => {
              FormIdeaUpdateSubmit(event);
            }}
            onReset={(event) => {
              FormIdeaUpdateReset(event);
            }}
          >
            <div className="card shadow custom-background-transparent-low m-0 p-0">
              <div className="card-header bg-success bg-opacity-10 m-0 p-3">
                <h6 className="lead fw-bold m-0 p-0">
                  {taskReadStore.data.title}
                </h6>
              </div>
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
                    value={ideaUpdateObject.title}
                    onChange={(event) =>
                      setIdeaUpdateObject({
                        ...ideaUpdateObject,
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
                  className="btn btn-sm btn-primary m-1 p-2 custom-z-index-0"
                  type="submit"
                >
                  <i className="fa-solid fa-circle-check m-0 p-1" />
                  submit data
                </button>
                <button className="btn btn-sm btn-warning m-1 p-2" type="reset">
                  <i className="fa-solid fa-pen-nib m-0 p-1" />
                  reset data
                </button>
              </ul>
            </div>
          </form>
        </ul>
      )}
    </bases.Base1>
  );
}
