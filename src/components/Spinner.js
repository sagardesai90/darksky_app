import React, { Fragment } from "react";
import spinner from "./spinner.gif";

const Spinner = () => {
  return (
    <Fragment>
      <img
        src={spinner}
        alt="Loading..."
        style={{ width: "100px", margin: "2rem", display: "block" }}
      />
    </Fragment>
  );
};

export default Spinner;
