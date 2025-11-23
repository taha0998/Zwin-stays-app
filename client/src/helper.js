const section1Background = (headerPageName) => {
  const headerStyle = document.querySelector(".header-container");
  if (headerPageName === "home") {
    headerStyle && headerStyle.classList.remove("blackBackground");
  } else {
    headerStyle && headerStyle.classList.add("blackBackground");
  }
};

export { section1Background };
