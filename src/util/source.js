const imageFolder = "../image/";

export const getImageSource = (image) => {
  switch(image) {
    case "SCREEN_ENTRY":
      return require(`${imageFolder}screen_entry.png`);
    default:
      console.warn(`Image not found for ${image}`, "Image Source");
      return "";
  }
}
