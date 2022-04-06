import "./Loading.css";

import React from "react";
import ReactLoading from "react-loading";

export default function Loading({
  type = "bars",
  color = "#333",
  height = "40px",
  width = "40px",
}) {
  return (
    <div className="loading">
      <ReactLoading type={type} color={color} height={height} width={width} />
    </div>
  );
}
