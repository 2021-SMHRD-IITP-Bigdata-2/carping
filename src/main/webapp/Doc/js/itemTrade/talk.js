const chatNick = document.querySelectorAll(".joinChatContainer input")[0];
const chatRoomName = document.querySelectorAll(".joinChatContainer input")[1];

// var id = "";
// var nick = "";
console.log(chatNick);

// const getInfo = () => {
//   axios
//     .post("http://localhost:3001/USED_ITEMS/ChatInit", {
//       accessToken: sessionStorage.getItem("accessToken"),
//     })
//     .then((response) => {
//       nick = response.data.username;
//       id = response.data.id;
//       // 판매자아이디 + 게시글번호 + 구매자아이디 => 방번호
//       // 별명 =>username
//     })
//     .then(() => {
//       const chatNick = document.querySelectorAll(".joinChatContainer input")[0];
//       const chatRoomName = document.querySelectorAll(
//         ".joinChatContainer input"
//       )[1];
//       console.log(chatNick);
//       //   chatNick.value = nick;
//       //   chatRoomName.value = 123;
//     });
// };

// window.onload = getInfo();
