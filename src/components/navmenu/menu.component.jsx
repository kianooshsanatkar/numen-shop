import React, { Component } from "react";
import {
  IconButton,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
  TextField,
  Button,
} from "@material-ui/core";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";

import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";

import "./menu.style.css";
import MenuItem from "./menu-items.component";

export default class Menu extends Component {
  state = {
    labels: [],
    authDialog: false,
    email: "",
    password: "",
  };

  componentDidMount() {
    fetch("http://localhost:5000/api/labels/")
      .then((response) => response.json())
      .then((data) => {
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
  emailValidation() {}

  logIn() {
    if (this.state.email && this.state.password) {
      fetch("http://127.0.0.1:5000/auth/login", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: this.state.email,
          password: this.state.password,
        }),
      })
        .then((response) => response.json())
        .then((data) => alert(data));
    }
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
          <IconButton color="secondary" onClick={() => this.setState({ authDialog: true })}>
            <PersonRoundedIcon />
          </IconButton>
        </div>
        <div className="border-line"></div>
        <ul>
          {this.state.labels.map((label) => this.append_category(label))}
        </ul>
        <Dialog
              open={this.state.authDialog}
              onClose={() => {
                this.setState({ authDialog: false });
              }}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle
                style={{ backgroundColor: "#333", color: "#fff" }}
                id="form-dialog-title"
              >
                <div style={{ margin: 0 }} className="yekan-text">
                  ورود به حساب کاربری
                </div>
              </DialogTitle>
              <DialogContent>
                {/* <DialogContentText>
                  .برای ورود لطفا ایمیل و پسوورد خود را وارد کنید، و اگر حساب کاربری ندارید لطفا از تب ایجاد حساب اقدام نمایید
                </DialogContentText> */}
                <form>
                  <TextField
                    autoFocus
                    margin="dense"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange.bind(this)}
                    label="phone"
                    placeholder="09121234567"
                    type="tel"
                    fullWidth
                    required
                  />
                  <TextField
                    margin="dense"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange.bind(this)}
                    label="Password"
                    type="Password"
                    fullWidth
                    required
                  />
                </form>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    this.setState({ authDialog: false });
                  }}
                  color="primary"
                >
                  بستن
                </Button>
                <Button onClick={this.logIn.bind(this)} color="primary">
                  ورود
                </Button>
              </DialogActions>
            </Dialog>
      </aside>
    );
  }
}
