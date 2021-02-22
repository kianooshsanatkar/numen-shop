import React from "react";
import getRelativeImageUrl, { ImageSize } from "../../helper/images";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  image: {
    width: "640px",
    height: "640px"
  },
});

export default function NormalImage(props) {
  const classes = useStyle();
  return (
    <img
      src={getRelativeImageUrl(props.src, ImageSize.Medium)}
      alt={props.alt}
      className={classes.image}
      {...props.rest}
    ></img>
  );
}
