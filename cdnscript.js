window.imgProxyInit = ({ domain = false, offset = 0 }) => {
  if (!domain) {
    console.log("You have to set a domain");
    return;
  }
  let images = [];

  let currentId = 0;
  const generateId = () => {
    return currentId++;
  };

  var inViewport = function(elem) {
    // Get element's bounding
    var bounding = elem.getBoundingClientRect();

    return (
      bounding.top -
        (window.innerHeight || document.documentElement.clientHeight) -
        offset <
      0
    );
  };

  const generateImage = (url, image) => {
    const img = document.createElement("img");
    img.setAttribute("src", url + image.getAttribute("data-src"));
    img.style.transition = "300ms ease-in-out";
    img.style.position = "absolute";
    img.style.top = "0";
    img.style.left = "0";

    if (image.style.width) {
      img.style.width = "100%";
    }
    return img;
  };

  const initImages = () => {
    var images = document.querySelectorAll("[data-src]");
    images.forEach(function(image) {
      if (image.getAttribute("data-inited") === "yes") return;
      const id = generateId();
      image.style.position = "relative";

      const width = image.offsetWidth;
      const height = image.offsetHeight;

      const imgPlaceholder = generateImage(
        domain + `/any/blur:20/resize:fill:${width}:${height}/plain/`,
        image
      );
      image.appendChild(imgPlaceholder);
      image.setAttribute("data-imageid", id);
      image.setAttribute("data-inited", "yes");
      images[id] = imgPlaceholder;
    });
  };

  initImages();
  setInterval(initImages, 1000);

  const checkImages = () => {
    var images = document.querySelectorAll("[data-src]");
    images.forEach(function(image) {
      if (image.getAttribute("data-loaded") === "yes") return;
      if (inViewport(image)) {
        image.setAttribute("data-loaded", "yes");

        const width = image.offsetWidth;
        const height = image.offsetHeight;

        const imgOriginal = generateImage(
          `${domain}/any/resize:fill:${width}:${height}/plain/`,
          image
        );
        imgOriginal.style.opacity = 0;
        image.appendChild(imgOriginal);

        imgOriginal.onload = () => {
          imgOriginal.style.opacity = 1;
          // images[image.getAttribute("data-imageid")].style.opacity = 0;
        };
      }
    });
  };

  checkImages();
  window.addEventListener("scroll", checkImages, false);
};
