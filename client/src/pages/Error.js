import React from "react";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/ErrorPage";
import img from "../assets/images/not-found.svg";

const Error = () => {
  return (
    <Wrapper className="full-page">
      <div>
        <img src={img} alt="not found" />
        <h3>Uh Oh!</h3>
        <p>Page not found!</p>
        <Link to="/landing">back home</Link>
      </div>
    </Wrapper>
  );
};

export default Error;
