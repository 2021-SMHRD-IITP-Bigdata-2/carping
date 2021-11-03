const search = document.querySelector(".map-search input");

var NamAddFai;

axios.get("http://localhost:3001/SPOTS/kakaoMap/search").then((response) => {
  console.log("search에서 가져온 데이터");
  console.log(response.data[3].S_NAME);
  NamAddFai = response.data;
});

search.addEventListener("keyup", (e) => {
  // 검색어 만들 창
  //   var row = document.createElement("div");
  //   row.className = "row searchedSpot";
  //   안에 있던 내용 싹 삭제하는 기능
  var SearchRowWrap = document.querySelector(".SearchRowWrap");
  if (SearchRowWrap) {
    SearchRowWrap.remove();
  }
  const mapListwrap =
    document.getElementsByClassName("map-listwrap")[0].children;

  // if문 써서
  //   while (mapListwrap.hasChildNodes()) {
  //     mapListwrap.removeChild(mapListwrap.firstChild);
  //   }
  const searchList = document.querySelectorAll(".searchList");

  for (var i = 0; i < searchList.length; i++) {
    searchList[0].remove();
  }
  //   while (document.querySelectorAll(".searchList")[0]) {
  // searchList[0].remove();
  //   }

  if (e.target.value !== "") {
    for (var i = 0; i < mapListwrap.length; i++) {
      // console.log(mapListwrap[i]);
      mapListwrap[i].style.display = "none";
    }
  } else {
    for (var i = 0; i < mapListwrap.length; i++) {
      // console.log(mapListwrap[i]);
      mapListwrap[i].style.display = "flex";
    }
  }

  var searchResults = [];

  // console.log(OnlyNames);
  NamAddFai.forEach((onething) => {
    if (
      onething.S_NAME.includes(e.target.value.replace(" ", "")) ||
      onething.S_ADDR.includes(e.target.value.replace(" ", "")) ||
      onething.S_AMENITY.includes(e.target.value.replace(" ", ""))
    ) {
      //   console.log(oneName);
      if (searchResults.length < 20) {
        searchResults.push(onething.S_NAME);
      }
    }
  });
  // console.log("안녕하세요");
  console.log(searchResults);
  searchModal(searchResults);
});

