const express=require("express");
const cors =require("cors");

const app=express();

app.set("port",process.env.PORT||4040);

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());

require("./config/Conexion");

app.use(require("./routes/rutasCategorias"));
app.use(require("./routes/rutasPersonal"));
app.use(require("./routes/rutasTicket"));

app.listen(app.get("port"),(e)=>{
    if(e){
        console.log("Error al conectar: ",e);
    }else{
        console.log("Escuchando al puerto ",app.get("port"));
    }
});