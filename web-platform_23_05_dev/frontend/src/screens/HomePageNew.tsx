// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect } from "react";
import axios from "axios";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as base from "../components/ui/base";
import * as hooks from "../components/hooks";
import { Link } from "react-router-dom";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function Page(): JSX.Element {
  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <base.Base1
      title={"Домашняя страница"}
      description={"тут расположены ссылки на основные модули"}
    >
      <div className={"input-group lead my-5"}>
        <Link
          to={"/drainage"}
          className={"btn btn-lg btn-outline-secondary fw-bold lead display-6"}
        >
          Производительность Водоотлива
        </Link>
        <Link
          to={"/dumptrucks"}
          className={"btn btn-lg btn-outline-primary fw-bold lead display-6"}
        >
          Анализ автосамосвалов
        </Link>
        <Link
          to={"/shovels"}
          className={
            "btn btn-lg btn-outline-warning fw-bold lead display-6 disabled"
          }
        >
          Анализ экскаваторов
        </Link>
        <Link
          to={"/predictive"}
          className={"btn btn-lg btn-outline-success fw-bold lead display-6"}
        >
          Предиктивная аналитика
        </Link>
        <Link
          to={"/reports/operuchet"}
          className={
            "btn btn-lg btn-outline-danger fw-bold lead display-6 disabled"
          }
        >
          Оперучёт
        </Link>
      </div>
      <hr />
      <div className={"container shadow p-3"}>
        <div className={"display-6 fw-bold"}>ПТО</div>
        <div className={"input-group lead my-5"}>
          <Link
            to={"/reports/avg_speed"}
            className={"btn btn-lg btn-outline-success fw-bold lead display-6"}
          >
            Анализ средней скорости
          </Link>
          <Link
            to={"/reports/time_to_load"}
            className={"btn btn-lg btn-warning fw-bold lead display-6"}
          >
            Анализ времени на погрузку
          </Link>
          <Link
            to={"/reports/errors_asd"}
            className={"btn btn-lg btn-danger fw-bold lead display-6"}
          >
            Ошибки АСД за смену
          </Link>
        </div>
      </div>
    </base.Base1>
  );
}
