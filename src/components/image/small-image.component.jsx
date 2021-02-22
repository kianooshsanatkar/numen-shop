import React from "react";
import getRelativeImageUrl, { ImageSize } from "../../helper/images";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  image: {
    width: "480px",
    height: "480px",
  },
});

export default function SmallImage({src, alt, className, ...rest}) {
  const classes = useStyle();
  return (
    <img
      src={getRelativeImageUrl(src, ImageSize.Small)}
      alt={alt}
      className={className? className : classes.image}
      {...rest}
    ></img>
  );
}
