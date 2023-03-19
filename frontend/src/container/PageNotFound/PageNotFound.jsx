import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./PageNotFound.scss";

const PageNotFound = () => (
  <div>
    <h1 className="page-not-found">
      {" "}
      <strong>404</strong> -Page Not Found!
    </h1>
    <Link to="/" className="home-btn">
      <Button>Go Home</Button>
    </Link>
  </div>
);

export default PageNotFound;
