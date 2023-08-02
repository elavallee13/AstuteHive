const inquirer = require('inquirer');
const connection = require('./DB/db');

function startApp() {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View All Employees',
        'Update Employee Role',
        'View All Roles',
        'Add Role',
        'View All Departments',
        'Add Department',
        'Exit',
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'View All Employees':
          viewEmployees();
          break;
        case 'Update Employee Role':
          updateEmployeeRole();
          break;
        case 'View All Roles':
          viewRoles();
          break;
        case 'Add Role':
          addRole();
          break;
        case 'View All Departments':
          viewDepartments();
          break;
        case 'Add Department':
          addDepartment();
          break;
        case 'Exit':
          connection.end((err) => {
            if (err) throw err;
            console.log('Goodbye!');
            process.exit(0);
          });
        default:
          console.log('Invalid option');
          startApp();
      }
    });
}

function viewEmployees() {
  // Implement the logic to view all employees
  // Use database queries and connection to fetch and display employee data
  // ...
  startApp();
}

function updateEmployeeRole() {
  // Implement the logic to update employee roles
  // Use database queries and connection to update employee roles
  // ...
  startApp();
}

function viewRoles() {
  // Implement the logic to view all roles
  // Use database queries and connection to fetch and display role data
  // ...
  startApp();
}

function addRole() {
  // Implement the logic to add a new role
  // Use database queries and connection to insert a new role
  // ...
  startApp();
}

function viewDepartments() {
  startApp();
}

function addDepartment() {
  startApp();
}

startApp();
