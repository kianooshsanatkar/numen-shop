import { Container, Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getInvoice } from "../../services";
import ProductItem from "./product-item.invoice";

export default function InvoicePage() {
  const [invoice, setInvoice] = useState(Object());
  const { invoiceId } = useParams();
  useEffect(() => {
    getInvoice(invoiceId).then((inv) => {
      setInvoice(inv);
    });
  }, [invoiceId]);
  return (
    <main>
      <Container fixed>
        <Grid container spacing={3} style={{direction:'rtl'}}>
          <Grid item xs={3} md={2}>
            نام:
          </Grid>
          <Grid item xs={9} md={10}>
            {invoice.name}
          </Grid>
          <Grid item xs={3} md={2}>
            شماره تماس:
          </Grid>
          <Grid item xs={9} md={10}>
            {invoice.phone}
          </Grid>
          <Grid item xs={3} md={2}>
            آدرس:
          </Grid>
          <Grid item xs={9} md={10}>
            {invoice.address}
          </Grid>
          <Grid item xs={3} md={2}>
            کد تخفیف:
          </Grid>
          <Grid item xs={9} md={10}>
            {invoice.discount_code}
          </Grid>
          <Grid item xs={3} md={2}>
            تاریخ:
          </Grid>
          <Grid item xs={9} md={10}>
            {invoice.create_date}
          </Grid>
          <Grid item xs={3} md={2}>
            کالا ها:
          </Grid>
          <Grid item xs={9} md={10}>
            <Grid container spacing={4}>
              {!invoice.items || invoice.items.length < 1
                ? null
                : invoice.items.map((product) => (
                    <ProductItem
                      key={product.uid}
                      product={product}
                    />
                  ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}
