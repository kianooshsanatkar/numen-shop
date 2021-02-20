import React from "react";
import getRelativeImageUrl, { ImageSize } from "../../helper/images";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  image: {
    width: "75px",
    height: "75px",
  },
});

export default function Thumbnail(props) {
  const classes = useStyle();
  return (
    <img
      src={getRelativeImageUrl(props.src, ImageSize.Thumbnail)}
      alt={props.alt}
      className={classes.image}
      {...props.rest}
    ></img>
  );
}
