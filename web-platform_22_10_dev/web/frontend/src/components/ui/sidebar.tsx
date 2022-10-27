// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React from "react";
import { Link } from "react-router-dom";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

// @ts-ignore
export const Sidebar1 = () => {
  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-1 text-white bg-dark h-100"
      style={{ width: "220px" }}
    >
      <Link to="/"
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
          <Link to="/instructions" className="nav-link text-white" aria-current="page">
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
  );
};
