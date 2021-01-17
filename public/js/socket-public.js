var socket = io();

var lblTicket1 = $("#lblTicket1")
var lblTicket2 = $("#lblTicket2")
var lblTicket3 = $("#lblTicket3")
var lblTicket4 = $("#lblTicket4")
var lblDesktop1 = $("#lblDesktop1")
var lblDesktop2 = $("#lblDesktop2")
var lblDesktop3 = $("#lblDesktop3")
var lblDesktop4 = $("#lblDesktop4")

var lblTickets = [lblTicket1,lblTicket2,lblTicket3,lblTicket4]
var lblDesktops = [lblDesktop1,lblDesktop2,lblDesktop3,lblDesktop4]

function updateHTML(last4tickets) {
    for (let i = 0; i < last4tickets.length; i++) {
        lblTickets[i].text('Ticket'+last4tickets[i].number)
        lblDesktops[i].text('Escritorio'+last4tickets[i].desktop)
    }
}

socket.on('current-status', function(data) {
    console.log(data)
    updateHTML(data.last4tickets)
})