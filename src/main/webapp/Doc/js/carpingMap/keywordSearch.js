const search = document.querySelector(".map-search input");

const OnlyNames = [];
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

  OnlyNames.forEach((oneName) => {
    if (oneName.includes(e.target.value.replace(" ", ""))) {
      //   console.log(oneName);
      if (searchResults.length < 20) {
        searchResults.push(oneName);
      }
    }
  });
  console.log(searchResults);
  searchModal(searchResults);
});

axios
  .get("http://localhost:3001/SPOTS/kakaoMap/search")
  .then((response) => {
    console.log("search에서 가져온 데이터");
    console.log(response.data[3]);
    response.data.forEach((placeName) => {
      OnlyNames.push(placeName.S_NAME);
      // console.log(OnlyNames);
    });
    //   response.S_NAME;
  })
  .then(() => {
    // console.log(OnlyNames);
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
};
