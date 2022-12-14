// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Nav } from "react-bootstrap";
// @ts-ignore
import { LinkContainer } from "react-router-bootstrap";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as button from "./button";
import * as input from "./input";
import * as select from "./select";
import * as message from "./message";
import * as loader from "./loader";

import * as hook from "../hook";
import * as constant from "../constant";
import * as router from "../router";
import * as util from "../util";
import * as slice from "../slice";
import internal from "stream";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

// @ts-ignore
export const PostItem = (props) => {
  const navigate = useNavigate();

  // @ts-ignore
  const deletePost = (e) => {
    e.stopPropagation();

    props.remove(props.post);
  };

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="post" onClick={() => navigate("/posts/" + props.post.id)}>
      <div className="post__content">
        <h5>{props.post.name}</h5>
        <strong>{props.post.place}</strong>
        <div>{props.post.body}</div>
        <div>{props.post.sphere}</div>
        <div className="post__btns">
          <button.Button1 onClick={deletePost}>delete</button.Button1>
        </div>
      </div>
    </div>
  );
};

// @ts-ignore
export const PostList = ({ posts, title, remove }) => {
  if (!posts.length) {
    return <h1 style={{ textAlign: "center" }}>Post not found!</h1>;
  }

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{title}</h1>
      <TransitionGroup className="post-list">
        {posts.map(
          // @ts-ignore
          (post, index) => (
            <CSSTransition key={post.id} timeout={500} classNames="post">
              <PostItem remove={remove} number={index + 1} post={post} />
            </CSSTransition>
          )
        )}
      </TransitionGroup>
    </div>
  );
};

// @ts-ignore
export const PostForm = ({ create }) => {
  const [post, setPost] = useState({
    name: "",
    place: "",
    sphere: "",
  });

  // @ts-ignore
  const addNewPost = (e) => {
    e.preventDefault();
    const newPost = { ...post, id: Date.now() };
    create(newPost);
    setPost({
      name: "",
      place: "",
      sphere: "",
    });
  };

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <form>
      <h5>Create post</h5>
      <input.Input1
        // @ts-ignore
        value={post.name}
        // @ts-ignore
        onChange={(e) => setPost({ ...post, name: e.target.value })}
        type="text"
        placeholder="Title..."
      />
      <input.Input1
        // @ts-ignore
        value={post.place}
        // @ts-ignore
        onChange={(e) => setPost({ ...post, place: e.target.value })}
        type="text"
        placeholder="Body..."
      />
      <input.Input1
        // @ts-ignore
        value={post.sphere}
        // @ts-ignore
        onChange={(e) => setPost({ ...post, sphere: e.target.value })}
        type="text"
        placeholder="Body..."
      />
      <button.Button1 onClick={addNewPost}>create</button.Button1>
    </form>
  );
};

// @ts-ignore
export const PostFilter = ({ filter, setFilter }) => {
  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div>
      <input.Input1
        // @ts-ignore
        value={filter.query}
        // @ts-ignore
        onChange={(e) => setFilter({ ...filter, query: e.target.value })}
        placeholder="??????????..."
      />
      <select.Select2
        value={filter.sort}
        // @ts-ignore
        onChange={(selectedSort) =>
          setFilter({ ...filter, sort: selectedSort })
        }
        defaultValue={"sort By"}
        options={[
          { value: "title", name: "by Name" },
          { value: "body", name: "by Description" },
        ]}
      />
    </div>
  );
};

export const TestComponent1 = () => {
  // TODO custom variables /////////////////////////////////////////////////////////////////////////////////////////////
  const [count, countSet] = useState(0);
  const [value, valueSet] = useState(1);
  function plus() {
    countSet(count + value);
  }
  function minus() {
    countSet(count - value);
  }

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="card text-center m-0 p-0">
      <div className="card-header text-center m-0 p-0">
        <h6 className="lead fw-bold text-center m-0 p-0">{count}</h6>
      </div>
      <div className="card-body text-center m-0 p-0">
        <div className="d-flex justify-content-between text-center m-0 p-0">
          <button
            onClick={plus}
            className="btn btn-lg w-25 btn-outline-success m-1 p-1"
          >
            +
          </button>
          <input
            type="number"
            className="form-control form-control-sm text-center m-1 p-1"
            value={value}
            required
            placeholder="????????????: 70%"
            min="-100"
            max="100"
            onChange={(e) => valueSet(parseInt(e.target.value))}
          />
          <button
            onClick={minus}
            className="btn btn-lg w-25 btn-outline-danger m-1 p-1"
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
};

