import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Container, Grid, Paper } from "@material-ui/core";
import PaymentIcon from "@material-ui/icons/Payment";
import MarkunreadMailboxIcon from "@material-ui/icons/MarkunreadMailbox";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";

import { getInvoices } from "../../services";

import InvoiceItem from './invoice-item.component';


export default function BillPage() {
  const [invoices, setInvoices] = useState(null);

  useEffect(() => {
    getInvoices().then((ins) => {
      setInvoices(ins);
    });
  }, []);

  return (
    <main>
      <Container fixed style={{ direction: "rtl" }}>
        <div>
          {invoices === null
            ? null
            : invoices.map((invoice) => {
                return (
                  <InvoiceItem
                    key={invoice.uid}
                    invoice={invoice}
                  ></InvoiceItem>
                );
              })}
        </div>
      </Container>
    </main>
  );
}
