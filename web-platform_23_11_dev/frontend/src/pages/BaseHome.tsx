// TODO download modules /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import React from "react";
import { Link } from "react-router-dom";

// TODO custom modules ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import * as bases from "../components/ui/bases";
import * as components from "../components/ui/components";

// TODO export ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function Page(): JSX.Element {
  // TODO return /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <bases.Base2
      title={"Главная страница"}
      description={"тут расположены ссылки на основные модули"}
    >
      <div className={"lead"}>
        <a
          href={"http://172.30.23.16:8002/"}
          className={"btn btn-lg btn-primary m-1 p-3"}
        >
          ОСНОВНАЯ ВЕРСИЯ ЦИФРОВОГО ДВОЙНИКА
        </a>{" "}
        <a
          href={"http://172.30.23.16:8003/"}
          className={"btn btn-lg btn-warning m-1 p-3"}
        >
          ТЕСТОВАЯ ВЕРСИЯ ЦИФРОВОГО ДВОЙНИКА
        </a>
        <a
          href={"http://172.30.23.16:8004/"}
          className={"btn btn-lg btn-danger m-1 p-3"}
        >
          ЭКСПЕРИМЕНТАЛЬНАЯ ВЕРСИЯ ЦИФРОВОГО ДВОЙНИКА
        </a>
      </div>

      <hr className={"m-3 p-0"} />

      <components.Accordion2
        isCollapse={true}
        keyTarget={"Accordion#2"}
        headerClassName={"bg-success-custom-1"}
        title={"Модули: завершены"}
        titleTextClassName={"text-dark"}
        bodyClassName={""}
      >
        <div className={"shadow album p-3"}>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            <div className="col">
              <div className="card shadow-sm">
                <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
                  <h6 className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none">
                    <svg className="bi me-2" width="30" height="24"></svg>
                    <span className="fs-5 fw-semibold fw-bold">
                      МГНОВЕННЫЕ ПОКАЗАТЕЛИ
                    </span>
                  </h6>
                  <div className="list-group list-group-flush">
                    <Link
                      to={"/events/drainage"}
                      className="list-group-item list-group-item-action lh-tight p-3 bg-primary-custom-1 text-white"
                      aria-current="true"
                    >
                      <div className="d-flex w-100 align-items-center justify-content-between">
                        <strong className="mb-1">
                          Мониторинг производительности водоотлива
                        </strong>
                      </div>
                      <div className="small">
                        Производительность и дата последней связи водоотлива
                        (показания расходомера)
                      </div>
                    </Link>
                    <Link
                      to={"/events/dumptrucks"}
                      className="list-group-item list-group-item-action lh-tight p-3 bg-primary-custom-1 text-white"
                      aria-current="true"
                    >
                      <div className="d-flex w-100 align-items-center justify-content-between">
                        <strong className="mb-1">
                          Мониторинг мгновенных сообщений с автосамосвалов
                        </strong>
                      </div>
                      <div className="small">
                        Сообщения с автосамосвалов (масса, скорость, время,
                        координаты)
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card shadow-sm">
                <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
                  <h6 className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none">
                    <svg className="bi me-2" width="30" height="24"></svg>
                    <span className="fs-5 fw-semibold fw-bold">
                      СКОРОСТЬ АВТОСАМОСВАЛОВ
                    </span>
                  </h6>
                  <div className="list-group list-group-flush">
                    <Link
                      to={"/speed/monitoring/dumptrucks"}
                      className="list-group-item list-group-item-action lh-tight m-0 p-3 bg-primary-custom-1 text-white"
                      aria-current="true"
                    >
                      <div className="d-flex w-100 align-items-center justify-content-between">
                        <strong className="mb-1">
                          Мониторинг средней скорости автосамосвалов
                        </strong>
                      </div>
                      <div className="small">
                        Мониторинг в реальном времени за текущую смену
                      </div>
                    </Link>
                    <Link
                      to={"/speed/report/dumptrucks"}
                      className="list-group-item list-group-item-action lh-tight p-3 bg-warning-custom-1 text-dark"
                      aria-current="true"
                    >
                      <div className="d-flex w-100 align-items-center justify-content-between">
                        <strong className="mb-1">
                          Отчёт по средней скорости автосамосвалов
                        </strong>
                      </div>
                      <div className="small">
                        Отчёт по средней скорости автосамосвалов в течении смены
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card shadow-sm">
                <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
                  <h6 className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none">
                    <svg className="bi me-2" width="30" height="24"></svg>
                    <span className="fs-5 fw-semibold fw-bold">ПТО</span>
                  </h6>
                  <div className="list-group list-group-flush">
                    <Link
                      to={"/pto/report/asd_errors"}
                      className="list-group-item list-group-item-action bg-warning-custom-1 text-dark py-3 lh-tight"
                      aria-current="true"
                    >
                      <div className="d-flex w-100 align-items-center justify-content-between">
                        <strong className="mb-1">Отчёт по ошибкам в АСД</strong>
                      </div>
                      <div className="small">
                        Отчёт по ошибкам в АСД за выбранный период
                      </div>
                    </Link>
                    <Link
                      to={"/pto/monitoring/oper_stoppages"}
                      className="list-group-item list-group-item-action lh-tight p-3 bg-primary-custom-1 text-white"
                      aria-current="true"
                    >
                      <div className="d-flex w-100 align-items-center justify-content-between">
                        <strong className="mb-1">
                          Мониторинг длящихся простоев
                        </strong>
                      </div>
                      <div className="small">
                        Оперативный контроль длящихся простоев и ожидания под
                        погрузку
                      </div>
                    </Link>
                    <Link
                      to={"/pto/report/time_to_load"}
                      className="list-group-item list-group-item-action bg-warning-custom-1 text-dark py-3 lh-tight"
                      aria-current="true"
                    >
                      <div className="d-flex w-100 align-items-center justify-content-between">
                        <strong className="mb-1">
                          Отчёт по времени ожидания на погрузку
                        </strong>
                      </div>
                      <div className="small">
                        Отчёт по времени ожидания на погрузку за период и в
                        среднем
                      </div>
                    </Link>
                    <Link
                      to={"/pto/report/sticking"}
                      className="list-group-item list-group-item-action lh-tight p-3 bg-warning-custom-1 text-dark"
                      aria-current="true"
                    >
                      <div className="d-flex w-100 align-items-center justify-content-between">
                        <strong className="mb-1">
                          Отчёт по налипаниям и намерзаниям
                        </strong>
                      </div>
                      <div className="small">
                        Отчёт по налипаниям и намерзаниям за выбранный период
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card shadow-sm">
                <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
                  <h6 className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none">
                    <svg className="bi me-2" width="30" height="24"></svg>
                    <span className="fs-5 fw-semibold fw-bold">
                      ПОГРУЗКА ЭКСКАВАТОРАМИ
                    </span>
                  </h6>
                  <div className="list-group list-group-flush">
                    <Link
                      to={"/loading/monitoring/shovels"}
                      className="list-group-item list-group-item-action lh-tight p-3 bg-primary-custom-1 text-white"
                      aria-current="true"
                    >
                      <div className="d-flex w-100 align-items-center justify-content-between">
                        <strong className="mb-1">
                          Мониторинг недогрузов и перегрузов
                        </strong>
                      </div>
                      <div className="small">
                        Отклонения от нормы загрузки автосамосвалов в реальном
                        времени
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card shadow-sm">
                <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
                  <h6 className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none">
                    <svg className="bi me-2" width="30" height="24"></svg>
                    <span className="fs-5 fw-semibold fw-bold">ПРОСТОИ</span>
                  </h6>
                  <div className="list-group list-group-flush">
                    <Link
                      to={"/stoppages/report/dumptruck_dvs"}
                      className="list-group-item list-group-item-action lh-tight p-3 bg-warning-custom-1 text-dark"
                      aria-current="true"
                    >
                      <div className="d-flex w-100 align-items-center justify-content-between">
                        <strong className="mb-1">
                          Отчёт по холостым простоям ДВС автосамосвалов
                        </strong>
                      </div>
                      <div className="small">
                        Нулевая скорость и включённый ДВС за выбранную смену
                      </div>
                    </Link>{" "}
                    <Link
                      to={"/stoppages/report/empty_peregon/dumptrucks"}
                      className="list-group-item list-group-item-action lh-tight p-3 bg-warning-custom-1 text-dark"
                      aria-current="true"
                    >
                      <div className="d-flex w-100 align-items-center justify-content-between">
                        <strong className="mb-1">
                          Отчёт по холостым перегонам автосамосвалов
                        </strong>
                      </div>
                      <div className="small">
                        Попадания автосамосвалов в указанные координаты за
                        выбранный период
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card shadow-sm">
                <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
                  <h6 className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none">
                    <svg className="bi me-2" width="30" height="24"></svg>
                    <span className="fs-5 fw-semibold fw-bold">
                      ОБЗОРНЫЙ АНАЛИЗ ГТО
                    </span>
                  </h6>
                  <div className="list-group list-group-flush">
                    <Link
                      to={"/gto/report/dumptrucks"}
                      className="list-group-item list-group-item-action lh-tight p-3 bg-warning-custom-1 text-dark"
                      aria-current="true"
                    >
                      <div className="d-flex w-100 align-items-center justify-content-between">
                        <strong className="mb-1">
                          Отчёт по всем показателям автосамосвалов
                        </strong>
                      </div>
                      <div className="small">Показатели за смену</div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </components.Accordion2>

      <hr className={"m-3 p-0"} />

      <components.Accordion2
        isCollapse={true}
        keyTarget={"Accordion#3"}
        headerClassName={"bg-warning-custom-1"}
        title={"Модули: в разработке"}
        titleTextClassName={"text-dark"}
        bodyClassName={""}
      >
        <div className={"shadow album p-3"}>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            <div className="col">
              <div className="card shadow-sm">
                <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
                  <h6 className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none">
                    <svg className="bi me-2" width="30" height="24"></svg>
                    <span className="fs-5 fw-semibold fw-bold">ПРОСТОИ</span>
                  </h6>
                  <div className="list-group list-group-flush">
                    <Link
                      to={"/stoppages/report/aux_dvs"}
                      className="list-group-item list-group-item-action lh-tight p-3 bg-warning-custom-1 text-dark"
                      aria-current="true"
                    >
                      <div className="d-flex w-100 align-items-center justify-content-between">
                        <strong className="mb-1">
                          Отчёт по простоям вспомогательной техники
                        </strong>
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
                  <h6 className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none">
                    <svg className="bi me-2" width="30" height="24"></svg>
                    <span className="fs-5 fw-semibold fw-bold">ПТО</span>
                  </h6>
                  <div className="list-group list-group-flush">
                    <Link
                      to={"/pto/monitoring/normtrips"}
                      className="list-group-item list-group-item-action bg-primary-custom-1 text-white py-3 lh-tight"
                      aria-current="true"
                    >
                      <div className="d-flex w-100 align-items-center justify-content-between">
                        <strong className="mb-1">
                          Мониторинг нормо-рейсов автосамосвалов
                        </strong>
                      </div>
                      <div className="small">
                        Мониторинг в реальном по КПД рейсов автосамосвалов
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card shadow-sm">
                <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
                  <h6 className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none">
                    <svg className="bi me-2" width="30" height="24"></svg>
                    <span className="fs-5 fw-semibold fw-bold">
                      ПОГРУЗКА ЭКСКАВАТОРАМИ
                    </span>
                  </h6>
                  <div className="list-group list-group-flush">
                    <Link
                      to={"/target/report/weight_loads"}
                      className="list-group-item list-group-item-action lh-tight p-3 bg-warning-custom-1 text-dark"
                      aria-current="true"
                    >
                      <div className="d-flex w-100 align-items-center justify-content-between">
                        <strong className="mb-1">
                          Отчёт по недогрузам и перегрузам
                        </strong>
                      </div>
                      <div className="small">
                        Отклонения от нормы загрузки автосамосвалов за период
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card shadow-sm">
                <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
                  <h6 className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none">
                    <svg className="bi me-2" width="30" height="24"></svg>
                    <span className="fs-5 fw-semibold fw-bold">
                      МОДЕЛИРОВАНИЕ ТЕХ ПРОЦЕССА
                    </span>
                  </h6>
                  <div className="list-group list-group-flush">
                    <Link
                      to={"/analytic/monitoring/tech"}
                      className="list-group-item list-group-item-action lh-tight p-3 bg-primary-custom-1 text-white"
                      aria-current="true"
                    >
                      <div className="d-flex w-100 align-items-center justify-content-between">
                        <strong className="mb-1">
                          Мониторинг технологического процесса
                        </strong>
                      </div>
                      <div className="small">
                        Мониторинг технологического процесса
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </components.Accordion2>
    </bases.Base2>
  );
}
