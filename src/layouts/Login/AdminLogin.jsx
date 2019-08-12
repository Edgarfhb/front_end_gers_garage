import React from "react";

import { Card, CardBody, Row, Col, Form } from "reactstrap";

import CardAuthor from "../../components/CardElements/CardAuthor.jsx";
import FormInputs from "../../components/FormInputs/FormInputs.jsx";
import Button from "../../components/CustomButton/CustomButton.jsx";
import ServiceUtil from "../../core/ServiceUtil";
import Loader from "../../components/Loader/Loader";

import garageBanner from "../../assets/img/garage_banner.png";
import logo from "../../assets/img/logo_garage.png";

import { URL_ADMINLOGIN } from "../../variables/constants";

class AdminLogin extends React.Component {
  constructor(props) {
    super(props);

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("loggedin");

    this.state = {
      email: "admin@gmail.com",
      password: "123",
      error: "",
      loader: false
    };
  }

  render() {
    return (
      <div className="wrapper bg-light">
        <Loader loader={this.state.loader} />
        <Row
          className="justify-content-md-center align-items-center"
          style={{ height: "100%" }}
        >
          <Col md={4}>
            <Card className="card-user">
              <div className="image">
                <img src={garageBanner} alt="..." />
              </div>
              <CardBody>
                <CardAuthor
                  avatar={logo}
                  title="Admin Login"
                />
                <Form onSubmit={this.handleSubmit}>
                  <FormInputs
                    ncols={["col-md-12", "col-md-12"]}
                    proprieties={[
                      {
                        label: "User",
                        inputProps: {
                          type: "text",
                          name: "email",
                          placeholder: "User",
                          value: this.state.email,
                          onChange: this.handleInputChange
                        }
                      },
                      {
                        label: "Password",
                        inputProps: {
                          type: "password",
                          name: "password",
                          placeholder: "Password",
                          value: this.state.password,
                          onChange: this.handleInputChange
                        }
                      }
                    ]}
                  />
                  <Row>
                    <Col className="text-center">
                      <label className="text-danger">{this.state.error}</label>
                    </Col>
                  </Row>

                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        color="primary"
                        disabled={this.validateForm()}
                        round
                      >
                        Log In
                      </Button>
                    </div>

                  </Row>

                </Form>

              </CardBody>

            </Card>

          </Col>

        </Row>

      </div>
    );
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  validateForm = () => {
    return this.state.email === "" || this.state.password === "";
  };

  handleSubmit = event => {
    event.preventDefault();

    const serviceUtil = new ServiceUtil();

    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };

    let body = JSON.stringify({
      email: this.state.email,
      password: this.state.password
    });

    serviceUtil.request(URL_ADMINLOGIN, "POST", headers, body, response => {
      sessionStorage.setItem("token", response.token);
      sessionStorage.setItem("loggedin", true);

      this.props.history.push(`/admindashboard`);

      this.setState({
        email: "",
        password: ""
      });
    });
  };
}

export default AdminLogin;
