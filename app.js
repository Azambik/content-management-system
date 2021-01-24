//importing inquirer
const inquirer = require('inquirer');
//import sqlite3
const sqlite3 = require('sqlite3').verbose();

// Connect to database
/*const db = new sqlite3.Database('./db/business.db', err => {
    if (err) {
      return console.error(err.message);
    }
  
    console.log('Connected to the election database.');
  });*/


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
                updateEmployee();
                displayEmployees();
            } 
            if (action === 'quit') {
                console.log('Good bye!');
                return;
            }
    })
}

const displayDepartments = () => {
    let db = new sqlite3.Database('./db/business.db');
    const sql = `SELECT * FROM department`;
    const params = []
    db.all(sql, params, (err, rows) => {
        if(err) {
            return console.error(err.message);
        }
        console.table(rows);
        db.close();
        mainMenu();
    })
    }

    const displayRolls = () => {
        let db = new sqlite3.Database('./db/business.db');
        const sql = `SELECT rolls.job_title, rolls.salary, rolls.department_id AS department
                     FROM rolls
                     LEFT JOIN department ON rolls.department_id = department.id`;
        const params = []
        db.all(sql, params, (err, rows) => {
            if(err) {
                return console.error(err.message);
            }
            console.table(rows);
            db.close();
            mainMenu();
        })
        }

        const displayEmployees = () => {
            let db = new sqlite3.Database('./db/business.db');
            const sql = `SELECT employee.first_name, employee.last_name, rolls.job_title, department.department_id, rolls.salary
                         FROM employee
                         LEFT JOIN department ON employee.id = department.id
                         LEFT JOIN rolls ON employee.id = rolls.id`;
            const params = []
            db.all(sql, params, (err, rows) => {
                if(err) {
                    return console.error(err.message);
                }
                console.table(rows);
                db.close();
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
                let db = new sqlite3.Database('./db/business.db');
                const sql = `INSERT INTO department (department_id) VALUES (?)`
            const params = [departmentName.departmentName];
            db.all(sql, params, (err, rows) => {
                if(err) {
                    return console.error(err.message);
                }
                console.log('Department was successfully added!')
                db.close();
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
                let db = new sqlite3.Database('./db/business.db');
                const sql = `INSERT INTO rolls (job_title, salary, department_id) VALUES (?, ?, ?)`
                console.log(rollInfo.department);
            const params = [rollInfo.rollName, rollInfo.salary, rollInfo.department];
            db.all(sql, params, (err, rows) => {
                if(err) {
                    return console.error(err.message);
                }
                console.log('Roll was successfully added!')
                db.close();
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
                    type: 'number',
                    name: 'title_id',
                    message: 'What is the title ID for this employee'
                },
                {
                    type: 'number',
                    name: 'manager_id',
                    message: 'Manager ID for this employee?'
                }
            ]).then(employeeInfo => {
                let db = new sqlite3.Database('./db/business.db');
                const sql = `INSERT INTO employee (first_name, last_name, title_id, department_id, salary_id, manager_id) VALUES (?, ?, ?, ?, ?, ?)`
            const params = [employeeInfo.first_name, employeeInfo.last_name, employeeInfo.title_id, employeeInfo.title_id, employeeInfo.title_id, employeeInfo.manager_id];
            db.all(sql, params, (err, res) => {
                if(err) {
                    return console.error(err.message);
                }
                console.log('Roll was successfully added!')
                db.close();
                displayEmployees();
            })

            })
        }

       const updateEmployee = () => {
            return inquirer.prompt([
                        {
                            type: 'number',
                            name: 'employee_id',
                            message: 'enter ID of employee to be edited?'
                        },
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
                            type: 'number',
                            name: 'title_id',
                            message: 'What is the title ID for this employee'
                        },
                        {
                            type: 'number',
                            name: 'manager_id',
                            message: 'Manager ID for this employee?'
                        }
                    ]).then(employeeUpdate => {
                        let db = new sqlite3.Database('./db/business.db');
                        const sql =` update employee
                                     set first_name = ?
                                     set last_name = ?
                                     set title_id = ?
                                     set manager_id = ?
                                     where id = ?`;
                        const params =[employeeUpdate.first_name,employeeUpdate.last_name, employeeUpdate.title_id, employeeUpdate.manager_id, employeeUpdate.employee_id];
                        db.all(sql, params, (err, res) => {
                            if(err) {
                                return console.error(err.message);
                            }
                            db.close();
                        })
                    })
                }
            


  
mainMenu();

