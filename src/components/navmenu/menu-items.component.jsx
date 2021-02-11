import React from "react";
import { Link } from "react-router-dom";

export default function MenuItem(props) {
  return (
    <div>
      <h3>
        <Link className="menu-item" onClick={props.closeMenu} to={"/products/" + props.label.uid}>
          {props.label.title}
        </Link>
      </h3>
      <hr />
    </div>
  );
}
