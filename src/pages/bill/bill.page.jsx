import React, { useState, useEffect } from "react";
import { Container, Typography } from "@material-ui/core";

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
      <Container fixed style={{ direction: "rtl", paddingTop:'1em' }}>
        <div>
          {invoices === null || invoices.length < 1
            ? <div>
              <Typography variant="h4">شما هیچ خرید ثبت شده ایی ندارید!</Typography>
              </div>
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
