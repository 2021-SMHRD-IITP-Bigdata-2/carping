const express = require("express");
const router = express.Router();
// const db = require("../index");
const mysql = require("mysql");
// const dotenv = require("dotenv");
// dotenv.config({ path: "../env" });

const db = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

//db에서 뽑아오기
// router.get("/", async (req, res) => {
//   const sqlSelect = "SELECT * FROM posts";
//   await db.query(sqlSelect, (err, result) => {
//     console.log(result);
//     res.json(result);
//   });
// });
// ======================================== 카카오맵 검색을 위한 공간 START ========================================

// 맨 처음에 검색을 위해서 이름만 뽑아올 때
router.get("/kakaoMap/search", (req, res) => {
  const sqlSelect =
    "SELECT S_NAME,S_ADDR,S_AMENITY FROM SPOTS WHERE S_NAME IS NOT NULL";
  db.query(sqlSelect, (err, result) => {
    if (err) console.log(err);
    res.json(result);
  });
});

// ======================================== 카카오맵 검색을 위한 공간 END ========================================

// ======================================== 이제 검색에서 딱 선택한거 이름 뽑아온걸로 셀렉트 한 결과 보내기 START ========================================
router.post("/kakaoMap/chosenOne", (req, res) => {
  const sqlSelect = "SELECT * FROM SPOTS WHERE S_NAME = ?";
  db.query(sqlSelect, req.body.chosenOne, (err, result) => {
    console.log(result);
    res.json(result);
  });
});
// ======================================== 이제 검색에서 딱 선택한거 이름 뽑아온걸로 셀렉트 한 결과 보내기 END ========================================

// ======================================== 카카오맵 처음 전북 전남 START ========================================
router.get("/kakaoMap", (req, res) => {
  // sql쿼리문 전라도만 뽑아오는 곳 if문 사용해야지 ??사용해서

  const sqlSelect =
    "SELECT * FROM SPOTS WHERE S_ADDR LIKE '전북%' OR S_ADDR LIKE '전남%' OR S_ADDR LIKE '광주%' ";
  db.query(sqlSelect, (err, result) => {
    res.json(result);
  });
});
// ======================================== 카카오맵 처음 전북 전남 END ========================================

// ======================================== 카카오맵 이후에 지역선택 START ========================================
router.post("/kakaoMap/local", (req, res) => {
  const local = req.body.local;
  console.log(req.body);
  var sqlSelect = "SELECT * FROM SPOTS WHERE S_ADDR LIKE ? ";

  switch (local) {
    case "전라도":
      sqlSelect =
        "SELECT * FROM SPOTS WHERE S_ADDR LIKE '%전남%' OR S_ADDR LIKE '%전북%' OR S_ADDR LIKE '%광주%'";
      break;
    case "강원도":
      sqlSelect = "SELECT * FROM SPOTS WHERE S_ADDR LIKE '%강원%'";
      break;

    case "경기도":
      sqlSelect =
        "SELECT * FROM SPOTS WHERE S_ADDR LIKE '%경기%' OR S_ADDR LIKE '%서울%' OR S_ADDR LIKE '%인천%' ";
      break;

    case "경상도":
      sqlSelect =
        "SELECT * FROM SPOTS WHERE S_ADDR LIKE '%경상%' OR S_ADDR LIKE '%대구%' OR S_ADDR LIKE '%부산%' OR S_ADDR LIKE '%울산%'  ";
      break;

    case "충청도":
      sqlSelect =
        "SELECT * FROM SPOTS WHERE S_ADDR LIKE '%충청%' OR S_ADDR LIKE '%세종%' OR S_ADDR LIKE '%대전%' ";
      break;

    case "제주도":
      sqlSelect = "SELECT * FROM SPOTS WHERE S_ADDR LIKE '%제주%' ";
      break;
  }
  db.query(sqlSelect, (err, result) => {
    if (err) console.log(err);
    res.json(result);
  });
});
// ======================================== 카카오맵 이후에 지역선택 END ========================================

// ======================================== 카카오맵 SPOT 선택 START ========================================
router.post("/kakaoMap/SPOT", (req, res) => {
  // SELECT * FROM SPOTS WHERE (S_ADDR LIKE '%전남%' OR S_ADDR LIKE '%전북%') AND S_CATEGORY='바다'
  var sqlSelect;

  const local = req.body.local;
  const spot = req.body.spot;

  console.log(`${local} | ${spot}`);

  switch (local) {
    case "전라도":
      sqlSelect =
        "SELECT * FROM SPOTS WHERE (S_ADDR LIKE '%전남%' OR S_ADDR LIKE '%전북%' OR S_ADDR LIKE '%광주%') AND S_CATEGORY= ? ";
      break;
    case "강원도":
      sqlSelect =
        "SELECT * FROM SPOTS WHERE (S_ADDR LIKE '%강원%')  AND S_CATEGORY= ?";
      break;

    case "경기도":
      sqlSelect =
        "SELECT * FROM SPOTS WHERE (S_ADDR LIKE '%경기%' OR S_ADDR LIKE '%서울%' OR S_ADDR LIKE '%인천%') AND S_CATEGORY= ? ";
      break;

    case "경상도":
      sqlSelect =
        "SELECT * FROM SPOTS WHERE (S_ADDR LIKE '%경상%' OR S_ADDR LIKE '%대구%' OR S_ADDR LIKE '%부산%' OR S_ADDR LIKE '%울산%') AND S_CATEGORY= ?  ";
      break;

    case "충청도":
      sqlSelect =
        "SELECT * FROM SPOTS WHERE (S_ADDR LIKE '%충청%' OR S_ADDR LIKE '%세종%' OR S_ADDR LIKE '%대전%') AND S_CATEGORY= ? ";
      break;

    case "제주도":
      sqlSelect =
        "SELECT * FROM SPOTS WHERE (S_ADDR LIKE '%제주%') AND S_CATEGORY= ? ";
      break;
  }

  db.query(sqlSelect, spot, (err, result) => {
    res.json(result);
  });
});
// ======================================== 카카오맵 SPOT 선택 END ========================================

// ======================================== 장소예측한 값 불러오기 START ========================================
router.post("/predSpot", (req, res) => {
  console.log(req.body);
  const predSpot = req.body.predSpot;

  const sqlSelect = "SELECT * FROM SPOTS WHERE S_CATEGORY = ?";
  db.query(sqlSelect, predSpot, (err, result) => {
    if (err) console.log(err);
    // console.log(result.length);
    res.json(result);
  });
});
// ======================================== 장소예측한 값 불러오기 END ========================================

//

// db에 정보 넣기
router.post("/", async (req, res) => {
  const sqlSelect = "SELECT * FROM SPOTS ";
  await db.query(sqlSelect, (err, result) => {
    console.log(err);
    res.json(result);
  });
});
// 수정하기
router.put("/", async (req, res) => {
  const sqlSelect = "SELECT * FROM posts ";
  await db.query(sqlSelect, (err, result) => {
    console.log(result);
    res.json(result);
  });
});

//삭제하기
router.delete("/", async (req, res) => {
  const sqlSelect = "SELECT * FROM posts ";
  await db.query(sqlSelect, (err, result) => {
    console.log(result);
    res.json(result);
  });
});

module.exports = router;
