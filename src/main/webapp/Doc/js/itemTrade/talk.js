// const socket = io.connect("https://c569-211-223-50-18.ngrok.io");
axios
  .post("http://localhost:3001/USED_ITEMS/ChatInit", {
    accessToken: sessionStorage.getItem("accessToken"),
  })
  .then((response) => {
    console.log(response.data.username);
    console.log(response.data.id);
  });
