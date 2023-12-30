// TODO download modules /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useState } from "react";
import { useDispatch } from "react-redux";

// TODO custom modules ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import * as base from "../../components/ui/bases";
import * as components from "../../components/ui/components";
import * as hooks from "../../components/hooks";
import * as slices from "../../components/slices";

// TODO export ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function Page(): JSX.Element {
  // TODO stores /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const slice = slices.claim.claimCreate;
  const store = hooks.useSelectorCust(slice);

  // TODO hooks //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();
  const [form, setForm] = useState({
    param_author: "",
    param_description: "",
    param_tech: "",
  });

  // TODO functions //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async function GetData(event: any) {
    event.preventDefault();
    if (form.param_author !== "" && form.param_description !== "") {
      dispatch(
        slice.action({
          form: { ...form },
        }),
      );
    } else {
      window.alert("Заполните все данные!");
    }
  }

  // TODO return /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <base.Base3>
      <div className="bg-light container card">
        <div className="container mt-5">
          <div className="container-fluid">
            <div className="text-center">
              <h1 className="display-5 fw-bold fst-italic">
                Подача заявки<span className="text-success">(Өтінім беру)</span>
                :
              </h1>
              <div className="col-lg-6 mx-auto">
                <p className="lead mb-1">
                  эта страница содержит форму для заполнения и отправки заявки
                  <span className="text-success">
                    (бұл бетте өтінішті толтыру және жіберу формасы бар)
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        {!store.data ? (
          <form className={""} onSubmit={GetData}>
            <div className="text-start">
              <div className="fw-bold mt-3 shadow p-1 w-75">
                <p className="">
                  от кого<span className="text-success">(кімнен)</span>:
                </p>
              </div>
              <label className="form-control-sm w-100 m-1">
                ФИО, можно инициалы
                <span className="text-success">
                  (Толық аты-жөні, бас әріптері мүмкін)
                </span>
                :
                <input
                  type="text"
                  required
                  placeholder="-> вводить данные сюда <-"
                  minLength={1}
                  maxLength={300}
                  className="form-control form-control-sm"
                  value={form.param_author}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      param_author: event.target.value,
                    })
                  }
                />
                <small className="text-muted">
                  количество символов
                  <span className="text-success">(ұзындығы)</span>: 1-300
                </small>
              </label>

              <div className="fw-bold mt-3 shadow p-1 w-75">
                <p className="">
                  что нужно<span className="text-success">(не керек)</span>:
                </p>
              </div>
              <label className="form-control-sm w-100 m-1">
                Описание заявки
                <span className="text-success">(Қолданбаның сипаттамасы)</span>:
                <textarea
                  required
                  minLength={1}
                  maxLength={2000}
                  rows={3}
                  className="form-control form-control-sm"
                  value={form.param_description}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      param_description: event.target.value,
                    })
                  }
                ></textarea>
                <small className="text-muted">
                  количество символов
                  <span className="text-success">(ұзындығы)</span>: 1-2000
                </small>
              </label>

              <div className="fw-bold mt-3 shadow p-1 w-75">
                <p className="">
                  дополнительно<span className="text-success">(қосымша)</span>:
                </p>
              </div>
              <label className="form-control-sm w-100 m-1">
                Номер экскаватора, необязательно
                <span className="text-success">
                  (Экскаватор нөмірі, міндетті емес)
                </span>
                :
                <input
                  type="text"
                  placeholder=""
                  minLength={1}
                  maxLength={100}
                  className="form-control form-control-sm"
                  value={form.param_tech}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      param_tech: event.target.value,
                    })
                  }
                />
                <small className="text-muted">
                  количество символов
                  <span className="text-success">(ұзындығы)</span>: 1-100
                </small>
              </label>
            </div>
            <div className="container-fluid text-center">
              <components.StatusStore1
                slice={slice}
                // consoleLog={constants.DEBUG}
                consoleLog={false}
                showLoad={true}
                showData={false}
                showError={true}
                showFail={true}
              />
              <button
                className="btn btn-lg btn-outline-primary w-100"
                type="submit"
              >
                отправить<span className="text-success">(жіберу)</span>
              </button>
            </div>
          </form>
        ) : (
          <div className={"container m-3"}>
            <hr />
            <div className="text-success display-3 fw-bold">
              Успешно отправлено!
            </div>
            <button
              className="btn btn-lg btn-outline-primary"
              onClick={() => {
                dispatch({ type: slice.constant.reset });
              }}
            >
              отправить ещё
            </button>
            <hr />
          </div>
        )}
        <div className="text-center lead">
          <p className="">
            Все полученные заявки будут рассмотрены!
            <span className="text-success">
              (Барлық түскен өтініштер қарастырылады!)
            </span>
          </p>
          <p>
            <img
              className="img-fluid border border-1 border-dark"
              width={600}
              alt="qr"
              src="/static/img/qr_link_claim.png"
            />
          </p>
          <p>
            <img
              className="img-fluid border border-1 border-dark"
              width={200}
              alt="qr"
              src="/static/img/qr_link_claim.png"
            />
          </p>
        </div>
      </div>
    </base.Base3>
  );
}
