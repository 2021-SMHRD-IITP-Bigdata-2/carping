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
// ====================================================================== 여기가 1번 START ======================================================================
//예측 코드
// run the webcam image through the image model
var spots;
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
  const spotList = ["산", "바다", "물", "노지", "야영장"];
  console.log(max);
  console.log(spotList[max]);
  await axios
    .post("http://localhost:3001/SPOTS/predSpot", { predSpot: spotList[max] })
    .then((response) => {
      console.log(response.data[0]);
      spots = response.data;
      // putSpots(spots);
      return spots; // spots 밖에서도 사용 가능
    });
}
// ====================================================================== 여기가 1번 END ======================================================================

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $(".image-upload-wrap").hide();
      $(".file-upload-image").attr("src", e.target.result);
      $(".file-upload-content").show();
      $(".image-title").html(input.files[0].name);
    };
    init().then(() => {
      predict();
    });
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

// console.log(spotName.innerText);

// ================================================== #3번 3개 리스트 올리기 기능 START ==================================================
const putSpots = () => {
  const spotName = document.querySelectorAll(
    ".col-xs-12.article-wrapper h1"
  )[0];
  const spotAddr = document.querySelectorAll(".col-xs-12.article-wrapper p")[0];
  // const celly = document.querySelectorAll(".col-xs-12.article-wrapper h1")[0];
  console.log(spotName.textContent);
  console.log(spotAddr.innerText);
  // 필터 클릭할 때마다 for문 돌려야 할 듯
  // and or 방식으로 a and b and c and d and e 전부 선택한 경우
  // if (a and !b and c and d and e){for~~~} b는 없는곳 이렇게
  spotName.innerText = spots[0].S_ADDR;
  spotAddr.innerText = spots[0].S_NAME;
  celly.innerText = spots[0].S_PHONE;
};
// ================================================== #3번3개 리스트 올리기 기능 END ==================================================

//================================================== #2번 필터링 알고리즘 완료 START ==================================================
var filteredSpots;
// 클릭하면 그 값이 리스트에 들어가고 빠지는 기능
const makeOption = () => {
  var filtered = [];

  const filterValues = document.querySelectorAll(".pricing > div");
  //짝수면 미포함 필터에
  var index;
  filterValues.forEach((v) => {
    v.addEventListener("click", () => {
      console.log(spots);
      console.log(v.innerText);
      if (filtered.includes(v.innerText)) {
        index = filtered.indexOf(v.innerText);
        filtered.splice(index, 1);
        // v.innerText.
      } else {
        filtered.push(v.innerText);
      }
      //값이 이제 filtered에 들어감

      // 여기서 약간 문제
      console.log(filtered); //['개수대', '화장실', 'CCTV', '편의점'] 이렇게 뽑힘 계속 동적으로 바뀜
      // console.log(spots);

      filteredSpots = spots.filter((spot) =>
        filtered.every((v) => spot.S_AMENITY.includes(v))
      );

      console.log(filteredSpots);
      putSpots();
      // OK DONE
    });
  });
};
makeOption();

//================================================== #2번 필터링 알고리즘 완료 END ==================================================
// 지우지 말것 바탕화면에서 퍼실리티들 뽑아오는 코드
// filterValues.forEach((value) => {
//   console.log(value.textContent);
//   facilList.push(value.textContent);
// });
// const filter = (filtered) => {
//   // filtered 여기에 들어감
//   // console.log(spots.S_AMENITY);
//   // const filtered = spots.filter((spot) => spot.S_AMENITY.includes("화장실")); //트루면 가져와져
//   console.log(spots);
//   filteredSpots = spots.filter((spot) =>
//     filtered.every((v) => spot.S_AMENITY.includes(v))
//   );

//   console.log(filteredSpots);
// };
// ================================================== 필터링 END ==================================================
