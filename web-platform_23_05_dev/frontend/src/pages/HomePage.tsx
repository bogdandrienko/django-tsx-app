// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React from "react";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as base from "../components/ui/base";
import { Link } from "react-router-dom";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////


export default function Page(): JSX.Element {
  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <base.Base1 title={"Home page"} description={"this is app home page"}>
      <div className="px-4 pt-5 text-center">
        <h1 className="display-4 fw-bold">'task list' project</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead">
            Custom created Django 'Native' web-app. Native - is UI(User
            Interface) based develop only on Django-templates(MVT) without any
            frontend framework(react/vue/angular).
          </p>
          <p className="lead mb-4">
            This simple project contains:
            <ul className=" custom-background-transparent-middle">
              <li className="">
                frontend + backend: based on REST-full (REST) pattern
              </li>
              <li className="">
                backend: CRUD(Create-Read-Update-Delete)-like endpoints
              </li>
              <li className="">backend: with 'static' data</li>
              <li className="">bootstrap css styles + js scripts</li>
              <li className="">
                custom css styles (with font-family: 'Zen Kaku Gothic Antique')
              </li>
              <li className="">and more...</li>
            </ul>
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
            <Link
              to="/register"
              className="text-decoration-none lead btn btn-primary btn-lg px-4 me-sm-3"
            >
              START!
            </Link>
          </div>
        </div>
      </div>
    </base.Base1>
  );
}
