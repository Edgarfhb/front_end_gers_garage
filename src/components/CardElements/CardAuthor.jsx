import React from "react";

class CardAuthor extends React.Component {
  render() {
    return (
      <div className="author">
          <img
            className="avatar border-gray"
            src={this.props.avatar}
          />
        <h5 className="title">{this.props.title}</h5>
        <p className="description">{this.props.description}</p>
      </div>
    );
  }
}

export default CardAuthor;
