create database tickets;
use tickets;
create table categorias(
	ID INT NOT NULL auto_increment,
    Nombre varchar(50) NOT NULL,
    primary key(ID)
);
create table personal(
	ID INT NOT NULL auto_increment,
    Nombre varchar(50) NOT NULL,
    Apellidos varchar(80) NOT NULL,
    Telefono varchar(10) NULL,
    Direccion varchar(150) NULL,
    primary key(ID)
);
create table tickets(
	ID INT NOT NULL auto_increment,
    Nombre varchar(50) NOT NULL,
    Descripcion varchar(100) NULL,
    Prioridad varchar(1) NOT NULL,
    Personal INT NOT NULL,
    Categoria INT NOT NULL,
    Estatus varchar(3) NOT NULL,
    primary key(ID),
    foreign key(Personal) references personal(ID),
    foreign key(Categoria) references categorias(ID)
);

insert into categorias(Nombre) values
	("Incidencia"),("Consulta"),("Peticion de servicio"),("Queja"),("Prueba");
insert into personal(Nombre,Apellidos,Telefono,Direccion) values
    ("Juan","Perez","1234567890","Direccion1"),
    ("Paulina","Lopez","1234567890","Direccion2"),
    ("Ricardo","Hernandez","1234567890","Direcion3"),
    ("Maria","Reyes","1234567890","Direccion4a");
insert into tickets(Nombre,Descripcion,Prioridad,Personal,Categoria,Estatus) values 
("Ticket1","Problema1",1,3,4,'ABT'),
("Ticket2","No hay conexion a la API",3,1,1,'ABT'),
("Ticket3","Hola",1,2,2,'ABT');