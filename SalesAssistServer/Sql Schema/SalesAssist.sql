SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL';

DROP SCHEMA IF EXISTS `SalesAssist` ;
CREATE SCHEMA IF NOT EXISTS `SalesAssist` DEFAULT CHARACTER SET latin1 ;
USE `SalesAssist` ;

-- -----------------------------------------------------
-- Table `SalesAssist`.`Emp_curr_loc`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SalesAssist`.`Emp_curr_loc` ;

CREATE  TABLE IF NOT EXISTS `SalesAssist`.`Emp_curr_loc` (
  `idEmp_curr_loc` INT(11) NOT NULL AUTO_INCREMENT ,
  `Employee_ID` VARCHAR(65) NULL DEFAULT NULL ,
  `latitude` FLOAT NULL DEFAULT NULL ,
  `longitude` FLOAT NULL DEFAULT NULL ,
  `Update_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ,
  PRIMARY KEY (`idEmp_curr_loc`) ,
  UNIQUE INDEX `Employee_ID_UNIQUE` (`Employee_ID` ASC) )
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `SalesAssist`.`Emp_loc_history`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SalesAssist`.`Emp_loc_history` ;

CREATE  TABLE IF NOT EXISTS `SalesAssist`.`Emp_loc_history` (
  `idEmp_loc_history` INT(11) NOT NULL AUTO_INCREMENT ,
  `Employee_ID` VARCHAR(65) NULL DEFAULT NULL ,
  `latitude` FLOAT NULL DEFAULT NULL ,
  `longitude` FLOAT NULL DEFAULT NULL ,
  `time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ,
  PRIMARY KEY (`idEmp_loc_history`) )
ENGINE = InnoDB
AUTO_INCREMENT = 19
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `SalesAssist`.`User_data`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SalesAssist`.`User_data` ;

CREATE  TABLE IF NOT EXISTS `SalesAssist`.`User_data` (
  `idUser_data` INT(11) NOT NULL AUTO_INCREMENT ,
  `Employee_Id` VARCHAR(65) NOT NULL ,
  `password` VARCHAR(65) NOT NULL ,
  `First_Name` VARCHAR(65) NOT NULL ,
  `Last_Name` VARCHAR(65) NULL DEFAULT NULL ,
  `E_mail` VARCHAR(65) NULL DEFAULT NULL ,
  `Phone_number` VARCHAR(65) NULL DEFAULT NULL ,
  `update_time` TIMESTAMP NULL DEFAULT NULL ,
  PRIMARY KEY (`idUser_data`, `Employee_Id`) ,
  UNIQUE INDEX `username_UNIQUE` (`Employee_Id` ASC) )
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = latin1;



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
