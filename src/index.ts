import { TodoItem } from './todoItem';
import { TodoCollection } from './todoCollection';
import * as inquirer from 'inquirer';

let todos: TodoItem[] = [
  new TodoItem(1, "Finish Gatsby Blog"), new TodoItem(2, "Get Job with Gatsby"),
  new TodoItem(3, "Finish Portfolio Site"), new TodoItem(4, "Get a friend or family member to try Gatsby for their application", true)
];

let collection: TodoCollection = new TodoCollection("Jonathan", todos);

function displayTodoList(): void {
  console.log(`${collection.userName}'s Todo List` + `(${collection.getItemCounts().incomplete } items to do)`);
  collection.getTodoItems(true).forEach(item => item.printDetails());
}

enum Commands {
  Quit = "Quit"
}

function promptUser(): void {
  console.clear();
  displayTodoList();
  inquirer.prompt({
    type: "list",
    name: "command",
    message: "Choose option",
    choices: Object.values(Commands)
  }).then(answers => {
    if (answers["command"] !== Commands.Quit) {
      promptUser();
    }
  })
}

promptUser();

// console.clear();
// console.log(`${collection.userName}'s TodoList` + `(${collection.getItemCounts().incomplete } items to do)`);
// // console.log("Jonathan's Todo List");
// collection.getTodoItems(true).forEach(item => item.printDetails());
// // collection.addTodo(todoItem);