import React from "react";
import getRelativeImageUrl, { ImageSize } from "../../helper/images";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  image: {
    width: "1080px",
    height: "1080px",
  },
});

export default function LandScape(props) {
  const classes = useStyle();
  return (
    <img
      src={getRelativeImageUrl(props.src, ImageSize.Large)}
      alt={props.alt}
      className={props.className? props.className: classes.image}
      {...props.rest}
    ></img>
  );
}
