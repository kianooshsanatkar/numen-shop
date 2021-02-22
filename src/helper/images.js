import NoImage from "../resource/images/no-image-available.jpg";

export const ImageSize = {
    Thumbnail: "thumbnail"
    , Small: "small"
    , Medium: "medium"
    , Large: "large"
}

const prefix="http://localhost"

export default function getRelativeImageUrl(imageName, imageSize) {
    if (imageName === null || imageName === undefined || imageName === "")
    return NoImage;
    const path = prefix + "/static/images/";
    return path + imageName + "_" + imageSize + ".jpg";
}