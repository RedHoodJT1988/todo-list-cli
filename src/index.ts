import { TodoItem } from './todoItem';
import { TodoCollection } from './todoCollection';
import * as inquirer from 'inquirer';

let todos: TodoItem[] = [
  new TodoItem(1, "Finish Gatsby Blog"), new TodoItem(2, "Get Job with Gatsby"),
  new TodoItem(3, "Finish Portfolio Site"), new TodoItem(4, "Get a friend or family member to try Gatsby for their application", true)
];

let collection: TodoCollection = new TodoCollection("Jonathan", todos);
let showCompleted = true;

function displayTodoList(): void {
  console.log(`${collection.userName}'s Todo List` + `(${collection.getItemCounts().incomplete } items to do)`);
  collection.getTodoItems(showCompleted).forEach(item => item.printDetails());
}

enum Commands {
  Add = "Add New Task",
  Toggle = "Show/Hide Completed",
  Quit = "Quit"
}

function promptAdd(): void {
  console.clear();
  inquirer.prompt({ type: "input", name: "add", message: "Enter task:"})
    .then(answers => {if (answers["add"] !== "") {
      collection.addTodo(answers["add"]);
    }
    promptUser();
  }) 
}

function promptUser(): void {
  console.clear();
  displayTodoList();
  inquirer.prompt({
    type: "list",
    name: "command",
    message: "Choose option",
    choices: Object.values(Commands),
  }).then(answers => {
    switch (answers["command"]) {
      case Commands.Toggle:
        showCompleted = !showCompleted;
        promptUser();
        break;
      case Commands.Add:
        promptAdd();
        break;
    }
  })
}

promptUser();

// console.clear();
// console.log(`${collection.userName}'s TodoList` + `(${collection.getItemCounts().incomplete } items to do)`);
// // console.log("Jonathan's Todo List");
// collection.getTodoItems(true).forEach(item => item.printDetails());
// // collection.addTodo(todoItem);