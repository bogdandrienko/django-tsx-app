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
      <div className={"shadow album p-3"}>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <div className="col">
            <div className="card shadow-sm">
              <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
                <h6 className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
                  <svg className="bi me-2" width="30" height="24"></svg>
                  <span className="fs-5 fw-semibold fw-bold">ПТО</span>
                </h6>
                <div className="list-group list-group-flush border-bottom scrollarea">
                  <Link
                    to={"/pto/time_to_load"}
                    className="list-group-item list-group-item-action bg-warning py-3 lh-tight"
                    aria-current="true"
                  >
                    <div className="d-flex w-100 align-items-center justify-content-between">
                      <strong className="mb-1">
                        Анализ времени на погрузку
                      </strong>
                      <small>обновлено 06.06.2023</small>
                    </div>
                    <div className="small">
                      Вывод общего и среднего времени ожидания под погрузку, с
                      наибольшими простоями ожидания
                    </div>
                  </Link>
                  <Link
                    to={"/pto/operative_stoppages"}
                    className="list-group-item list-group-item-action bg-success text-white py-3 lh-tight"
                    aria-current="true"
                  >
                    <div className="d-flex w-100 align-items-center justify-content-between">
                      <strong className="mb-1">
                        Оперативный контроль простоев
                      </strong>
                      <small>обновлено 14.06.2023</small>
                    </div>
                    <div className="small">
                      Оперативный контроль длящихся простоев и ожидания под
                      погрузку
                    </div>
                  </Link>
                  <Link
                    to={"/pto/errors_asd"}
                    className="list-group-item list-group-item-action bg-danger text-white py-3 lh-tight"
                    aria-current="true"
                  >
                    <div className="d-flex w-100 align-items-center justify-content-between">
                      <strong className="mb-1">Ошибки АСД за смену</strong>
                      <small>обновлено 06.06.2023</small>
                    </div>
                    <div className="small">
                      Отчёт об ошибках АСД, в т.ч. операторов техники
                    </div>
                  </Link>
                  <Link
                    to={"/pto/normtrips"}
                    className="list-group-item list-group-item-action bg-primary text-white py-3 lh-tight"
                    aria-current="true"
                  >
                    <div className="d-flex w-100 align-items-center justify-content-between">
                      <strong className="mb-1">Нормо-рейсы</strong>
                      <small>обновлено 14.06.2023</small>
                    </div>
                    <div className="small">
                      Аналитика в реальном времени по КПД рейсов автосамосвалов
                    </div>
                  </Link>
                  <Link
                    to={"/pto/analytictech"}
                    className="list-group-item list-group-item-action lh-tight p-3 bg-secondary text-white"
                    aria-current="true"
                  >
                    <div className="d-flex w-100 align-items-center justify-content-between">
                      <strong className="mb-1">
                        Аналитика технологического процесса
                      </strong>
                      <small>[на тестировании]</small>
                    </div>
                    <div className="small">
                      Аналитика в реальном времени по всему технологическому
                      процессу
                    </div>
                  </Link>
                  <Link
                    to={"/pto/operuchet"}
                    className="list-group-item list-group-item-action lh-tight p-3 bg-secondary text-white disabled"
                    aria-current="true"
                  >
                    <div className="d-flex w-100 align-items-center justify-content-between">
                      <strong className="mb-1">Оперучёт</strong>
                      <small>[в разработке]</small>
                    </div>
                    <div className="small">Отчёт</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card shadow-sm">
              <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
                <h6 className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
                  <svg className="bi me-2" width="30" height="24"></svg>
                  <span className="fs-5 fw-semibold fw-bold">АТЦ</span>
                </h6>
                <div className="list-group list-group-flush scrollarea">
                  <Link
                    to={"/atc/avg_speed"}
                    className="list-group-item list-group-item-action lh-tight p-3 bg-success text-white"
                    aria-current="true"
                  >
                    <div className="d-flex w-100 align-items-center justify-content-between">
                      <strong className="mb-1">
                        Средняя скорость автосамосвалов
                      </strong>
                      <small>обновлено 06.06.2023</small>
                    </div>
                    <div className="small">
                      Анализ средней скорости автосамосвалов в течении смены и
                      отдельно последний рейс
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card shadow-sm">
              <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
                <h6 className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
                  <svg className="bi me-2" width="30" height="24"></svg>
                  <span className="fs-5 fw-semibold fw-bold">
                    МГНОВЕННЫЕ ПОКАЗАТЕЛИ ТЕХНИКИ
                  </span>
                </h6>
                <div className="list-group list-group-flush">
                  <Link
                    to={"/events/drainage"}
                    className="list-group-item list-group-item-action lh-tight p-3 bg-primary text-white"
                    aria-current="true"
                  >
                    <div className="d-flex w-100 align-items-center justify-content-between">
                      <strong className="mb-1">Водоотлив</strong>
                      <small>обновлено 06.06.2023</small>
                    </div>
                    <div className="small">
                      Производительность и дата последней связи водоотлива
                      (показания расходомера)
                    </div>
                  </Link>
                  <Link
                    to={"/events/dumptrucks"}
                    className="list-group-item list-group-item-action lh-tight p-3 bg-success text-white"
                    aria-current="true"
                  >
                    <div className="d-flex w-100 align-items-center justify-content-between">
                      <strong className="mb-1">Автосамосвалы</strong>
                      <small>обновлено 06.06.2023</small>
                    </div>
                    <div className="small">
                      Сообщения с автосамосвалов (масса, скорость, время,
                      координаты)
                    </div>
                  </Link>
                  <Link
                    to={"/events/shovels"}
                    className="list-group-item list-group-item-action lh-tight p-3 bg-secondary text-white disabled"
                    aria-current="true"
                  >
                    <div className="d-flex w-100 align-items-center justify-content-between">
                      <strong className="mb-1">Экскаваторы</strong>
                      <small>[в разработке]</small>
                    </div>
                    <div className="small">
                      Сообщения с экскаваторов (скорость, время, координаты)
                    </div>
                  </Link>
                  <Link
                    to={"/events/auxes"}
                    className="list-group-item list-group-item-action lh-tight p-3 bg-secondary text-white disabled"
                    aria-current="true"
                  >
                    <div className="d-flex w-100 align-items-center justify-content-between">
                      <strong className="mb-1">Бульдозеры</strong>
                      <small>[в разработке]</small>
                    </div>
                    <div className="small">
                      Сообщения с бульдозеров (моточасы, скорость, время,
                      координаты)
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </base.Base1>
  );
}
