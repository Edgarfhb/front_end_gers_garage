import React from "react";

export default class ServiceUtil {
  constructor(refAlert = null) {
    this.refAlert = refAlert;
  }

  request = (url = "", method = "", headers = {}, body = {}, fn) => {
    let loader = document.getElementById("loader");

    let defaultHeaders = {
      //Accept: "application/x-www-form-urlencoded",
      Authorization: sessionStorage.getItem("token")
    };

    let allHeaders = { ...defaultHeaders, ...headers };

    fetch(url, {
      method: method === null ? "GET" : method,
      headers: allHeaders,
      body: body
    })
      .then(response => response.json())
      .then(data => {
        //console.log(data.code);

        switch (data.code) {
          case 200:
            fn(data.data);
            break;
          case 401:
          case 403:
            this.destroySession();
            break;
          default:
            break;
        }

        if (this.refAlert !== null) {
          this.notify(data);
        }

      });
  };

  destroySession = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("loggedin");
  };

  notify = data => {
    var type;

    switch (data.success) {
      case 0:
      case false:
        type = "danger";
        break;
      case 1:
      case true:
        type = "success";
        break;
      case 2:
        type = "primary";
        break;
      case 3:
        type = "warning";
        break;
      case 4:
        type = "info";
        break;
      default:
        break;
    }

    var options = {};

    options = {
      place: "tc",
      message: (
        <div>
          <div>{data.message}</div>
        </div>
      ),
      type: type,
      icon: "nc-icon nc-bell-55",
      autoDismiss: 7
    };

    //if (this.refAlert !== null) {
    this.refAlert.notificationAlert(options);
    //}
  };
}
