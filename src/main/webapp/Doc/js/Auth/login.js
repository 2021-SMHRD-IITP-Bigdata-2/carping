const login_btn = document.querySelector(".login_btn");
const id_input = document.querySelector(".login_id input");
const pw_input = document.querySelector(".login_password input");
const auth_message = document.getElementById("auth_message");
login_btn.addEventListener("click", () => {
  axios
    .post("http://localhost:3001/USERS/login", {
      id: id_input.value,
      pw: pw_input.value,
    })
    .then((response) => {
      if (response.data.message) {
        console.log(response.data.message);
        auth_message.innerText = response.data.message;
      } else {
        //로컬세션처리
        window.open("http://127.0.0.1:5501/src/main/webapp/main.html");
      }
    });
});

id_input.addEventListener("keydown", () => {
  auth_message.innerText = "";
});

pw_input.addEventListener("keydown", () => {
  auth_message.innerText = "";
});
