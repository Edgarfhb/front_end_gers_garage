import React from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container
} from "reactstrap";

import userDashRoutes from "../../routes/userDashboard.jsx";

class UserHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      dropdownOpen: false,
      color: "transparent"
    };

    this.toggle = this.toggle.bind(this);
    this.dropdownToggle = this.dropdownToggle.bind(this);
  }

  toggle() {
    if (this.state.isOpen) {
      this.setState({
        color: "transparent"
      });
    } else {
      this.setState({
        color: "dark"
      });
    }
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  dropdownToggle(e) {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  getBrand() {
    var name;
    userDashRoutes.map((prop, key) => {
      if (prop.collapse) {
        prop.views.map((prop, key) => {
          if (prop.path === this.props.location.pathname) {
            name = prop.name;
          }
          return null;
        });
      } else {
        if (prop.redirect) {
          if (prop.path === this.props.location.pathname) {
            name = prop.name;
          }
        } else {
          if (prop.path === this.props.location.pathname) {
            name = prop.name;
          }
        }
      }
      return null;
    });
    return name;
  }

  openSidebar() {
    document.documentElement.classList.toggle("nav-open");
    this.refs.sidebarToggle.classList.toggle("toggled");
  }
  updateColor() {
    if (window.innerWidth < 993 && this.state.isOpen) {
      this.setState({
        color: "dark"
      });
    } else {
      this.setState({
        color: "transparent"
      });
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateColor.bind(this));
  }

  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      this.refs.sidebarToggle.classList.toggle("toggled");
    }
  }

  render() {
    return (
      // add or remove classes depending if we are on full-screen-maps page or not
      <div>
        <Navbar
          color={
            this.props.location.pathname.indexOf("full-screen-maps") !== -1
              ? "dark"
              : this.state.color
          }
          expand="lg"
          className={
            this.props.location.pathname.indexOf("full-screen-maps") !== -1
              ? "navbar-absolute fixed-top"
              : "navbar-absolute fixed-top " +
                (this.state.color === "transparent"
                  ? "navbar-transparent "
                  : "")
          }
        >
          <Container fluid>
            <div className="navbar-wrapper">
              <div className="navbar-toggle">
                <button
                  type="button"
                  ref="sidebarToggle"
                  className="navbar-toggler"
                  onClick={() => this.openSidebar()}
                >
                  <span className="navbar-toggler-bar bar1" />
                  <span className="navbar-toggler-bar bar2" />
                  <span className="navbar-toggler-bar bar3" />
                </button>
              </div>
              <NavbarBrand href="/userdashboard">{this.getBrand()}</NavbarBrand>
            </div>
            <NavbarToggler onClick={this.toggle}>
              <span className="navbar-toggler-bar navbar-kebab" />
              <span className="navbar-toggler-bar navbar-kebab" />
              <span className="navbar-toggler-bar navbar-kebab" />
            </NavbarToggler>
            <Collapse
              isOpen={this.state.isOpen}
              navbar
              className="justify-content-end"
            >

              <Nav navbar>

                <NavItem>

                  <Link
                    to="#"
                    className="nav-link btn-rotate"
                    onClick={this.logout}
                  >
                    <i className="nc-icon nc-button-power" />
                    <p>
                      <span className="d-lg-none d-md-block">Logout</span>
                    </p>
                  </Link>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }

  logout = event => {

    this.props.history.push(`/`);

  };
}

export default UserHeader;
