const express = require("express");
const router = express.Router();
// const db = require("../index");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { sign } = require("jsonwebtoken");

const db = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

//======================================================== db에서 뽑아오기 START ========================================================

// 1. 로그인 START ===================================
router.post("/login", (req, res) => {
  // const id = req.body.id;
  // const pw = req.body.pw;
  // {
  //   "id":"ki1313m",
  //   "pw":"1234"
  // } 이렇게 보냈으니까 받을대도 그렇게 받을 수 있어

  const { id, pw } = req.body;
  console.log(req.body);
  // id랑 pw를 적은 경우
  if (id && pw) {
    const sqlSelect = "SELECT * FROM USERS WHERE U_ID=?";
    db.query(sqlSelect, id, (err, result) => {
      // 아이디가 없으면 빈 array 반환
      if (result.length == 0) {
        res.json({ message: "아이디가 존재하지 않습니다" });
      } else {
        //비밀번호 체크
        bcrypt.compare(pw, result[0].U_PWD).then((response) => {
          if (response) {
            // true false나옴
            const accessToken = sign(
              {
                username: result[0].U_NICKNAME,
                id: result[0].U_ID,
              },
              "importantsecret"
            );
            // console.log(accessToken);
            res.json(accessToken);
            // 리다이렉트
          } else {
            res.json({ message: "비밀번호를 확인해주세요💦" });
          }
        });
      }
    });
  }
});

// 로그인 END ===================================

// ======================================================== db에서 정보 넣기 START ========================================================

//2. 회원가입 START===================================
router.post("/join", (req, res) => {
  const sqlSelect = "SELECT * FROM users WHERE U_ID = ? ";
  db.query(sqlSelect, req.body.id, async (err, result) => {
    if (result.length > 0) {
      res.send({ message: "이미 존재하는 아이디입니다" });
    } else {
      bcrypt.hash(req.body.pw, saltRounds, (err, hash) => {
        if (err) console.log(err);
        const sqlInsert =
          "Insert INTO USERS (U_ID, U_PWD, U_NICKNAME, U_ADDR, U_TEL) VALUE(?, ?, ?, ?, ?) ";
        db.query(
          sqlInsert,
          [req.body.id, hash, req.body.nick, req.body.Rname, req.body.tel],
          (err, result) => {
            if (err) console.log(err);
            console.log(result);
          }
        );
      });

      await res.send({
        message: "회원가입에 성공하셨습니다! q(≧▽≦q)",
        addr: "http://127.0.0.1:5500/src/main/webapp/login.html",
      });
      // 4초 후에 리다이렉트 settimeout해서
      // 로그인으로 리다이렉트
    }
    console.log(result.length);
    res.json(result);
  });
});
//회원가입 END===================================

//======================================================== db에 수정하기 START ========================================================
router.put("/", async (req, res) => {
  const sqlSelect = "SELECT * FROM posts ";
  await db.query(sqlSelect, (err, result) => {
    console.log(result);
    res.json(result);
  });
});

//======================================================== 삭제하기 START ========================================================
router.delete("/", async (req, res) => {
  const sqlSelect = "SELECT * FROM posts ";
  await db.query(sqlSelect, (err, result) => {
    console.log(result);
    res.json(result);
  });
});

module.exports = router;
