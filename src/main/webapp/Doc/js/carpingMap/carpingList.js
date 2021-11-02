// 모듈화 성공
export const carpingList = (i, mapLists, map) => {
  const close = document.getElementById("close");
  const modal = document.querySelector(".modal_wrapper");
  const dataname = document.querySelector(".dataname");
  const modalInnerImg = document.querySelector(".modal_img.rounded-0");
  const addr4Modal = document.querySelector(".modal_address");
  const phone = document.querySelector(".modal_tell");

  const row = document.createElement("div");
  row.className = "row maplist";
  const mapListWrap = document.getElementsByClassName("map-listwrap");
  var addr = mapLists[i].S_ADDR;
  var addrDetail = addr.split(" ");
  // console.log(addrDetail[0]);

  //  여기는 거리 km
  row.innerHTML =
    '<div class="row" >' +
    "<!-- 1번 사진 -->" +
    '<div class="leftmap-photo">' +
    '<div class="map-photo">' +
    "<a " +
    'href="#" ' +
    'title="광주시민의숲 야영장 페이지 이동 링크" ' +
    ">" +
    "<img " +
    "src=" +
    mapLists[i].S_IMG + // 이미지주소넣기
    ' alt="광주시민의숲 야영장 작은 사진" ' +
    'width="160" ' +
    'height="90" ' +
    'class="tm" ' +
    "/>" +
    "</a>" +
    "</div>" +
    "</div>" +
    '<div class="contright">' +
    "<!-- 2번 작은글씨 -->" +
    '<div class="subject">' +
    "<a " +
    'onclick="maplink(1784 , 35.23301873461016, 126.86633658774820);return false" ' +
    'title=""' +
    ">" +
    mapLists[i].S_NAME + //이름넣기
    '<span class="comment"' +
    '><i class="fa fa-comment-o" aria-hidden="true"></i>' +
    '<span class="commentcount"> </span' +
    "></span>" +
    "</a>" +
    "</div>" +
    "<!-- 3번 거리/도시/구/동/예약/주소/번호 -->" +
    '<div class="cont">' +
    "<a " +
    'href="#" ' +
    'target="_blank" ' +
    'onclick="web_link_count(1784,booking)" ' +
    'class="map-button" ' +
    ">" +
    "예약" +
    "</a>" +
    '<p class="location">' +
    '<span class="map-distance">' +
    getDistanceFromLatLonInKm(mapLists[i].S_LAT, mapLists[i].S_LONG) +
    "Km" +
    "</span>" +
    '<i class="fa fa-angle-right" aria-hidden="true"></i>' +
    "<a href='#'>" +
    addrDetail[0] +
    "</a>" +
    '<i class="fa fa-angle-right" aria-hidden="true"></i>' +
    '<a href="#">' +
    addrDetail[1] +
    "</a>" + // 문자열 넣기 addrDetail[1]
    '<i class="fa fa-angle-right" aria-hidden="true"></i>' +
    '<span class="map-distance">' +
    addrDetail[2] +
    " " +
    "</span>" + // 문자열 넣기 addrDetail[2]
    "</p>" +
    "<ul>" +
    '<li class="address">' +
    mapLists[i].S_ADDR +
    " | " +
    mapLists[i].S_PHONE +
    "<!--(광주 북구 월출동 968)-->" +
    "</li>" +
    "</ul>" +
    "</div>" +
    "</div>" +
    "<!--contright-->" +
    '<div class="clear"></div>' +
    "</div>";
  //   var oneOfRows = document.querySelectorAll(".row.maplist")[i];
  //   console.log(row);
  row.addEventListener("click", () => {
    console.log(mapLists[i].S_NAME);
    modal.style.display = "flex";
    dataname.innerText = mapLists[i].S_NAME;
    modalInnerImg.src = mapLists[i].S_IMG;
    addr4Modal.innerText = mapLists[i].S_ADDR;
    phone.innerText = mapLists[i].S_PHONE;

    map.setCenter(new kakao.maps.LatLng(mapLists[i].S_LAT, mapLists[i].S_LONG));
    map.setLevel(3);
  });

  close.addEventListener("click", function () {
    modal.style.display = "none";
  });

  mapListWrap[0].appendChild(row);
};

//거리구하는 함수
function getDistanceFromLatLonInKm(lat2, long2) {
  var lat1 = 35.1136476;
  var lng1 = 126.8815276;
  var lat2 = lat2;
  var lng2 = long2;

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  var r = 6371; //지구의 반지름(km)
  var dLat = deg2rad(lat2 - lat1);
  var dLon = deg2rad(lng2 - lng1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = r * c; // Distance in km
  // console.log(Math.round(d));
  return Math.round(d);
}
