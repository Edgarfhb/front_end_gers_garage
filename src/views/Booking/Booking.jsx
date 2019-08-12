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
  ListGroupItem
} from "reactstrap";

import MultiSelectReact from "multi-select-react";

import DatePicker from "react-datepicker";

import Button from "../../components/CustomButton/CustomButton.jsx";
import Paginator from "../../components/Paginator/Paginator";
import ServiceUtil from "../../core/ServiceUtil";

import {
  URL_SERVICETYPE,
  URL_ENGINETYPE,
  URL_VEHICLEMAKE,
  URL_VEHICLETYPE,
  URL_ADDBOOKING,
  URL_GET_USER_BOOKING,
  URL_BOOKED_DATES
} from "../../variables/constants";

var moment = require('moment');

class Bookings extends React.Component {
  state = {
    bookings: [],
    itemSelected: null,
    //
    vehicle_type: [],
    vehicle_make: [],
    engine_type: [],
    service_type: [],
    //
    modalAdd: false,
    detailModal: false,
    //
    booked_dates: [],
    //
    Date: new Date(),
    //
    date: "",
    vehicleTypeId: "",
    vehicleMakeId: "",
    engineTypeId: "",
    serviceTypeId: "",
    vehicleLicence: "",
    comments: "",
    //
    collapse: true,
    value: 15,
  };

