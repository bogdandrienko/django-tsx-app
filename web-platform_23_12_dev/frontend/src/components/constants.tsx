// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

// export const DEBUG_CONSTANT = process.env.NODE_ENV === "production";
export const DEBUG_CONSTANT = true;

function isDev() {
  if (
    window.location.host === "127.0.0.1:3000" ||
    window.location.host === "localhost:3000"
  ) {
    return "http://127.0.0.1:82/api/"; // todo DEV
  } else {
    return "/api/"; // todo PROD
  }
}

export const SERVER_HOST_AND_PORT_CONSTANT = isDev();
export const IS_CENTR_MONITORING = false;

export class HttpMethods {
  static GET() {
    return "GET";
  }
  static READ() {
    return "GET";
  }
  static POST() {
    return "POST";
  }
  static CREATE() {
    return "POST";
  }
  static PUT() {
    return "PUT";
  }
  static UPDATE() {
    return "PUT";
  }
  static DELETE() {
    return "DELETE";
  }
}
