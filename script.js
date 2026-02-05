const members = [
    {first_name:"John", last_name: "Doe", email:"johndoe@example.com", birthdate:"1999-12-31", salary:80000},
    {first_name:"Jane", last_name: "Smith", email:"janesmith@example.com", birthdate:"2015-09-01", salary:75000}
];



//OLD WAY DEMO - CONSTRUCTOR FUNCTION
/*
function Employee(firstName, lastName, email, birthdate, salary) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.birthdate = birthdate;
    this.salary = salary;
  }

  Employee.addEmployee = function(firstName, lastName, email, birthdate, salary) {
    return new Employee(firstName, lastName, email, birthdate, salary);
  };

  Employee.prototype.editEmployee = function(updates) {
    Object.assign(this, updates);
  };

  // Usage example:
  const bill = Employee.addEmployee("Bill", "Doe", "bill@example.com", "1990-01-01", 50000);
  console.log(bill);

  bill.editEmployee({ salary: 7777777, email: "xxxxxxx@example.com" });
  console.log(bill);*/


//ES6 way - CLASSES - Create a new Employee class that adds a new employee and console logs them
// Goals:
// 1. Create a new Employee class with a constructor for Employee giving them a firstname, lastname, email, and birthdate
// 2. Instantiate (i.e. create a new instance) of an Employee with your info and save it to a const with your first name
// 3. After step 2, console log your const and then try to console.log parts of the object
// 4. Then create a const array that creates many "new Employee" objects and says to an array.  Console this object as a whole and parts of it
// 5. Add methods to your class to "getEmployees" which just returns all the fields in the object.
//    Also add methods to addEmployee (this will be static) and a method to editEmployee
//    Test your methods using JS
// 6. Try to get instances of your class object to display in the table.  You can set the innerhtml of the
//    of the table to be empty and then replace it with the looped-through values of your object
class Employee {
  constructor(firstName, lastName, email, birthdate, salary) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.birthdate = birthdate;
    this.salary = salary;
  }

  static addEmployee(firstName, lastName, email, birthdate, salary) {
    return new Employee(firstName, lastName, email, birthdate, salary);
  }

  static getEmployees() {
    return(
      {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      birthdate: this.birthdate,
      salary: this.salary,
      }
  )}

  editEmployee(updates) {
    Object.assign(this, updates);
  }
}

//Try to output 3 instances of your class object into the table
const eric = Employee.addEmployee('Eric', 'Qin', 'eq998@utexas.edu', '2004-09-05', 100000);
console.log(eric);
console.log(eric.firstName);

const empArray = [
  Employee.addEmployee('Eric', 'Qin', 'eq998@utexas.edu', '2004-09-05', 100000),
  Employee.addEmployee(members[0].first_name, members[0].last_name, members[0].email, members[0].birthdate, members[0].salary),
  Employee.addEmployee(members[1].first_name, members[1].last_name, members[1].email, members[1].birthdate, members[1].salary)
];
console.log(empArray);



// PART B Why we can't us synchrnous code
 function getTodosSynchronous() {     
  console.log("1. Starting to fetch todos...");          
  const reply =  fetch('https://jsonplaceholder.typicode.com/todos');     
  console.log("2. Response:", reply);          
  console.log("3. This runs immediately, BEFORE data arrives!");          
  return reply; 
}  

const result = getTodosSynchronous(); 

console.log("4. Result:", result); 

console.log("5. We can't access the actual todo data this way!");




// Callbacks




// Promises




// Async/Await
 
