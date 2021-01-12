const fs = require("fs");

class Ticket {
  constructor(number, desktop) {
    this.number = number;
    this.desktop = desktop;
  }
}

class TicketControl {
  constructor() {
    this.lastOne = 0;
    this.today = new Date().getDate();
    this.tickets = [];
    this.last4Tickets = [];

    let data = require("../data/data.json");

    if (data.today === this.today) {
      this.lastOne = data.lastOne;
      this.tickets = data.tickets;
      this.last4Tickets = data.last4Tickets;
    } else {
      this.restartCounter();
    }
  }

  nextTicket() {
    this.lastOne += 1;
    let ticket = new Ticket(this.lastOne, null);
    this.tickets.push(ticket);
    this.saveFile();

    return `Ticket ${this.lastOne}`;
  }

  restartCounter() {
    this.lastOne = 0;
    this.tickets = [];
    this.last4Tickets = [];
    this.saveFile();
  }

  saveFile() {
    let jsonData = {
      lastOne: this.lastOne,
      today: this.today,
      tickets: this.tickets,
      last4Tickets: this.last4Tickets,
    };

    let jsonDataString = JSON.stringify(jsonData);

    fs.writeFileSync("./server/data/data.json", jsonDataString);
  }

  getLastTicket() {
    return `Ticket ${this.lastOne}`;
  }

  processTicket(desktop) {
    if (this.tickets.length === 0) {
      return "No hay tickets";
    }
    let ticketNumber = this.tickets[0].number;
    this.tickets.shift();

    let processTicket = new Ticket(ticketNumber, desktop);
    this.last4Tickets.unshift(processTicket);
    if (this.last4Tickets.length > 4) {
      this.last4Tickets.splice(-1, 1);
    }
    console.log("Ultimos 4 tickets:", this.last4Tickets);
    this.saveFile();

    return processTicket;
  }
}

module.exports = {
  TicketControl,
};
