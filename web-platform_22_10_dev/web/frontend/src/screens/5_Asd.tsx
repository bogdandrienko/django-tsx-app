import { Link } from "react-router-dom";
import React, { FormEvent, MouseEvent } from "react";
import axios from "axios";
import * as hook from "../components/hook";
import * as util from "../components/util";
import * as component from "../components/ui/component";

export default function Page() {
  const [monitoring, setMonitoring, resetMonitoring] = hook.useStateCustom1([]);
  const [delay, setDelay, resetDelay] = hook.useStateCustom1({ value: 500 });
  const [filterIdeaListForm, setFilterIdeaListForm, resetFilterIdeaListForm] =
    hook.useStateCustom1({
      sort: "дате публикации (свежие в начале)",
      moderate: "принято",
      subdivision: "",
      sphere: "",
      category: "",
      author: "",
      search: "",
    });
  async function GetMonitoring(event: MouseEvent<any>) {
    try {
      event.preventDefault();
      event.stopPropagation();
    } catch (error) {}
    await GetMonitoringData();
    setTimeout(() => GetMonitoring(event), delay.value);
  }
  async function GetMonitoringData() {
    const action = "Monitoring";
    const token =
      "pbkdf2_sha256$390000$aWV2vUbGxC6OYns3ZQw5q5$WqX/DUYyjIjA7X42p/paeS9gYlGd3dQsGk+ZUaxdB6Y=";
    //
    const formData = new FormData();
    const config = {
      url: `api/report/`,
      method: `GET`,
      timeout: 5000,
      headers: {
        Authorization: `action=${action};token=${token};`,
      },
      data: formData,
    };
    const response = await axios(config);
    console.log("Monitoring response: ", response);
    setMonitoring(response.data.response.data);
  }
  async function GetReportData(event: FormEvent<any>) {
    try {
      event.preventDefault();
      event.stopPropagation();
    } catch (error) {}
    const action = "Report";
    const token =
      "pbkdf2_sha256$390000$aWV2vUbGxC6OYns3ZQw5q5$WqX/DUYyjIjA7X42p/paeS9gYlGd3dQsGk+ZUaxdB6Y=";
    //
    const formData = new FormData();
    const config = {
      url: `api/report/`,
      method: `GET`,
      timeout: 5000,
      headers: {
        Authorization: `action=${action};token=${token};`,
      },
      data: formData,
    };
    const response = await axios(config);
    console.log("Monitoring response: ", response);
    setMonitoring(response.data.response.data);
  }
  return (
    <body className="d-flex flex-column vh-100">
      <main className="h-100">
        <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
          <Link to={"/"} className="navbar-brand col-md-3 col-lg-2 me-0 px-3">
            Модули
          </Link>
          <button
            className="navbar-toggler position-absolute d-md-none collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#sidebarMenu"
            aria-controls="sidebarMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <input
            className="form-control form-control-dark w-100 p-1"
            type="text"
            placeholder="Поиск"
            aria-label="Search"
          />
          <div className="navbar-nav">
            <div className="nav-item text-nowrap">
              <a className="nav-link px-3 p-1 mx-1 btn btn-danger" href="/">
                Выйти из системы
              </a>
            </div>
          </div>
        </header>
        <div className="container-fluid">
          <div className="">
            <main className="px-md-4">
              <div className="container">
                <div className="px-4 my-3 text-center">
                  <h1 className="display-5 fw-bold">
                    Автоматизированная система диспетчеризации
                  </h1>
                  <div className="col-lg-6 mx-auto">
                    <p className="lead mb-4">
                      дополнительные модули к закрытым системам, с учётом тех.
                      процесса и запросов предприятия
                    </p>
                  </div>
                </div>
                <div className={"m-3 p-3 border border-dark border-1 shadow"}>
                  <div>
                    <component.Accordion1
                      key_target={"accordion1"}
                      isCollapse={true}
                      title={
                        <span>
                          <i className="fa-solid fa-filter" /> Фильтрация, поиск
                          и сортировка:
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
                              GetReportData(event);
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
                                      <option
                                        className="m-0 p-0"
                                        value="энергоуправление"
                                      >
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
                                      <option
                                        className="m-0 p-0"
                                        value="технологическая"
                                      >
                                        технологическая
                                      </option>
                                      <option
                                        className="m-0 p-0"
                                        value="не технологическая"
                                      >
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
                                      <option
                                        className="m-0 p-0"
                                        value="индустрия 4.0"
                                      >
                                        индустрия 4.0
                                      </option>
                                      <option
                                        className="m-0 p-0"
                                        value="инвестиции"
                                      >
                                        инвестиции
                                      </option>
                                      <option
                                        className="m-0 p-0"
                                        value="инновации"
                                      >
                                        инновации
                                      </option>
                                      <option
                                        className="m-0 p-0"
                                        value="модернизация"
                                      >
                                        модернизация
                                      </option>
                                      <option
                                        className="m-0 p-0"
                                        value="экология"
                                      >
                                        экология
                                      </option>
                                      <option
                                        className="m-0 p-0"
                                        value="спорт/культура"
                                      >
                                        спорт/культура
                                      </option>
                                      <option
                                        className="m-0 p-0"
                                        value="социальное/персонал"
                                      >
                                        социальное/персонал
                                      </option>
                                      <option
                                        className="m-0 p-0"
                                        value="другое"
                                      >
                                        другое
                                      </option>
                                    </select>
                                  </label>
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
                                            util.RegularExpression.GetRegexType(
                                              {
                                                numbers: true,
                                                cyrillic: true,
                                                space: true,
                                                punctuationMarks: true,
                                              }
                                            ),
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
                            </div>
                          </form>
                        </ul>
                      }
                    </component.Accordion1>
                  </div>
                </div>
                <div className={"m-3 p-3 border border-dark border-1 shadow"}>
                  <div>
                    <h6 className="lead fw-bold bold d-flex">
                      Мониторинг
                      <i className="fa-solid fa-credit-card m-0 p-1" />
                      <div className={"input-group w-50"}>
                        <button
                          onClick={GetMonitoring}
                          className={"btn btn-outline-success"}
                        >
                          Запустить мониторинг
                        </button>
                        <select
                          className="form-control form-control-sm text-center m-0 p-0"
                          required
                          value={delay.value}
                          onChange={(event) =>
                            setDelay({ value: parseInt(event.target.value) })
                          }
                        >
                          <option className="text-center m-0 p-0" value={500}>
                            0.5
                          </option>
                          <option className="text-center m-0 p-0" value={1000}>
                            1
                          </option>
                          <option className="text-center m-0 p-0" value={2000}>
                            2
                          </option>
                          <option className="text-center m-0 p-0" value={3000}>
                            3
                          </option>
                          <option className="text-center m-0 p-0" value={5000}>
                            5
                          </option>
                        </select>
                      </div>
                    </h6>
                    {monitoring.length > 0 && (
                      <table className="table table-sm table-condensed table-hover table-responsive table-responsive-sm table-bordered border-secondary small m-0 p-0">
                        <thead className="m-0 p-0">
                          <tr className="m-0 p-0">
                            <th className="text-center table-active w-25 m-0 p-1">
                              Тип
                            </th>
                            <th className="text-center table-active m-0 p-1">
                              Хоз. номер
                            </th>
                            <th className="text-center table-active m-0 p-1">
                              Статус
                            </th>
                            <th className="text-center table-active m-0 p-1">
                              Скорость
                            </th>
                            <th className="text-center table-active m-0 p-1">
                              Масса
                            </th>
                            <th className="text-center table-active m-0 p-1">
                              Время связи
                            </th>
                          </tr>
                        </thead>
                        <tbody className="m-0 p-0">
                          {monitoring.map(
                            // @ts-ignore
                            (item, index) => (
                              <tr key={index} className="m-0 p-0">
                                <td className="text-start fw-bold m-0 p-1">
                                  {item.type}
                                </td>
                                <td className="text-end fw-bold m-0 p-1">
                                  {item.id}
                                </td>
                                <td
                                  className={`text-end fw-bold m-0 p-1 ${
                                    item.status === "Ремонт"
                                      ? "text-warning"
                                      : item.status === "Простой"
                                      ? "text-danger"
                                      : ""
                                  }`}
                                >
                                  {item.status}
                                </td>
                                <td
                                  className={`text-center fw-bold m-0 p-1 ${
                                    item.speed > 18
                                      ? "text-danger"
                                      : item.speed <= 0
                                      ? "text-warning"
                                      : ""
                                  }`}
                                >
                                  {item.speed}
                                </td>
                                <td
                                  className={`text-center fw-bold m-0 p-1 ${
                                    item.mass > 95
                                      ? "text-danger"
                                      : item.mass <= 90
                                      ? "text-warning"
                                      : ""
                                  }`}
                                >
                                  {item.mass}
                                </td>
                                <td className="text-end fw-bold m-0 p-1">
                                  {item.time}
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
                <div className="container marketing">
                  <div className="row">
                    {[
                      {
                        title: "Мониторинг",
                        description:
                          "отображение в реальном времени текущих технологических показателей",
                        image: "",
                        link: "",
                      },
                      {
                        title: "Сложные алгоритмы",
                        description:
                          "реалиация сложных расчётов, которые не смогли реализовать разработчики АСД",
                        image: "",
                        link: "",
                      },
                      {
                        title: "Отчётность",
                        description:
                          "отображение данных за определённый период с фильтрами",
                        image: "",
                        link: "",
                      },
                      {
                        title: "Графики",
                        description: "аналитика по критериям в удобном виде",
                        image: "",
                        link: "",
                      },
                      {
                        title: "Внесение данных",
                        description:
                          "ручное внесение данных или экспорт из excel",
                        image: "",
                        link: "",
                      },
                    ].map(
                      (
                        item: {
                          image: string;
                          description: string;
                          link: string;
                          title: string;
                        },
                        index: any
                      ) => (
                        <div
                          key={index}
                          className="col-lg-4 col-md-6 col-sm-12 col-12"
                        >
                          <svg
                            className="bd-placeholder-img rounded-circle"
                            width="140"
                            height="140"
                            xmlns="http://www.w3.org/2000/svg"
                            role="img"
                            aria-label="Placeholder: 140x140"
                            preserveAspectRatio="xMidYMid slice"
                            focusable="false"
                          >
                            <title>{item.title}</title>
                            <rect width="100%" height="100%" fill="#777"></rect>
                            <text x="50%" y="50%" fill="#777" dy=".3em">
                              140x140
                            </text>
                          </svg>

                          <h2>{item.title}</h2>
                          <p>{item.description}</p>
                          <p>
                            <a className="btn btn-secondary" href="/">
                              Перейти »
                            </a>
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </main>
    </body>
  );
}
