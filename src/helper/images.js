export const ImageSize = {
    Thumbnail: "thumbnail"
    , Small: "small"
    , Medium: "medium"
    , Large: "large"
}

export default function getRelativeImageUrl(imageName, imageSize) {
    const path = "/mocked/images/";
    return path + imageName + "_" + imageSize + ".jpg";
}