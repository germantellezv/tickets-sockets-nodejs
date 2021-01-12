var socket = io();

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("escritorio")) {
  window.location = "index.html";
  throw new Error("El escritorio es necesario");
}

var desktop = searchParams.get("escritorio");
var lbl = $("small");

console.log(desktop);

$("h1").text(`Escritorio ${desktop}`);

socket.on('connect', function () {
  console.log('Conectado!');
})

socket.on('disconnect', function () {
  console.log('Desconectado del servidor');
})

$('button').on('click', function () {
  socket.emit('process-ticket', { desktop: desktop }, function (resp) {
    console.log(resp);
  });
});
