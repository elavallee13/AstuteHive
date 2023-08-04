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
          break;
        default:
          console.log('Invalid option');
          startApp();
      }
    });
}

function viewEmployees() {
  connection.query('SELECT * FROM employees', (err, res) => {
    if (err) throw err;
    console.table(res);
    startApp();
  });
}

function updateEmployeeRole() {
  // Query for employees
  connection.query('SELECT * FROM employees', (err, employees) => {
    if (err) throw err;

    inquirer
      .prompt([
        {
          name: 'employee',
          type: 'list',
          message: 'Which employee do you want to update?',
          choices: employees.map((employee) => ({ name: employee.name, value: employee.id })),
        },
      ])
      .then((answers) => {
        const employeeId = answers.employee;

        // Queryfor roles
        connection.query('SELECT * FROM roles', (err, roles) => {
          if (err) throw err;

          inquirer
            .prompt([
              {
                name: 'role',
                type: 'list',
                message: 'Which role do you want to assign?',
                choices: roles.map((role) => ({ name: role.title, value: role.id })),
              },
            ])
            .then((answers) => {
              const roleId = answers.role;

              // Update the employee's role in DB
              connection.query(
                'UPDATE employees SET role_id = ? WHERE id = ?',
                [roleId, employeeId],
                (err) => {
                  if (err) throw err;
                  console.log('Employee role updated successfully!');
                  startApp();
                }
              );
            });
        });
      });
  });
}


function viewRoles() {
  connection.query('SELECT * FROM roles', (err, res) => {
    if (err) throw err;
    console.table(res);
    startApp();
  });
}

function addRole() {
  inquirer.prompt([
    {
      name: 'title',
      type: 'input',
      message: 'Enter role title:',
    },
    {
      name: 'salary',
      type: 'input',
      message: 'Enter salary:',
    },
    {
      name: 'department_id',
      type: 'input',
      message: 'Enter department ID:',
    }
  ]).then((answers) => {
    connection.query('INSERT INTO roles SET ?', answers, (err) => {
      if (err) throw err;
      console.log('Role added successfully!');
      startApp();
    });
  });
}

function viewDepartments() {
  connection.query('SELECT * FROM departments', (err, res) => {
    if (err) throw err;
    console.table(res);
    startApp();
  });
}

function addDepartment() {
  inquirer.prompt({
    name: 'name',
    type: 'input',
    message: 'Enter department name:',
  }).then((answer) => {
    connection.query('INSERT INTO departments SET ?', { name: answer.name }, (err) => {
      if (err) throw err;
      console.log('Department added successfully!');
      startApp();
    });
  });
}

startApp();
