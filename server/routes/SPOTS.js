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
router.get("/", async (req, res) => {
  const sqlSelect = "SELECT * FROM posts";
  await db.query(sqlSelect, (err, result) => {
    console.log(result);
    res.json(result);
  });
});
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
