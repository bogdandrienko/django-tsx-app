// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React from "react";
import { Link } from "react-router-dom";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as base from "../components/ui/bases";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function Page(): JSX.Element {
  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <base.Base2
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
                      <small>[на тестировании]</small>
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
                      <small>[на тестировании]</small>
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
                      <small>[на тестировании]</small>
                    </div>
                    <div className="small">
                      Аналитика в реальном времени по КПД рейсов автосамосвалов
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
                    ЦЕЛЕВЫЕ ПОКАЗАТЕЛИ
                  </span>
                </h6>
                <div className="list-group list-group-flush">
                  <Link
                    to={"/target/monitoring/weight_loads"}
                    className="list-group-item list-group-item-action lh-tight p-3 bg-primary text-white"
                    aria-current="true"
                  >
                    <div className="d-flex w-100 align-items-center justify-content-between">
                      <strong className="mb-1">
                        Мониторинг недогрузов и перегрузов
                      </strong>
                      <small>[в разработке]</small>
                    </div>
                    <div className="small">
                      Отклонения от нормы загрузки автосамосвалов в реальном
                      времени
                    </div>
                  </Link>
                  <Link
                    to={"/"}
                    className="list-group-item list-group-item-action lh-tight p-3 bg-warning text-dark"
                    aria-current="true"
                  >
                    <div className="d-flex w-100 align-items-center justify-content-between">
                      <strong className="mb-1">
                        Отчёт по недогрузам и перегрузам
                      </strong>
                      <small>[в разработке]</small>
                    </div>
                    <div className="small">
                      Отклонения от нормы загрузки автосамосвалов за период
                    </div>
                  </Link>
                  <Link
                    to={"/"}
                    className="list-group-item list-group-item-action lh-tight p-3 bg-primary text-white"
                    aria-current="true"
                  >
                    <div className="d-flex w-100 align-items-center justify-content-between">
                      <strong className="mb-1">
                        Мониторинг скорости автосамосвалов
                      </strong>
                      <small>[в разработке]</small>
                    </div>
                    <div className="small">
                      Отклонения от нормы скорости движения автосамосвалов
                    </div>
                  </Link>
                  <Link
                    to={"/target/report/avg_speed"}
                    className="list-group-item list-group-item-action lh-tight p-3 bg-warning text-dark"
                    aria-current="true"
                  >
                    <div className="d-flex w-100 align-items-center justify-content-between">
                      <strong className="mb-1">
                        Отчёт по средней скорости автосамосвалов
                      </strong>
                      <small>[на тестировании]</small>
                    </div>
                    <div className="small">
                      Отчёт по средней скорости автосамосвалов в течении суток,
                      по часам и отдельно последний рейс
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
                  <span className="fs-5 fw-semibold fw-bold">ПРОСТОИ</span>
                </h6>
                <div className="list-group list-group-flush scrollarea">
                  <Link
                    to={"/stoppages/report/aux_dvs"}
                    className="list-group-item list-group-item-action lh-tight p-3 bg-warning text-dark"
                    aria-current="true"
                  >
                    <div className="d-flex w-100 align-items-center justify-content-between">
                      <strong className="mb-1">
                        Отчёт по простоям вспомогательной техники
                      </strong>
                      <small>[на тестировании]</small>
                    </div>
                    <div className="small">
                      Нулевая скорость и включённый ДВС за выбранный период
                    </div>
                  </Link>
                  <Link
                    to={"/stoppages/report/veh_dvs"}
                    className="list-group-item list-group-item-action lh-tight p-3 bg-warning text-dark"
                    aria-current="true"
                  >
                    <div className="d-flex w-100 align-items-center justify-content-between">
                      <strong className="mb-1">
                        Отчёт по простоям автосамосвалов
                      </strong>
                      <small>[на тестировании]</small>
                    </div>
                    <div className="small">
                      Нулевая скорость и включённый ДВС за выбранный период
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
                      <small>[на тестировании]</small>
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
                      <small>[на тестировании]</small>
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
    </base.Base2>
  );
}
