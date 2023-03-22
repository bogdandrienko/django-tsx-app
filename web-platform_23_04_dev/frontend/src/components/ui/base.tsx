import * as footer from "./footer";
import * as navbar from "./navbar";

// @ts-ignore
export function Base1({ children, title, description }): JSX.Element {
  return (
    <div className="custom_body_1">
      <div>
        <navbar.Navbar1
          name={"модули"}
          scroll={true}
          backdrop={true}
          placement={"top"}
        />
        <div className="container p-0 pt-1">
          <div className="card shadow custom-background-transparent-middle m-0 p-0">
            <div className="card-header bg-secondary bg-opacity-10 m-0 p-1">
              <small className="display-6 fw-normal text-white m-0 p-1">
                {title}
              </small>
            </div>
            <div className="card-body m-0 p-1">
              <p className="lead fw-normal text-muted m-0 p-1">{description}</p>
            </div>
          </div>
        </div>
      </div>
      <main className="custom_main_1 h-100 p-0">{children}</main>
      <footer.Footer2 />
    </div>
  );
}
