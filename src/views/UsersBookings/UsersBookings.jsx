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
  FormGroup,
  Label,
  Input,
  ListGroup,
  ListGroupItem,
  Nav,
  NavItem
} from "reactstrap";

import MultiSelectReact from "multi-select-react";

import Button from "../../components/CustomButton/CustomButton.jsx";
import Paginator from "../../components/Paginator/Paginator";
import ServiceUtil from "../../core/ServiceUtil";

import {
  URL_GETALLBOOKING,
  URL_GETALLITEMS,
  URL_STATUS_BOOKING,
  URL_STAFF,
  URL_SET_STATUS_STAFF,
  URL_CREATE_INVOICE
} from "../../variables/constants";

class UsersBookings extends React.Component {
  state = {
    bookings: [],
    itemSelected: null,
    items: [],
    //
    status_booking: [],
    staff:[],
    //
    modalSetStatusStaff: false,
    detailModal: false,
    invoiceModal: false,
    //
    statusBookingId: "",
    staffId: "",
    bookingId: "",
    //
    collapse: true,
    value: 15,
    //
    invoiceTotal: 0,
    items_ids: []
  };

  render() {
    const headers = [
      "No.",
      "Booking ID",
      "Date",
      "Costumer Name",
      "Last Name",
      "Vehicle Type",
      "Setter",
      "Details",
      "Make Invoice",
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
                <CardTitle tag="h4">Bookings History</CardTitle>
              </CardHeader>

              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      {headers.map((prop) => {

                        return (
                          <th>
                            {prop}
                          </th>
                        );
                      })}
                      <th />
                    </tr>
                  </thead>

                  <tbody>
                    {this.state.bookings.map((prop, key) => {
                        return (

                          <tr>
                            <td>{key+1}</td>
                            <td>{prop.id}</td>
                            <td>{prop.date}</td>
                            <td>{prop.car.user.first_name}</td>
                            <td>{prop.car.user.last_name}</td>
                            <td>{prop.car.vehicle_type.type}</td>
                            <td className="text-left">
                              <Button
                                color="primary"
                                fab
                                round
                                icon
                                onClick={() => this.toggleSetStatusAndStaff(prop)}
                              >
                                <i className="nc-icon nc-settings" />
                              </Button>
                            </td>
                            <td className="text-left">
                              <Button
                                color="primary"
                                fab
                                round
                                icon
                                onClick={() => this.detailToggle(prop)}
                              >
                                <i className="nc-icon nc-zoom-split" />
                              </Button>
                            </td>
                            <td className="text-left">
                              <Button
                                color="primary"
                                fab
                                round
                                icon
                                onClick={() => this.toggleInvoice(prop)}
                              >
                                <i className="nc-icon nc-money-coins" />
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

          <Modal
            isOpen={this.state.modalSetStatusStaff}
            toggle={this.toggleSetStatusAndStaff}
            className={this.props.className}
          >
            <ModalHeader toggle={this.toggleSetStatusAndStaff}>Set Status and Staff</ModalHeader>

            <ModalBody>
            <Form onSubmit={this.handleSubmitSetStatusAndStaff}>
                <FormGroup>
                    <Label>Status Booking</Label>
                    <MultiSelectReact
                      options={this.state.status_booking}
                      optionClicked={this.optionClickedStatusBooking.bind(this)}
                      selectedBadgeClicked={this.selectedBadgeStatusBooking.bind(this)}
                      selectedOptionsStyles={selectedOptionsStyles}
                      optionsListStyles={optionsListStyles}
                      isSingleSelect={true}
                    />
                </FormGroup>

                <FormGroup>
                    <Label>Staff</Label>
                    <MultiSelectReact
                      options={this.state.staff}
                      optionClicked={this.optionClickedStaff.bind(this)}
                      selectedBadgeClicked={this.selectedBadgeStaff.bind(this)}
                      selectedOptionsStyles={selectedOptionsStyles}
                      optionsListStyles={optionsListStyles}
                      isSingleSelect={true}
                    />
                </FormGroup>

                <div className="pull-right">
                  <Button color="primary">
                    Accept
                  </Button>{" "}
                  <Button color="secondary" onClick={this.toggleSetStatusAndStaff}>
                    Cancel
                  </Button>
                </div>
              </Form>
            </ModalBody>
          </Modal>

          <Modal
            isOpen={this.state.detailModal}
            toggle={this.detailToggle}
            className={this.props.className}
          >
            <ModalHeader toggle={this.detailToggle}>
              Booking Details
            </ModalHeader>

            <ModalBody>

              <ListGroup>
                <ListGroupItem>
                  <strong>Booking Date: </strong>
                  {this.state.itemSelected != null
                    ? this.state.itemSelected.date
                    : null}
                </ListGroupItem>
                <ListGroupItem>
                  <strong>Costumer Name: </strong>
                  {this.state.itemSelected != null
                    ? this.state.itemSelected.car.user.first_name
                    : null}
                </ListGroupItem>
                <ListGroupItem>
                  <strong>Costumer Phone: </strong>
                  {this.state.itemSelected != null
                    ? this.state.itemSelected.car.user.phone_number
                    : null}
                </ListGroupItem>
                <ListGroupItem>
                  <strong>Service Type: </strong>
                  {this.state.itemSelected != null
                    ? this.state.itemSelected.service_type.type
                    : null}
                </ListGroupItem>
                <ListGroupItem>
                  <strong>Comments: </strong>
                  {this.state.itemSelected != null
                    ? this.state.itemSelected.comments
                    : null}
                </ListGroupItem>
                <ListGroupItem>
                  <strong>Booking Status: </strong>
                  {this.state.itemSelected != null
                    ? this.state.itemSelected.status_booking.status
                    : null}
                </ListGroupItem>
                <ListGroupItem>
                  <strong>Invoice Status: </strong>
                  {this.state.itemSelected != null && this.state.itemSelected.invoice
                    ? this.state.itemSelected.invoice.status_invoice.status
                    : "Invoice not created"}
                </ListGroupItem>
                <ListGroupItem>
                  {this.state.requestSelected != null ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: this.state.requestSelected.body
                      }}
                    />
                  ) : null}
                </ListGroupItem>
              </ListGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.detailToggle}>
                Close
              </Button>
            </ModalFooter>
          </Modal>

              <Modal
                isOpen={this.state.invoiceModal}
                toggle={this.toggleInvoice}
                className={this.props.className}
              >
                <ModalHeader toggle={this.toggleInvoice}>Create Invoice</ModalHeader>

                <ModalBody>
                <ListGroup>
                <ListGroupItem>
                  <strong>TOTAL: </strong>
                    <h2>
                    {this.state.itemSelected != null
                      ? this.state.invoiceTotal
                      : null}
                    </h2>
                </ListGroupItem>
                  <ListGroupItem>
                    <strong>Service Type: </strong>
                    {this.state.itemSelected != null
                      ? this.state.itemSelected.service_type.type.concat
                      (" (Cost: ",this.state.itemSelected.service_type.cost, ")")
                      : null}
                  </ListGroupItem>
                </ListGroup>
                <Form onSubmit={this.handleSubmitInvoice}>

                    <FormGroup>
                        <p></p>
                        <Label>Add items</Label>
                        <MultiSelectReact
                          options={this.state.items}
                          optionClicked={this.optionClickedItems.bind(this)}
                          selectedBadgeClicked={this.selectedBadgeItems.bind(this)}
                          selectedOptionsStyles={selectedOptionsStyles}
                          optionsListStyles={optionsListStyles}
                        />
                    </FormGroup>

                    <div className="pull-right">
                      <Button color="primary">
                        Accept
                      </Button>{" "}
                      <Button color="secondary" onClick={this.toggleInvoice}>
                        Cancel
                      </Button>
                    </div>
                  </Form>
                </ModalBody>
              </Modal>

        </Row>
      </div>
    );
  }

