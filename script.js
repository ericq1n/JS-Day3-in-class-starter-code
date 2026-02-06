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
  Employee.addEmployee('Eric', 'Qin', 'eq998@utexas.edu', '2004-09-00', 100000),
  Employee.addEmployee('Test', 'Testd', 'test@test.com', '1999-09-09', 100000),
];
console.log(empArray);

//wipe existing employee table
const empTable = document.querySelector('#employeeTable tbody');
empTable.innerHTML = "";

//add data from the array
for(let emp of empArray) {
  const row = document.createElement("tr");

  row.innerHTML = `
  <td>${emp.firstName}</td>
  <td>${emp.lastName}</td>
  <td>${emp.email}</td>
  <td>${emp.birthdate}</td>`;

  empTable.appendChild(row);
}


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
/*--------------------------------------------------------*/
//Demo 1 - because displayData is wrapped in a callback, it won't run until John has returned
function fetchData(callback) {
  setTimeout(() => {
    const data = { name: 'John', age: 30 };
    callback(data);
  }, 2000);
}

function displayData(data) {
  console.log(`Name: ${data.name}, Age: ${data.age}`);
}

fetchData(displayData);

/*--------------------------------------------------------*/
//Demo 2 - passes callback function as arrow function
function processOrder(orderId, callback) {
  console.log(`Processing order #${orderId}...`);

  setTimeout(() => {
    callback(`Order #${orderId} processed successfully`);
  }, 2000);
}
// Usage
processOrder(101, (confirmation) => {
  console.log('Email sent:', confirmation);
});

/*--------------------------------------------------------*/
//Demo 3 - API - waits to fetch data, converts to JSON, and displays w/ error
function getTodosWithCallback(callback) {     
    console.log("1. Starting to fetch todos...");
    
    fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(data => {
            console.log("2. Response received and parsed!");
            callback(null, data); //Success: error is null, data is 2nd arg 
        })
        .catch(error => {
            console.log("2. Error occurred!");
            callback(error, null); //Error: pass error as first arg, null data
        });
    
    console.log("3. Fetch initiated (but not complete yet)...");
}

// Usage with callback function
function displayData(error, todos) {
    if (error) {
        console.error("4. Error:", error);
        return;
    };

    console.log("4. Result (All):", todos);
    console.log("4. Result (first 3):", todos.slice(0,3));
    console.log("5. Now we CAN access the actual todo data!");
    console.log("6. First todo:", todos[0]);
};

getTodosWithCallback(displayData);

/*--------------------------------------------------------*/
//Demo 4 - Callback Hell
function getUserTodosCallback(userId, callback) {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(response => response.json())
        .then(user => {
            console.log("User:", user.name);
            
            // First level of nesting - Find count of todos
            fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)
                .then(response => response.json())
                .then(todos => {
                    console.log(`${user.name} has ${todos.length} todos`);
                    
                    // Second level of nesting - Go get first to do for this user
                    if (todos.length > 0) {
                        fetch(`https://jsonplaceholder.typicode.com/todos/${todos[0].id}`)
                            .then(response => response.json())
                            .then(todoDetail => {

                                // Third level of nesting - return an object with user, all todos, and firstToDo -- deeply nested!
                                callback(null, {
                                    user: user,
                                    todos: todos,
                                    firstTodo: todoDetail
                                });
                            })
                            .catch(error => callback(error, null));
                    }
                })
                .catch(error => callback(error, null));
        })
        .catch(error => callback(error, null));
}
// Usage
getUserTodosCallback(1, function(error, result) {
    if (error) {
        console.error("Error:", error);
        return;
    }
    console.log("Result:", result);
});


/*--------------------------------------------------------*/
// Promises
//Demo 1 - sends promise object that only returns confirmation when loaded
function processOrder(orderId) {
  console.log(`Processing order #${orderId}...`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Order #${orderId} processed successfully`);
    }, 2000); // Simulate 2-sec processing time
  });
}
// Usage
processOrder(101).then((confirmation) => {
  console.log('Email sent:', confirmation);
});

