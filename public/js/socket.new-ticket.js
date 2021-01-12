var socket = io()
var label = $('#lblNuevoTicket');

socket.on('connect', function () {
  console.log('Conectado!');
})

socket.on('disconnect', function () {
  console.log('Desconectado del servidor');
})

socket.on('current-status', function (data) {
  label.text(data.current)
})

$('button').on('click', function(){
  console.log('click');
  socket.emit('next-ticket', null, function (nextTicket) {
    label.text(nextTicket);
  })
})