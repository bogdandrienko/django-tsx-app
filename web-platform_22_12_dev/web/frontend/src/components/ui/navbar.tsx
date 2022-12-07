// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Button,
  Offcanvas,
} from "react-bootstrap";
// @ts-ignore
import { LinkContainer } from "react-router-bootstrap";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as hook from "../hook";
import * as router from "../router";
import * as util from "../util";
import * as context from "../context";
import * as button from "./button";
import * as slice from "../slice";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export const NavbarComponent1 = () => {
  // TODO store ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const userLoginStore = hook.useSelectorCustom2(slice.user.userLoginStore);
  const userDetailStore = hook.useSelectorCustom2(slice.user.userDetailStore);
  const notificationReadListStore = hook.useSelectorCustom2(
    slice.notification.notificationReadListStore
  );

  // TODO hooks ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const location = useLocation();

  // TODO variable /////////////////////////////////////////////////////////////////////////////////////////////////////

  const { title, description } = util.GetInfoPage(location.pathname);

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="m-0 p-0 pb-3">
      <util.PageLogic />
      <header className="header navbar-fixed-top bg-dark bg-opacity-10 shadow-lg m-0 p-0">
        <Navbar expand="lg" className="m-0 p-0">
          <Container className="">
            <a className="m-0 p-0" href="/">
              <img
                src="/static/img/logo.svg"
                className="img-responsive btn btn-outline-light m-0 p-2"
                alt="id"
              />
            </a>
            {notificationReadListStore.data &&
            notificationReadListStore.data.list.length > 0 ? (
              <span className="m-0 p-1">
                <i className="fa-solid fa-bell text-danger m-0 p-1" />
                {notificationReadListStore.data["x-total-count"]}
              </span>
            ) : (
              <span className="m-0 p-1">
                <i className="fa-solid fa-bell text-muted m-0 p-1" />0
              </span>
            )}
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              className="btn btn-success text-success bg-warning bg-opacity-50"
            >
              <span className="navbar-toggler-icon text-success" />
            </Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav" className="m-0 p-0">
              <Nav className="me-auto m-0 p-0">
                {router.modules.map(
                  (module, m_index) =>
                    util.CheckAccess(userDetailStore, module.Access) && (
                      <NavDropdown
                        title={
                          <span>
                            <i className={module.ModuleIcon} /> {module.Header}
                            {"  "}
                            {module.Header === "Профиль" &&
                              (notificationReadListStore.data &&
                              notificationReadListStore.data.list.length > 0 ? (
                                <span className="m-0 p-1">
                                  <i className="fa-solid fa-bell text-danger m-0 p-1" />
                                  {
                                    notificationReadListStore.data[
                                      "x-total-count"
                                    ]
                                  }
                                </span>
                              ) : (
                                <span className="m-0 p-1">
                                  <i className="fa-solid fa-bell text-muted m-0 p-1" />
                                  0
                                </span>
                              ))}
                          </span>
                        }
                        key={m_index}
                        id="basic-nav-dropdown"
                        className="btn btn-sm btn-dark custom-background-transparent-low-middle m-1 p-0"
                      >
                        {module.Sections.map(
                          (section, s_index) =>
                            util.CheckAccess(
                              userDetailStore,
                              section.Access
                            ) && (
                              <li className="m-0 p-1" key={s_index}>
                                <strong className="dropdown-header text-center m-0 p-0">
                                  {section.Header}
                                </strong>
                                {section.Links.map(
                                  (link, l_index) =>
                                    link.ShowLink &&
                                    util.CheckAccess(
                                      userDetailStore,
                                      link.Access
                                    ) && (
                                      <LinkContainer
                                        to={link.Link}
                                        className="custom-hover m-0 p-0"
                                        key={l_index}
                                      >
                                        <Nav.Link
                                          className={link.Style + " m-0 p-0"}
                                        >
                                          <span
                                            className={
                                              link.Style +
                                              " badge rounded-pill m-0 p-0"
                                            }
                                          >
                                            <i
                                              className={
                                                link.LinkIcon + " m-0 p-1"
                                              }
                                            />
                                          </span>
                                          <small>
                                            {link.Header}
                                            {"  "}
                                            {link.Header === "Уведомления" &&
                                              (notificationReadListStore.data &&
                                              notificationReadListStore.data
                                                .list.length > 0 ? (
                                                <span className="m-0 p-1">
                                                  <i className="fa-solid fa-bell text-danger m-0 p-1" />
                                                  {
                                                    notificationReadListStore
                                                      .data["x-total-count"]
                                                  }
                                                </span>
                                              ) : (
                                                <span className="m-0 p-1">
                                                  <i className="fa-solid fa-bell text-muted m-0 p-1" />
                                                  0
                                                </span>
                                              ))}
                                          </small>
                                        </Nav.Link>
                                      </LinkContainer>
                                    )
                                )}
                                <NavDropdown.Divider className="m-0 p-0" />
                              </li>
                            )
                        )}
                      </NavDropdown>
                    )
                )}
              </Nav>
              {!userLoginStore.data ? (
                <LinkContainer to="/login" className="text-center m-0 p-1 mx-1">
                  <Nav.Link className="m-0 p-0">
                    <button className="btn btn-sm btn-primary m-0 p-2">
                      Войти{" "}
                      <i className="fa-solid fa-arrow-right-to-bracket m-0 p-1" />
                    </button>
                  </Nav.Link>
                </LinkContainer>
              ) : (
                <LinkContainer
                  to="/logout"
                  className="text-center m-0 p-1 mx-1"
                >
                  <Nav.Link className="m-0 p-0">
                    <button className="btn btn-sm btn-danger m-0 p-2">
                      Выйти <i className="fa-solid fa-door-open m-0 p-1" />
                    </button>
                  </Nav.Link>
                </LinkContainer>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div className="container p-0 pt-1">
          <div className="card shadow custom-background-transparent-middle m-0 p-0">
            <div className="card-header bg-primary bg-opacity-10 m-0 p-1">
              <small className="display-6 fw-normal m-0 p-1">{title}</small>
            </div>
            <div className="card-body m-0 p-1">
              <p className="lead fw-normal text-muted m-0 p-1">{description}</p>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export const NavbarComponent2 = () => {
  // @ts-ignore
  const { isAuth, setIsAuth } = useContext(context.AuthContext);
  // @ts-ignore
  const logout = (event) => {
    event.preventDefault();
    setIsAuth(false);
    localStorage.removeItem("auth");
  };

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="custom_navbar_1">
      <button.Button1 onClick={logout}>logout</button.Button1>
      <div className="custom_navbar_1_links">
        <Link to="/" className="custom_navbar_1_link">
          home
        </Link>
      </div>
    </div>
  );
};

export const NavbarComponent3 = () => {
  // @ts-ignore
  const { isAuth, setIsAuth } = useContext(context.AuthContext);
  // @ts-ignore
  const logout = (event) => {
    event.preventDefault();
    setIsAuth(false);
    localStorage.removeItem("auth");
  };

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <header className="p-3 bg-dark text-white">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a
            href="/frontend_template_pwa_typescript/src/pages"
            className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
          >
            <svg
              className="bi me-2"
              width="40"
              height="32"
              role="img"
              aria-label="Bootstrap"
            />
          </a>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <a href="#" className="nav-link px-2 text-secondary">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-2 text-white">
                Features
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-2 text-white">
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-2 text-white">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-2 text-white">
                About
              </a>
            </li>
          </ul>

          <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
            <input
              type="search"
              className="form-control form-control-dark"
              placeholder="Search..."
              aria-label="Search"
            />
          </form>

          <div className="text-end">
            <button type="button" className="btn btn-danger" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export const NavbarComponent4 = () => {
  return (
    <header className="p-3 bg-dark text-white">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <Link
            to="/"
            className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
          >
            <svg
              className="bi me-2"
              width="40"
              height="32"
              role="img"
              aria-label="Bootstrap"
            />
          </Link>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <Link to="/" className="nav-link px-2 text-secondary">
                Главная
              </Link>
            </li>
            <li>
              <Link to="/" className="nav-link px-2 text-white">
                Инструкции
              </Link>
            </li>
            <li>
              <Link to="/vision" className="nav-link px-2 text-white">
                CV+
              </Link>
            </li>
            <li>
              <Link to="/" className="nav-link px-2 text-white">
                ТОиР
              </Link>
            </li>
            <li>
              <Link to="/" className="nav-link px-2 text-white">
                АСД
              </Link>
            </li>
          </ul>

          <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
            <input
              type="search"
              className="form-control form-control-dark"
              placeholder="Искать..."
              aria-label="Search"
            />
          </form>

          <div className="text-end">
            <button type="button" className="btn btn-danger">
              Выйти из системы
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

//@ts-ignore
export function NavbarComponent5({ name, ...props }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  return (
    <div>
      <Button
        variant="outline-secondary"
        onClick={toggleShow}
        className="w-100 p-3"
      >
        {name}
      </Button>
      <Offcanvas
        show={show}
        onHide={handleClose}
        {...props}
        className={"custom_offcanvas_1"}
      >
        <Offcanvas.Header closeButton onClick={handleClose}>
          <Offcanvas.Title>
            <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-1 justify-content-center text-center shadow m-0 p-1">
              <div className={"d-flex justify-content-between"}>
                <span className={"text-dark lead"}>скрыть</span>
                <i className="fa-solid fa-arrow-up-from-bracket ms-3 p-1"></i>
              </div>
            </ul>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 justify-content-center text-start m-0 p-0">
            <LinkContainer
              to="/"
              className="custom-active-dark custom-hover m-0 p-1"
            >
              <Nav.Link className="text-dark lead m-0 p-0">
                <i className="fa-solid fa-earth-asia m-0 p-1"></i>
                Домашняя страница
              </Nav.Link>
            </LinkContainer>
            <NavDropdown
              title={
                <span className={"text-dark lead"}>
                  <i className="fa-solid fa-address-card p-1"></i>
                  Личный Профиль
                </span>
              }
              id="navbarScrollingDropdown"
            >
              <LinkContainer
                to="/login"
                className="custom-active-dark custom-hover m-0 p-1"
              >
                <Nav.Link className="text-dark m-0 p-0">
                  <i className="fa-solid fa-user m-0 p-1"><i className="fa-solid fa-arrow-right-to-bracket m-0 p-1"></i></i>
                  Вход в систему
                </Nav.Link>
              </LinkContainer>
              <NavDropdown.Divider />
              <LinkContainer
                to="/logout"
                className="custom-active-dark custom-hover m-0 p-1"
              >
                <Nav.Link className="text-dark m-0 p-0">
                  <i className="fa-solid fa-door-open m-0 p-1"></i>
                  Выйти из системы
                </Nav.Link>
              </LinkContainer>
            </NavDropdown>
            <NavDropdown
              title={
                <span className={"text-dark lead"}>
                  <i className="fa-solid fa-book-open p-1"></i>
                  Инструкции по системе
                </span>
              }
              id="navbarScrollingDropdown"
            >
              <NavDropdown.Item href="#action3">
                Видео-инструкции
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action4">
                Текстовые инструкции
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title={
                <span className={"text-dark lead"}>
                  <i className="fa-solid fa-brain p-1"></i>
                  Интеллектуальные системы <br />
                  (CV+)
                </span>
              }
              id="navbarScrollingDropdown"
            >
              <NavDropdown.Item href="#action3">
                Машинное зрение
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action4">
                Нейронные сети
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action4">Биг дата</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Глубокое обучение
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title={
                <span className={"text-dark lead"}>
                  <i className="fa-solid fa-eye p-1"></i>
                  Предиктивная аналитика <br />
                  (ТОиР)
                </span>
              }
              id="navbarScrollingDropdown"
            >
              <NavDropdown.Item href="#action3">
                Внесение данных
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action4">Графики</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action4">Отчётность</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Прогнозирование
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title={
                <span className={"text-dark lead"}>
                  <i className="fa-solid fa-vr-cardboard p-1"></i>
                  Виртуальная и дополненная <br />
                  реальность (VR/AR)
                </span>
              }
              id="navbarScrollingDropdown"
            >
              <NavDropdown.Item href="#action3">
                Виртуальная реальность
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action4">
                Дополненная реальность
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title={
                <span className={"text-dark lead"}>
                  <i className="fa-solid fa-tachograph-digital p-1"></i>
                  Автоматизированная система <br />
                  диспетчеризации (АСД)
                </span>
              }
              id="navbarScrollingDropdown"
            >
              <LinkContainer
                to="/asd_report"
                className="custom-active-dark custom-hover m-0 p-1"
              >
                <Nav.Link className="text-dark m-0 p-0">
                  <i className="fa-solid fa-circle-info m-0 p-1"></i>
                  Мониторинг
                </Nav.Link>
              </LinkContainer>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action4">
                Сложные алгоритмы
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <LinkContainer
                to="/asd_report"
                className="custom-active-dark custom-hover m-0 p-1"
              >
                <Nav.Link className="text-dark m-0 p-0">
                  <i className="fa-solid fa-rectangle-list p-1"></i>
                  Отчётность
                </Nav.Link>
              </LinkContainer>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">Графики</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Внесение данных
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title={
                <span className={"text-dark lead"}>
                  <i className="fa-solid fa-square-up-right p-1"></i>Внешние
                  системы
                </span>
              }
              id="navbarScrollingDropdown"
            >
              <NavDropdown.Item href="#action3">
                Позиционирование персонала
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action4">
                Мониторинг выбросов
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action4">Биг дата</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Контроль усталости
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Датчики и контроллеры
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title={
                <span className={"text-dark lead"}>
                  <i className="fa-solid fa-user-tie p-1"></i>
                  Служба управления <br />
                  персоналом (HR)
                </span>
              }
              id="navbarScrollingDropdown"
            >
              <NavDropdown.Item href="#action3">
                Расчётный лист
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action4">
                Справка с места работы
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action4">Отпуск</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">Личное дело</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Библиотека и акты
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title={
                <span className={"text-dark lead"}>
                  <i className="fa-solid fa-laptop-code p-1"></i>1C
                </span>
              }
              id="navbarScrollingDropdown"
            >
              <NavDropdown.Item href="#action3">
                Интеграция с 1С
              </NavDropdown.Item>
            </NavDropdown>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
