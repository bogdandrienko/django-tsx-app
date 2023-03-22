import React from "react";
import { Navbar, NavDropdown } from "react-bootstrap";

export const Footer1 = () => {
  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <footer
      className="footer mt-auto py-3 bg-light w-100 custom-background-transparent-middle-hard"
      style={{ position: "absolute", left: "auto", bottom: 0, right: 0 }}
    >
      <div className="container">
        <span className="text-muted">Place sticky footer content here.</span>
      </div>
    </footer>
  );
};

export const Footer2 = () => {
  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <footer className="m-0 p-0 pt-3 custom_footer_2">
      <div className="bg-dark custom-background-transparent-hard shadow-lg m-0 p-0">
        <ul className="row row-cols-auto row-cols-md-auto row-cols-lg-auto nav justify-content-center m-0 p-0">
          <li className="m-0 p-1">
            <a className="btn btn-sm btn-outline-secondary text-white" href="#">
              <i className="fa fa-arrow-up">{"  "} вверх</i>
              {"  "}
              <i className="fa fa-arrow-up"> </i>
            </a>
          </li>
          <li className="m-0 p-1">
            <Navbar className="dropup m-0 p-0">
              <NavDropdown
                title={
                  <span className="btn-outline-primary text-white">
                    My links
                    <i className="fa-solid fa-circle-info m-0 p-1" />
                  </span>
                }
                id="basic-nav-dropdown-1"
                className="btn btn-sm btn-outline-primary m-0 p-0"
              >
                <li>
                  <strong className="dropdown-header">Sites</strong>
                  <NavDropdown.Item className="dropdown-item" href="#">
                    ...
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                </li>
                <li>
                  <strong className="dropdown-header">Social</strong>
                  <NavDropdown.Item className="dropdown-item" href="#">
                    ...
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                </li>
                <li>
                  <strong className="dropdown-header">Адрес</strong>
                  <NavDropdown.Item className="dropdown-item" href="#">
                    ...
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                </li>
                <li>
                  <strong className="dropdown-header">Тел/факс</strong>
                  <NavDropdown.Item className="dropdown-item disabled" href="#">
                    ...
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                </li>
                <li>
                  <strong className="dropdown-header">Почта</strong>
                  <NavDropdown.Item className="dropdown-item disabled" href="#">
                    ...
                  </NavDropdown.Item>
                </li>
              </NavDropdown>
            </Navbar>
          </li>
          <li className="m-0 p-1">
            <Navbar className="dropup text-dark m-0 p-0">
              <NavDropdown
                title={
                  <span className="btn-outline-danger text-white">
                    По всем вопросам!
                    <i className="fa-solid fa-truck-medical m-0 p-1" />
                  </span>
                }
                id="basic-nav-dropdown-2"
                className="btn btn-sm btn-outline-danger m-0 p-0"
              >
                <li>
                  <strong className="dropdown-header">
                    Рабочий номер, стационарный
                  </strong>
                  <NavDropdown.Item className="dropdown-item disabled" href="#">
                    ...
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                </li>
                <li>
                  <strong className="dropdown-header">
                    Рабочий номер, мобильный
                  </strong>
                  <NavDropdown.Item className="dropdown-item disabled" href="#">
                    + 7 771 293 12 37
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                </li>
                <li>
                  <strong className="dropdown-header">Почта, локальная</strong>
                  <NavDropdown.Item className="dropdown-item disabled" href="#">
                    ...
                  </NavDropdown.Item>
                </li>
              </NavDropdown>
            </Navbar>
          </li>
        </ul>
      </div>
    </footer>
  );
};
