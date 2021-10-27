window.addEventListener("load", SetGridItemHeight);
window.addEventListener("resize", SetGridItemHeight);

function SetGridItemHeight() {
  let grid = document.getElementsByClassName("grid")[0];
  let rowHeight = parseInt(
    window.getComputedStyle(grid).getPropertyValue("grid-auto-rows")
  );
  let rowGap = parseInt(
    window.getComputedStyle(grid).getPropertyValue("grid-row-gap")
  );

  let item = grid.getElementsByClassName("item");
  for (let i = 0; i < item.length; ++i) {
    item[i].style.gridRowEnd = `span ${Math.floor(
      item[i].children[0].offsetHeight / 25
    )}`;
    // Math.ceil -> Math.floor
    // item[i].offsetHeight -> item[i].children[0].offsetHeight
  }
}

// modal detail
const open = document.querySelector(".item");
const close = document.getElementById("close");
const modal = document.querySelector(".modal_wrapper");

open.addEventListener("click", function () {
  modal.style.display = "flex";
});

close.addEventListener("click", function () {
  modal.style.display = "none";
});

// modal write
const open_w = document.querySelector(".content-write");
const close_w = document.getElementById("close-w");
const modal_w = document.querySelector(".modal_wrapper-w");

open_w.addEventListener("click", function () {
  modal_w.style.display = "flex";
});

close_w.addEventListener("click", function () {
  modal_w.style.display = "none";
});
