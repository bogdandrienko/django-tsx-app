import { Link, Route, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import * as footers from "./footers";
import * as navbars from "./navbars";
import * as components from "./components";
import { routes } from "../routes";

export function Base1({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="custom_body_1">
      <div className={"mb-3"}>
        <navbars.Navbar1
          name={"модули"}
          scroll={true}
          backdrop={true}
          placement={"top"}
        />
        <div className="container p-0 pt-1">
          <div className="card shadow custom-background-transparent-middle m-0 p-0">
            <div className="card-header bg-secondary m-0 p-1 d-flex justify-content-between">
              <div>
                <a href={"/"} className={"btn btn-sm btn-outline-warning"}>
                  перезагрузить
                </a>
              </div>
              <small className="display-6 fw-normal text-white m-0 p-1">
                {title}
              </small>
              <Link
                to={"/"}
                className={
                  "btn btn-lg btn-outline-light fw-bold lead display-6"
                }
              >
                на главную страницу
              </Link>
              <Link
                to={"/login"}
                className={"btn btn-lg btn-primary fw-bold lead display-6"}
              >
                войти
              </Link>
            </div>
            <div className="card-body m-0 p-1">
              <p className="lead fw-normal text-muted m-0 p-1">{description}</p>
            </div>
          </div>
        </div>
      </div>
      <main className="custom_main_1 h-100 p-0">{children}</main>
      <footers.Footer2 />
    </div>
  );
}

export function Base2({ children }: any) {
  const location = useLocation();
  const [info, setInfo] = useState({ title: "", description: "" });

  useEffect(() => {
    Object.entries(routes).forEach(([key, value]: any) => {
      if (value.path === location.pathname) {
        setInfo({ title: value.title, description: value.description });
      }
    });
  }, []);

  return (
    <components.CenterPathGuard>
      <div className="h-100 m-0 p-0">
        <navbars.Navbar2 title={info.title} description={info.description} />
        <main className="custom_main_1">{children}</main>
        <footers.Footer2 />
      </div>
    </components.CenterPathGuard>
  );
}
export function Base3({ children }: any) {
  return (
    <components.CenterPathGuard>
      <div className="h-100 m-0 p-0">
        <main className="custom_main_1">{children}</main>
      </div>
    </components.CenterPathGuard>
  );
}
