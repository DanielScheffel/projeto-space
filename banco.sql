CREATE SCHEMA IF NOT EXISTS `dbprojetofinal` DEFAULT CHARACTER SET utf8 ;
USE `dbprojetofinal` ;

CREATE TABLE IF NOT EXISTS `dbprojetofinal`.`Usuario` (
  `idUsuario` INT NOT NULL,
  `nome` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `senha` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idUsuario`))
ENGINE = InnoDB;

insert into adminstrador(idUsuario, nome, email, senha) values (
	1,
    'Daniel',
    'daniel-scheffel@gmail.com',
    '9a909518ca4ab1d7ef37cdff516e680549143efb'
);


CREATE TABLE IF NOT EXISTS `dbprojetofinal`.`adminstrador` (
  `idadminstrador` INT NOT NULL,
  `nome` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `senha` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idadminstrador`))
ENGINE = InnoDB;

insert into adminstrador(idAdminstrador, nome, email, senha) values (
	1,
    'Luciano',
    'luciano-neto@gmail.com',
    '7fc84ca82177a8b84c905ca136490f1a9461b1b6'
);