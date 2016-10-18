CREATE TABLE letras( 
    id_letra int AUTO_INCREMENT not null PRIMARY key,
    letra varchar(2) not null
                   );
                    

CREATE TABLE entradas(
    id_entrada int AUTO_INCREMENT not null PRIMARY key,
    id_letra int not null, 
    id_posicion int not null,
    e1 varchar(2) not null,
    e2 varchar(2) not null,
    e3 varchar(2) not null,
    e4 varchar(2) not null,
    e5 varchar(2) not null,
    e6 varchar(2) not null,
    e7 varchar(2) not null,
    e8 varchar(2) not null,
    e9 varchar(2) not null,
	salida varchar(2) not null,
	CONSTRAINT fk_entradas  FOREIGN KEY (id_letra) REFERENCES letras(id_letra));
    
    CREATE TABLE peso(
    id_neurona int not null,
    p1 double not null,
    p2 double not null,
    p3 double not null,
    p4 double not null,
    p5 double not null,
    p6 double not null,
    p7 double not null,
    p8 double not null,
    p9 double not null,
    umbral double not null)