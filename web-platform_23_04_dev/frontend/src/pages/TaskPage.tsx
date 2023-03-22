// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as base from "../components/ui/base";
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
  const taskDeleteStore = hooks.useSelectorCustom1(
    slices.tasks.taskDeleteStore
  );

  // TODO hooks ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useParams().id;
  const [isModalConfirmDeleteVisible, setIsModalConfirmDeleteVisible] =
    useState(false);

  // TODO useEffect ////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (!taskReadStore.data) {
      dispatch(
        slices.tasks.taskReadStore.action({
          form: { addToUrl: `/${Number(id)}` },
        })
      );
    }
  }, [taskReadStore.data]);

  useEffect(() => {
    resetState();
  }, []);

  useEffect(() => {
    resetState();
  }, [id]);

  useEffect(() => {
    if (taskDeleteStore.data) {
      utils.Delay(() => {
        dispatch({ type: slices.tasks.taskDeleteStore.constant.reset });
        dispatch({ type: slices.tasks.taskReadListStore.constant.reset });
        dispatch({ type: slices.tasks.taskReadStore.constant.reset });
        navigate("/tasks");
      }, 300);
    }
  }, [taskDeleteStore.data]);

  // TODO functions ////////////////////////////////////////////////////////////////////////////////////////////////////

  function resetState() {
    dispatch({ type: slices.tasks.taskReadStore.constant.reset });
  }

  function DeleteTask() {
    dispatch(
      slices.tasks.taskDeleteStore.action({
        form: { addToUrl: `/${id}` },
      })
    );
  }

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    // @ts-ignore
    <base.Base1
      title={"Task detail"}
      description={"details about selected task"}
    >
      <modals.ModalConfirm1
        isModalVisible={isModalConfirmDeleteVisible}
        setIsModalVisible={setIsModalConfirmDeleteVisible}
        description={"Delete task?"}
        callback={DeleteTask}
      />
      <div className="btn-group text-start w-100 m-0 p-0">
        <Link to={"/tasks"} className="btn btn-sm btn-primary m-1 p-2">
          {"<="} назад к списку
        </Link>
      </div>
      <components.StatusStore1
        slice={slices.tasks.taskReadStore}
        consoleLog={constants.DEBUG_CONSTANT}
        showData={false}
      />
      {taskReadStore.data && !taskReadStore.load && (
        <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center text-center shadow m-0 p-1">
          <div className="col-sm-12 col-md-6 col-lg-4 m-0 p-1">
            <div className="m-0 p-0">
              <div className="card shadow custom-background-transparent-low m-0 p-0">
                <div className="card-header bg-secondary bg-opacity-10 m-0 p-3">
                  <div className={"input-group"}>
                    <h6 className="lead fw-bold w-50 m-0 p-0">
                      {utils.GetSliceString(taskReadStore.data.title, 50)}
                    </h6>
                    <button
                      onClick={() => {
                        setIsModalConfirmDeleteVisible(true);
                        navigate(`/tasks/update/${id}`);
                      }}
                      className="btn btn-sm btn-outline-warning w-25 m-0 p-0"
                    >
                      <i className="fa-solid fa-screwdriver-wrench m-0 p-0"></i>
                    </button>
                    <button
                      onClick={() => {
                        setIsModalConfirmDeleteVisible(true);
                      }}
                      className="btn btn-sm btn-outline-danger w-25 m-0 p-0"
                    >
                      <i className="fa-solid fa-trash m-0 p-0"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ul>
      )}
    </base.Base1>
  );
}
