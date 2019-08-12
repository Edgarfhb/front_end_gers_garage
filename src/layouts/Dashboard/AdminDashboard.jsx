import React from "react";
import {
  Route,
  Switch,
  Redirect } from "react-router-dom";

import AdminHeader from "../../AdminComponents/AdminHeader/AdminHeader.jsx";
import AdminSidebar from "../../AdminComponents/AdminSidebar/AdminSidebar.jsx";
import Loader from "../../components/Loader/Loader";

import adminDashRoutes from "../../routes/adminDashboard.jsx";

class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      backgroundColor: "black",
      activeColor: "info",
      loader: false
    };
  }

  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      this.refs.mainPanel.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
    }
  }

  handleActiveClick = color => {
    this.setState({ activeColor: color });
  };

  handleBgClick = color => {
    this.setState({ backgroundColor: color });
  };

  render() {
    return (
      <div className="wrapper">
        <Loader loader={this.state.loader} />
        <AdminSidebar
          {...this.props}
          routes={adminDashRoutes}
          bgColor={this.state.backgroundColor}
          activeColor={this.state.activeColor}
        />
        <div className="main-panel" ref="mainPanel">
          <AdminHeader {...this.props} />
          <Switch>
            {adminDashRoutes.map((prop, key) => {
              if (prop.pro) {
                return null;
              }
              if (prop.redirect) {
                return <Redirect from={prop.path} to={prop.pathTo} key={key} />;
              }
              return (
                <Route path={prop.path} component={prop.component} key={key} />
              );
            })}
          </Switch>
        </div>
      </div>
    );
  }
}

export default AdminDashboard;
