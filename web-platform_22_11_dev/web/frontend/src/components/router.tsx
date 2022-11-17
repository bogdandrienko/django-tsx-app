// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as hook from "./hook";
import * as util from "./util";
import * as slice from "./slice";

import { LoginPage } from "../pages/2_profile/LoginPage";
import { LogoutPage } from "../pages/2_profile/LogoutPage";
import { NotificationListPage } from "../pages/2_profile/NotificationListPage";
import { HomePage } from "../pages/1_main/HomePage";
import { TextStudyPage } from "../pages/1_main/TextStudyPage";
import { VideoStudyPage } from "../pages/1_main/VideoStudyPage";
import { IdeaPublicListPage } from "../pages/3_progress/IdeaPublicListPage";
import { IdeaPublicPage } from "../pages/3_progress/IdeaPublicPage";
import { IdeaCreatePage } from "../pages/3_progress/IdeaCreatePage";
import { IdeaTemplatePage } from "../pages/3_progress/IdeaTemplatePage";
import { ChangeProfilePage } from "../pages/2_profile/ChangeProfilePage";
import { RecoverPasswordPage } from "../pages/2_profile/RecoverPasswordPage";
import { UsersRatingsListPage } from "../pages/1_main/UsersRatingsListPage";
import { NewsPage } from "../pages/1_main/NewsPage";
import { IdeaModeratePage } from "../pages/3_progress/IdeaModeratePage";
import { IdeaModerateListPage } from "../pages/3_progress/IdeaModerateListPage";
import { IdeaSelfPage } from "../pages/3_progress/IdeaSelfPage";
import { IdeaSelfListPage } from "../pages/3_progress/IdeaSelfListPage";
import { SalaryPage } from "../pages/4_buh/SalaryPage";
import { VacationPage } from "../pages/5_sup/VacationPage";
import { IdeaRatingListPage } from "../pages/3_progress/IdeaRatingListPage";
import { TestPage } from "../pages/7_develop/TestPage";
import { ExportUsersPage } from "../pages/6_moderate/ExportUsersPage";
import { TerminalRebootPage } from "../pages/6_moderate/TerminalRebootPage";
import { CreateOrChangeUsersPage } from "../pages/6_moderate/CreateOrChangeUsersPage";
import { RecoverUserPasswordPage } from "../pages/6_moderate/RecoverUserPasswordPage";
import { FormPage } from "../pages/7_develop/FormPage";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export const modules = [
  {
    Header: "Общее",
    Access: ["all"],
    Image: "/static/img/modules/2_module_main/module_main.png",
    ShowInModules: true,
    ModuleIcon: "fa-solid fa-earth-europe m-0 p-1",
    Sections: [
      {
        Header: "Основное",
        Access: ["all"],
        Image: "/static/img/modules/2_module_main/section_news.png",
        Links: [
          {
            Header: "Домашняя страница",
            Access: ["all"],
            Active: true,
            Link: "/",
            ExternalLink: false,
            ShowLink: true,
            Title: "Веб-платформа «KM S.M.A.R.T.»",
            Description:
              'платформа для всех работников АО "Костанайские Минералы"',
            path: "/",
            element: <HomePage />,
            private: "all",
            Logic: true,
            Redirect: false,
            Style: "text-dark",
            LinkIcon: "fa-solid fa-earth-asia m-0 p-1",
          },
          {
            Header: "Новости платформы",
            Access: ["all"],
            Active: true,
            Link: "/news",
            ExternalLink: false,
            ShowLink: true,
            Title: "Новости платформы",
            Description: "страница новостей веб-платформы",
            path: "/news",
            element: <NewsPage />,
            private: "all",
            Logic: true,
            Redirect: true,
            Style: "text-secondary",
            LinkIcon: "fa-solid fa-newspaper m-0 p-1",
          },
        ],
      },
      {
        Header: "Обучение",
        Access: ["all"],
        Image: "/static/img/modules/2_module_main/section_study.png",
        Links: [
          {
            Header: "Видео инструкции",
            Access: ["all"],
            Active: true,
            Link: "/video_study",
            ExternalLink: false,
            ShowLink: true,
            Title: "Видео инструкции",
            Description:
              "страница с видео инструкциями по функционалу веб-платформы",
            path: "/video_study",
            element: <VideoStudyPage />,
            private: "all",
            Logic: true,
            Redirect: false,
            Style: "text-dark",
            LinkIcon: "fa-brands fa-sistrix m-0 p-1",
          },
          {
            Header: "Текстовые инструкции",
            Access: ["all"],
            Active: true,
            Link: "/text_study",
            ExternalLink: false,
            ShowLink: true,
            Title: "Текстовые инструкции",
            path: "/text_study",
            element: <TextStudyPage />,
            private: "all",
            Description:
              "страница с текстовыми инструкциями по функционалу веб-платформы",
            Logic: true,
            Redirect: false,
            Style: "text-dark",
            LinkIcon: "fa-brands fa-sistrix m-0 p-1",
          },
        ],
      },
      {
        Header: "Лучшие пользователи",
        Access: ["user"],
        Image: "/static/img/modules/2_module_main/section_ratings.png",
        Links: [
          {
            Header: "Зал славы",
            Access: ["user"],
            Active: true,
            Link: "/top/authors",
            ExternalLink: false,
            ShowLink: true,
            Title: "Зал славы",
            Description: "страница с лучшими и самыми активными участниками",
            path: "/top/authors",
            element: <UsersRatingsListPage />,
            private: true,
            Logic: true,
            Redirect: true,
            Style: "custom-color-warning-1",
            LinkIcon: "fa-solid fa-list-ol m-0 p-1",
          },
        ],
      },
    ],
  },
  {
    Header: "Профиль",
    Access: ["all"],
    Image: "/static/img/modules/1_module_profile/module_profile.png",
    ShowInModules: true,
    ModuleIcon: "fa-solid fa-id-card-clip m-0 p-1",
    Sections: [
      {
        Header: "Личный профиль",
        Access: ["all"],
        Image: "/static/img/modules/1_module_profile/section_self_profile.png",
        Links: [
          {
            Header: "Уведомления",
            Access: ["user"],
            Active: true,
            Link: "/notification_list",
            ExternalLink: false,
            ShowLink: true,
            Title: "Уведомления",
            Description:
              "страница с уведомлениями лично для Вас или для Ваших групп доступа",
            path: "/notification_list",
            element: <NotificationListPage />,
            private: true,
            Logic: true,
            Redirect: true,
            Style: "text-dark",
            LinkIcon: "fa-solid fa-bell m-0 p-1",
          },
          {
            Header: "Изменение профиля",
            Access: ["user"],
            Active: true,
            Link: "/profile/change",
            ExternalLink: false,
            ShowLink: false,
            Title: "Изменение профиля",
            Description: "страница редактирования Вашего личного профиля",
            path: "/profile/change",
            element: <HomePage />,
            private: true,
            Logic: true,
            Redirect: false,
            Style: "text-dark",
            LinkIcon: "fa-solid fa-id-card m-0 p-1",
          },
          {
            Header: "Изменение данных для входа",
            Access: ["user"],
            Active: true,
            Link: "/password/change",
            ExternalLink: false,
            ShowLink: true,
            Title: "Изменение данных для входа",
            Description:
              "страница редактирования данных для входа от Вашего аккаунта",
            path: "/password/change",
            element: <ChangeProfilePage />,
            private: true,
            Logic: true,
            Redirect: true,
            Style: "text-dark",
            LinkIcon: "fa-solid fa-key m-0 p-1",
          },
          {
            Header: "Восстановление доступа",
            Access: ["all"],
            Active: true,
            Link: "/password/recover",
            ExternalLink: false,
            ShowLink: true,
            Title: "Восстановление доступа",
            Description: "страница восстановления доступа к Вашему аккаунту",
            path: "/password/recover",
            element: <RecoverPasswordPage />,
            private: "all",
            Logic: true,
            Redirect: false,
            Style: "text-dark",
            LinkIcon: "fa-solid fa-universal-access m-0 p-1",
          },
          {
            Header: "Войти",
            Access: ["all"],
            Active: true,
            Link: "/login",
            ExternalLink: false,
            ShowLink: true,
            Title: "Вход в систему",
            Description: "страница для входа в систему",
            path: "/login",
            element: <LoginPage />,
            private: false,
            Logic: true,
            Redirect: false,
            Style: "text-primary",
            LinkIcon: "fa-solid fa-arrow-right-to-bracket m-0 p-1",
          },
          {
            Header: "Выйти",
            Access: ["user"],
            Active: true,
            Link: "/logout",
            ExternalLink: false,
            ShowLink: true,
            Title: "",
            Description: "",
            path: "/logout",
            element: <LogoutPage />,
            private: true,
            Logic: true,
            Redirect: false,
            Style: "text-danger",
            LinkIcon: "fa-solid fa-door-open m-0 p-1",
          },
        ],
      },
    ],
  },
  {
    Header: "Развитие",
    Access: ["user"],
    Image: "/static/img/modules/3_module_progress/module_progress.png",
    ShowInModules: true,
    ModuleIcon: "fa-solid fa-bars-progress m-0 p-1",
    Sections: [
      {
        Header: "Рационализаторство",
        Access: ["superuser"],
        Image: "/static/img/modules/3_module_progress/sectional_rational.png",
        Links: [
          {
            Header: "Пример (шаблон) рационализаторского предложения",
            Access: ["superuser"],
            Active: true,
            Link: "/rational/template",
            ExternalLink: false,
            ShowLink: true,
            Title: "Пример (шаблон) рационализаторского предложения",
            Description:
              "страница с примером (шаблоном) рационализаторского предложения",
            path: "/rational/template",
            element: <HomePage />,
            private: true,
            Logic: true,
            Redirect: true,
            Style: "text-secondary",
            LinkIcon: "fa-solid fa-circle-info m-0 p-1",
          },
          {
            Header: "Подать новое рационализаторское предложение",
            Access: [
              "moderator_rational",
              "moderator_rational_atp",
              "moderator_rational_gtk",
              "moderator_rational_ok",
              "moderator_rational_upravlenie",
              "moderator_rational_energoupravlenie",
            ],
            Active: true,
            Link: "/rational/create",
            ExternalLink: false,
            ShowLink: true,
            Title: "Подача рационализаторского предложения",
            Description:
              "страница с формой для заполнения и подачи рационализаторского предложения",
            path: "/rational/create",
            element: <HomePage />,
            private: true,
            Logic: true,
            Redirect: true,
            Style: "text-success",
            LinkIcon: "fa-solid fa-circle-plus m-0 p-1",
          },
          {
            Header: "Модерация рационализаторских предложений [модератор]",
            Access: [
              "moderator_rational",
              "moderator_rational_atp",
              "moderator_rational_gtk",
              "moderator_rational_ok",
              "moderator_rational_upravlenie",
              "moderator_rational_energoupravlenie",
            ],
            Active: true,
            Link: "/rational/moderate/list",
            ExternalLink: false,
            ShowLink: true,
            Title: "Модерация рационализаторских предложений [модератор]",
            Description: "страница модерации рационализаторских предложений",
            path: "/rational/moderate/list",
            element: <HomePage />,
            private: true,
            Logic: true,
            Redirect: true,
            Style: "text-danger",
            LinkIcon: "fa-solid fa-screwdriver-wrench m-0 p-1",
          },
          {
            Header:
              "Модерация рационализаторских предложений [модератор] [скрыто]",
            Access: [
              "moderator_rational",
              "moderator_rational_atp",
              "moderator_rational_gtk",
              "moderator_rational_ok",
              "moderator_rational_upravlenie",
              "moderator_rational_energoupravlenie",
            ],
            Active: true,
            Link: "/rational/moderate/:id",
            ExternalLink: false,
            ShowLink: true,
            Title: "Модерация рационализаторского предложения",
            Description: "модерация рационализаторского предложения",
            path: "/rational/moderate/:id",
            element: <HomePage />,
            private: true,
            Logic: true,
            Redirect: true,
            Style: "text-muted",
            LinkIcon: "fa-solid fa-toolbox m-0 p-1",
          },
        ],
      },
      {
        Header: "Банк идей",
        Access: ["user"],
        Image: "/static/img/modules/3_module_progress/section_idea.png",
        Links: [
          {
            Header: "Пример (шаблон) идеи",
            Access: ["user"],
            Active: true,
            Link: "/idea/template",
            ExternalLink: false,
            ShowLink: true,
            Title: "Пример (шаблон) идеи",
            Description: "страница с примером (шаблоном) идеи в банке идеи",
            path: "/idea/template",
            element: <IdeaTemplatePage />,
            private: true,
            Logic: true,
            Redirect: true,
            Style: "text-secondary",
            LinkIcon: "fa-solid fa-circle-info m-0 p-1",
          },
          {
            Header: "Подача новой идеи",
            Access: ["user"],
            Active: true,
            Link: "/idea/create",
            ExternalLink: false,
            ShowLink: true,
            Title: "Подача новой идеи",
            Description:
              "страница с формой для заполнения и подачи идеи в банк идей",
            path: "/idea/create",
            element: <IdeaCreatePage />,
            private: true,
            Logic: true,
            Redirect: true,
            Style: "text-success",
            LinkIcon: "fa-solid fa-circle-plus m-0 p-1",
          },
          {
            Header: "Мои идеи на доработку",
            Access: ["user"],
            Active: true,
            Link: "/idea/self/list",
            ExternalLink: false,
            ShowLink: true,
            Title: "Мои идеи на доработку",
            Description: "страница со списком Ваших идей для доработки",
            path: "/idea/self/list",
            element: <IdeaSelfListPage />,
            private: true,
            Logic: true,
            Redirect: true,
            Style: "text-danger",
            LinkIcon: "fa-solid fa-screwdriver-wrench m-0 p-1",
          },
          {
            Header: "Редактирование своей идеи [скрыто]",
            Access: ["user"],
            Active: true,
            Link: "/idea/self/:id",
            ExternalLink: false,
            ShowLink: false,
            Title: "Редактирование своей идеи",
            Description: "страница с идеей на доработку",
            path: "/idea/self/:id",
            element: <IdeaSelfPage />,
            private: true,
            Logic: true,
            Redirect: true,
            Style: "text-muted",
            LinkIcon: "fa-solid fa-toolbox m-0 p-1",
          },
          {
            Header: "Список идей",
            Access: ["user"],
            Active: true,
            Link: "/idea/public/list",
            ExternalLink: false,
            ShowLink: true,
            Title: "Список идей",
            Description:
              "список идей в банке идей с возможностью поиска и фильтрации",
            path: "/idea/public/list",
            element: <IdeaPublicListPage />,
            private: true,
            Logic: true,
            Redirect: true,
            Style: "text-primary",
            LinkIcon: "fa-solid fa-list m-0 p-1",
          },
          {
            Header: "Подробности идеи [скрыто]",
            Access: ["user"],
            Active: true,
            Link: "/idea/public/:id",
            ExternalLink: false,
            ShowLink: false,
            Title: "Подробности идеи",
            Description:
              "страница с подробной информацией об идеи в банке идей",
            path: "/idea/public/:id",
            element: <IdeaPublicPage />,
            private: true,
            Logic: true,
            Redirect: true,
            Style: "text-muted",
            LinkIcon: "fa-solid fa-toolbox m-0 p-1",
          },
          {
            Header: "Лучшие идеи",
            Access: ["user"],
            Active: true,
            Link: "/idea/rating/list",
            ExternalLink: false,
            ShowLink: true,
            Title: "Лучшие идеи",
            Description: "страница с лучшими идеями в банке идей",
            path: "/idea/rating/list",
            element: <IdeaRatingListPage />,
            private: true,
            Logic: true,
            Redirect: true,
            Style: "custom-color-warning-1",
            LinkIcon: "fa-solid fa-list-ol m-0 p-1",
          },
          {
            Header: "Модерация идей [модератор]",
            Access: ["moderator_idea"],
            Active: true,
            Link: "/idea/moderate/list",
            ExternalLink: false,
            ShowLink: true,
            Title: "Модерация идей",
            Description: "страница со списком идей и возможностью модерации",
            path: "/idea/moderate/list",
            element: <IdeaModerateListPage />,
            private: true,
            Logic: true,
            Redirect: true,
            Style: "text-danger",
            LinkIcon: "fa-solid fa-screwdriver-wrench m-0 p-1",
          },
          {
            Header: "Модерация идеи [модератор] [скрыто]",
            Access: ["moderator_idea"],
            Active: true,
            Link: "/idea/moderate/:id",
            ExternalLink: false,
            ShowLink: false,
            Title: "Модерация идеи",
            Description: "модерация идеи в банке идей",
            path: "/idea/moderate/:id",
            element: <IdeaModeratePage />,
            private: true,
            Logic: true,
            Redirect: true,
            Style: "text-muted",
            LinkIcon: "fa-solid fa-toolbox m-0 p-1",
          },
        ],
      },
    ],
  },
  {
    Header: "Бухгалтерия",
    Access: ["user"],
    Image: "/static/img/modules/4_module_buhgalteria/module_buhgalteria.png",
    ShowInModules: true,
    ModuleIcon: "fa-solid fa-calculator m-0 p-1",
    Sections: [
      {
        Header: "Сектор расчёта заработной платы",
        Access: ["user"],
        Image: "/static/img/modules/4_module_buhgalteria/section_zarplata.png",
        Links: [
          {
            Header: "Выгрузка расчётного листа",
            Access: ["user"],
            Active: true,
            Link: "/salary",
            ExternalLink: false,
            ShowLink: true,
            Title: "Выгрузка расчётного листа",
            Description:
              "страница выгрузки расчётного листа за выбранный период",
            path: "/salary",
            element: <SalaryPage />,
            private: true,
            Logic: true,
            Redirect: true,
            Style: "text-dark",
            LinkIcon: "fa-solid fa-wallet m-0 p-1",
          },
        ],
      },
    ],
  },
  {
    Header: "СУП",
    Access: ["user"],
    Image: "/static/img/modules/5_module_sup/module_sup.png",
    ShowInModules: true,
    ModuleIcon: "fa-solid fa-users-gear m-0 p-1",
    Sections: [
      {
        Header: "Отдел кадров",
        Access: ["user"],
        Image: "/static/img/modules/5_module_sup/section_hr.png",
        Links: [
          {
            Header: "Выгрузка данных по отпуску",
            Access: ["user"],
            Active: true,
            Link: "/vacation",
            ExternalLink: false,
            ShowLink: true,
            Title: "Выгрузка данных по отпуску",
            Description:
              "страница выгрузки данных по отпуску за выбранный период",
            path: "/vacation",
            element: <VacationPage />,
            private: true,
            Logic: true,
            Redirect: true,
            Style: "text-dark",
            LinkIcon: "fa-solid fa-calendar-days m-0 p-1",
          },
        ],
      },
    ],
  },
  {
    Header: "Модератор",
    Access: ["moderator_oit", "moderator_otiz"],
    Image: "/static/img/modules/earth.png",
    ShowInModules: false,
    ModuleIcon: "fa-brands fa-monero m-0 p-1",
    Sections: [
      {
        Header: "Основной функционал",
        Access: [""],
        Image: "/static/img/modules/earth.png",
        Links: [
          {
            Header: "Панель Администрирования",
            Access: [""],
            Active: true,
            Link: "/admin/",
            ExternalLink: true,
            ShowLink: true,
            Title: "",
            Description: "",
            Logic: false,
            Redirect: false,
            Style: "text-dark",
            LinkIcon: "fa-solid fa-toolbox m-0 p-1",
          },
          {
            Header: "Api Django rest_framework",
            Access: [""],
            Active: true,
            Link: "/api/auth/routes/",
            ExternalLink: true,
            ShowLink: true,
            Title: "",
            Description: "",
            Logic: false,
            Redirect: false,
            Style: "text-dark",
            LinkIcon: "fa-solid fa-toolbox m-0 p-1",
          },
          {
            Header: "127.0.0.1:3000",
            Access: [""],
            Active: true,
            Link: "http://127.0.0.1:3000/",
            ExternalLink: true,
            ShowLink: true,
            Title: "",
            Description: "",
            Logic: false,
            Redirect: false,
            Style: "text-dark",
            LinkIcon: "fa-solid fa-toolbox m-0 p-1",
          },
          {
            Header: "127.0.0.1:8000",
            Access: [""],
            Active: true,
            Link: "http://127.0.0.1:8000/",
            ExternalLink: true,
            ShowLink: true,
            Title: "",
            Description: "",
            Logic: false,
            Redirect: false,
            Style: "text-dark",
            LinkIcon: "fa-solid fa-toolbox m-0 p-1",
          },
          {
            Header: "127.0.0.1:8000/test/",
            Access: [""],
            Active: true,
            Link: "http://127.0.0.1:8000/test/",
            ExternalLink: true,
            ShowLink: true,
            Title: "",
            Description: "",
            Logic: false,
            Redirect: false,
            Style: "text-dark",
            LinkIcon: "fa-solid fa-toolbox m-0 p-1",
          },
        ],
      },
      {
        Header: "Аккаунты",
        Access: ["moderator_oit"],
        Image: "/static/img/modules/earth.png",
        Links: [
          {
            Header: "Действия над аккаунтом пользователя",
            Access: ["moderator_oit"],
            Active: true,
            Link: "/moderator/actions/user",
            ExternalLink: false,
            ShowLink: true,
            Title: "Действия над аккаунтом пользователя",
            Description:
              "страница действий модератора над аккаунтом пользователя",
            path: "/moderator/actions/user",
            element: <RecoverUserPasswordPage />,
            private: true,
            Logic: true,
            Redirect: true,
            Style: "text-dark",
            LinkIcon: "fa-solid fa-toolbox m-0 p-1",
          },
          {
            Header: "Создать или изменить пользователей",
            Access: ["superuser"],
            Active: true,
            Link: "/moderator/create/users",
            ExternalLink: false,
            ShowLink: true,
            Title: "Создать или изменить пользователей",
            Description:
              "страница с формой и настройками для создания или изменения пользователей",
            path: "/moderator/create/users",
            element: <CreateOrChangeUsersPage />,
            private: true,
            Logic: true,
            Redirect: true,
            Style: "text-dark",
            LinkIcon: "fa-solid fa-toolbox m-0 p-1",
          },
          {
            Header: "Выгрузить список пользователей",
            Access: ["superuser"],
            Active: true,
            Link: "/moderator/export/users",
            ExternalLink: false,
            ShowLink: true,
            Title: "Выгрузить список пользователей",
            Description: "страница выгрузки всех пользователей системы",
            path: "/moderator/export/users",
            element: <ExportUsersPage />,
            private: true,
            Logic: true,
            Redirect: true,
            Style: "text-dark",
            LinkIcon: "fa-solid fa-toolbox m-0 p-1",
          },
        ],
      },
      {
        Header: "Терминалы скуд",
        Access: ["superuser"],
        Image: "/static/img/modules/earth.png",
        Links: [
          {
            Header: "Перезагрузка терминалов",
            Access: ["superuser"],
            Active: true,
            Link: "/moderator/terminal/reboot",
            ExternalLink: false,
            ShowLink: true,
            Title: "Перезагрузка терминалов",
            Description: "страница с настройками для перезагрузки терминалов",
            path: "/moderator/terminal/reboot",
            element: <TerminalRebootPage />,
            private: true,
            Logic: true,
            Redirect: true,
            Style: "text-dark",
            LinkIcon: "fa-solid fa-toolbox m-0 p-1",
          },
        ],
      },
    ],
  },
  {
    Header: "Разработка",
    Access: ["superuser"],
    Image: "/static/img/modules/earth.png",
    ShowInModules: false,
    ModuleIcon: "fa-solid fa-code m-0 p-1",
    Sections: [
      {
        Header: "web version",
        Access: ["superuser"],
        Image: "/static/img/modules/earth.png",
        Links: [
          {
            Header: "27.04.22 19:42",
            Access: ["superuser"],
            Active: false,
            Link: "#",
            ExternalLink: false,
            ShowLink: true,
            Title: "",
            Description: "",
            Logic: false,
            Redirect: false,
            Style: "text-secondary",
            LinkIcon: "fa-solid fa-circle-info m-0 p-1",
          },
          {
            Header: "Test",
            Access: ["superuser"],
            Active: true,
            Link: "/test",
            ExternalLink: false,
            ShowLink: true,
            Title: "Test",
            Description: "test",
            path: "/test",
            element: <TestPage />,
            private: true,
            Logic: true,
            Redirect: true,
            Style: "text-dark",
            LinkIcon: "fa-solid fa-toolbox m-0 p-1",
          },
          {
            Header: "Form",
            Access: ["superuser"],
            Active: true,
            Link: "/forms",
            ExternalLink: false,
            ShowLink: true,
            Title: "Test",
            Description: "test",
            path: "/forms",
            element: <FormPage />,
            private: true,
            Logic: true,
            Redirect: true,
            Style: "text-dark",
            LinkIcon: "fa-solid fa-toolbox m-0 p-1",
          },
        ],
      },
    ],
  },
];

export function Routers() {
  const userLoginStore = hook.useSelectorCustom2(slice.user.userLoginStore);
  return userLoginStore.data ? (
    <Routes>
      {util.GetRoutes(true).map(({ path, element }, key) => (
        <Route path={path} element={element} key={key} />
      ))}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  ) : (
    <Routes>
      {util.GetRoutes(false).map(({ path, element }, key) => (
        <Route path={path} element={element} key={key} />
      ))}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
