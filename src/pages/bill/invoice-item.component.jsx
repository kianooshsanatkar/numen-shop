import React from "react";
import { Link } from "react-router-dom";

import { Grid, Paper } from "@material-ui/core";
import PaymentIcon from "@material-ui/icons/Payment";
import MarkunreadMailboxIcon from "@material-ui/icons/MarkunreadMailbox";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";

export default function InvoiceItem({ invoice }) {
  return (
    <Paper style={{ margin: "1em auto", padding: ".5em 2em" }}>
      <Grid container spacing={1}>
        <Grid item xs={1}>
          <Link to={"/invoice/" + invoice.uid}>
            <OpenInNewIcon color="primary" />
          </Link>
        </Grid>
        <Grid item xs={2}>
          {invoice.create_date}
        </Grid>
        <Grid xs={7} item>
          {invoice.items && invoice.items.length > 0
            ? invoice.items.map((item) => {
                return (
                  <div
                    key={item.product_id}
                    style={{
                      backgroundColor: "lightskyblue",
                      borderRadius: "5px",
                      display: "inline-block",
                      padding: "2px 5px",
                    }}
                  >
                    <Link
                      to={"/product/" + item.product_id}
                      style={{ direction: "rtl" }}
                    >
                      <span> {item.product_title} </span>
                      <small
                        style={{ direction: "ltr", display: "inline-block" }}
                      >
                        {item.quantity} X
                      </small>
                    </Link>
                  </div>
                );
              })
            : null}
        </Grid>
        <Grid xs={1} md={1} item>
          <PaymentIcon
            fontSize="default"
            color={invoice.is_paid ? "primary" : "inherit"}
          />
        </Grid>
        <Grid xs={1} md={1} item>
          <MarkunreadMailboxIcon
            fontSize="default"
            color={invoice.sent ? "primary" : "inherit"}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
