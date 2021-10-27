// ============================================== 맵이랑 db랑 연결 START ==============================================

var mapLists;
const getMap = () => {
  axios
    .get("http://localhost:4000/kakaoMap")
    .then((response) => {
      console.log(response.data[0]);
      mapLists = response.data;
    })
    .then(() => {
      putSpots();
    })
    .catch((error) => {
      console.log(error);
    });
};

Window.onload = getMap();

mapLists;

// ============================================== 맵이랑 db랑 연결 END ==============================================

// ======================================================== 버튼 없어 START ========================================================
var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

const putSpots = () => {
  // console.log(btn_db);
  var markers = [];
  for (var i = 0; i < mapLists.length - 1; i++) {
    // 지도에 마커를 생성하고 표시한다
    var marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(mapLists[i].S_LAT, mapLists[i].S_LONG), // 마커의 좌표	(0 , 1  -->  위도 경도 컬럼 순서)
      image: markerImage,
      map: map, // 마커를 표시할 지도 객체
      yAnchor: 1,
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);

    // 인포윈도우를 생성합니다
    var infowindow = new kakao.maps.InfoWindow({
      content:
        '<div class="overlay_info">' +
        '<a href="" target="_blank">' +
        '<span class="">' +
        mapLists[i].S_NAME +
        "</span>" +
        "</a>" +
        '<div class="desc">' +
        '<img src="' +
        mapLists[i].S_IMG +
        '"alt="">' + // 이미지 컬럼 인덱스
        '<span class="address">' +
        mapLists[i].S_ADDR +
        "</span>" +
        "</div>", // 주소 컬럼 인덱스
    });

    markers.push(marker);

    kakao.maps.event.addListener(
      marker,
      "mouseover",
      makeOverListener(map, marker, infowindow)
    );
    kakao.maps.event.addListener(
      marker,
      "mouseout",
      makeOutListener(infowindow)
    );
    // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다

    // 모달창 기능 js START ===================================================

    const close = document.getElementById("close");
    const modal = document.querySelector(".modal_wrapper");
    const content = document.querySelector(".modal_content");

    (function (marker, text) {
      kakao.maps.event.addListener(marker, "click", function () {
        modal.style.display = "flex";
        content.innerText = text;

        console.log(text);
      });
    })(marker, mapLists[i].S_NAME);

    close.addEventListener("click", function () {
      modal.style.display = "none";
      content.innerText = "";
    });
  }

  //for문 끝
  // 클러스터러에 마커들을 추가합니다
  clusterer.addMarkers(markers);
  // 인포윈도우를 표시하는 클로저를 만드는 함수입니다 //REQUIRED
  function makeOverListener(map, marker, infowindow) {
    return function () {
      infowindow.open(map, marker);
    };
  }

  // 인포윈도우를 닫는 클로저를 만드는 함수입니다 //REQUIRED
  function makeOutListener(infowindow) {
    return function () {
      infowindow.close();
    };
  }
};
