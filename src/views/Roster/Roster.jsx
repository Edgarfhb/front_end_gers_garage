import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Table,
  ListGroup,
  ListGroupItem
} from "reactstrap";

import FormInputs from "../../components/FormInputs/FormInputs.jsx";
import Button from "../../components/CustomButton/CustomButton.jsx";
import ServiceUtil from "../../core/ServiceUtil";

import {URL_GET_STAFF_BOOKINGS} from "../../variables/constants";

class Roster extends React.Component {
  state = {
    staff: [],
    staff1: [],
    modal: false,
    itemSelected: null,
    //
    modalAdd: false,
    detailModal: false,
    //
    title: "",
    description: "",
    file: ""
  };

  render() {
    const headers = [
      "No",
      "Booking ID",
      "Booking Date",
      "Service Type"
    ];

    var cards = {};

    return (
      <div className="content">
        <Row>
          <Col md={12}>
            {this.state.staff.map((prop, key) => {
              return (
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4">
                      {prop.name}
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Table responsive>
                      <thead className="text-primary">
                        <tr>
                          {headers.map((prop, key) => {
                            return (
                              <th key={key}>
                                {prop}
                              </th>
                            );
                          })}
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {prop.bookings.map((prop, i) => {

                            return (
                              <tr key={i}>
                                <td>
                                  {++i}
                                </td>
                                <td>{prop.id}</td>
                                <td>{prop.date}</td>
                                <td>{prop.status}</td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              );
            })}
          </Col>

        </Row>
      </div>
    );
  }

  componentDidMount() {
    this.getStaff();
  }

  getStaff() {
    const serviceUtil = new ServiceUtil();

    serviceUtil.request(URL_GET_STAFF_BOOKINGS, null, null, null, response => {
      this.setState({
        staff: response
      });
    });
  }

  toggle = item => {
    this.setState({
      modal: !this.state.modal,
      newsSelected: item
    });
  };


  detailToggle = item => {
    this.setState({
      detailModal: !this.state.detailModal,
      itemSelected: item
    });
  };
}

export default Roster;
