const choice = [
    {
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: [
            'View All Departments',
            'View All Roles',
            'View All Employees',
            'Add a Department',
            'Add a Role',
            'Add an Employee',
            'Update an Employee Role',
            'End App'
        ]        
    }
];

const addDepartment = [
    {
        type: 'input',
        name: 'department',
        message: "What is your new Department's Name?",
        validate: input => {
            if (input) {
                return true;
            } else {
                console.log("Please enter a Name!");
                return false;
            }
        }
    }
];

const addRole = [
    {
        type: 'input',
        name: 'roleName',
        message: "What is your new Role's Name?",
        validate: input => {
            if (input) {
                return true;
            } else {
                console.log("Please enter a Name!");
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'roleSalary',
        message: "What is your new Role's Salary?",
        validate: input => {
            if (input) {
                return true;
            } else {
                console.log("Please enter a Salary!");
                return false;
            }
        }
    },
    {
        type: 'list',
        name: 'roleDepartment',
        message: "What is your new Role's Department?",
        choices: []
    }
]

const addEmployee = [
    {
        type: 'input',
        name: 'employeeFirstName',
        message: "What is your new Employee's First Name?",
        validate: input => {
            if (input) {
                return true;
            } else {
                console.log("Please enter a Name!");
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'employeeLastName',
        message: "What is your new Employee's Last Name?",
        validate: input => {
            if (input) {
                return true;
            } else {
                console.log("Please enter a Name!");
                return false;
            }
        }
    },
    {
        type: 'list',
        name: 'employeeRole',
        message: "What is your new Employee's Role?",
        choices: []
    },
    {
        type: 'list',
        name: 'employeeManager',
        message: "Who is your new Employee's Manager?",
        choices: []
    },
];

const updateEmployee = [
    {
        type: 'list',
        name: 'employeeId',
        message: "Which Employee are you Updating?",
        choices: []
    },
    {
        type: 'list',
        name: 'employeeRole',
        message: "What is your Employee's New Role?",
        choices: []
    },
];

module.exports = {
    choice,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployee
};