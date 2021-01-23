//importing inquirer
const inquirer = require('inquirer');

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
                console.log('Lets see the departments');
                mainMenu();
            }
            if (action === 'View all rolls') {
                console.log('Lets see the rolls');
                mainMenu();
            }
            if (action === 'View all employees') {
                console.log('Lets see the employees');
                mainMenu();
            }
            if (action === 'Add a department') {
                console.log('Lets add a department');
                mainMenu();
            }
            if (action === 'Add a roll') {
                console.log('Lets add a roll');
                mainMenu();
            }
            if (action === 'Add an employee') {
                console.log('Lets add a employee');
                mainMenu();
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

mainMenu();