  componentDidMount() {
   this.getStaff();
   this.getStatusBooking();
   this.getAllBookings();
   this.getItems();
  }

  getAllBookings() {
    const serviceUtil = new ServiceUtil();

    serviceUtil.request(URL_GETALLBOOKING, null, null, null, response => {
      this.setState({
        bookings: response,
        pagesCount: Math.ceil(response.length / this.state.pageSize)
      });
      console.log(this.state.bookings)
    });
  }

  getItems() {
    const serviceUtil = new ServiceUtil();

    serviceUtil.request(URL_GETALLITEMS, null, null, null, response => {
      this.setState({
        items: response
      });
    });
  }

  optionClickedItems(optionsList) {
    this.getGroupItems(optionsList);
  };

  selectedBadgeItems(optionsList) {
    this.getGroupItems(optionsList);
  };

  getGroupItems = optionsList => {
    let items_prices = [];
    let items_ids = [];

    optionsList.map(item => {
      if(item.value) {
        items_prices.push(item.cost);
        items_ids.push(item.id);
      }
      return 0;
    });

    this.setState({
      items_ids: items_prices,
      items_ids_value: items_ids,

    },
      this.calculateTotal(items_prices)
    );
  }

  calculateTotal(items_prices){
    let total = this.state.itemSelected.service_type.cost;

    items_prices.map(item => {
      total += item
    });

    this.setState({
      invoiceTotal: total
    })
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleSubmitSetStatusAndStaff = event => {
    event.preventDefault();

    const serviceUtil = new ServiceUtil();

    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };

    let body = JSON.stringify({
      status_id: this.state.statusBookingId,
      staff_id: this.state.staffId,
      booking_id: this.state.itemSelected.id
    });

    serviceUtil.request(URL_SET_STATUS_STAFF, "POST", headers, body, response => {

      this.setState({
        //error: data.message,
        statusBookingId: "",
        staffId: "",
      });
    });
    this.getAllBookings();
    this.toggleSetStatusAndStaff(this.state.itemSelected);
  };