export class TestComponent2 extends React.Component {
  // @ts-ignore
  constructor(props) {
    super(props);
    this.state = {
      count: 2,
      value: 1,
    };
    this.plus = this.plus.bind(this);
    this.minus = this.minus.bind(this);
    this.setValue = this.setValue.bind(this);
  }
  plus() {
    this.setState({
      // @ts-ignore
      count: this.state.count + this.state.value,
    });
  }
  minus() {
    this.setState({
      // @ts-ignore
      count: this.state.count - this.state.value,
    });
  }
  // @ts-ignore
  setValue(value) {
    this.setState({
      value: value,
    });
  }
  render() {
    // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
      <div className="card text-center m-0 p-0">
        <div className="card-header text-center m-0 p-0">
          <h6 className="lead fw-bold text-center m-0 p-0">
            {
              // @ts-ignore
              this.state.count
            }
          </h6>
        </div>
        <div className="card-body text-center m-0 p-0">
          <div className="d-flex justify-content-between text-center m-0 p-0">
            <button
              onClick={this.plus}
              className="btn btn-lg w-25 btn-outline-success m-1 p-1"
            >
              +
            </button>
            <input
              type="number"
              className="form-control form-control-sm text-center m-1 p-1"
              value={
                // @ts-ignore
                this.state.value
              }
              required
              placeholder="????????????: 70%"
              min="-100"
              max="100"
              onChange={(e) => this.setValue(parseInt(e.target.value))}
            />
            <button
              onClick={this.minus}
              className="btn btn-lg w-25 btn-outline-danger m-1 p-1"
            >
              -
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export const TestComponent3 = function () {
  const [count, countSet] = useState(0);
  const [value, valueSet] = useState("");

  function increment() {
    countSet(count + 1);
  }
  function decrement() {
    countSet(count - 1);
  }

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div>
      <h1>{count}</h1>
      <h1>{value}</h1>
      <input
        type="text"
        value={value}
        onChange={(event) => valueSet(event.target.value)}
      />
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
    </div>
  );
};

export class TestComponent4 extends React.Component {
  // @ts-ignore
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      value: 0,
    };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }
  increment() {
    // @ts-ignore
    this.setState({ count: this.state.count + 1 });
  }
  decrement() {
    // @ts-ignore
    this.setState({ count: this.state.count - 1 });
  }

  render() {
    // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
      <div>
        <h1>
          {
            // @ts-ignore
            this.state.count
          }
        </h1>
        <h1>
          {
            // @ts-ignore
            this.state.value
          }
        </h1>
        <input
          type="text"
          value={
            // @ts-ignore
            this.state.value
          }
          onChange={(event) => this.setState({ value: event.target.value })}
        />
        <button onClick={this.increment}>increment</button>
        <button onClick={this.decrement}>decrement</button>
      </div>
    );
  }
}

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
    console.log(`StoreComponent2 ${slice.name}`, storeConstant);
  }

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="m-0 p-0">
      {showLoad &&
        storeConstant.load &&
        (loadText ? (
          <message.Message.Secondary>{loadText}</message.Message.Secondary>
        ) : (
          <div className="row justify-content-center m-0 p-0">
            <div className="text-center m-0 p-0">
              <loader.Loader2 />
            </div>
          </div>
        ))}
      {showData && storeConstant.data && (
        <message.Message.Success>
          {dataText
            ? dataText
            : typeof storeConstant.data === "string"
            ? storeConstant.data
            : "???????????? ???? ???????????????? ?????? ??????????????????????!"}
        </message.Message.Success>
      )}
      {showError && storeConstant.error && (
        <message.Message.Danger>
          {errorText ? errorText : storeConstant.error}
        </message.Message.Danger>
      )}
      {showFail && storeConstant.fail && (
        <message.Message.Warning>
          {failText ? failText : storeConstant.fail}
        </message.Message.Warning>
      )}
    </div>
  );
};

