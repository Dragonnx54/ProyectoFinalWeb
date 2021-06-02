const express=require("express");

const routes=express.Router();

const personal=require("../controller/controllerPersonal");

routes.get("/personal/",personal.listar);

routes.get("/personal/:id",personal.getPersonal);

routes.post("/personal/",personal.addPersonal);

routes.put("/personal/:id",personal.editPersonal);

routes.delete("/personal/:id",personal.deletePersonal);

module.exports=routes;