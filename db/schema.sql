DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS rolls;
DROP TABLE IF EXISTS employee;

CREATE TABLE department (
    id INTEGER PRIMARY KEY,
    department_name VARCHAR(50) NOT NULL
);

CREATE TABLE rolls (
    id INTEGER PRIMARY KEY,
    job_title VARCHAR(30) NOT NULL,
    salary INTEGER UNSIGNED NOT NULL,
    department_id INTEGER UNSIGNED,
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) 
);

CREATE TABLE employee (
    id INTEGER PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    title_id INTEGER UNSIGNED,
    department_id INTEGER UNSIGNED,
    salary_id INTEGER UNSIGNED,
    manager_id INTEGER UNSIGNED,
    CONSTRAINT fk_rolls FOREIGN KEY (title_id) REFERENCES rolls(id),
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id),
    CONSTRAINT fk_rolls FOREIGN KEY (salary_id) REFERENCES rolls(id),
    CONSTRAINT fk_rolls FOREIGN KEY (title_id) REFERENCES rolls(id)
)

--SELECT * FROM employee
 --  ...> LEFT JOIN department ON employee.department_id = department.id
  -- ...> LEFT JOIN rolls ON employee.salary_id = rolls.id;