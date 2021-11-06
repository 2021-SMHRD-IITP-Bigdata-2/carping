const Lists = () => {
  // 전부 지우기
  const mapListwrap = document.querySelector(".map-listwrap");
  while (mapListwrap.hasChildNodes()) {
    mapListwrap.removeChild(mapListwrap.firstChild);
  }
};

module.exports = { Lists };
