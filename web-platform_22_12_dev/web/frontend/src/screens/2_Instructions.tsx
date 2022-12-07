import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import * as component from "../components/ui/component";

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
                <div className="px-4 my-3 text-center">
                  <h1 className="display-5 fw-bold">
                    Инструкции по работе с системой
                  </h1>
                  <div className="col-lg-6 mx-auto">
                    <p className="lead mb-4">
                      Полное описание и видеоинструкции по использованию.
                    </p>
                  </div>
                  <div className="player-wrapper w-100 bg-light bg-opacity-75 m-0 p-0">
                    <small className="lead fw-bold m-0 p-0">
                      Первый вход в систему:
                    </small>
                  </div>
                  <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 justify-content-center text-center shadow m-0 p-0">
                    <component.Accordion1
                      key_target={"accordion1"}
                      isCollapse={false}
                      title={"Первый вход в систему:"}
                      text_style="text-primary"
                      header_style="bg-primary bg-opacity-10 custom-background-transparent-low"
                      body_style="bg-light bg-opacity-10 custom-background-transparent-low"
                    >
                      {
                        <div className="text-center m-0 p-4">
                          <li className="text-danger m-0 p-1">
                            Для более полного понимания смотрите
                            <Link
                              to={"/"}
                              className={
                                "btn btn-sm btn-outline-primary disable m-1 p-2"
                              }
                            >
                              {" "}
                              видео инструкцию{" "}
                            </Link>
                            !
                          </li>
                          <ol className="text-start m-0 p-0">
                            <li className="m-0 p-1">
                              Обновите Ваш браузер до последней доступной
                              версии.
                            </li>
                            <li className="m-0 p-1">Войдите в систему</li>
                            <li className="m-0 p-1">
                              На верхней панели нажмите на кнопку "Войти"
                            </li>
                            <li className="m-0 p-1">
                              Введите Ваш ИИН, пароль (первый временный пароль
                              будет предоставлен при распечатке Вашего
                              расчётного листа) и поставьте отметку "я не робот"
                            </li>
                            <li className="m-0 p-1">
                              Попробуйте перейти в "Бухгалтерия" / "Сектор
                              расчёта заработной платы" / "Выгрузка расчётного
                              листа", Вас перенаправит на страницу замены пароля
                              и ввода дополнительных данных(секретный вопрос и
                              ответ, почта...), которые будут использованы для
                              восстановления доступа.
                            </li>
                            <li className="m-0 p-1">
                              После заполнения данных, нажмите "сохранить новые
                              данные". Вас снова перенаправит на страницу входа,
                              где нужно ввести уже новые данные.
                            </li>
                            <li className="m-0 p-1">
                              После успешного входа, браузер может предложить
                              Вам сохранить данные для входа. Также можете
                              сохранить страницу в закладки, для быстрого
                              доступа.
                            </li>
                          </ol>
                        </div>
                      }
                    </component.Accordion1>

                    <ReactPlayer
                      url="static/video/first_login.mp4"
                      title="Первый вход в систему:"
                      width="100%"
                      height="100%"
                      controls={true}
                      pip={true}
                      className="react-player w-50"
                    />
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
