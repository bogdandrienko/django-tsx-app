import * as messages from "./messages";
import * as loaders from "./loaders";
import { useSelector } from "react-redux";

import * as utils from "../utils";
import * as slices from "../slices";
import React from "react";

export const StatusStore1 = ({
  // @ts-ignore
  slice,
  consoleLog = false,
  showLoad = true,
  loadText = "",
  showData = true,
  dataText = "",
  showError = true,
  errorText = "",
  showFail = true,
  failText = "",
}) => {
  // TODO hooks ////////////////////////////////////////////////////////////////////////////////////////////////////////

  // @ts-ignore
  const storeConstant = useSelector((state) => state[slice.name]);
  if (consoleLog) {
    // console.log(`StoreComponent2 ${slice.name}`, storeConstant);
  }

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="m-0 p-0">
      {showLoad &&
        storeConstant.load &&
        (loadText ? (
          <messages.Message.Secondary>{loadText}</messages.Message.Secondary>
        ) : (
          <div className="row justify-content-center m-0 p-0">
            <div className="text-center m-0 p-0">
              <loaders.Loader2 />
            </div>
          </div>
        ))}
      {showData && storeConstant.data && (
        <messages.Message.Success>
          {dataText
            ? dataText
            : typeof storeConstant.data === "string"
            ? storeConstant.data
            : "данные не подходят для отображения!"}
        </messages.Message.Success>
      )}
      {showError && storeConstant.error && (
        <messages.Message.Danger>
          {errorText ? errorText : storeConstant.error}
        </messages.Message.Danger>
      )}
      {showFail && storeConstant.fail && (
        <messages.Message.Warning>
          {failText ? failText : storeConstant.fail}
        </messages.Message.Warning>
      )}
    </div>
  );
};

export function Accordion3({
  keyTarget,
  isCollapse,
  children,
}: {
  keyTarget: string;
  isCollapse: boolean;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div className="accordion m-0 p-0" id="accordionExample">
      {isCollapse ? "Правда" : "Ложь"}
      {children}
    </div>
  );
}

export const Accordion1 = ({
  // @ts-ignore
  key_target,
  // @ts-ignore
  isCollapse,
  // @ts-ignore
  title,
  // @ts-ignore
  text_style,
  // @ts-ignore
  header_style,
  // @ts-ignore
  body_style,
  // @ts-ignore
  children,
}): any => {
  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="accordion m-0 p-0" id="accordionExample">
      <div className="accordion-item m-0 p-0">
        <h2 className="accordion-header m-0 p-0" id="accordion_heading_1">
          <button
            className={`accordion-button ${header_style}`}
            type="button"
            data-bs-toggle=""
            data-bs-target={`#${key_target}`}
            aria-expanded="false"
            aria-controls={key_target}
            onClick={(e) => utils.ChangeAccordionCollapse([key_target])}
          >
            <h6 className={`lead p-2 ${text_style}`}>
              {title}{" "}
              <small className="text-muted">
                (нажмите сюда чтобы развернуть)
              </small>
            </h6>
          </button>
        </h2>
        <div
          id={key_target}
          className={
            isCollapse
              ? "accordion-collapse collapse m-0 p-0"
              : "accordion-collapse m-0 p-0"
          }
          aria-labelledby={key_target}
          data-bs-parent="#accordionExample"
        >
          <div className={`accordion-body m-0 p-0 ${body_style}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Accordion2 = ({
  keyTarget,
  isCollapse,
  title,
  titleTextClassName,
  headerClassName,
  bodyClassName,
  children,
}: {
  keyTarget: string;
  isCollapse: boolean;
  headerClassName: string;
  title: string;
  titleTextClassName: string;
  bodyClassName: string;
  children: React.ReactNode;
}): any => {
  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="accordion m-0 p-0" id="accordionExample">
      <div className="accordion-item m-0 p-0 custom-background-transparent-full">
        <h2 className="accordion-header m-0 p-0" id="accordion_heading_1">
          <button
            className={`accordion-button ${headerClassName}`}
            type="button"
            data-bs-toggle=""
            data-bs-target={`#${keyTarget}`}
            aria-expanded="false"
            aria-controls={keyTarget}
            onClick={(e) => utils.ChangeAccordionCollapse([keyTarget])}
          >
            <h6 className={`lead ${titleTextClassName}`}>
              {title}
              <small className="text-muted m-1">
                (нажмите сюда чтобы развернуть)
              </small>
            </h6>
          </button>
        </h2>
        <div
          id={keyTarget}
          className={
            isCollapse
              ? "accordion-collapse collapse m-0 p-0"
              : "accordion-collapse m-0 p-0"
          }
          aria-labelledby={keyTarget}
          data-bs-parent="#accordionExample"
        >
          <div className={`accordion-body m-0 p-0 ${bodyClassName}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
