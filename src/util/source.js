const imageFolder = "../image/";

export const getImageSource = (image) => {
  switch(image) {
    case "SCREEN_ENTRY":
      return require(`${imageFolder}screen_entry.jpg`);
    case "FOOTER":
      return require(`${imageFolder}footer.jpg`);
    case "LOGO":
      return require(`${imageFolder}logo/logo-color.png`)
    default:
      console.warn(`Image not found for ${image}`, "Image Source");
      return "";
  }
}

export const getUrlSource = (type) => {
  switch(type) {
    case "FEEDBACK":
      return "https://www.walcron.com/about";
    default:
      console.warn(`Url link not found for ${type}`, "Url Source");
      return "";
  }
}
