import {
  Button,
  ButtonGroup,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@material-ui/core";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import React from "react";
import { BrowserRouter as Router,Link } from 'react-router-dom'


import Thumbnail from "../../components/thumbnail";

export default function CartItem(props) {
  return (
    <Router>
    <Paper elevation={1} style={{ margin: "1em auto", textAlign: "center" }}>
      <Grid
        container
        style={{ direction: "rtl" }}
        spacing={3}
        alignContent="center"
      >
        <Grid item md={1} sm={2} xs={6}>
          <IconButton
            aria-label="delete"
            onClick={() => {
              props.delete(props.uid);
            }}
          >
            <DeleteOutlinedIcon />
          </IconButton>
        </Grid>
        <Grid item md={2} sm={4} xs={6}>
          <Link to={"/product/" + props.uid}>
            <Thumbnail src={props.image} alt={props.title} />
          </Link>
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Link to={"/product/" + props.uid}>
            <Typography variant="h5">{props.title}</Typography>
          </Link>
        </Grid>
        <Grid item md={3} sm={6} xs={12}>
          <ButtonGroup style={{ direction: "ltr" }}>
            <Button
              color="secondary"
              size="large"
              onClick={() => {
                props.remove(props.uid);
              }}
            >
              -
            </Button>
            <Button size="large" color="default" disabled>
              {props.quantity}
            </Button>
            <Button
              color="primary"
              size="large"
              onClick={() => {
                props.add(props.uid);
              }}
            >
              +
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item md={2} sm={6} xs={12}>
          <Typography variant="h6">{props.price * props.quantity}</Typography>
        </Grid>
      </Grid>
    </Paper>
    </Router>
  );
}