/*--------------------------------------------------------*/
//Demo 2 - promises with API calls and .then logic
function getTodosWithPromise() {
  console.log("Starting fetch with Promise...");
  
  return fetch("https://jsonplaceholder.typicode.com/todos")
    .then((response) => {
      console.log("Response received");
      return response.json();
    })
    .then((data) => {
      console.log("Data parsed");
      return data;
    })
    .catch((error) => {
      console.error("Error occurred:", error);
      throw error;
    });
} 
// Usage:
//calls fetch method and attatches additional logic
getTodosWithPromise()
  .then((todos) => {
    console.log(`Received ${todos.length} todos`);
    console.log("First todo:", todos[0]);
  })
  .catch((error) => {
    console.error("Failed to get todos:", error);
  });


/*--------------------------------------------------------*/
//Demo 3 - Chaining promises
function getUserTodosPromise(userId) {
  let userData;
  return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then((response) => response.json())
    .then((user) => {
      console.log("User:", user.name);
      userData = user;
      return fetch(
        `https://jsonplaceholder.typicode.com/todos?userId=${userId}`,
      );
    })
    .then((response) => response.json())
    .then((todos) => {
      console.log(`Found ${todos.length} todos`);
      return { user: userData, todos: todos };
    })
    .catch((error) => {
      console.error("Error in chain:", error);
      throw error;
    });
} 
// Usage: //
getUserTodosPromise(1)
  .then((result) => {
    console.log("Final result:", result);
  })
  .catch((error) => {
    console.error("Failed:", error);
  });


/*--------------------------------------------------------*/
// Async/Await
//Demo 1 - Async/Await syntax
 function processOrder(orderId) {
  console.log(`Processing order #${orderId}...`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Order #${orderId} processed successfully`);
    }, 2000); // Simulate 2-sec processing time
  });
}

// Usage
//await completion of promises to save in const for usage
async function handleOrder() {
  const confirmation = await processOrder(101);
  console.log('Email sent:', confirmation);
}
handleOrder();

/*--------------------------------------------------------*/
//Demo 2 - Async/Await with API call
/////async wait basic
async function getTodosAsync() {
  console.log("Starting fetch with async/await...");
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    console.log("Response received");
    const data = await response.json();
    console.log("Data parsed");
    return data;
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
}
// Usage: //
async function runExample() {
  try {
    const todos = await getTodosAsync();
    console.log(`Received ${todos.length} todos`);
    console.log("First todo:", todos[0]);
  } catch (error) {
    console.error("Failed to get todos:", error);
  }
}
runExample();

/*--------------------------------------------------------*/
//Demo 3 - multiple processes in API call
async function getUserTodosAsync(userId) {
  try {
    const userResponse = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`,
    );
    const user = await userResponse.json();
      console.log("User:", user.name);

    const todosResponse = await fetch(
      `https://jsonplaceholder.typicode.com/todos?userId=${userId}`,
    );
    const todos = await todosResponse.json();
      console.log(`Found ${todos.length} todos`);

    return { user: user, todos: todos };
    
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
// Usage: //
async function runUserExample() {
  try {
    const result = await getUserTodosAsync(1);
    console.log("Final result:", result);
  } catch (error) {
    console.error("Failed:", error);
  }
}
runUserExample();

/*--------------------------------------------------------*/
//Challenge 2
async function getTodoById(id) {     
    try {
    const todoResponse = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
    );
    const todo = await todoResponse.json();
      console.log(`Found ${todo.name}`);

    return(todo);
    
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}  
// Test it: 
async function testGetTodo() {     
  try {         
    const todo = await getTodoById(1);       
    console.log("Todo:", todo);     
  } catch (error) {         
    console.error(error);     
  } 
}  
testGetTodo();

