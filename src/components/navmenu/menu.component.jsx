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
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../../redux/user.reducer";
import { login } from "../../services/auth";
import { getLabels } from "../../services/label";

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

  logIn() {
    login(this.state.phone, this.state.password).then((result) => {
      const [logged, user] = result;
      if (logged === true) {
        this.props.login(user);
        this.setState({ authDialog: false });
      }
    });
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
            <IconButton color="primary">
              <PersonRoundedIcon />
            </IconButton>
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
            <div style={{ margin: 0 }} >
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
                name="phone"
                value={this.state.phone}
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

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
