
import React from "react";

class Footer extends React.Component {
  render() {
    return (

<footer className="page-footer font-small special-color-dark pt-4">

  <div className="container">

    <ul className="list-unstyled list-inline text-center">
      <li className="list-inline-item">
        <a href="/" className="btn-floating btn-fb mx-5">
          <i className="fab fa-facebook-f fa-5x"> </i>
        </a>
      </li>
      <li className="list-inline-item">
        <a href="/" className="btn-floating btn-tw mx-5">
          <i className="fab fa-twitter fa-5x"> </i>
        </a>
      </li>
      <li className="list-inline-item">
        <a href="/" className="btn-floating btn-gplus mx-5">
          <i className="fab fa-google-plus-g fa-5x"> </i>
        </a>
      </li>
      <li className="list-inline-item">
        <a href="/" className="btn-floating btn-li mx-5">
          <i className="fab fa-linkedin-in fa-5x"> </i>
        </a>
      </li>
      <li class="list-inline-item">

      </li>
    </ul>

  </div>

  <div className="footer-copyright text-center py-3">© 2019 Copyright Fabian Hinojosa</div>
  <div>
  <a href="/adminlogin" className="btn btn-outline-dark">Admin Log</a>
  </div>

</footer>
    );
  }
}


export default Footer;
