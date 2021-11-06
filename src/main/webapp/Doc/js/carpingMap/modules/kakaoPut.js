const kakaoPut = (datas) => {
  var mapContainer = document.getElementById("map"), // 지도를 표시할 div
    mapOption = {
      center: new kakao.maps.LatLng(datas[0].S_LAT, datas[0].S_LONG), // 지도의 중심좌표
      level: 10, // 지도의 확대 레벨
      mapTypeId: kakao.maps.MapTypeId.ROADMAP, // 지도종류
    };
  // 지도를 생성한다
  var map = new kakao.maps.Map(mapContainer, mapOption);

  //   // ================================================ 지도 크기 확대 축소 컨트롤러 바 START ================================================
  //   // 지도 타입 변경 컨트롤을 생성한다
  var mapTypeControl = new kakao.maps.MapTypeControl();

  //   // 지도의 상단 우측에 지도 타입 변경 컨트롤을 추가한다
  map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

  //   // 지도에 확대 축소 컨트롤을 생성한다
  var zoomControl = new kakao.maps.ZoomControl();

  //   // 지도의 우측에 확대 축소 컨트롤을 추가한다
  map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
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
  markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

  // 지도에 마커를 생성하고 표시한다
  var marker = new kakao.maps.Marker({
    position: new kakao.maps.LatLng(datas[0].S_LAT, datas[0].S_LONG), // 마커의 좌표	(0 , 1  -->  위도 경도 컬럼 순서)
    image: markerImage,
    map: map, // 마커를 표시할 지도 객체
    yAnchor: 1,
  });

  //     // 마커가 지도 위에 표시되도록 설정합니다
  marker.setMap(map);

  const close = document.getElementById("close");
  const modal = document.querySelector(".modal_wrapper");
  const dataname = document.querySelector(".dataname");
  const modalInnerImg = document.querySelector(".modal_img.rounded-0");
  const addr = document.querySelector(".modal_address");
  const phone = document.querySelector(".modal_tell");
  //   const hashTag = document.getElementById("hashTag");
  //해쉬태그
  modal.style.display = "flex";
  dataname.innerText = datas[0].S_NAME;
  modalInnerImg.src = datas[0].S_IMG;
  addr.innerText = datas[0].S_ADDR;
  phone.innerText = datas[0].S_PHONE;
  //   hashTag.innerText = datas[0].S_AMENITY;

  close.addEventListener("click", function () {
    modal.style.display = "none";
  });

  kakao.maps.event.addListener(marker, "click", () => {
    modal.style.display = "flex";
    dataname.innerText = datas[0].S_NAME;
    modalInnerImg.src = datas[0].S_IMG;
    addr.innerText = datas[0].S_ADDR;
    phone.innerText = datas[0].S_PHONE;
    // hashTag.innerText = response.data[0].S_AMENITY;
  });
};
module.exports = { kakaoPut };
