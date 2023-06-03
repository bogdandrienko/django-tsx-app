// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as base from "../components/ui/base";
import * as hooks from "../components/hooks";
import * as utils from "../components/utils";
import * as slices from "../components/slices";
import * as constants from "../components/constants";
import * as components from "../components/ui/components";
import * as paginators from "../components/ui/paginator";
import * as messages from "../components/ui/messages";
import * as modals from "../components/ui/modals";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function Page(): JSX.Element {
  // TODO store ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const taskReadListStore = hooks.useSelectorCustom1(
    slices.tasks.taskReadListStore
  );
  const userReadListStore = hooks.useSelectorCustom1(
    slices.user.userReadListStore
  );
  const taskDeleteStore = hooks.useSelectorCustom1(
    slices.tasks.taskDeleteStore
  );

  // TODO hook /////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();

  const [
    paginationIdeaListForm,
    setPaginationIdeaListForm,
    resetPaginationIdeaListForm,
  ] = hooks.useStateCustom1({
    page: 1,
    limit: 9,
    detailView: true,
  });

  const [filterIdeaListForm, setFilterIdeaListForm, resetFilterIdeaListForm] =
    hooks.useStateCustom1({
      sort: "дате публикации (свежие в начале)",
      moderate: "принято",
      subdivision: "",
      sphere: "",
      category: "",
      author: "",
      search: "",
    });

  const [isModalConfirmDeleteVisible, setIsModalConfirmDeleteVisible] =
    useState(false);
  const [idDelete, setIdDelete] = useState(0);

  // TODO useEffect ////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (!userReadListStore.data) {
      dispatch(slices.user.userReadListStore.action({}));
    }
  }, [userReadListStore.data]);

  useEffect(() => {
    if (taskDeleteStore.data) {
      utils.Delay(() => {
        dispatch({ type: slices.tasks.taskDeleteStore.constant.reset });
        dispatch({ type: slices.tasks.taskReadListStore.constant.reset });
      }, 300);
    }
  }, [taskDeleteStore.data]);

  useEffect(() => {
    if (!taskReadListStore.data) {
      dispatch(
        slices.tasks.taskReadListStore.action({
          form: { ...filterIdeaListForm, ...paginationIdeaListForm },
        })
      );
    }
  }, [taskReadListStore.data]);

  useEffect(() => {
    resetPaginationIdeaListForm();
    resetFilterIdeaListForm();
    dispatch({ type: slices.user.userReadListStore.constant.reset });
    dispatch({ type: slices.tasks.taskReadListStore.constant.reset });
  }, []);

  useEffect(() => {
    dispatch({ type: slices.tasks.taskReadListStore.constant.reset });
  }, [paginationIdeaListForm.page]);

  useEffect(() => {
    setPaginationIdeaListForm({ ...paginationIdeaListForm, page: 1 });
    dispatch({ type: slices.tasks.taskReadListStore.constant.reset });
  }, [paginationIdeaListForm.limit]);

  // TODO function /////////////////////////////////////////////////////////////////////////////////////////////////////

  function FormIdeaListSubmit(event: FormEvent<HTMLFormElement>) {
    utils.EventForm1(event, true, true, () => {
      setPaginationIdeaListForm({ ...paginationIdeaListForm, page: 1 });
      dispatch({ type: slices.tasks.taskReadListStore.constant.reset });
    });
  }

  function FormIdeaListReset(event: FormEvent<HTMLFormElement>) {
    utils.EventForm1(event, false, true, () => {
      resetPaginationIdeaListForm();
      resetFilterIdeaListForm();
      dispatch({ type: slices.tasks.taskReadListStore.constant.reset });
    });
  }

  function DeleteTask() {
    dispatch(
      slices.tasks.taskDeleteStore.action({
        form: { addToUrl: `/${idDelete}` },
      })
    );
  }

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    // @ts-ignore
    <base.Base1
      title={"Task list page"}
      description={"list all tasks with search and filter"}
    >
      <modals.ModalConfirm1
        isModalVisible={isModalConfirmDeleteVisible}
        setIsModalVisible={setIsModalConfirmDeleteVisible}
        description={"Delete task?"}
        callback={DeleteTask}
      />
      <components.Accordion1
        key_target={"accordion1"}
        isCollapse={true}
        title={
          <span>
            <i className="fa-solid fa-filter" /> Фильтрация, поиск и сортировка:
          </span>
        }
        text_style="text-success"
        header_style="bg-success bg-opacity-10 custom-background-transparent-low"
        body_style="bg-light bg-opacity-10 custom-background-transparent-low"
      >
        {
          <ul className="row-cols-auto row-cols-sm-auto row-cols-md-auto row-cols-lg-auto justify-content-center text-center m-0 p-0">
            <form
              className="m-0 p-0"
              onSubmit={(event) => {
                FormIdeaListSubmit(event);
              }}
              onReset={(event) => {
                FormIdeaListReset(event);
              }}
            >
              <div className="card shadow custom-background-transparent-hard m-0 p-0">
                <div className="card-header m-0 p-0">
                  <div className="m-0 p-0">
                    <label className="form-control-sm text-center m-0 p-1">
                      Сортировка по:
                      <select
                        className="form-control form-control-sm text-center m-0 p-1"
                        value={filterIdeaListForm.sort}
                        onChange={(e) =>
                          setFilterIdeaListForm({
                            ...filterIdeaListForm,
                            sort: e.target.value,
                          })
                        }
                      >
                        <option value="дате публикации (свежие в начале)">
                          дате публикации (свежие в начале)
                        </option>
                        <option value="дате публикации (свежие в конце)">
                          дате публикации (свежие в конце)
                        </option>
                        <option value="названию (с начала алфавита)">
                          названию (с начала алфавита)
                        </option>
                        <option value="названию (с конца алфавита)">
                          названию (с конца алфавита)
                        </option>
                      </select>
                    </label>
                    <label className="form-control-sm text-center m-0 p-1">
                      Подразделение:
                      <select
                        className="form-control form-control-sm text-center m-0 p-1"
                        value={filterIdeaListForm.subdivision}
                        onChange={(e) =>
                          setFilterIdeaListForm({
                            ...filterIdeaListForm,
                            subdivision: e.target.value,
                          })
                        }
                      >
                        <option className="m-0 p-0" value="">
                          все варианты
                        </option>
                        <option
                          className="m-0 p-0"
                          value="автотранспортное предприятие"
                        >
                          автотранспортное предприятие
                        </option>
                        <option
                          className="m-0 p-0"
                          value="горно-транспортный комплекс"
                        >
                          горно-транспортный комплекс
                        </option>
                        <option
                          className="m-0 p-0"
                          value="обогатительный комплекс"
                        >
                          обогатительный комплекс
                        </option>
                        <option
                          className="m-0 p-0"
                          value="управление предприятия"
                        >
                          управление предприятия
                        </option>
                        <option className="m-0 p-0" value="энергоуправление">
                          энергоуправление
                        </option>
                      </select>
                    </label>
                    <label className="form-control-sm text-center m-0 p-1">
                      Сфера:
                      <select
                        className="form-control form-control-sm text-center m-0 p-1"
                        value={filterIdeaListForm.sphere}
                        onChange={(e) =>
                          setFilterIdeaListForm({
                            ...filterIdeaListForm,
                            sphere: e.target.value,
                          })
                        }
                      >
                        <option className="m-0 p-0" value="">
                          все варианты
                        </option>
                        <option className="m-0 p-0" value="технологическая">
                          технологическая
                        </option>
                        <option className="m-0 p-0" value="не технологическая">
                          не технологическая
                        </option>
                      </select>
                    </label>
                    <label className="form-control-sm text-center m-0 p-1">
                      Категория:
                      <select
                        className="form-control form-control-sm text-center m-0 p-1"
                        value={filterIdeaListForm.category}
                        onChange={(e) =>
                          setFilterIdeaListForm({
                            ...filterIdeaListForm,
                            category: e.target.value,
                          })
                        }
                      >
                        <option className="m-0 p-0" value="">
                          все варианты
                        </option>
                        <option className="m-0 p-0" value="индустрия 4.0">
                          индустрия 4.0
                        </option>
                        <option className="m-0 p-0" value="инвестиции">
                          инвестиции
                        </option>
                        <option className="m-0 p-0" value="инновации">
                          инновации
                        </option>
                        <option className="m-0 p-0" value="модернизация">
                          модернизация
                        </option>
                        <option className="m-0 p-0" value="экология">
                          экология
                        </option>
                        <option className="m-0 p-0" value="спорт/культура">
                          спорт/культура
                        </option>
                        <option className="m-0 p-0" value="социальное/персонал">
                          социальное/персонал
                        </option>
                        <option className="m-0 p-0" value="другое">
                          другое
                        </option>
                      </select>
                    </label>
                    {userReadListStore.data && (
                      <label className="form-control-sm text-center m-0 p-1">
                        Автор:
                        <select
                          className="form-control form-control-sm text-center m-0 p-1"
                          value={filterIdeaListForm.author}
                          onChange={(e) =>
                            setFilterIdeaListForm({
                              ...filterIdeaListForm,
                              author: e.target.value,
                            })
                          }
                        >
                          <option className="m-0 p-0" value="">
                            все варианты
                          </option>
                          {userReadListStore.data.list.map(
                            (user = "", index = 0) => (
                              <option
                                key={index}
                                value={user}
                                className="m-0 p-0"
                              >
                                {user}
                              </option>
                            )
                          )}
                        </select>
                      </label>
                    )}
                    <components.StatusStore1
                      slice={slices.user.userReadListStore}
                      consoleLog={constants.DEBUG_CONSTANT}
                      showLoad={false}
                      showData={false}
                    />
                    <components.StatusStore1
                      slice={slices.tasks.taskReadListStore}
                      consoleLog={constants.DEBUG_CONSTANT}
                      showData={false}
                    />
                  </div>
                  <div className="m-0 p-0">
                    <label className="form-control-sm text-center w-75 m-0 p-1">
                      Поле поиска по части названия:
                      <input
                        type="text"
                        className="form-control form-control-sm text-center m-0 p-1"
                        placeholder="введите часть названия тут..."
                        value={filterIdeaListForm.search}
                        onChange={(e) =>
                          setFilterIdeaListForm({
                            ...filterIdeaListForm,
                            search: e.target.value.replace(
                              utils.RegularExpression.GetRegexType({
                                numbers: true,
                                cyrillic: true,
                                space: true,
                                punctuationMarks: true,
                              }),
                              ""
                            ),
                          })
                        }
                      />
                    </label>
                  </div>
                </div>
                <div className="card-body m-0 p-0">
                  <ul className="btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center m-0 p-0">
                    <button
                      className="btn btn-sm btn-primary m-1 p-2"
                      type="submit"
                    >
                      <i className="fa-solid fa-circle-check m-0 p-1" />
                      обновить
                    </button>
                    <button
                      className="btn btn-sm btn-warning m-1 p-2"
                      type="reset"
                    >
                      <i className="fa-solid fa-pen-nib m-0 p-1" />
                      сбросить
                    </button>
                  </ul>
                </div>

                <div className="card-footer text-end m-0 p-0">
                  <label className="form-control-sm text-center m-0 p-1">
                    Количество идей на странице:
                    <select
                      className="form-control form-control-sm text-center m-0 p-1"
                      value={paginationIdeaListForm.limit}
                      onChange={(event) =>
                        setPaginationIdeaListForm({
                          ...paginationIdeaListForm,
                          // @ts-ignore
                          limit: event.target.value,
                        })
                      }
                    >
                      <option disabled defaultValue={""} value="">
                        количество на странице
                      </option>
                      <option value="9">9</option>
                      <option value="18">18</option>
                      <option value="36">36</option>
                      <option value="-1">все</option>
                    </select>
                  </label>
                  <label className="form-control-sm form-switch text-center m-0 p-1">
                    Детальное отображение:
                    <input
                      type="checkbox"
                      className="form-check-input m-0 p-1"
                      id="flexSwitchCheckDefault"
                      checked={paginationIdeaListForm.detailView}
                      onChange={() =>
                        setPaginationIdeaListForm({
                          ...paginationIdeaListForm,
                          detailView: !paginationIdeaListForm.detailView,
                        })
                      }
                    />
                  </label>
                </div>
              </div>
            </form>
          </ul>
        }
      </components.Accordion1>
      <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
        <Link
          to="/tasks/create"
          className="text-decoration-none lead btn btn-primary btn-lg px-4 me-sm-3"
        >
          create new task
        </Link>
      </div>
      {!taskReadListStore.load && taskReadListStore.data && (
        <paginators.Pagination1
          totalObjects={taskReadListStore.data["x-total-count"]}
          limit={paginationIdeaListForm.limit}
          page={paginationIdeaListForm.page}
          // @ts-ignore
          changePage={(page) =>
            setPaginationIdeaListForm({
              ...paginationIdeaListForm,
              page: page,
            })
          }
        />
      )}
      <components.StatusStore1
        slice={slices.tasks.taskReadListStore}
        consoleLog={constants.DEBUG_CONSTANT}
        showData={false}
      />
      {!taskReadListStore.load && taskReadListStore.data ? (
        taskReadListStore.data.list.length > 0 ? (
          <div className={"m-0 p-0"}>
            {" "}
            {paginationIdeaListForm.detailView ? (
              <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center shadow text-center m-0 p-0 my-1">
                {taskReadListStore.data.list.map(
                  // @ts-ignore
                  (task, index) => (
                    <div
                      key={index}
                      className="col-sm-12 col-md-6 col-lg-4 m-0 p-1"
                    >
                      <div className="m-0 p-0">
                        <div className="card shadow custom-background-transparent-low m-0 p-0">
                          <div className="card-header bg-warning bg-opacity-10 m-0 p-3">
                            <div className={"input-group"}>
                              <Link
                                to={`/tasks/${task.id}`}
                                className="text-decoration-none text-dark w-75 m-0 p-0"
                              >
                                <h6 className="lead fw-bold m-0 p-0">
                                  {utils.GetSliceString(task.title, 50)}
                                </h6>
                              </Link>
                              <button
                                onClick={() => {
                                  setIdDelete(task.id);
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
                  )
                )}
              </ul>
            ) : (
              <div className="card shadow m-0 p-0 my-1">
                {taskReadListStore.data.list.map(
                  // @ts-ignore
                  (idea, index) => (
                    <Link
                      key={index}
                      to={`/idea/public/${idea.id}`}
                      className="text-decoration-none m-0 p-0"
                    >
                      <li className="border list-group-item-action text-start small m-0 p-1">
                        {utils.GetSliceString(idea.title, 50)}
                        {/*{utils.GetCleanDateTime(" | " + idea["updated"], true)}*/}
                        {/*{utils.GetSliceString(*/}
                        {/*    " | " + idea["author"]["last_name"],*/}
                        {/*    20*/}
                        {/*)}*/}
                        {/*{utils.GetSliceString(*/}
                        {/*    " " + idea["author"]["first_name"],*/}
                        {/*    20*/}
                        {/*)}*/}
                        {/*{utils.GetSliceString(*/}
                        {/*    " | " + idea["ratings"]["total_rate"],*/}
                        {/*    20*/}
                        {/*)}*/}
                        {/*{utils.GetSliceString(*/}
                        {/*    " / " + idea["ratings"]["count"],*/}
                        {/*    20*/}
                        {/*)}*/}
                      </li>
                    </Link>
                  )
                )}
              </div>
            )}
          </div>
        ) : (
          <messages.Message.Secondary>
            Ничего не найдено! Попробуйте изменить условия фильтрации и/или
            очистить строку поиска.
          </messages.Message.Secondary>
        )
      ) : (
        ""
      )}
      {!taskReadListStore.load && taskReadListStore.data && (
        <paginators.Pagination1
          totalObjects={taskReadListStore.data["x-total-count"]}
          limit={paginationIdeaListForm.limit}
          page={paginationIdeaListForm.page}
          // @ts-ignore
          changePage={(page) =>
            setPaginationIdeaListForm({
              ...paginationIdeaListForm,
              page: page,
            })
          }
        />
      )}
    </base.Base1>
  );
}
