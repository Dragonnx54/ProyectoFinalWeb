const connection=require("../config/Conexion");

function listar(req,res){
    let sql="Select * from categorias";
    connection.query(sql,(e,data)=>{
        if(e){
            res.json(res);
        }else{
            res.json(data);
        }
    })

}
function getCategorias(req,res){
    let {id}=req.params;
    let sql="Select * from categorias where id= ?";
    connection.query(sql,[id],(e,data)=>{
        if(e){
            res.json(e);
        }else{
            res.json(data[0]);
        }
    });
}

function crearCategoria(req,res){
    const categoria=req.body;
    if(!categoria.Nombre){
        return res.status(400).send({error:true,mensaje:"El nombre es obligatorio!"});
    }
    if(categoria.Nombre && categoria.Nombre.length>50){
        return res.status(400).send({error:true,mensaje:"La longitud maxima es de 50 caracteres!!"});
    }
    let sql="INSERT INTO categorias SET ?";
    connection.query(sql,[categoria],(e,data)=>{
        if(e){
            res.json(e);
        }else{
            res.json({data,mensaje:"Categoria creada con exito:D"});
        }
    })
}

function deleteCategoria(req,res){
    const {id}=req.params;
    let sql="DELETE from categorias where id = ?";
    connection.query(sql,[id],(e,data)=>{
        if(e){
            res.json(e);
        }else{
            let mensaje=""
            if(data.affectedRows==0){
                mensaje="Categoria no encontrada";
            }else{
                mensaje="Categoria eliminada";
            }
            res.json({error:false,data,mensaje});
        }
    })
}

module.exports={
    listar,
    getCategorias,
    crearCategoria,
    deleteCategoria
}