  handleSubmitInvoice = event => {
    event.preventDefault();

    const serviceUtil = new ServiceUtil();

    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };

    let body = JSON.stringify({
      total_cost: this.state.invoiceTotal,
      booking_id: this.state.itemSelected.id,
      item_id: this.state.items_ids_value
    });

    serviceUtil.request(URL_CREATE_INVOICE, "POST", headers, body, response => {

      this.setState({
        totalCost: "",
        items_ids: [],
      });
    });

    this.toggleInvoice(this.state.itemSelected);

    window.location.reload();
  };

  toggleSetStatusAndStaff = item => {
    if(item.id == undefined){
      item = null
    }
    this.setState({
      modalSetStatusStaff: !this.state.modalSetStatusStaff,
      itemSelected: item
    });
  };

  detailToggle = item => {
    if(item.id == undefined){
      item = null
    }
    this.setState({
      detailModal: !this.state.detailModal,
      itemSelected: item
    });
  };

  toggleInvoice = item => {
    if(item.id == undefined){
      item = null
    }
    this.setState({
      invoiceModal: !this.state.invoiceModal,
      itemSelected: item,
      items_ids: []
    },
      this.getTotalService(item)
    );
  };

  getTotalService(item){
    if(item != null){
      this.setState({
        invoiceTotal: item.service_type.cost
      })
    }
  }

//These are for the vehicle type selector
  optionClickedStatusBooking(optionsList) {
    this.getGroupStatusBooking(optionsList);
  };

  selectedBadgeStatusBooking(optionsList) {
    this.getGroupStatusBooking(optionsList);
  };

  getStatusBooking(){
    const serviceUtil = new ServiceUtil();

    serviceUtil.request(URL_STATUS_BOOKING, null, null, null, response => {
      this.setState({
        status_booking: response
      });
    });
  }

  getGroupStatusBooking = optionsList => {
    optionsList.map((prop, key) => {
    if(prop.value === true)
      this.setState({
        statusBookingId: prop.id
      });
    })
  }

//These are for the vehicle make selector
optionClickedStaff(optionsList) {
  this.getGroupStaff(optionsList);
};

selectedBadgeStaff(optionsList) {
  this.getGroupStaff(optionsList);
};

getStaff(){
  const serviceUtil = new ServiceUtil();

  serviceUtil.request(URL_STAFF, null, null, null, response => {
    this.setState({
      staff: response
    });
  });
}

getGroupStaff = optionsList => {
  optionsList.map((prop, key) => {
  if(prop.value === true)
    this.setState({
      staffId: prop.id
    });
  })
}

}

export default UsersBookings;
