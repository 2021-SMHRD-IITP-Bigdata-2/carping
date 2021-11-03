const imgContainer = document.querySelector(".detail-img-w");
console.log(imgContainer);

imgContainer.addEventListener("click", () => {
  console.log("안녕");
  document.querySelector(".file-upload-input").click();
});

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $(".image-upload-wrap").hide();
      $(".file-upload-image").attr("src", e.target.result);
      $(".file-upload-content").show();
      //   document.querySelector(".file-upload-content").style.display = "flex";
      $(".image-title").html(input.files[0].name);
    };
    reader.readAsDataURL(input.files[0]);
  } else {
    removeUpload();
  }
}
