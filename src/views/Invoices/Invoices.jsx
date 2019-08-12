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
  Form,
  Table,
  FormGroup,
  ListGroup,
  ListGroupItem,
  ModalFooter,
  Label,
  Input
} from "reactstrap";

import MultiSelectReact from "multi-select-react";
import "react-input-range/lib/css/index.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Button from "../../components/CustomButton/CustomButton.jsx";
import Paginator from "../../components/Paginator/Paginator";
import ServiceUtil from "../../core/ServiceUtil";

import {URL_GET_ALL_INVOICES} from "../../variables/constants";

class Invoices extends React.Component {
  state = {
    invoices: [],
    modal: false,
    itemSelected: null,
    groups: [],
    //
    detailModal: false,
    //
    title: "",
    description: "",
    //
    collapse: true,
    value: 15,
  };

  render() {
    const headers = [
      "No",
      "Invoice ID",
      "Booking ID",
      "Date",
      "Costumer Name",
      "Total",
      "Print"
    ];

    const selectedOptionsStyles = {
      color: "#3c763d",
      backgroundColor: "#dff0d8"
    };
    const optionsListStyles = {
      backgroundColor: "#dff0d8",
      color: "#3c763d"
    };

    return (
      <div className="content">
        <Row>
          <Col md={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">
                  Invoices
                </CardTitle>
              </CardHeader>

              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      {headers.map((prop, key) => {
                        let cls = "";

                        if (prop === "Notified") {
                          cls = "text-center";
                        }

                        return (
                          <th className={cls} key={key}>
                            {prop}
                          </th>
                        );
                      })}
                      <th />
                    </tr>
                  </thead>

                  <tbody>
                    {this.state.invoices.map((prop, i) => {

                        return (
                          <tr key={i}>
                            <td>
                              {++i}
                            </td>
                            <td>{i}</td>
                            <td>{prop.booking_id}</td>
                            <td>{prop.booking.date}</td>
                            <td>{prop.booking.car.user.first_name.concat(" ", prop.booking.car.user.last_name)}</td>
                            <td className="text-left">{"€" + prop.total}</td>

                            <td className="text-left">
                              <Button
                                color="primary"
                                fab
                                round
                                icon
                                onClick={() => this.detailToggle(prop)}
                              >
                                <i className="nc-icon nc-cloud-download-93" />
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>

          <span className="print">
          <Modal
            isOpen={this.state.detailModal}
            toggle={this.detailToggle}
            className={this.props.className}
          >
            <ModalHeader toggle={this.detailToggle}>
              Invoice
              {this.state.itemSelected != null
                ? " " + this.state.itemSelected.id
                : null}
            </ModalHeader>

            <ModalBody>

              <ListGroup>
                <ListGroupItem>
                  <strong>Customer: </strong>
                  {this.state.itemSelected != null
                    ? this.state.itemSelected.booking.car.user.first_name
                      .concat(" ", this.state.itemSelected.booking.car.user.last_name)
                    : null}
                </ListGroupItem>
                <ListGroupItem>
                  <strong>Mobile Number: </strong>
                  {this.state.itemSelected != null
                    ? this.state.itemSelected.booking.car.user.phone_number
                    : null}
                </ListGroupItem>
                <ListGroupItem>
                  <strong>Vehicle: </strong>
                  {this.state.itemSelected != null
                    ? this.state.itemSelected.booking.car.vehicle_make.make
                    : null}
                </ListGroupItem>
                <ListGroupItem>
                  <strong>License: </strong>
                  {this.state.itemSelected != null
                    ? this.state.itemSelected.booking.car.vehicle_licence
                    : null}
                </ListGroupItem>
                <ListGroupItem>
                  <strong>
                    {this.state.itemSelected != null
                    ? this.state.itemSelected.booking.service_type.type + ": "
                    : null}
                  </strong>
                  {this.state.itemSelected != null
                    ? "€" + this.state.itemSelected.booking.service_type.cost
                    : null}
                </ListGroupItem>
                {this.state.itemSelected != null
                  ? this.state.itemSelected.items_invoices.map((prop, key) => {
                  return (
                    <ListGroupItem>
                      <strong>
                        {prop.item.name  + ": "}
                      </strong>
                      {"€" + prop.item.cost}
                    </ListGroupItem>
                  );
                })
                : null
                }
                <ListGroupItem>
                  <strong>TOTAL DUE: </strong>
                  {this.state.itemSelected != null
                    ? "€" + this.state.itemSelected.total
                    : null}
                </ListGroupItem>
                <p></p>
                <p><strong>Payment due on collection.</strong></p>
              </ListGroup>
            </ModalBody>
            <ModalFooter>
            <Button color="primary" onClick={this.print}>
              Print
            </Button>
              <Button color="secondary" onClick={this.detailToggle}>
                Close
              </Button>
            </ModalFooter>
          </Modal>
          </span>

        </Row>
      </div>


    );
  }

  componentDidMount() {
   this.getInvoices();
  }

  getInvoices() {
    const serviceUtil = new ServiceUtil();

    serviceUtil.request(URL_GET_ALL_INVOICES, null, null, null, response => {
      this.setState({
        invoices: response
      });
    });
  }

  print(){
    window.print();
  }

  detailToggle = id => {
    if(id.id == undefined){
      id = null
    }
    this.setState({
      detailModal: !this.state.detailModal,
      itemSelected: id
    });
  };

  toggleCollapse() {
    this.setState({ collapse: !this.state.collapse });
  }


}

export default Invoices;
