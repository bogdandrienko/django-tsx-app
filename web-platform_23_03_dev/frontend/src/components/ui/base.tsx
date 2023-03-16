// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React from "react";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as footer from "./footer";
import * as navbar from "./navbar";
import * as sidebar from "./sidebar";
import { Link } from "react-router-dom";
import * as button from "./button";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

// @ts-ignore
export const Base1 = ({ children }) => {
  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="custom_body_1">
      <navbar.NavbarComponent1 />
      <main className="custom_main_1">{children}</main>
      <footer.Footer1 />
    </div>
  );
};

// @ts-ignore
export const Base2 = ({ children }) => {
  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <body className="d-flex flex-column vh-100 custom_body_1">
      <navbar.NavbarComponent1 />
      <main className="d-flex vh-100 h-100">
        <div className="container">{children}</div>
      </main>
      <footer.Footer1 />
    </body>
  );
};

// @ts-ignore
export const Base3 = ({ children }) => {
  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="custom_body_1">
      <navbar.NavbarComponent2 />
      <div className="custom_main_1">{children}</div>
      <footer.FooterComponent2 />
    </div>
  );
};

// @ts-ignore
export const Base4 = ({ children }) => {
  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <body className="d-flex flex-column vh-100">
      <main className="d-flex vh-100 h-100">
        <h1 className="visually-hidden">Sidebars examples</h1>

        <div
          className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark h-100"
          style={{ width: "280px" }}
        >
          <a
            href="/"
            className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
          >
            <svg className="bi me-2" width="40" height="32" />
            <span className="fs-4">Sidebar</span>
          </a>
          <hr />
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <a href="/" className="nav-link active" aria-current="page">
                <svg className="bi me-2" width="16" height="16" />
                Home
              </a>
            </li>
            <li>
              <a href="/" className="nav-link text-white">
                <svg className="bi me-2" width="16" height="16" />
                Dashboard
              </a>
            </li>
            <li>
              <a href="/" className="nav-link text-white">
                <svg className="bi me-2" width="16" height="16" />
                Orders
              </a>
            </li>
            <li>
              <a href="/" className="nav-link text-white">
                <svg className="bi me-2" width="16" height="16" />
                Products
              </a>
            </li>
            <li>
              <a href="/" className="nav-link text-white">
                <svg className="bi me-2" width="16" height="16" />
                Customers
              </a>
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
                src="https://github.com/mdo.png"
                alt=""
                width="32"
                height="32"
                className="rounded-circle me-2"
              />
              <strong>mdo</strong>
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
          <navbar.NavbarComponent3 />
          <div className="container">{children}</div>
          <footer.FooterComponent3 />
        </div>
      </main>
    </body>
  );
};

// @ts-ignore
export const Base5 = ({ children }) => {
  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <body className="d-flex flex-column vh-100">
      <main className="d-flex vh-100 h-100">
        <h1 className="visually-hidden">Sidebars examples</h1>

        <sidebar.Sidebar2 />

        <div className="w-100">
          {/* <navbar.NavbarComponent3 /> */}
          <div className="container">{children}</div>
          {/* <footer.FooterComponent3 /> */}
        </div>
      </main>
    </body>
  );
};

// @ts-ignore
export const Base6 = ({ children }) => {
  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <body className="d-flex flex-column vh-100">
      <main className="d-flex vh-100 h-100">
        <h1 className="visually-hidden">Sidebars examples</h1>
        <div className="w-100">
          <navbar.NavbarComponent4 />
          <div className="container">{children}</div>
          {/* <footer.FooterComponent3 /> */}
        </div>
      </main>
    </body>
  );
};

// @ts-ignore
export const Base7 = ({ children }) => {
  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <body className="d-flex flex-column vh-100">
      <main className="d-flex vh-100 h-100">
        {/*<sidebar.Sidebar2 />*/}

        <div className="w-100">
          {/* <navbar.NavbarComponent3 /> */}
          <div className="container">{children}</div>
          {/* <footer.FooterComponent3 /> */}
        </div>
      </main>
    </body>
  );
};

// @ts-ignore
export function Base8(props = { children: any, isSidebar: boolean }) {
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
            {props.isSidebar && <sidebar.Sidebar3 />}
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
              {/*{props.children}*/}
            </main>
          </div>
        </div>
      </main>
    </body>
  );
}

export function Base9({
  //@ts-ignore
  children,
  title = "",
  description = "",
  is_hide_navbar = false,
}) {
  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="custom_body_1">
      <div>
        {!is_hide_navbar && (
          <navbar.NavbarComponent5
            name={"модули"}
            scroll={true}
            backdrop={true}
            placement={"top"}
          />
        )}
        <div className="p-0 pt-1">
          <div className="card shadow custom-background-transparent-middle m-0 p-0">
            <div className="card-header bg-primary bg-opacity-10 m-0 p-1">
              <small className="display-6 fw-normal m-0 p-1">
                {title ? title : "Цифровой двойник (ЦД) предприятия"}
              </small>
            </div>
            <div className="card-body m-0 p-1">
              <p className="lead fw-normal text-muted m-0 p-1">
                {description
                  ? description
                  : "Это комплекс актуальных моделей технологических и бизнес процессов"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <main className="custom_main_1 h-100 p-0">{children}</main>
      {!is_hide_navbar && <footer.Footer1 />}
    </div>
  );
}
