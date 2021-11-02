const express = require("express");
const router = express.Router();
// const db = require("../index");
const mysql = require("mysql");
const { sendToken } = require("../middlewares/AuthMiddleware");

const db = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

// db에서 뽑아오기
router.get("/", async (req, res) => {
  const sqlSelect = "SELECT * FROM posts ";
  await db.query(sqlSelect, (err, result) => {
    console.log(result);
    res.json(result);
  });
});

// 세션 스토리지에 저장되어있는 토큰 암호화된거 풀기
router.post("/ChatInit", sendToken);

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
