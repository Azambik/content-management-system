//importing inquirer
const inquirer = require('inquirer');
//import sqlite3
const sqlite3 = require('sqlite3').verbose();

// Connect to database
const db = new sqlite3.Database('./db/business.db', err => {
    if (err) {
      return console.error(err.message);
    }
  
    console.log('Connected to the election database.');
  });


//prompts user to select action and calls function to handle that action based on selection
const mainMenu = () => {
   inquirer
    .prompt({
        type: 'list',
        message: 'what do you want to do?',
        name: 'action',
        choices: ['View all departments', 'View all rolls', 'View all employees', 'Add a department', 'Add a roll', "Add an employee", "Update an employee", "quit"]
    })
        .then(({action}) =>{
            if (action === 'View all departments') {
                displayDepartments();
            }
            if (action === 'View all rolls') {
               displayRolls();
            }
            if (action === 'View all employees') {
               displayEmployees();
            }
            if (action === 'Add a department') {
                getDepartmentInfo();
            }
            if (action === 'Add a roll') {
                getRollInfo();
            }
            if (action === 'Add an employee') {
                getEmployeeInfo();
            }
            if (action === 'Update an employee') {
                console.log('Lets Update an employee');
                mainMenu();
            } 
            if (action === 'quit') {
                console.log('Good bye!');
                return;
            }
    })
}

const displayDepartments = () => {
    const sql = `SELECT * FROM department`;
    const params = []
    db.all(sql, params, (err, rows) => {
        if(err) {
            res.status(500).json({ error: err.message });
            return;
        }
        console.table(rows);
        mainMenu();
    })
    }

    const displayRolls = () => {
        const sql = `SELECT rolls.job_title, rolls.salary, rolls.department_id AS department
                     FROM rolls
                     LEFT JOIN rolls ON department.id = rolls.department_id`;
        const params = []
        db.all(sql, params, (err, rows) => {
            if(err) {
                res.status(500).json({ error: err.message });
                return;
            }
            console.table(rows);
            mainMenu();
        })
        }

        const displayEmployees = () => {
            const sql = `SELECT employee.first_name, employee.last_name, rolls.job_title, department.department_name, rolls.salary
                         FROM employee
                         LEFT JOIN department ON employee.id = department.id
                         LEFT JOIN rolls ON employee.id = rolls.id;`;
            const params = []
            db.all(sql, params, (err, rows) => {
                if(err) {
                    res.status(500).json({ error: err.message });
                    return;
                }
                console.table(rows);
                mainMenu();
            })
            }
      
        
        const getDepartmentInfo = () => {
            return inquirer.prompt([
                {
                    type: 'input',
                    name: 'departmentName',
                    message: 'What is the new departments name?'
                }
            ]).then(departmentName => {

                const sql = `INSERT INTO department (department_name) VALUES (?)`
            const params = [departmentName.departmentName];
            db.all(sql, params, (err, rows) => {
                if(err) {
                    res.status(500).json({ error: err.message });
                    return;
                }
                console.log('Department was successfully added!')
                displayDepartments();
            })

            })
        }
        const getRollInfo = () => {
            return inquirer.prompt([
                {
                    type: 'input',
                    name: 'rollName',
                    message: 'What is the new roll name?'
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'What is the new roll salary?'
                },
                {
                    type: 'input',
                    name: 'department',
                    message: 'What is the new roll department ID not name?',
                }
            ]).then(rollInfo => {

                const sql = `INSERT INTO rolls (job_title, salary, department_id) VALUES (?, ?, ?)`
                console.log(rollInfo.department);
            const params = [rollInfo.rollName, rollInfo.salary, rollInfo.department];
            db.all(sql, params, (err, rows) => {
                if(err) {
                    res.status(500).json({ error: err.message });
                    return;
                }
                console.log('Roll was successfully added!')
                displayRolls();
            })

            })
        }
        const getEmployeeInfo = () => {
            return inquirer.prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: 'What is the new employee first name?'
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: 'What is the new employee last name name?'
                },
                {
                    type: 'input',
                    name: 'title_id',
                    message: 'What is the title ID for this employee'
                },
                {
                    type: 'input',
                    name: 'manager_id',
                    message: 'Manager ID for this employee?',
                }
            ]).then(employeeInfo => {

                const sql = `INSERT INTO employee (first_name, last_name, title_id, department_id, salary_id, manager_id) VALUES (?, ?, ?, ?, ?, ?)`
            const params = [employeeInfo.first_name, employeeInfo.last_name, employeeInfo.title_id, employeeInfo.title_id, employeeInfo.title_id, employeeInfo.manager_id];
            db.all(sql, params, (err, rows) => {
                if(err) {
                    res.status(500).json({ error: err.message });
                    return;
                }
                console.log('Roll was successfully added!')
                displayEmployees();
            })

            })
        }

mainMenu();