  render() {
    const headers = [
      "ID",
      "Vehicle Type",
      "Vehicle",
      "Status",
      "Details"];

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
                  Bookings History
                  <Button
                    color="primary"
                    round
                    icon
                    className="pull-right"
                    onClick={this.toggleAdd}
                  >
                    <i className="nc-icon nc-simple-add" />
                  </Button>
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
                    {this.state.bookings.map((prop, key) => {

                        return (
                          <tr >
                            <td>{key+1}</td>
                            <td>{prop.car.vehicle_type.type}</td>
                            <td>{prop.car.vehicle_make.make}</td>
                            <td>{prop.status_booking.status}</td>
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
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>

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
                  <strong>Service Type: </strong>
                  {this.state.itemSelected != null
                    ? this.state.itemSelected.service_type.type
                    : null}
                </ListGroupItem>
                <ListGroupItem>
                  <strong>Vehicle Type: </strong>
                  {this.state.itemSelected != null
                    ? this.state.itemSelected.car.vehicle_type.type
                    : null}
                </ListGroupItem>
                <ListGroupItem>
                  <strong>Vehicle Make: </strong>
                  {this.state.itemSelected != null
                    ? this.state.itemSelected.car.vehicle_make.make
                    : null}
                </ListGroupItem>
                <ListGroupItem>
                  <strong>Engine Type: </strong>
                  {this.state.itemSelected != null
                    ? this.state.itemSelected.car.engine_type.type
                    : null}
                </ListGroupItem>
                <ListGroupItem>
                  <strong>Vehicle Licence: </strong>
                  {this.state.itemSelected != null
                    ? this.state.itemSelected.car.vehicle_licence
                    : null}
                </ListGroupItem>
                <ListGroupItem>
                  <strong>Comments: </strong>
                  {this.state.itemSelected != null
                    ? this.state.itemSelected.comments
                    : null}
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
            isOpen={this.state.modalAdd}
            toggle={this.toggleAdd}
            className={this.props.className}
          >
            <ModalHeader toggle={this.toggleAdd}>Add Bokking</ModalHeader>

            <ModalBody>
            <Form onSubmit={this.handleSubmit}>

              <Label>Date</Label>
              <br />
              <DatePicker
                selected={this.state.Date}
                onChange={this.handleChange}
                minDate={new Date()}
                maxDate={moment(new Date()).add(1, 'month').toDate()}
                excludeDates={this.state.booked_dates}
                filterDate={this.isWeekday}
                withPortal
                monthsShown={2}
              />
              <br />
              <br />

                <FormGroup>
                    <Label>Vehicle Type</Label>
                    <MultiSelectReact
                      options={this.state.vehicle_type}
                      optionClicked={this.optionClickedVehicleType.bind(this)}
                      selectedBadgeClicked={this.selectedBadgeVehicleType.bind(this)}
                      selectedOptionsStyles={selectedOptionsStyles}
                      optionsListStyles={optionsListStyles}
                      isSingleSelect={true}
                    />
                </FormGroup>

                <FormGroup>
                    <Label>Vehicle Make</Label>
                    <MultiSelectReact
                      options={this.state.vehicle_make}
                      optionClicked={this.optionClickedVehicleMake.bind(this)}
                      selectedBadgeClicked={this.selectedBadgeVehicleMake.bind(this)}
                      selectedOptionsStyles={selectedOptionsStyles}
                      optionsListStyles={optionsListStyles}
                      isSingleSelect={true}
                    />
                </FormGroup>

                <FormGroup>
                    <Label>Enginee Type</Label>
                    <MultiSelectReact
                      options={this.state.engine_type}
                      optionClicked={this.optionClickedEngineType.bind(this)}
                      selectedBadgeClicked={this.selectedBadgeClickedEngineType.bind(this)}
                      selectedOptionsStyles={selectedOptionsStyles}
                      optionsListStyles={optionsListStyles}
                      isSingleSelect={true}
                    />
                </FormGroup>

                <FormGroup>
                    <Label>Service Type</Label>
                    <MultiSelectReact
                      options={this.state.service_type}
                      optionClicked={this.optionClickedServiceType.bind(this)}
                      selectedBadgeClicked={this.selectedBadgeClickedServiceType.bind(this)}
                      selectedOptionsStyles={selectedOptionsStyles}
                      optionsListStyles={optionsListStyles}
                      isSingleSelect={true}
                    />
                </FormGroup>

                <FormGroup>
                  <Label>Vehicle Licence Details</Label>
                  <Input
                    type="text"
                    name="vehicleLicence"
                    id="vehicleLicence"
                    placeholder="Licence Details"
                    value={this.state.vehicleLicence}
                    onChange={this.handleInputChange}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Comments</Label>
                  <Input
                    type="textarea"
                    name="comments"
                    id="comments"
                    placeholder="Comments"
                    value={this.state.comments}
                    onChange={this.handleInputChange}
                  />
                </FormGroup>

                <div className="pull-right">
                  <Button color="primary">
                    Accept
                  </Button>{" "}
                  <Button color="secondary" onClick={this.toggleAdd}>
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
   this.getServiceType();
   this.getEngineeType();
   this.getVehicleMake();
   this.getVehicleType();
   this.getBookings();

   this.getBookedDates();
  }

  getBookedDates() {
    const serviceUtil = new ServiceUtil();

    serviceUtil.request(URL_BOOKED_DATES, null, null, null, response => {
      let booked_date = [];

      response.forEach(element => {
        booked_date.push(moment(element).toDate())
      })

      this.setState({
        booked_dates: booked_date
      });
    });
  }

  getBookings() {
    const serviceUtil = new ServiceUtil();

    serviceUtil.request(URL_GET_USER_BOOKING, null, null, null, response => {
      this.setState({
        bookings: response,
        pagesCount: Math.ceil(response.length / this.state.pageSize)
      });
    });
  }

  isWeekday = (date) => {
    const day = date.getDay()
    return day !== 0
  }

  handleChange = date => {
    this.setState({
      Date: date
    });
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const serviceUtil = new ServiceUtil();

    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };

    let body = JSON.stringify({
      date: this.state.Date,
      vehicle_type_id: this.state.vehicleTypeId,
      vehicle_make_id: this.state.vehicleMakeId,
      engine_id: this.state.engineTypeId,
      service_id: this.state.serviceTypeId,
      vehicle_licence: this.state.vehicleLicence,
      comments: this.state.comments
    });

    serviceUtil.request(URL_ADDBOOKING, "POST", headers, body, response => {

      this.setState({
        //error: data.message,
        Date: "",
        vehicleTypeId: "",
        vehicleMakeId: "",
        engineTypeId: "",
        serviceTypeId: "",
        vehicleLicence: "",
        comments: "",
      });
    });

    this.toggleAdd();
  };

  toggleAdd = () => {
    this.setState({
      modalAdd: !this.state.modalAdd
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

//These are for the vehicle type selector
  optionClickedVehicleType(optionsList) {
    this.getGroupVehicleType(optionsList);
  };

  selectedBadgeVehicleType(optionsList) {
    this.getGroupVehicleType(optionsList);
  };

  getVehicleType(){
    const serviceUtil = new ServiceUtil();

    serviceUtil.request(URL_VEHICLETYPE, null, null, null, response => {
      this.setState({
        vehicle_type: response
      });
    });
  }

  getGroupVehicleType = optionsList => {
    optionsList.map((prop, key) => {
    if(prop.value === true)
      this.setState({
        vehicleTypeId: prop.id
      });
    })
  }

//These are for the vehicle make selector
optionClickedVehicleMake(optionsList) {
  this.getGroupVehicleMake(optionsList);
};

selectedBadgeVehicleMake(optionsList) {
  this.getGroupVehicleMake(optionsList);
};

getVehicleMake(){
  const serviceUtil = new ServiceUtil();

  serviceUtil.request(URL_VEHICLEMAKE, null, null, null, response => {
    this.setState({
      vehicle_make: response
    });
  });
}

getGroupVehicleMake = optionsList => {
  optionsList.map((prop, key) => {
  if(prop.value === true)
    this.setState({
      vehicleMakeId: prop.id
    });
  })
}

//This are for the Engine type selector
  optionClickedEngineType(optionsList) {
    this.getGroupEngineType(optionsList);
  };

  selectedBadgeClickedEngineType(optionsList) {
    this.getGroupEngineType(optionsList);
  };

  getEngineeType(){
    const serviceUtil = new ServiceUtil();

    serviceUtil.request(URL_ENGINETYPE, null, null, null, response => {
      this.setState({
        engine_type: response
      });
    });
  }

  getGroupEngineType = optionsList => {
    optionsList.map((prop, key) => {
    if(prop.value === true)
      this.setState({
        engineTypeId: prop.id
      });
    })
  }

//This are for the service type selector
  optionClickedServiceType(optionsList) {
    this.getGroupServiceType(optionsList);
  };

  selectedBadgeClickedServiceType(optionsList) {
    this.getGroupServiceType(optionsList);
  };

  getServiceType(){
    const serviceUtil = new ServiceUtil();

    serviceUtil.request(URL_SERVICETYPE, null, null, null, response => {
      this.setState({
        service_type: response
      });
    });
  }

  getGroupServiceType = optionsList => {
    optionsList.map((prop, key) => {
    if(prop.value === true)
      this.setState({
        serviceTypeId: prop.id
      });
    })
  }

}

export default Bookings;
