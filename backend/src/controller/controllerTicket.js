const connection=require("../config/Conexion");

function listar(req,res){
    let sql="Select * from tickets";
    connection.query(sql,(e,data)=>{
        if(e){
            res.json(e);
        }else{
            res.json(data);
        }
    });
}
function getTicket(req,res){
    let {id}=req.params;
    let sql="Select * from tickets where id= ?";
    connection.query(sql,[id],(e,data)=>{
        if(e){
            res.json(e);
        }else{
            res.json(data[0]);
        }
    });
}
function addTicket(req,res){
    const ticket=req.body;
    let valido=validaTicket(ticket);
    if(valido.error){
        return res.status(400).send({error:true,mensaje:valido.mensaje});
    }

    let sql="INSERT INTO tickets set ?"
    connection.query(sql,[ticket],(e,data)=>{
        if(e){
            res.json(e);
        }else{
            res.json({data,mensaje:"Ticket generado con exito"});
        }
    })
}
function editTicket(req,res){
    const {id}=req.params;
    let sql="Select * from tickets where id=?"
    connection.query(sql,[id],(e,data)=>{
        if(e){
            res.json(e);
        }else{
            const ticket=req.body;
            if(data[0].Nombre!==ticket.Nombre){
                return res.status(400).send({error:true,mensaje:"No puedes editar el nombre del ticket!!"});
            }
            if(data[0].Personal!=ticket.Personal){
                return res.status(400).send({error:true,mensaje:"No puedes editar el personal del ticket!!"});
            }
            const valido=validaTicket(ticket);
            if(valido.error){
                return res.status(400).send({error:true,mensaje:valido.mensaje});
            }
            sql="UPDATE tickets set ? where id=?";
            connection.query(sql,[ticket,id],(e,data)=>{
                if(e){
                    res.json(e);
                }else{
                    if(data.changedRows===0&&data.affectedRows===0){
                        mensaje="Ticket no encontrado"
                    }else
                        if(data.changedRows===0){
                            mensaje="Proporcionaste los mismos datos";
                        }else{
                            mensaje="Ticket actualizado exitosamente"
                        }
                        res.json({error:false,data,mensaje});
                }
            })
        }
    })
    
}
function deleteTicket(req,res){
    const {id}=req.params;
    let sql="DELETE from tickets where id=?"
    connection.query(sql,[id],(e,data)=>{
        if(e){
            res.json(e);
        }else{
            if(data.affectedRows===0){
                mensaje="Ticket no encontrado"
            }else{
                mensaje="Ticket eliminado exitosamente"
            }
            res.json({error:false,data,mensaje});
        }
    })
}
module.exports={
    listar,
    getTicket,
    addTicket,
    editTicket,
    deleteTicket
}

function validaTicket(ticket){
    if(!ticket.Nombre){
        return {error:true,mensaje:"El nombre del ticket es obligatorio!"};
    }
    if(ticket.Nombre&&ticket.Nombre.length>50){
        return {error:true,mensaje:"La longitud maxima del nombre es de 50!!"};
    }
    if(ticket.Descripcion&&ticket.Descripcion.length>100){
        return {error:true,mensaje:"La longitud maxima de la descripcion es de 100!!"};
    }
    if(!ticket.Prioridad){
        return {error:true,mensaje:"La prioridad es oblitagoria!!"};
    }
    if(isNaN(ticket.Prioridad) || ticket.Prioridad<=0 ||ticket.Prioridad>3){
        return {error:true,mensaje:"Proporciona una prioridad valida!!"};
    }
    if(!ticket.Personal){
        return {error:true,mensaje:"El personal es obligatorio!!"};
    }
    if(isNaN(ticket.Personal)){
        return {error:true,mensaje:"Proporciona un valor de personal valido!!"};
    }
    if(!ticket.Categoria){
        return {error:true,mensaje:"La categoria es obligatoria!!"};
    }
    if(isNaN(ticket.Categoria)){
        return {error:true,mensaje:"Proporciona un valor de categoria valido!!"};
    }
    if(!ticket.Estatus){
        return {error:true,mensaje:"El estatus es obligatorio!!"};
    }
    if(ticket.Estatus.length!==3){
        return {error:true,mensaje:"El campo estatus es de 3 caracteres!!"};
    }
    return {error:false,mensaje:"valido"};
}