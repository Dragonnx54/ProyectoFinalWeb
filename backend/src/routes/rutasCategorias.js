const express=require("express");

const routes=express.Router();

const categorias=require("../controller/controllerCategorias");

routes.get("/categories/",categorias.listar);

routes.get("/categories/:id",categorias.getCategorias);

routes.post("/categories/",categorias.crearCategoria);

routes.delete("/categories/:id",categorias.deleteCategoria);

module.exports=routes;