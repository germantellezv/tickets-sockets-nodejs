var socket = io();

var searchParams = new URLSearchParams(window.location.search);
var lbl = $("small");

if (!searchParams.has("escritorio")) {
  window.location = "index.html";
  throw new Error("El escritorio es necesario");
}
var desktop = searchParams.get("escritorio");

$("h1").text(`Escritorio ${desktop}`);

socket.on("connect", function () {
  console.log("Conectado!");
});

socket.on("disconnect", function () {
  console.log("Desconectado del servidor");
});

$("button").on("click", function () {
  socket.emit("process-ticket", { desktop: desktop }, function (resp) {
    if (resp === "No hay tickets") {
      alert(resp);
      lbl.text(resp);
      return;
    }
    lbl.text(resp.number);
    console.log(resp);
  });
});
