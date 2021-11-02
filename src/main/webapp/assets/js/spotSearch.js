// modal search Result detail
const open = document.querySelector(".more");
const close = document.getElementById("close");
const modal = document.querySelector(".modal_wrapper");

// open.addEventListener("click", function () {
//   modal.style.display = "flex";
// });

close.addEventListener("click", function () {
  modal.style.display = "none";
});

// const predRows = document.querySelectorAll(".col-xs-12.article-wrapper");
// predRows.forEach((row) => {
//   row.addEventListener("click", () => {
//     modal.style.display = "flex";
//   });
// });

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
var index;
function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $(".image-upload-wrap").hide();
      $(".file-upload-image").attr("src", e.target.result);
      $(".file-upload-content").show();
      $(".image-title").html(input.files[0].name);
    };
    init().then(async () => {
      await predict();
      InitPutSpots();
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
const InnerModalImg = document.querySelectorAll(".icon-option span");

const putSpots = () => {
  var indexPutSpots = [];

  const recomends3 = document.querySelectorAll(".col-xs-12.article-wrapper");
  function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  recomends3.forEach((recomend, i) => {
    // 무작위 숫자 길이 만큼
    if (filteredSpots == 0) {
      recomend.querySelector("h1").textContent = "결과가 존재하지 않습니다...";
      recomend.querySelector("p").textContent =
        "(っ °Д °;)っ(っ °Д °;)っ(っ °Д °;)っ";
      recomend.addEventListener("click", () => {
        modal.style.display = "none";
      });
    } else {
      index = rand(0, filteredSpots.length - 2);
      indexPutSpots.push(index);
      // console.log(indexPutSpots);
      recomend.querySelector("h1").textContent = filteredSpots[index].S_NAME;
      recomend.querySelector("p").textContent = filteredSpots[index].S_ADDR;
      recomend.addEventListener("click", () => {
        modal.style.display = "flex";
        document.querySelector(".spot-info-text>h1").innerText =
          filteredSpots[indexPutSpots[i]].S_NAME; // 이름
        document.querySelector(".spot-info-text > span").innerText =
          filteredSpots[indexPutSpots[i]].S_ADDR; // 주소
        document.querySelector(".spot-info-text > h3").innerText =
          filteredSpots[indexPutSpots[i]].S_PHONE; // 번호
        document.querySelector(".spot-img").src =
          filteredSpots[indexPutSpots[i]].S_IMG; // 이미지

        InnerModalImg.forEach((img, j) => {
          // 화장실 편의시설 표시해주는 기능
          if (
            filteredSpots[indexPutSpots[i]].S_AMENITY.includes(img.innerText)
          ) {
            document.querySelector(".icon-option").children[j].style.display =
              "flex";
            console.log(filteredSpots[indexPutSpots[i]].S_AMENITY);
          } else {
            document.querySelector(".icon-option").children[j].style.display =
              "none";
          }
        });
      });
    }
  });
};

// ================================================== #3번3개 리스트 올리기 기능 END ==================================================

//================================================== #2번 필터링 알고리즘 완료 START ==================================================
var filteredSpots;
// 클릭하면 그 값이 리스트에 들어가고 빠지는 기능
const makeOption = () => {
  var filtered = [];

  const filterValues = document.querySelectorAll(".pricing > div");
  index;
  filterValues.forEach((v) => {
    v.style.opacity = 0.6;

    v.addEventListener("click", () => {
      if (v.style.opacity == 0.6) {
        v.style.opacity = 1;
        console.log("opa=1");
      } else {
        v.style.opacity = 0.6;
        console.log("opa=0.6");
      }

      console.log(spots);
      console.log(v.innerText);
      if (filtered.includes(v.innerText)) {
        index = filtered.indexOf(v.innerText);
        filtered.splice(index, 1);
        // modal.style
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

const InitPutSpots = () => {
  console.log(spots);
  const recomends3 = document.querySelectorAll(".col-xs-12.article-wrapper");
  function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  var indexList = [];

  recomends3.forEach((recomend, i) => {
    // 무작위 숫자 길이 만큼
    index = rand(0, spots.length - 1);
    indexList.push(index);
    recomend.querySelector("h1").textContent = spots[index].S_NAME;
    recomend.querySelector("p").textContent = spots[index].S_ADDR;
    recomend.addEventListener("click", () => {
      modal.style.display = "flex";
      document.querySelector(".spot-info-text>h1").innerText =
        spots[indexList[i]].S_NAME; // 이름
      document.querySelector(".spot-info-text > span").innerText =
        spots[indexList[i]].S_ADDR; // 주소
      document.querySelector(".spot-info-text > h3").innerText =
        spots[indexList[i]].S_PHONE; // 번호
      document.querySelector(".spot-img").src = spots[indexList[i]].S_IMG; // 이미지

      InnerModalImg.forEach((img, j) => {
        // 화장실 편의시설 표시해주는 기능
        if (spots[indexList[i]].S_AMENITY.includes(img.innerText)) {
          document.querySelector(".icon-option").children[j].style.display =
            "flex";
          console.log(spots[indexList[i]].S_AMENITY);
        } else {
          document.querySelector(".icon-option").children[j].style.display =
            "none";
        }
      });
    });
    // document.querySelector(".spot-info-text>h1").innerText =
    //   spots[index].S_NAME; // 이름
    // document.querySelector(".spot-info-text > span").innerText =
    //   spots[index].S_NAME; // 주소
    // document.querySelector(".spot-info-text > h3").innerText =
    //   spots[index].S_NAME; // 번호
    // document.querySelector(".spot-img").src = spots[index].S_NAME; // 이미지
    // // 모달 클릭
  });
  recomends3.forEach((recomend) => {});

  // for (var i = 0; i < 3; i++) {
  //   (function (indexList) {
  //     console.log(indexList);
  //     recomends3[i].addEventListener("click", () => {
  //       modal.style.display = "flex";
  //       document.querySelector(".spot-info-text>h1").innerText =
  //         spots[indexList[i]].S_NAME; // 이름
  //     });
  //   })(indexList);
  // }
};
