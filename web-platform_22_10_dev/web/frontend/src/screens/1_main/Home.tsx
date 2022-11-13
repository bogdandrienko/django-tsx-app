import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CounterCustom from "../../components/CounterCustom";
import CounterRedux from "../../components/CounterRedux";
import * as actions from "../../components/Actions";
import * as base from "../../components/ui/base";
import * as sidebar from "../../components/ui/sidebar";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";

export function Sidebar3() {
  return (
    <nav
      id="sidebarMenu"
      className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
    >
      <div className="position-sticky pt-3">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to={"/vision"} className="nav-link text-dark">
              <i className="fa-solid fa-brain p-1"></i>
              Интеллектуальные системы
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/predictivity"} className="nav-link text-dark">
              <i className="fa-solid fa-eye p-1"></i>
              Предиктивная аналитика
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/virtual"} className="nav-link text-dark">
              <i className="fa-solid fa-vr-cardboard p-1"></i>
              Виртуальная и дополненная реальность (VR/AR)
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/asd"} className="nav-link text-dark">
              <i className="fa-solid fa-tachograph-digital p-1"></i>
              Автоматизированная система диспетчеризации (АСД)
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/external"} className="nav-link text-dark">
              <i className="fa-solid fa-square-up-right p-1"></i>
              Внешние интеграции
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/sup"} className="nav-link text-dark">
              <i className="fa-solid fa-user-tie p-1"></i>
              Служба управления персоналом
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/"} className="nav-link text-dark">
              <i className="fa-solid fa-laptop-code p-1"></i>
              1С
            </Link>
          </li>
        </ul>
        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>Вспомогательное</span>
          <Link
            to={"/"}
            className="link-secondary text-primary"
            aria-label="Add a new report"
          >
            <i className="fa-solid fa-circle-arrow-up p-1"></i>
          </Link>
        </h6>
        <ul className="nav flex-column mb-2">
          <li className="nav-item">
            <Link
              to={"/instructions"}
              className="nav-link text-dark"
              aria-current="page"
            >
              <i className="fa-solid fa-book-open p-1"></i>
              Инструкции по системе
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/"} className="nav-link text-dark" aria-current="page">
              <i className="fa-solid fa-address-card p-1"></i>
              Личный Профиль
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

// @ts-ignore
export function Base7(props = { children: any, isSidebar: boolean }) {
  return (
    <body className="d-flex flex-column vh-100">
      <main className="h-100">
        <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
          <Link to={"/"} className="navbar-brand col-md-3 col-lg-2 me-0 px-3">
            Главная
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
              <Link
                to={"/login"}
                className="nav-link px-3 p-1 mx-1 btn btn-danger"
              >
                Выйти из системы
              </Link>
            </div>
          </div>
        </header>
        <div className="container-fluid">
          <div className="row">
            {props.isSidebar && <Sidebar3 />}
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
              {props.children}
            </main>
          </div>
        </div>
      </main>
    </body>
  );
}

export function Page1() {
  return (
    <Base7 isSidebar={true}>
      <div className="container">
        <div className="px-4 py-1 my-3 text-center">
          <h1 className="display-5 fw-bold">
            Цифровой двойник (ЦД) предприятия
          </h1>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">
              Это комплекс актуальных моделей технологических и бизнес
              процессов. При эксплуатации система состоит из нескольких
              составляющих:
            </p>
            <p>
              <ul>
                <li>мониторинг в реальном времени</li>
                <li>уведомления по критериям</li>
                <li>управление "умными" тех. процессами</li>
                <li>отчётность по заданным параметрам</li>
              </ul>
            </p>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <Link to={"/"} className="btn btn-primary btn-lg px-4 gap-3">
                Модули
              </Link>
              <Link to={"/"} className="btn btn-outline-secondary btn-lg px-4">
                К инструкциям
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Base7>
  );
}

export default function Page() {
  return (
    // https://react-bootstrap.github.io/components/offcanvas/

    <main className={"d-flex flex-column vh-100"}>
      <section className={"h-100"}>
        <header>
          <OffcanvasExample />
        </header>
        <header className={"border border-5 border-primary border-bottom p-1"}>
          <div className={"container container-fluid"}>
            <div className="d-flex align-items-center justify-content-center">
              <ul className="nav me-auto justify-content-center">
                <li>
                  <a href="#" className="nav-link link-dark">
                    Ссылка
                  </a>
                </li>
                <li>
                  <a href="#" className="nav-link link-secondary">
                    Ссылка
                  </a>
                </li>
              </ul>
              <form className="w-25">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Искать..."
                />
              </form>
              <div className="dropdown text-end m-1">
                <a
                  href="#"
                  className="d-block link-dark text-decoration-none dropdown-toggle"
                  id="dropdownUser1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="https://github.com/mdo.png"
                    alt="mdo"
                    width="32"
                    height="32"
                    className="rounded-circle"
                  />
                </a>
                <ul
                  className="dropdown-menu text-small"
                  aria-labelledby="dropdownUser1"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      New project...
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Settings
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Profile
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </header>
        <div className={"d-flex"}>
          <section className={"col-3 border border-5 border-danger"}>
            <div className={"flex-column"}>Sidebar</div>
          </section>
          <section className={"col-9 border border-5 border-success"}>
            <div className={"flex-column"}>Main</div>
          </section>
        </div>
      </section>
      <footer className={"border border-5 border-secondary"}>Footer</footer>
    </main>
  );
}

function OffcanvasExample() {
  return (
    <>
      {[false].map((expand) => (
        <Navbar
          //@ts-ignore
          key={expand}
          bg="light"
          expand={expand}
          className="mb-3"
        >
          <Container fluid>
            {/*<Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand>*/}
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="start"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="#action1">Home</Nav.Link>
                  <Nav.Link href="#action2">Link</Nav.Link>
                  <NavDropdown
                    title="Dropdown"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}
