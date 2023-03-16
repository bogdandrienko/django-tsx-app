import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CounterCustom from "../components/CounterCustom";
import CounterRedux from "../components/CounterRedux";
import * as actions from "../components/Actions";
import * as base from "../components/ui/base";
import * as sidebar from "../components/ui/sidebar";
import { Link } from "react-router-dom";

function Home1() {
  const dispatch = useDispatch();

  const [value1, setValue1] = useState(0);

  function getData(value: number) {
    setValue1(value);
  }

  // @ts-ignore
  const counterRedux = useSelector((state) => state.counterRedux); // {load, data, eror}

  return (
    <div>
      <div>
        <h1>React redux typescript axios jwt</h1>
      </div>
      <div>
        <button onClick={() => actions.getToken(dispatch)}>getToken</button>
      </div>
      <div>Значение из детей: {counterRedux.data}</div>
      <main>
        <CounterRedux defaultValue={100} multiply={3} />
        <CounterCustom
          defaultValue={666}
          multiply={3}
          callbackGetData={getData}
        />
        <CounterCustom
          defaultValue={1}
          multiply={1}
          callbackGetData={getData}
        />
        <CounterCustom
          defaultValue={-100}
          multiply={-1}
          callbackGetData={getData}
        />
      </main>
    </div>
  );
}

function Home2() {
  return (
    <base.Base5>
      <div className="px-4 py-5 my-5 text-center">
        <img
          className="d-block mx-auto mb-4 img-fuild img-thumnail w-25"
          src="/static/img/poly.png"
          alt="images"
        />
        <h1 className="display-5 fw-bold">Цифровой двойник (ЦД) предприятия</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            Это комплекс актуальных моделей технологических и бизнес процессов.
            При эксплуатации система состоит из нескольких составляющих:
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
            <button type="button" className="btn btn-primary btn-lg px-4 gap-3">
              Модули
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary btn-lg px-4"
            >
              К инструкциям
            </button>
          </div>
        </div>
      </div>
    </base.Base5>
  );
}

function Home3() {
  return (
    <body className="d-flex flex-column vh-100">
      <main className="d-flex vh-100 h-100">
        <h1 className="visually-hidden">Sidebars examples</h1>
        <div
          className="d-flex flex-column flex-shrink-0 p-1 text-white bg-dark h-100"
          style={{ width: "220px" }}
        >
          <Link
            to="/"
            className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
          >
            <svg className="bi me-2" width="40" height="32" />
            <span className="fs-4">Модули</span>
          </Link>
          <hr />
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page">
                <svg className="bi me-2" width="16" height="16" />
                Главная
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/instructions"
                className="nav-link text-white"
                aria-current="page"
              >
                <svg className="bi me-2" width="16" height="16" />
                Инструкции
              </Link>
            </li>
            <li>
              <Link to="/vision" className="nav-link text-white">
                <svg className="bi me-2" width="16" height="16" />
                Интеллектуальные системы (CV+)
              </Link>
            </li>
            <li>
              <Link to="/predictivity" className="nav-link text-white">
                <svg className="bi me-2" width="16" height="16" />
                Предиктивная аналитика (ТОиР)
              </Link>
            </li>
            <li>
              <Link to="/predictivity" className="nav-link text-white">
                <svg className="bi me-2" width="16" height="16" />
                Виртуальная и дополненная реальность (VR/AR)
              </Link>
            </li>
            <li>
              <Link to="/asd" className="nav-link text-white">
                <svg className="bi me-2" width="16" height="16" />
                Автоматизированная система диспетчеризации (АСД)
              </Link>
            </li>
            <li>
              <Link to="/external" className="nav-link text-white">
                <svg className="bi me-2" width="16" height="16" />
                Внешние службы (усталость, позиционирование...)
              </Link>
            </li>
            <li>
              <Link to="/sup" className="nav-link text-white">
                <svg className="bi me-2" width="16" height="16" />
                Служба управления персоналом (СУП)
              </Link>
            </li>
            <li>
              <Link to="/" className="nav-link text-white">
                <svg className="bi me-2" width="16" height="16" />
                1С
              </Link>
            </li>
          </ul>
          <hr />
          <div className="dropdown">
            <a
              href="/"
              className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
              id="dropdownUser1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="/static/img/poly.png"
                alt=""
                width="32"
                height="32"
                className="rounded-circle me-2"
              />
              <strong>Профиль</strong>
            </a>
            <ul
              className="dropdown-menu dropdown-menu-dark text-small shadow"
              aria-labelledby="dropdownUser1"
            >
              <li>
                <a className="dropdown-item" href="/">
                  New project...
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/">
                  Settings
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/">
                  Profile
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="/">
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-100">
          {/* <navbar.NavbarComponent3 /> */}
          <div className="container">
            <div className="px-4 py-5 my-5 text-center">
              <img
                className="d-block mx-auto mb-4 img-fuild img-thumnail w-25"
                src="/static/img/poly.png"
                alt="images"
              />
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
                  <button
                    type="button"
                    className="btn btn-primary btn-lg px-4 gap-3"
                  >
                    Модули
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-lg px-4"
                  >
                    К инструкциям
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <footer.FooterComponent3 /> */}
        </div>
      </main>
      <div className="m-0 p-0 bg-dark">
        <div className="row m-0 p-0 bg-secondary justify-content-between">
          <div className="p-0 m-0 bg-danger col-2 text-center">
            11111111111111111
          </div>
          <div className="p-0 m-0 bg-success col-10 text-center">
            22222222222222222
          </div>
        </div>
      </div>
    </body>
  );
}

function Home() {
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
                    <Link
                      to={"/"}
                      className="nav-link text-dark"
                      aria-current="page"
                    >
                      <i className="fa-solid fa-address-card p-1"></i>
                      Личный Профиль
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
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
                      <Link
                        to={"/"}
                        className="btn btn-primary btn-lg px-4 gap-3"
                      >
                        Модули
                      </Link>
                      <Link
                        to={"/"}
                        className="btn btn-outline-secondary btn-lg px-4"
                      >
                        К инструкциям
                      </Link>
                    </div>
                  </div>
                </div>
                <img
                  className="d-block mx-auto mb-4 img-fuild img-thumnail w-100 border border-dark border-1 p-0"
                  src="/static/img/modules_poly/cheme.png"
                  alt="images"
                />
              </div>
            </main>
          </div>
        </div>
      </main>
    </body>
  );
}

export default Home;
