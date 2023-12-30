export const DEBUG =
  window.location.host === "127.0.0.1:3000" ||
  window.location.host === "localhost:3000";

// export const IS_ASD_SERVER =
//   window.location.host.split(":")[0] === "172.30.23.16";
export const IS_ASD_SERVER = true;

export const API = DEBUG ? "http://127.0.0.1:8000/api" : "/api";
