import * as footers from "./footers";
import * as navbars from "./navbars";
import { Link } from "react-router-dom";
import React from "react";

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
        {/*<navbar.Navbar1*/}
        {/*  name={"модули"}*/}
        {/*  scroll={true}*/}
        {/*  backdrop={true}*/}
        {/*  placement={"top"}*/}
        {/*/>*/}
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

export function Base2({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="h-100">
      <navbars.Navbar2 title={title} description={description} />
      <main className="custom_main_1">{children}</main>
      <footers.Footer2 />
    </div>
  );
}
