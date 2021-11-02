const login_btn = document.querySelector(".btn.header-btn");
if (sessionStorage.getItem("accessToken")) {
  login_btn.innerText = "LOGOUT";
  login_btn.addEventListener("click", () => {
    switch (login_btn.innerText) {
      case "LOGOUT":
        sessionStorage.removeItem("accessToken");
        login_btn.innerText = "LOGIN";
        break;
      case "LOGIN":
        window.open("http://127.0.0.1:5501/src/main/webapp/login.html");
        break;
    }
  });
} else {
  login_btn.addEventListener("click", () => {
    window.open("http://127.0.0.1:5501/src/main/webapp/login.html");
  });
}
