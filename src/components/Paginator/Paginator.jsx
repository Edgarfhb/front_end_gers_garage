import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

class Paginator extends React.Component {
  state = { pagesCount: 0, currentPage: 0 };

  render() {
    const pages = Math.ceil(this.props.total / this.props.pageSize);

    return (
      <Pagination aria-label="">
        <PaginationItem disabled={this.state.currentPage <= 0}>
          <PaginationLink
            onClick={e =>
              this.handlePaginationClick(e, this.state.currentPage - 1)
            }
            previous
            href="#"
          />
        </PaginationItem>

        {//[...Array(currentPage)].map((this.state.pagesCount, i) => (
        [...Array(pages)].map((page, i) => {
          if (i === 20) {
            return (
              <PaginationItem key={i}>
                <PaginationLink>...</PaginationLink>
              </PaginationItem>
            );
          } else if (i < 20) {
            return (
              <PaginationItem active={i === this.state.currentPage} key={i}>
                <PaginationLink
                  onClick={e => this.handlePaginationClick(e, i)}
                  href="#"
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            );
          }
        })}

        <PaginationItem
          disabled={
            //this.state.currentPage >= this.state.pagesCount - 1
            this.state.currentPage >= pages - 1
          }
        >
          <PaginationLink
            onClick={e =>
              this.handlePaginationClick(e, this.state.currentPage + 1)
            }
            next
            href="#"
          />
        </PaginationItem>
      </Pagination>
    );
  }

  /*componentWillReceiveProps(props) {
    this.setState({
      pagesCount: Math.ceil(props.total / this.props.pageSize)
    });
  }*/

  handlePaginationClick = (e, index) => {
    e.preventDefault();

    this.setState({
      currentPage: index
    });

    this.props.currentPage(index);
  };
}

export default Paginator;