const searchModal = (searchResults) => {
  const mapListWrap = document.getElementsByClassName("map-listwrap")[0];
  var SearchRowWrap = document.createElement("div");
  SearchRowWrap.className = "SearchRowWrap";
  var SearchRow = document.createElement("div");

  //반복구간
  searchResults.forEach((one) => {
    SearchRow = document.createElement("div");
    SearchRow.innerText = one;
    SearchRowWrap.appendChild(SearchRow);
  });
  //   for (var i = 0; i < 11; i++) {
  //     SearchRow = document.createElement("div");
  //     SearchRow.innerText = "안녕하세요";
  //     SearchRowWrap.appendChild(SearchRow);
  //   }

  mapListWrap.appendChild(SearchRowWrap);
  // 이제 온클릭 하면 모달 띄워주는 작업하자
  const searchedOnes = document.querySelectorAll(".SearchRowWrap > div");

  searchedOnes.forEach((selected, j) => {
    selected.addEventListener("click", () => {
      console.log(selected.innerText);
      //   이제 여기서 쿼리 액시오스
      axios
        .post("http://localhost:3001/SPOTS//kakaoMap/chosenOne", {
          chosenOne: selected.innerText,
        })
        .then((response) => {
          console.log(response.data[0]);

          //   map.setCenter(
          //     new kakao.maps.LatLng(
          //       response.data[0].S_LAT,
          //       response.data[0].S_LONG
          //     )
          //   );
          //   map.setLevel(3);

          //지도작업
          var mapContainer = document.getElementById("map"), // 지도를 표시할 div
            mapOption = {
              center: new kakao.maps.LatLng(
                response.data[0].S_LAT,
                response.data[0].S_LONG
              ), // 지도의 중심좌표
              level: 10, // 지도의 확대 레벨
              mapTypeId: kakao.maps.MapTypeId.ROADMAP, // 지도종류
            };
          // 지도를 생성한다
          var map = new kakao.maps.Map(mapContainer, mapOption);

          //   // ================================================ 지도 크기 확대 축소 컨트롤러 바 START ================================================
          //   // 지도 타입 변경 컨트롤을 생성한다
          //   var mapTypeControl = new kakao.maps.MapTypeControl();

          //   // 지도의 상단 우측에 지도 타입 변경 컨트롤을 추가한다
          //   map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

          //   // 지도에 확대 축소 컨트롤을 생성한다
          //   var zoomControl = new kakao.maps.ZoomControl();

          //   // 지도의 우측에 확대 축소 컨트롤을 추가한다
          //   map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
          var imageSrc = "./assets/img/carpingMap/MARKER.png", // 마커이미지의 주소입니다
            imageSize = new kakao.maps.Size(90, 90), // 마커이미지의 크기입니다
            imageOption = { offset: new kakao.maps.Point(50, 90) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

          // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
          var markerImage = new kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imageOption
          );

          //   if (response.data[0].S_CATEGORY == "노지") {
          //     (imageSrc = "./assets/img/logo/001.png"), // 마커이미지의 주소입니다
          //       (imageSize = new kakao.maps.Size(90, 90)), // 마커이미지의 크기입니다
          //       (imageOption = { offset: new kakao.maps.Point(50, 90) }); // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
          //   } else {
          //     (imageSrc = "./assets/img/logo/002.png"), // 마커이미지의 주소입니다
          //       (imageSize = new kakao.maps.Size(90, 90)), // 마커이미지의 크기입니다
          //       (imageOption = { offset: new kakao.maps.Point(50, 90) }); // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

          //         // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
          markerImage = new kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imageOption
          );

          // 지도에 마커를 생성하고 표시한다
          var marker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(
              response.data[0].S_LAT,
              response.data[0].S_LONG
            ), // 마커의 좌표	(0 , 1  -->  위도 경도 컬럼 순서)
            image: markerImage,
            map: map, // 마커를 표시할 지도 객체
            yAnchor: 1,
          });

          //     // 마커가 지도 위에 표시되도록 설정합니다
          marker.setMap(map);

          //   이제 모달작업 여긴 우선 해쉬태그 넣을 지 고민
          //   document.querySelectorAll(".facilities_list")[0].style.display="none"
          //   document.querySelectorAll(".facilities_list")[1].style.display="none"

          const close = document.getElementById("close");
          const modal = document.querySelector(".modal_wrapper");
          const dataname = document.querySelector(".dataname");
          const modalInnerImg = document.querySelector(".modal_img.rounded-0");
          const addr = document.querySelector(".modal_address");
          const phone = document.querySelector(".modal_tell");
          //   const hashTag = document.getElementById("hashTag");
          //해쉬태그
          modal.style.display = "flex";
          dataname.innerText = response.data[0].S_NAME;
          modalInnerImg.src = response.data[0].S_IMG;
          addr.innerText = response.data[0].S_ADDR;
          phone.innerText = response.data[0].S_PHONE;
          //   hashTag.innerText = response.data[0].S_AMENITY;

          close.addEventListener("click", function () {
            modal.style.display = "none";
          });

          kakao.maps.event.addListener(marker, "click", () => {
            modal.style.display = "flex";
            dataname.innerText = response.data[0].S_NAME;
            modalInnerImg.src = response.data[0].S_IMG;
            addr.innerText = response.data[0].S_ADDR;
            phone.innerText = response.data[0].S_PHONE;
            // hashTag.innerText = response.data[0].S_AMENITY;
          });

          //모달 끝

          //   carpingList(i, mapLists, map);
        });
    });
  });
  //   searchResults.forEach((oneSelected) => {
  //     oneSelected.addEventListener("click", () => {
  //         console.log(oneSelected)
  //     });
  //   });
};
