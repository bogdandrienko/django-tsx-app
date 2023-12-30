import React from "react";

import CenterMonitoring from "../pages/Center/CenterMonitoring";
import CenterSticking from "../pages/Center/CenterSticking";
import DigitalCloneHome from "../pages/DigitalClone/DigitalCloneHome";
import SpeedReportDumptrucksCustom from "../pages/DigitalClone/SpeedReportDumptrucksCustom";
import StoppagesReportEmptyPeregonDumptrucks from "../pages/DigitalClone/StoppagesReportEmptyPeregonDumptrucks";
import StoppagesReportDumptruckDvs from "../pages/DigitalClone/StoppagesReportDumptruckDvs";
// claim
import ClaimCreate from "../pages/Claim/ClaimCreate";
import ClaimList from "../pages/Claim/ClaimList";
// idea
import IdeaCreate from "../pages/Idea/IdeaCreate";
import IdeaExport from "../pages/Idea/IdeaExport";

export const routes: any = {
  DigitalCloneHome: {
    path: "/",
    element: <DigitalCloneHome />,
    title: "Главная страница",
    description: "тут расположены ссылки на основные модули",
  },
  CenterMonitoring: {
    path: "/center/monitoring",
    element: <CenterMonitoring />,
    title: "Центр Мониторинга",
    description: "",
    is_center: true,
  },
  CenterSticking: {
    path: "/center/sticking",
    element: <CenterSticking />,
    title: "Центр Налипаний",
    description: "",
    is_center: true,
  },
  SpeedReportDumptrucksCustom: {
    path: "/speed/report/dumptrucks_custom",
    element: <SpeedReportDumptrucksCustom />,
    title:
      "Отчёт по технической и эксплуатационной средней скорости автосамосвалов",
    description:
      "Отчёт по технической и эксплуатационной средней скорости автосамосвалов",
  },
  StoppagesReportEmptyPeregonDumptrucks: {
    path: "/stoppages/report/empty_peregon/dumptrucks",
    element: <StoppagesReportEmptyPeregonDumptrucks />,
    title: "Отчёт по холостым перегонам автосамосвалов",
    description:
      "Попадания автосамосвалов в указанные координаты за выбранный период",
  },
  StoppagesReportDumptruckDvs: {
    path: "/stoppages/report/dumptruck_dvs",
    element: <StoppagesReportDumptruckDvs />,
    title: "Отчёт по холостым простоям ДВС автосамосвалов",
    description: "Нулевая скорость и включённый ДВС за выбранную смену",
  },
  // claim
  ClaimCreate: {
    path: "/claim/create/",
    element: <ClaimCreate />,
    title: "",
    description: "",
    is_center: true,
  },
  ClaimList: {
    path: "/claim/list/",
    element: <ClaimList />,
    title: "",
    description: "",
    is_center: true,
  },
  // idea
  IdeaCreate: {
    path: "/idea/create/",
    element: <IdeaCreate />,
    title: "",
    description: "",
    is_center: true,
  },
  IdeaExport: {
    path: "/idea/export/",
    element: <IdeaExport />,
    title: "",
    description: "",
    is_center: true,
  },
  //
  Root: {
    path: "*",
    element: <DigitalCloneHome />,
    title: "Главная страница",
    description: "тут расположены ссылки на основные модули",
  },
};
