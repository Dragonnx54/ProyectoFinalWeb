const connection=require("../config/Conexion");

function listar(req,res){
    let sql="Select * from personal";
    connection.query(sql,(e,data)=>{
        if(e){
            res.json(e);
        }else{
            res.json(data);
        }
    });
}
function getPersonal(req,res){
    let {id}=req.params;
    let sql="Select * from personal where id= ?";
    connection.query(sql,[id],(e,data)=>{
        if(e){
            res.json(e);
        }else{
            res.json(data[0]);
        }
    });
}
function addPersonal(req,res){
    const personal=req.body;
    const valido =validaPersonal(personal);
    if(valido.error){
        return res.status(400).send({error:true,mensaje:valido.mensaje});
    }
    
    let sql="INSERT INTO personal set ?"
    connection.query(sql,[personal],(e,data)=>{
        if(e){
            res.json(e);
        }else{
            res.json({data,mensaje:"Personal agregado con exito"});
        }
    })
}
function editPersonal(req,res){
    const personal=req.body;
    const valido =validaPersonal(personal);
    if(valido.error){
        return res.status(400).send({error:true,mensaje:valido.mensaje});
    }
    
    const {id}=req.params;
    let sql="UPDATE personal set ? where id=?"
    connection.query(sql,[personal,id],(e,data)=>{
        if(e){
            res.json(e);
        }else{
            if(data.changedRows===0&&data.affectedRows===0){
                mensaje="Personal no encontrado"
            }else
                if(data.changedRows===0){
                    mensaje="Proporcionaste los mismos datos";
                }else{
                    mensaje="Personal actualizado exitosamente"
                }
            res.json({error:false,data,mensaje});
        }
    })
}
function deletePersonal(req,res){
    const {id}=req.params;
    let sql="DELETE from personal where id=?"
    connection.query(sql,[id],(e,data)=>{
        if(e){
            res.json(e);
        }else{
            if(data.affectedRows===0){
                mensaje="Personal no encontrado"
            }else{
                mensaje="Personal eliminado exitosamente"
            }
            res.json({error:false,data,mensaje});
        }
    })
}
module.exports={
    listar,
    getPersonal,
    addPersonal,
    editPersonal,
    deletePersonal
}

function validaPersonal(personal){
    if(!personal.Nombre){
        return {error:true,mensaje:"El nombre es obligatorio!"};
    }
    if(personal.Nombre&&personal.Nombre.length>50){
        return {error:true,mensaje:"La longitud maxima de nombre es de 50!!"};
    }
    if(!personal.Apellidos){
        return {error:true,mensaje:"El campo apellidos es obligatorio!"};
    }
    if(personal.Apellidos&&personal.Apellidos.length>50){
        return {error:true,mensaje:"La longitud maxima de los apellidos es de 80!!"};
    }
    if(personal.Telefono && personal.Telefono.length!==10){
        return {error:true,mensaje:"El telefono debe tener 10 digitos!!"};
    }
    if(personal.Direccion && personal.Direccion.length>150){
        return {error:true,mensaje:"La longitud maxima de la direccion es de 150!!"};
    }
    return {error:false,mensaje:"valido"}
}