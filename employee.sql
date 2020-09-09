DROP DATABASE IF EXISTS employeeDB;

CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary INT NULL,
  department_id INT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id)
);

-- Here I am creating the different departments within the department table
INSERT INTO department (name)
VALUES ("Sales");
INSERT INTO department (name)
VALUES ("Engineering");
INSERT INTO department (name)
VALUES ("Finance");
INSERT INTO department (name)
VALUES ("Legal");

-- Here I am creating the different roles salaries and their associated department id
INSERT INTO role (title, salary, department_id)-- how would i capture the value of the department?
VALUES ("Sales Lead", 120000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Associate", 95000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 150000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 120000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 125000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Legal Team Lead", 200000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ("Lawyer", 125000, 4);

-- Here I am creating the different employees names role_id and manager_id
INSERT INTO department (first_name, last_name, role_id, manager_id)
VALUES ("Ben", "Benson", 999, 999);
INSERT INTO department (first_name, last_name, role_id, manager_id)
VALUES ("John", "Johnson", 999, 999);
INSERT INTO department (first_name, last_name, role_id, manager_id)
VALUES ("Mike", "Michaels", 999, 999);
INSERT INTO department (first_name, last_name, role_id, manager_id)
VALUES ("Lars", "Larson", 999, 999);-- not sure what to do with role_id and manager_id yet
