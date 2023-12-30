import * as constants from "./constants";

export function correctZero(chars: string) {
  let result = chars;
  if (result.length === 1) {
    result = `0${result}`;
  }
  return result;
}

export function getCurrentDateTime() {
  const dateTime = new Date();

  const day = correctZero(`${dateTime.getDate()}`);
  const month = correctZero(`${dateTime.getMonth() + 1}`);
  const year = `${dateTime.getFullYear()}`;
  const hours = correctZero(`${dateTime.getHours()}`);
  const minutes = correctZero(`${dateTime.getMinutes()}`);
  const seconds = correctZero(`${dateTime.getSeconds()}`);

  return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
}

export function getCurrentDateForForm() {
  let d = new Date();
  let dd = d.getDate();
  // @ts-ignore
  dd = dd < 10 ? "0" + dd : dd;
  let mm = d.getMonth() + 1;
  // @ts-ignore
  mm = mm < 10 ? "0" + mm : mm;
  let yyyy = d.getFullYear();
  // @ts-ignore
  // let ret = yyyy + "-" + mm + "-" + dd;
  let ret = `${yyyy}-${mm}-${dd}`;

  return ret;
}

export class Converting {
  static parseFloat(value: string): number {
    return parseFloat(value);
  }
  static parseInt(string: string, radix?: number | undefined): number {
    return parseInt(string, radix);
  }
}

export const ChangeAccordionCollapse = (objects = [""]) => {
  try {
    objects.forEach(function (object, index, array) {
      const obj = document.getElementById(object);
      const classname =
        // @ts-ignore
        obj.getAttribute("class") === "accordion-collapse collapse m-0 p-0"
          ? "accordion-collapse m-0 p-0"
          : "accordion-collapse collapse m-0 p-0";
      // @ts-ignore
      obj.setAttribute("class", classname);
    });
  } catch (error) {
    if (constants.DEBUG) {
      console.log(error);
    }
    return null;
  }
};

export function GetPagesArray(totalCount = 0, limit = 1) {
  try {
    const page = Math.ceil(totalCount / limit);
    let result = [];
    if (totalCount) {
      for (let i = 0; i < page; i++) {
        result.push(i + 1);
      }
    }
    return result;
  } catch (error) {
    if (constants.DEBUG) {
      console.log(error);
    }
    return [];
  }
}

export class DateTime {
  static GetCleanDateTime = (
    dateTime: string,
    withTime = true,
    onlyTime = false,
  ) => {
    try {
      const date = dateTime.split("T")[0].split("-");
      const time = dateTime.split("T")[1].slice(0, 5);
      if (onlyTime) {
        return `${time}`;
      }
      if (withTime) {
        return `${date[2]}.${date[1]}.${date[0]} ${time}`;
      } else {
        return `${date[2]}.${date[1]}.${date[0]}`;
      }
    } catch (error) {
      if (constants.DEBUG) {
        console.log(error);
      }
      return "";
    }
  };
  static getNormalTime(time: string) {
    return `${time.split("T")[0]} ${time.split("T")[1].split("+")[0]}`;
  }
}
