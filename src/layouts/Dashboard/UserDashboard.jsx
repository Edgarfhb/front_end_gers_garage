import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import UserHeader from "../../UserComponents/UserHeader/UserHeader.jsx";
import UserSidebar from "../../UserComponents/UserSidebar/UserSidebar.jsx";
import Loader from "../../components/Loader/Loader";

import userDashRoutes from "../../routes/userDashboard.jsx";

class UserDashboard extends React.Component {
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
        <UserSidebar
          {...this.props}
          routes={userDashRoutes}
          bgColor={this.state.backgroundColor}
          activeColor={this.state.activeColor}
        />
        <div className="main-panel" ref="mainPanel">
          <UserHeader {...this.props} />
          <Switch>
            {userDashRoutes.map((prop, key) => {
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

export default UserDashboard;
