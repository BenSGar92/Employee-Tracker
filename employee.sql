DROP DATABASE IF EXISTS employeeDB;

CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  department VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary INT NULL,
  title_id INT NULL,
  PRIMARY KEY (id)
  
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NULL,
  department_id INT NULL,
  -- FOREIGN KEY(role_id) REFERENCES role(id), 
  PRIMARY KEY (id)
);

-- Here I am creating the different departments within the department table
INSERT INTO department (department)
VALUES ("Sales");
INSERT INTO department (department)
VALUES ("Engineering");
INSERT INTO department (department)
VALUES ("Finance");
INSERT INTO department (department)
VALUES ("Legal");

-- Here I am creating the different roles salaries and their associated department id
INSERT INTO role (title, salary, title_id)
VALUES ("Sales Lead", 120000, 1);
INSERT INTO role (title, salary, title_id)
VALUES ("Sales Associate", 95000, 2);
INSERT INTO role (title, salary, title_id)
VALUES ("Lead Engineer", 150000, 3);
INSERT INTO role (title, salary, title_id)
VALUES ("Software Engineer", 120000, 4);
INSERT INTO role (title, salary, title_id)
VALUES ("Accountant", 125000, 5);
INSERT INTO role (title, salary, title_id)
VALUES ("Legal Team Lead", 200000, 6);
INSERT INTO role (title, salary, title_id)
VALUES ("Lawyer", 125000, 7);

-- Here I am creating the different employees names role_id
INSERT INTO employee (first_name, last_name, role_id, department_id)
VALUES ("Ben", "Benson", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, department_id)
VALUES ("John", "Johnson", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, department_id)
VALUES ("Mike", "Michaels", 3, 2);
INSERT INTO employee (first_name, last_name, role_id, department_id)
VALUES ("Lars", "Larson", 4, 2);
INSERT INTO employee (first_name, last_name, role_id, department_id)
VALUES ("Jackie", "Jackson", 5, 3);
INSERT INTO employee (first_name, last_name, role_id, department_id)
VALUES ("Bill", "Williams", 6, 4);
INSERT INTO employee (first_name, last_name, role_id, department_id)
VALUES ("Sam", "Samson", 7, 4);
INSERT INTO employee (first_name, last_name, role_id, department_id)
VALUES ("Timo", "Werner", 4, 2);
