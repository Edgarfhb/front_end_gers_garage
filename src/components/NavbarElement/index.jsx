import React, { Component } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

import Button from "../../components/CustomButton/CustomButton.jsx";

import ServiceUtil from "../../core/ServiceUtil";

import { URL_SIGNUP } from "../../variables/constants";

class  NavBar extends Component {

  state = {
    modal: false,
    //
    name: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    //
    modalSignUp: false,
    detailModal: false,
    //
    collapse: true,
    value: 15,
  };

  render() {
    return (
        <nav className="navbar navbar-expand-lg navbar navbar-dark bg-dark fixed-top" >
          <a className="navbar-brand" href="/">Ger's Garage</a>

          <div className="collapse navbar-collapse" id="navbarColor03">

            <ul className="navbar-nav mr-auto">

            </ul>

            <form className="form-inline my-2 my-lg-0">
                <a href="/UserLogin" className="btn btn-warning rm-10" >Log In</a>
                <buttom className="btn btn-secondary my-2 my-sm-1" onClick={this.toggleSignUp}>Sign Up</buttom>
            </form>

            <Modal
            isOpen={this.state.modalSignUp}
            toggle={this.toggleSignUp}
            className={this.props.className}
          >
            <ModalHeader toggle={this.toggleSignUp}>Sing Up</ModalHeader>
            <ModalBody>
              <br />
              <br />
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Label for="name<">Name</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    value={this.state.name}
                    onChange={this.handleInputChange}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="lastName<">Last Name</Label>
                  <Input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Last Name"
                    value={this.state.lastName}
                    onChange={this.handleInputChange}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="phone<">Phone Number</Label>
                  <Input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="Phone Number"
                    value={this.state.phone}
                    onChange={this.handleInputChange}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="email<">Email</Label>
                  <Input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="password<">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                  />
                </FormGroup>

                <div className="pull-right">
                  <Button color="primary">
                    Accept
                  </Button>{" "}
                  <Button color="secondary" onClick={this.toggleSignUp}>
                    Cancel
                  </Button>
                </div>
              </Form>
            </ModalBody>
          </Modal>
          </div>

        </nav>
     );
  }

   onChangePage = index => {
     this.setState({
       currentPage: index
     });
   };

   handleInputChange = event => {
     const target = event.target;
     const value = target.type === "checkbox" ? target.checked : target.value;
     const name = target.name;

     this.setState({
       [name]: value
     });
     console.log(this.state);
   };

   handleSubmit = event => {
     event.preventDefault();

     const serviceUtil = new ServiceUtil();

     let headers = {
       Accept: "application/json",
       "Content-Type": "application/json"
     };

     let body = JSON.stringify({
       first_name: this.state.name,
       last_name: this.state.lastName,
       phone_number: this.state.phone,
       email: this.state.email,
       password: this.state.password
     });

     serviceUtil.request(URL_SIGNUP, "POST", headers, body, response => {

       this.setState({
         name: "",
         lastName: "",
         phone: "",
         email: "",
         password: ""
       });
     });

     this.toggleSignUp();
   };

   toggleSignUp = () => {
     this.setState({
       modalSignUp: !this.state.modalSignUp
     });
   };

   toggleCollapse() {
     this.setState({ collapse: !this.state.collapse });
   }

}

export default NavBar;
