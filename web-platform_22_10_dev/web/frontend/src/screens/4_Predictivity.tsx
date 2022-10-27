import { Link } from "react-router-dom";

export default function Page() {
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
              <a className="nav-link px-3 p-1 mx-1 btn btn-danger" href="#">
                Выйти из системы
              </a>
            </div>
          </div>
        </header>
        <div className="container-fluid">
          <div className="">
            <main className="px-md-4">
              <div className="container">
                <div className="px-4 py-1 my-5 text-center">
                  <img
                    className="d-block mx-auto mb-4 img-fuild img-thumnail w-50"
                    src="/static/img/modules_poly/analiz.jpg"
                    alt="images"
                  />
                  <h1 className="display-5 fw-bold">
                    Предиктивный анализ и прогнозирование
                  </h1>
                  <div className="col-lg-6 mx-auto">
                    <p className="lead mb-4">
                      Коррекция режимов работы оборудования и ППР, исходя из
                      накопленной аналитики и статистики.
                    </p>
                  </div>
                </div>
                <div className="container marketing">
                  <div className="row">
                    {[
                      {
                        title: "Внесение данных",
                        description:
                          "ручное внесение данных или экспорт из excel",
                        image: "",
                        link: "",
                      },
                      {
                        title: "Графики",
                        description: "аналитика по критериям в удобном виде",
                        image: "",
                        link: "",
                      },
                      {
                        title: "Отчётность",
                        description:
                          "отображение данных за определённый период с фильтрами",
                        image: "",
                        link: "",
                      },
                      {
                        title: "Прогнозирование",
                        description: "выдача предиктивного анализа по поломкам",
                        image: "",
                        link: "",
                      },
                    ].map(
                      (
                        item: {
                          image: string;
                          description: string;
                          link: string;
                          title: string;
                        },
                        index: any
                      ) => (
                        <div
                          key={index}
                          className="col-lg-4 col-md-6 col-sm-12 col-12"
                        >
                          <svg
                            className="bd-placeholder-img rounded-circle"
                            width="140"
                            height="140"
                            xmlns="http://www.w3.org/2000/svg"
                            role="img"
                            aria-label="Placeholder: 140x140"
                            preserveAspectRatio="xMidYMid slice"
                            focusable="false"
                          >
                            <title>{item.title}</title>
                            <rect width="100%" height="100%" fill="#777"></rect>
                            <text x="50%" y="50%" fill="#777" dy=".3em">
                              140x140
                            </text>
                          </svg>

                          <h2>{item.title}</h2>
                          <p>{item.description}</p>
                          <p>
                            <a className="btn btn-secondary" href="#">
                              Перейти »
                            </a>
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </main>
    </body>
  );
}
