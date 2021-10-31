const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const { validateToken } = require("./middlewares/AuthMiddleware");

// "../src/main/webapp/main.html"
const cookieParser = require("cookie-parser");
dotenv.config({ path: "./.env" });

const app = express();

// app.use(
//   session({
//     key: "userId",
//     secret: "subscribe",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       expires: 1000 * 60 * 60 * 24,
//     },
//   })
// );

app.use(
  cors({
    origin: ["http://127.0.0.1:5500", "http://127.0.0.1:5501"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// app.use(express.static("../src/main/webapp/WEB-INF/lib"));
// app.use("../src/main/webapp/Doc", express.static("css"));

// 라우터에 들어있어서 나중에 삭제 가능
const db = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

// =========================================================== 간단한 테스트 공간 START =============================================================
// session test===========================================================
app.get("/hi", async (req, res) => {
  // res.send("hello world");
  req.session.nickName = "pete";
  console.log(req.session);
  console.log(req.session.nickName);
  res.send(req.session.nickName);
  // setTimeout(() => {
  //   res.redirect("http://127.0.0.1:5500/src/main/webapp/main.html");
  // }, 4000);
});

//LoginAuth test in MainPage
app.post("/LoginAuth", validateToken, (req, res) => {
  // console.log("u r logged in!");
  res.send("u r logged in!");
});

app.get("/session", (req, res) => {
  console.log(req.session);
  res.send(req.session.nickName);
});

// session test===========================================================

app.get("/", (req, res) => {
  // sql쿼리문
  const sqlSelect = "SELECT * FROM posts";
  db.query(sqlSelect, (err, result) => {
    if (err) console.log(err);
    console.log(result);
    res.json(result);
  });
});
// ============================================================ 간단한 테스트공간 END ============================================================

// ================================================================ 라우터 START ===================================================================
//1 라우터 장소
const SPOTS_Router = require("./routes/SPOTS");
app.use("/SPOTS", SPOTS_Router);

//2 라우터 C답장
const C_REPLIES_Router = require("./routes/C_REPLIES");
app.use("/C_REPLIES", C_REPLIES_Router);

//3 라우터 커뮤니티
const COMMUNITE_SRouter = require("./routes/COMMUNITES");
app.use("/COMMUNITES", COMMUNITE_SRouter);

//4 라우터 U답장
const U_REPLIES_Router = require("./routes/U_REPLIES");
app.use("/U_REPLIES", U_REPLIES_Router);

//5 라우터 중고거래
const USED_ITEMS_Router = require("./routes/USED_ITEMS");
app.use("/USED_ITEMS", USED_ITEMS_Router);

//6 라우터 유저정보
const USERS = require("./routes/USERS");
app.use("/USERS", USERS);

// ================================================================= 라우터 END =================================================================

// ================================================================= 리다이렉트할 홈페이지 START =================================================================
app.get("/main", (req, res) => {
  console.log(__dirname);
  res.sendFile(path.join(__dirname, "../src/main/webapp/main.html"));
  //src/main\webapp\main.html
});
// =========================================================  라우터에 복붙할 부분들 START =====================================================

//회원가입
app.post("/join", (req, res) => {
  // const U_ID = "1";
  // const U_PWD = "2";
  // const U_NICKNAME = "req.body.nick;";
  // const U_ADDR = "req.body.addr;";
  // const U_TEL = "req.body.tel;";
  //sql문
  const sqlInsert =
    "INSERT INTO testTable ( movieName, movieReview ) VALUES ('inception',''awesome)";
  db.query(sqlInsert, (err, result) => {
    res.send(result);
    if (err) console.log(err);
    console.log(result);
  });
});

// // 카카오맵
// app.get("/kakaoMap", (req, res) => {
//   // sql쿼리문
//   const sqlSelect = "SELECT * FROM SPOTS ";
//   db.query(sqlSelect, (err, result) => {
//     console.log(result);
//     res.json(result);
//   });
// });

//========================================================= 라우터에 복붙할 부분들 END ===================================================

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
