import { carpingList } from './carpingList.js';

const filter = () => {
	var mapLists;
	const list = document.getElementsByClassName('list')[0];
	//   console.log(list.querySelectorAll("li")[16]);
	const cityList = list.querySelectorAll('li');
	console.log(cityList[0]);

	for (var i = 0; i < cityList.length; i++) {
		(function(cityList) {
			cityList.addEventListener('click', () => {
				console.log(cityList.innerText);
				axios
					.post('http://localhost:3001/SPOTS/kakaoMap/local', {
						local: cityList.innerText
					})
					.then((response) => {
						// console.log(response.data[0].S_LAT);
						mapLists = response.data;

						var mapContainer = document.getElementById('map'), // 지도를 표시할 div
							mapOption = {
								center: new kakao.maps.LatLng(response.data[0].S_LAT, response.data[0].S_LONG), // 지도의 중심좌표
								level: 10, // 지도의 확대 레벨
								mapTypeId: kakao.maps.MapTypeId.ROADMAP // 지도종류
							};

						// 지도를 생성한다
						var map = new kakao.maps.Map(mapContainer, mapOption);

						// ================================================ 지도 크기 확대 축소 컨트롤러 바 START ================================================
						// 지도 타입 변경 컨트롤을 생성한다
						var mapTypeControl = new kakao.maps.MapTypeControl();

						// 지도의 상단 우측에 지도 타입 변경 컨트롤을 추가한다
						map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

						// 지도에 확대 축소 컨트롤을 생성한다
						var zoomControl = new kakao.maps.ZoomControl();

						// 지도의 우측에 확대 축소 컨트롤을 추가한다
						map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

						var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
						// ================================================ 지도 크기 확대 축소 컨트롤러 바 END ================================================

						// 마커 클러스터러를 생성합니다
						var clusterer = new kakao.maps.MarkerClusterer({
							map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
							averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
							minLevel: 10 // 클러스터 할 최소 지도 레벨
						});

						var imageSrc = './assets/img/carpingMap/MARKER.png', // 마커이미지의 주소입니다
							imageSize = new kakao.maps.Size(90, 90), // 마커이미지의 크기입니다
							imageOption = { offset: new kakao.maps.Point(50, 90) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

						// 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
						var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
						// ============================================== 맵이랑 db랑 연결 START ==============================================

						var markers = [];
						const mapListwrap = document.getElementsByClassName('map-listwrap')[0];
						while (mapListwrap.hasChildNodes()) {
							mapListwrap.removeChild(mapListwrap.firstChild);
						}

						for (var i = 0; i < mapLists.length - 1; i++) {
							// 지도에 마커를 생성하고 표시한다
							var marker = new kakao.maps.Marker({
								position: new kakao.maps.LatLng(mapLists[i].S_LAT, mapLists[i].S_LONG), // 마커의 좌표	(0 , 1  -->  위도 경도 컬럼 순서)
								image: markerImage,
								map: map, // 마커를 표시할 지도 객체
								yAnchor: 1
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
									'</span>' +
									'</a>' +
									'<div class="desc">' +
									'<img class="modalInfoImg" src="' +
									mapLists[i].S_IMG +
									'"alt="" >' + // 이미지 컬럼 인덱스
									'<span class="address">' +
									mapLists[i].S_ADDR +
									'</span>' +
									'</div>' // 주소 컬럼 인덱스
							});

							markers.push(marker);

							kakao.maps.event.addListener(
								marker,
								'mouseover',
								makeOverListener(map, marker, infowindow)
							);

							kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
							// 마커를 클릭했을 때 커스텀 오버레이를 표시합니다

							// 모달창 기능 js START ===================================================

							const close = document.getElementById('close');
							const modal = document.querySelector('.modal_wrapper');
							const dataname = document.querySelector('.dataname');
							const modalInnerImg = document.querySelector('.modal_img.rounded-0');
							const addr = document.querySelector('.modal_address');
							const phone = document.querySelector('.modal_tell');
							const facilLists = document.querySelectorAll('.facilities_list');

							//test
							const mnt = document.querySelector('.f_name.place.mountain');

							// console.log(modalInnerImg);
							(function(marker, text) {
								kakao.maps.event.addListener(marker, 'click', () => {
									modal.style.display = 'flex';
									dataname.innerText = text.S_NAME;
									modalInnerImg.src = text.S_IMG;
									addr.innerText = text.S_ADDR;
									phone.innerText = text.S_PHONE;

									// var stringVal = text.S_AMENITY,
									//   substring = "산";

									// console.log(text);
								});
							})(marker, mapLists[i]);

							close.addEventListener('click', function() {
								modal.style.display = 'none';
							});

							carpingList(i, mapLists);
						}

						//for문 끝
						// 클러스터러에 마커들을 추가합니다
						clusterer.addMarkers(markers);
						// 인포윈도우를 표시하는 클로저를 만드는 함수입니다 //REQUIRED
						function makeOverListener(map, marker, infowindow) {
							return function() {
								infowindow.open(map, marker);
							};
						}

						// 인포윈도우를 닫는 클로저를 만드는 함수입니다 //REQUIRED
						function makeOutListener(infowindow) {
							return function() {
								infowindow.close();
							};
						}
					});
			});
		})(cityList[i]);
	}
};

filter();
