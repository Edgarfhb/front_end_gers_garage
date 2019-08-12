import React from "react";

import "../../components/Loader/loader.css";

import { Spinner } from "react-activity";
import "react-activity/dist/react-activity.css";

class Loader extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div
        ref="loader"
        id="loader"
        className={"spinner-loader"}
        style={{ display: "none" }}
      >
        <Spinner size={50} />
      </div>
    );
  }
}

export default Loader;