export const ModulesComponent = () => {
  // TODO react store variables ////////////////////////////////////////////////////////////////////////////////////////

  const notificationReadListStore = hook.useSelectorCustom2(
    slice.notification.notificationReadListStore
  );
  const userDetailStore = hook.useSelectorCustom2(slice.user.userDetailStore);

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="shadow text-center m-0 p-0">
      {router.modules && (
        <div className="m-0 p-0">
          <h6 className="display-6 text-center card-header bg-light bg-opacity-100 m-0 p-1">
            ????????????:
          </h6>
          <div className="m-0 p-0">
            <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 m-0 p-0">
              {router.modules.map(
                (module, module_i) =>
                  util.CheckAccess(userDetailStore, module.Access) &&
                  module.ShowInModules && (
                    <div key={module_i} className="text-center m-0 p-1">
                      <div className="lead card-header border shadow bg-light bg-opacity-100 custom-background-transparent-hard m-0 p-0">
                        <i className={module.ModuleIcon} />
                        {module["Header"]}
                      </div>
                      <div className="text-center custom-background-transparent-middle m-0 p-0">
                        <img
                          src={module["Image"]}
                          className="img-fluid w-25 m-0 p-0"
                          alt="id"
                        />
                      </div>
                      {module["Sections"]
                        ? module["Sections"].map(
                            (section, section_i) =>
                              util.CheckAccess(
                                userDetailStore,
                                section.Access
                              ) && (
                                <div
                                  key={section_i}
                                  className="card-body text-end m-0 p-0"
                                >
                                  <div className="card">
                                    <li className="list-group-item list-group-item-action active disabled bg-primary bg-opacity-75 d-flex m-0 p-1">
                                      <div className="m-0 p-0">
                                        <img
                                          src={section["Image"]}
                                          className="img-fluid w-25 m-0 p-0"
                                          alt="id"
                                        />
                                      </div>
                                      <LinkContainer
                                        to="#"
                                        className="disabled m-0 p-3"
                                      >
                                        <Nav.Link>
                                          <small className="fw-bold text-light m-0 p-0">
                                            {section["Header"]}
                                          </small>
                                        </Nav.Link>
                                      </LinkContainer>
                                    </li>
                                    <ul className="list-group-flush m-0 p-0">
                                      {section["Links"]
                                        ? section["Links"].map((link, link_i) =>
                                            link["Active"]
                                              ? link.ShowLink &&
                                                util.CheckAccess(
                                                  userDetailStore,
                                                  link.Access
                                                ) && (
                                                  <li
                                                    key={link_i}
                                                    className="list-group-item list-group-item-action m-0 p-0"
                                                  >
                                                    {link.ExternalLink ? (
                                                      <a
                                                        key={link_i}
                                                        className={
                                                          link["Active"]
                                                            ? "text-dark dropdown-item m-0 p-0"
                                                            : "disabled m-0 p-1"
                                                        }
                                                        href={link["Link"]}
                                                        target="_self"
                                                      >
                                                        <i
                                                          className={
                                                            link.LinkIcon
                                                          }
                                                        />
                                                        {link["Header"]}
                                                      </a>
                                                    ) : (
                                                      <LinkContainer
                                                        to={link["Link"]}
                                                      >
                                                        <Nav.Link className="m-0 p-1">
                                                          <small
                                                            className={
                                                              link.Style !== ""
                                                                ? `${link.Style} m-0 p-1`
                                                                : "text-dark m-0 p-1"
                                                            }
                                                          >
                                                            <i
                                                              className={
                                                                link.LinkIcon
                                                              }
                                                            />
                                                            {link["Header"]}
                                                            {"  "}
                                                            {link.Header ===
                                                              "??????????????????????" &&
                                                              (notificationReadListStore.data &&
                                                              notificationReadListStore
                                                                .data.list
                                                                .length > 0 ? (
                                                                <span className="m-0 p-1">
                                                                  <i className="fa-solid fa-bell text-danger m-0 p-1" />
                                                                  {
                                                                    notificationReadListStore
                                                                      .data[
                                                                      "x-total-count"
                                                                    ]
                                                                  }
                                                                </span>
                                                              ) : (
                                                                <span className="m-0 p-1">
                                                                  <i className="fa-solid fa-bell text-muted m-0 p-1" />
                                                                  0
                                                                </span>
                                                              ))}
                                                          </small>
                                                        </Nav.Link>
                                                      </LinkContainer>
                                                    )}
                                                  </li>
                                                )
                                              : link.ShowLink &&
                                                util.CheckAccess(
                                                  userDetailStore,
                                                  link.Access
                                                ) && (
                                                  <li
                                                    key={link_i}
                                                    className="list-group-item list-group-item-action disabled m-0 p-0"
                                                  >
                                                    <LinkContainer
                                                      to={
                                                        link["Link"]
                                                          ? link["Link"]
                                                          : "#"
                                                      }
                                                      className="disabled m-0 p-0"
                                                    >
                                                      <Nav.Link>
                                                        <small className="text-muted m-0 p-0">
                                                          {link["Header"]} (
                                                          <small className="text-danger m-0 p-0">
                                                            ?? ????????????????????
                                                          </small>
                                                          )
                                                        </small>
                                                      </Nav.Link>
                                                    </LinkContainer>
                                                  </li>
                                                )
                                          )
                                        : ""}
                                    </ul>
                                  </div>
                                </div>
                              )
                          )
                        : ""}
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export const NewsComponent = ({ count = 100 }) => {
  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="card list-group list-group-item-action list-group-flush custom-background-transparent-low-middle m-0 p-0">
      <div className="border-bottom scrollarea m-0 p-0">
        <LinkContainer to="/" className="m-0 p-0">
          <Nav.Link className="m-0 p-0">
            <div
              className="list-group-item active shadow m-0 p-2"
              aria-current="true"
            >
              <div className="d-flex w-100 align-items-center justify-content-between m-0 p-0">
                <strong className="lead m-0 p-0 mb-1">
                  <i className="fa-solid fa-newspaper m-0 p-1" />
                  ?????????? ????????????????
                </strong>
                <strong className="text-warning m-0 p-0">???????????? ????????????</strong>
              </div>
              {count !== 100 && (
                <div className="small m-0 p-0 mb-1">
                  (?????????????? ???????? ?????? ?????????????????? ???????? ??????????????????)
                </div>
              )}
            </div>
          </Nav.Link>
        </LinkContainer>
        {constant.news.slice(0, count).map((news_elem, index) => (
          <div key={index} className="custom-hover m-0 p-0">
            <Link
              to={news_elem.Link}
              className={
                news_elem.Status !== "active"
                  ? "list-group-item list-group-item-action bg-secondary bg-opacity-10 m-0 p-1"
                  : "list-group-item list-group-item-action bg-success bg-opacity-10 m-0 p-1"
              }
            >
              <div className="d-flex w-100 align-items-center justify-content-between m-0 p-0">
                <strong className="m-0 p-0">
                  {news_elem.Title}
                  {news_elem.Link !== "#" && (
                    <small className="custom-color-primary-1 m-0 p-0">
                      {" "}
                      (?????????????? ???????? ?????? ????????????????)
                    </small>
                  )}
                </strong>
                <small className="text-muted m-0 p-0">
                  {news_elem.Status !== "active" ? (
                    <strong className="text-secondary text-start m-0 p-0">
                      (?? ????????????????????)
                    </strong>
                  ) : (
                    <strong className="text-success text-start m-0 p-0">
                      (??????????????????)
                    </strong>
                  )}
                </small>
              </div>
              <div className="small m-0 p-0">
                {news_elem.Description}
                {news_elem.Helps && (
                  <small className="text-secondary m-0 p-0">
                    {" "}
                    ({news_elem.Helps})
                  </small>
                )}
                {news_elem.Danger && (
                  <small className="text-danger m-0 p-0">
                    {" "}
                    ({news_elem.Danger})
                  </small>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>
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
              onClick={(e) => util.ChangeAccordionCollapse([key_target])}
            >
              <h6 className={`lead m-0 p-3 ${text_style}`}>
                {title}{" "}
                <small className="text-muted m-0 p-0">
                  (?????????????? ????????, ?????? ????????????????????????)
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

export const SalaryTableComponent = ({ tab = {} }) => {
  // @ts-ignore
  let header = tab[0];
  let thead_array = [];
  // @ts-ignore
  for (let i in tab[1]["Fields"]) {
    if (
      // @ts-ignore
      tab[1]["Fields"][i] !== "????????????????" &&
      // @ts-ignore
      tab[1]["Fields"][i] !== "??????????????????"
    ) {
      // @ts-ignore
      thead_array.push(tab[1]["Fields"][i]);
    }
  }
  let tbody_array = [];
  // @ts-ignore
  for (let i in tab[1]) {
    if (i !== "Fields") {
      let local_tbody_array = [];
      // @ts-ignore
      for (let j in tab[1][i]) {
        if (j !== "????????????????" && j !== "??????????????????") {
          // @ts-ignore
          local_tbody_array.push(tab[1][i][j]);
        }
      }
      tbody_array.push(local_tbody_array);
    }
  }
  // @ts-ignore
  function getValue(value) {
    if (typeof value === "number") {
      return value.toFixed(2);
    } else {
      return value;
    }
  }
  // TODO return page //////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <li className="col-12 col-md-6 col-lg-6 m-0 p-3 my-1">
      <h6 className="lead fw-bold bold m-0 p-0">{header.slice(2)}</h6>
      <table className="table table-sm table-condensed table-striped table-hover table-responsive table-responsive-sm table-bordered border-secondary small m-0 p-0">
        <thead className="m-0 p-0 mb-1">
          <tr className="m-0 p-0">
            {thead_array.map((thead, index_h) => (
              <th
                key={index_h}
                className={
                  index_h === 4
                    ? "text-center w-25 m-0 p-p-1"
                    : "text-center m-0 p-p-1"
                }
              >
                {thead}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="m-0 p-0">
          {tbody_array.map((tbody, index_i) => (
            <tr key={index_i} className="m-0 p-0">
              {tbody.slice(0, 1).map((body, index_j) => (
                <td key={index_j} className="text-start m-0 p-1">
                  {body}
                </td>
              ))}
              {tbody.slice(1, -1).map((body, index_j) => (
                <td key={index_j} className="text-end m-0 p-1">
                  {body ? body : ""}
                </td>
              ))}
              {tbody.slice(-1).map((body, index_j) => (
                <td
                  key={index_j}
                  className={
                    index_j === 0 ? "text-end m-0 p-0" : "text-end m-0 p-1"
                  }
                >
                  {body ? getValue(body) : ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </li>
  );
};

export function ModulePage(props: {
  title: any;
  description: any;
  image: any;
}) {
  return (
    <div>
      <div className="px-4 my-3 text-center">
        <img
          className="d-block mx-auto mb-4 img-fuild img-thumnail w-50"
          src={props.image}
          alt="images"
        />
        <h1 className="display-5 fw-bold">{props.title}</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">{props.description}</p>
        </div>
      </div>
    </div>
  );
}

export function SectionPage(props: {
  sections: Array<{ image: string; link: string; title: string }>;
}) {
  return (
    <div className="m-0 p-0">
      <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 m-0 p-0">
        {props.sections.map(
          (
            item: { image: string; link: string; title: string },
            index: any
          ) => (
            <div key={index} className="p-1 m-1">
              {item.title}
            </div>
          )
        )}
      </div>
    </div>
  );
}
