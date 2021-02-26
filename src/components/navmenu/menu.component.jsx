import React, { Component } from "react";
import {
  IconButton
} from "@material-ui/core";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";

import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";

import "./menu.style.css";
import MenuItem from "./menu-items.component";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { mapStateToProps, mapDispatchToProps } from "../../redux/user.reducer";
import { getLabels } from "../../services/label";
import LoginDialog from "../dialog.login";

class Menu extends Component {
  state = {
    labels: [],
    authDialog: false,
    phone: "",
    password: "",
  };

  componentDidMount() {
    getLabels().then((data) => {
      if (data) {
        let labels = data
          .sort((x, y) => x.parent - y.parent)
          .filter((x) => x.is_menu_label === true);
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
        <MenuItem label={label} closeMenu={this.props.closeMenu} />
        {label.child.length ? (
          <ul>{label.child.map((l) => this.append_category(l))}</ul>
        ) : null}
      </li>
    );
  }
  register() {}
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
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
        <div className="profile-button">
          {this.props.user ? (
            <span>✋سلام {this.props.user.firstName}</span>
          ) : null}
          {this.props.user ? (
            <Link to="/profile/" onClick={this.props.closeMenu}>
              <IconButton color="primary">
                <PersonRoundedIcon />
              </IconButton>
            </Link>
          ) : (
            <IconButton
              color="secondary"
              onClick={() => this.setState({ authDialog: true })}
            >
              <PersonRoundedIcon />
            </IconButton>
          )}
        </div>
        <div className="border-line"></div>
        <ul>{this.state.labels.map((label) => this.append_category(label))}</ul>
        <LoginDialog
          dialog={this.state.authDialog}
          disableDialog={() => {
            this.setState({ authDialog: false });
          }}
          closeMenu={this.props.closeMenu}
        />
      </aside>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
