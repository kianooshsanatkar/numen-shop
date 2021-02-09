import React, { Component } from "react";

import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";

import "./menu.style.css";
import MenuItem from "./menu-items.component";

export default class Menu extends Component {
  state = {
    labels: [],
  };

  componentDidMount() {
    fetch("http://localhost:5000/api/labels/")
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          let labels = data.sort((x, y) => x.parent - y.parent).filter(x=> x.is_menu_label===true);
          let root_labels = [];
          if (labels) {
            root_labels = labels.filter((label) => {
              if (!label.parent_id) {
                label.child = [];
                return true;
              }
              return false;
            });
          }
          root_labels.forEach((label) => this.addChild(label, labels));
          this.setState({ labels: root_labels });
        }
      });
  }

  addChild(label, labels) {
    labels.forEach((l) => {
      if (label.uid === l.parent_id) {
        l.child = [];
        this.addChild(l, labels);
        label.child.push(l);
      }
    });
  }

  append_category(label) {
    return (
      <li key={label.uid}>
        <MenuItem label={label} />
        {label.child.length ? (
          <ul>{label.child.map((l) => this.append_category(l))}</ul>
        ) : null}
      </li>
    );
  }

  render() {
    return (
      <aside
        className="menu-container"
        style={this.props.menuVisibility ? { left: 0 } : null}
      >
        <div className="close-button" onClick={this.props.closeMenu}>
          <CloseOutlinedIcon fontSize="large"></CloseOutlinedIcon>
        </div>
        <div className="border-line"></div>

        <ul>{this.state.labels.map((label) => this.append_category(label))}</ul>
      </aside>
    );
  }
}
