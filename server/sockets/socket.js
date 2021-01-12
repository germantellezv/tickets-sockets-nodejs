const { io } = require('../server.js');
const { TicketControl } = require('../classes/ticket-control')

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    console.log('Usuario conectado!');

    client.on('next-ticket', function (data, callback) {
        
        const nextTicket = ticketControl.nextTicket();
        console.log('Siguiente ticket: ', nextTicket);
        callback(nextTicket)

    })

    client.emit('current-status', {
        current: ticketControl.getLastTicket()
    })


    client.on('process-ticket', function (data, callback) {
        if (!data.desktop) {
            return callback({err: true, message: 'El escritorio es requerido'})
        }

        console.log('ok');
        let processTicket = ticketControl.processTicket(data.desktop)
        callback(processTicket)

    })


    /* client.emit('enviarMensaje', {
        usuario: 'Administrador',
        mensaje: 'Bienvenido a esta aplicación'
    });



    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    // Escuchar el cliente
    client.on('enviarMensaje', (data, callback) => {

        console.log(data);

        client.broadcast.emit('enviarMensaje', data);


        // if (mensaje.usuario) {
        //     callback({
        //         resp: 'TODO SALIO BIEN!'
        //     });

        // } else {
        //     callback({
        //         resp: 'TODO SALIO MAL!!!!!!!!'
        //     });
        // }



    }); */

});