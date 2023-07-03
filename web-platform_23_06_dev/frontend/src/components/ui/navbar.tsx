import React, { useEffect, useState } from "react";
import { Nav, NavDropdown, Button, Offcanvas } from "react-bootstrap";
// @ts-ignore
import { LinkContainer } from "react-router-bootstrap";
import * as hooks from "../hooks";
import * as slices from "../slices";
import * as utils from "../utils";

// @ts-ignore
export function Navbar1({ name, ...props }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  const userLoginStore = hooks.useSelectorCustom1(slices.user.userLoginStore);

  return (
    <div>
      <Button
        variant="outline-secondary"
        onClick={toggleShow}
        className="w-100 p-3"
      >
        {name}
      </Button>
      <Offcanvas
        show={show}
        onHide={handleClose}
        {...props}
        className={"custom_offcanvas_1"}
      >
        <Offcanvas.Header closeButton onClick={handleClose}>
          <Offcanvas.Title>
            <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-1 justify-content-center text-center shadow m-0 p-1">
              <div className={"d-flex justify-content-between"}>
                <span className={"text-dark lead"}>hide</span>
                <i className="fa-solid fa-arrow-up-from-bracket ms-3 p-1"></i>
              </div>
            </ul>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 justify-content-center text-start m-0 p-0">
            <LinkContainer
              to="/"
              className="custom-active-dark custom-hover m-0 p-1"
            >
              <Nav.Link className="text-dark lead m-0 p-0">
                <i className="fa-solid fa-earth-asia m-0 p-1"></i>
                Home Page
              </Nav.Link>
            </LinkContainer>
            <NavDropdown
              title={
                <span className={"text-dark lead"}>
                  <i className="fa-solid fa-address-card p-1"></i>
                  Profile
                </span>
              }
              id="navbarScrollingDropdown"
            >
              <LinkContainer
                to="/register"
                className="custom-active-dark custom-hover m-0 p-1"
              >
                <Nav.Link className="text-dark m-0 p-0">
                  <i className="fa-solid fa-user m-0 p-1">
                    <i className="fa-solid fa-circle-plus m-0 p-1"></i>
                  </i>
                  Register
                </Nav.Link>
              </LinkContainer>
              <NavDropdown.Divider />
              {userLoginStore.data ? (
                <LinkContainer
                  to="/logout"
                  className="custom-active-dark custom-hover m-0 p-1"
                >
                  <Nav.Link className="text-dark m-0 p-0">
                    <i className="fa-solid fa-door-open m-0 p-1"></i>
                    Logout
                  </Nav.Link>
                </LinkContainer>
              ) : (
                <LinkContainer
                  to="/login"
                  className="custom-active-dark custom-hover m-0 p-1"
                >
                  <Nav.Link className="text-dark m-0 p-0">
                    <i className="fa-solid fa-user m-0 p-1">
                      <i className="fa-solid fa-arrow-right-to-bracket m-0 p-1"></i>
                    </i>
                    Login
                  </Nav.Link>
                </LinkContainer>
              )}
            </NavDropdown>
            {userLoginStore.data && (
              <NavDropdown
                title={
                  <span className={"text-dark lead"}>
                    <i className="fa-solid fa-tachograph-digital p-1"></i>
                    Tasks
                  </span>
                }
                id="navbarScrollingDropdown"
              >
                <LinkContainer
                  to="/tasks"
                  className="custom-active-dark custom-hover m-0 p-1"
                >
                  <Nav.Link className="text-dark m-0 p-0">
                    <i className="fa-solid fa-rectangle-list p-1"></i>
                    Find, filter and search by all tasks
                  </Nav.Link>
                </LinkContainer>
                <NavDropdown.Divider />
                <LinkContainer
                  to="/tasks/create"
                  className="custom-active-dark custom-hover m-0 p-1"
                >
                  <Nav.Link className="text-dark m-0 p-0">
                    <i className="fa-solid fa-circle-plus p-1"></i>
                    Create new task
                  </Nav.Link>
                </LinkContainer>
              </NavDropdown>
            )}
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
