import * as messages from "./messages";
import * as loaders from "./loaders";
import { useSelector } from "react-redux";

import * as utils from "../utils";
import * as slices from "../slices";

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

export const Accordion1 = ({
  // @ts-ignore
  key_target,
  isCollapse = true,
  // @ts-ignore
  title,
  text_style = "text-danger",
  header_style = "bg-danger bg-opacity-10",
  body_style = "bg-danger bg-opacity-10",
  // @ts-ignore
  children,
}) => {
  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="m-0 p-0">
      <div className="accordion m-0 p-0" id="accordionExample">
        <div className="accordion-item custom-background-transparent-middle m-0 p-0">
          <h2
            className="accordion-header custom-background-transparent-low m-0 p-0"
            id="accordion_heading_1"
          >
            <button
              className={`accordion-button m-0 p-0 ${header_style}`}
              type="button"
              data-bs-toggle=""
              data-bs-target={`#${key_target}`}
              aria-expanded="false"
              aria-controls={key_target}
              onClick={(e) => utils.ChangeAccordionCollapse([key_target])}
            >
              <h6 className={`lead m-0 p-3 ${text_style}`}>
                {title}{" "}
                <small className="text-muted m-0 p-0">
                  (click here for switch)
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
    </div>
  );
};
