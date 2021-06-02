const mysql=require("mysql");
const connection={
    "host":"localhost",
    "port":"3306",
    "user":"root",
    "password":"123",
    "database":"tickets"
}

const myConn=mysql.createConnection(connection);

myConn.connect((e)=>{
    if(e){
        console.log("Error bd: ",e);
    }else{
        console.log("Base de datos conectada");
    }
});

module.exports=myConn;