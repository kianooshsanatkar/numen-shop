import {
  Container,
  Table,
  TableContainer,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  TextField,
  Grid,
  Button,
} from "@material-ui/core";
import React, { Component } from "react";

class EditableProfile extends Component {
  state = {
    user: null,
  };

  componentDidMount() {
    fetch(this.props.getUserUrl)
      .then((response) => response.json())
      .then((data) => this.setState({ user: data }));
  }

  userSetter = (e) => {
    this.setState((state, props) => {
      return { user: {...state.user, [e.target.name]: e.target.value} };
      });
  };

  sendData = () => {
    fetch(this.props.sendDataUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.user),
    });
  };

  render() {
    return !this.state.user ? (
      <main></main>
    ) : (
      <main>
        <Container fixed maxWidth="sm" style={{ paddingTop: "10vh" }}>
          <Grid container alignContent="center">
            <Grid item sm={10} xs={12} style={{ margin: "auto" }}>
              <TableContainer
                component={Paper}
                style={{
                  direction: "rtl",
                  backgroundColor: "#eee",
                  width: "100%",
                }}
              >
                <Table className="product-properties" aria-label="simple table">
                  <TableBody>
                    <TableRow>
                      <TableCell align="right">نام :</TableCell>
                      <TableCell align="right">
                        <TextField
                          fullWidth
                          color="primary"
                          label="نام"
                          name="first_name"
                          variant="outlined"
                          value={this.state.user.first_name}
                          onChange={this.userSetter}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="right">نام خانوادگی :</TableCell>
                      <TableCell align="right">
                        <TextField
                          fullWidth
                          label="نام خانوادگی"
                          name="last_name"
                          variant="outlined"
                          value={this.state.user.last_name}
                          onChange={this.userSetter}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="right">تلفن همراه:</TableCell>
                      <TableCell align="right">
                        <TextField
                          fullWidth
                          label="تلفن همراه"
                          name="phone"
                          variant="outlined"
                          value={this.state.user.phone}
                          placeholder="09121234567"
                          onChange={this.userSetter}
                          type="tel"
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="right">ایمیل :</TableCell>
                      <TableCell align="left">
                        <TextField
                          fullWidth
                          label="ایمیل"
                          name="email"
                          variant="outlined"
                          value={this.state.user.email}
                          onChange={this.userSetter}
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid
              item
              sm={10}
              xs={12}
              style={{ margin: "auto", padding: "1em" }}
            >
              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                onClick={this.sendData}
              >
                ذخیره
              </Button>
            </Grid>
          </Grid>
        </Container>
      </main>
    );
  }
}
export default EditableProfile;
