// modal search Result detail
const open = document.querySelector(".more");
const close = document.getElementById("close");
const modal = document.querySelector(".modal_wrapper");

open.addEventListener("click", function () {
  modal.style.display = "flex";
});

close.addEventListener("click", function () {
  modal.style.display = "none";
});

// --------------------------------------------------------------------------예측 모델

// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image
// the link to your model provided by Teachable Machine export panel
const URL = "https://teachablemachine.withgoogle.com/models/FrQVm2ZWn/";
let model, labelContainer, maxPredictions;
// Load the image model and setup the webcam
async function init() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";
  // load the model and metadata
  // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
  // or files from your local hard drive
  // Note: the pose library adds "tmImage" object to your window (window.tmImage)
  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();
  labelContainer = document.getElementById("label-container");

  for (let i = 0; i < maxPredictions; i++) {
    // and class labels
    labelContainer.appendChild(document.createElement("div"));
  }
}

//예측 코드
// run the webcam image through the image model
async function predict() {
  // predict can take in an image, video or canvas html element
  var image = document.getElementById("face-image");
  const prediction = await model.predict(image, false);
  var maxpre = [];
  for (let i = 0; i < maxPredictions; i++) {
    const classPrediction =
      prediction[i].className + ": " + prediction[i].probability.toFixed(2);
    console.log(prediction[i].className);
    maxpre.push(prediction[i].probability);
    // labelContainer.childNodes[i].innerHTML = classPrediction;
  }
  console.log(maxpre);
  const max = maxpre.indexOf(Math.max(...maxpre));
  console.log(max);
  labelContainer.innerHTML = prediction[max].className;
}

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $(".image-upload-wrap").hide();
      $(".file-upload-image").attr("src", e.target.result);
      $(".file-upload-content").show();
      $(".image-title").html(input.files[0].name);
    };
    reader.readAsDataURL(input.files[0]);
  } else {
    removeUpload();
  }
}

function removeUpload() {
  $(".file-upload-input").replaceWith($(".file-upload-input").clone());
  $(".file-upload-content").hide();
  $(".image-upload-wrap").show();
}

$(".image-upload-wrap").bind("dragover", function () {
  $(".image-upload-wrap").addClass("image-dropping");
});
$(".image-upload-wrap").bind("dragleave", function () {
  $(".image-upload-wrap").removeClass("image-dropping");
});

// 결과 리스트

$(function () {
  $("#switch-view").click(function () {
    $(this).find("button").toggleClass("active");
    $(".article-wrapper").toggleClass("bloc col-xs-12 col-xs-4");
  });
});
