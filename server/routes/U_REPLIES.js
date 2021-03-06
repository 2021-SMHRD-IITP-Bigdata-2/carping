const express = require("express");
const router = express.Router();
// const db = require("../index");
const mysql = require("mysql");

const db = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

//뽑아오기
router.get("/", async (req, res) => {
  const sqlSelect = "SELECT * FROM posts ";
  await db.query(sqlSelect, (err, result) => {
    console.log(result);
    res.json(result);
  });
});
// db에서 정보 넣기
router.post("/", async (req, res) => {
  const sqlSelect = "SELECT * FROM posts ";
  await db.query(sqlSelect, (err, result) => {
    console.log(result);
    res.json(result);
  });
});
// db에 수정하기
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
