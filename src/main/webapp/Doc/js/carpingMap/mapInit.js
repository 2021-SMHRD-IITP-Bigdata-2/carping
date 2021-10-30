export const mapInit = () => {
	var mapContainer = document.getElementById('map'), // 지도를 표시할 div
		mapOption = {
			center: new kakao.maps.LatLng(35.04755363814959, 126.96797841240902), // 지도의 중심좌표
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
};
