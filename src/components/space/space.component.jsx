import React from "react";

export default function HeightSpace(props) {
  return (
    <div
      className="height-space"
      style={{ height: props.Height ? props.Height : "20vh" }}
    ></div>
  );
}
