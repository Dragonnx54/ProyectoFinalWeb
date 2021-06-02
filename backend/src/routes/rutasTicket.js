const express=require("express");

const routes=express.Router();

const tickets=require("../controller/controllerTicket");

routes.get("/tickets/",tickets.listar);

routes.get("/tickets/:id",tickets.getTicket);

routes.post("/tickets/",tickets.addTicket);

routes.put("/tickets/:id",tickets.editTicket);

routes.delete("/tickets/:id",tickets.deleteTicket);

module.exports=routes;