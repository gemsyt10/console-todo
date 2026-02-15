import readline from "readline";
import fs from "fs";
//імпорт модуля readline інпут поля.
const todoListArray: ITodos[] = [];
//створюємо хрфнилуще тудушок
const TODOS = [];
//для JSON хранения.
const todoInput = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
//наш інпут
interface ITodos {
    id: number;
    todoText: string;
    dateCreateTodo: string;
}//вигляд нашого туду. Створення інтерфейсу
function todoInputEnabled(): void {
    todoInput.question("Todo console>>_ ", (answ) => {
        if(answ.startsWith("todo")){
            //перевірка для команд на слово "todo"
            if(answ.includes("help")){
                console.log("TODO COMMANDS\n todo help - todo commands\n todo add {todos} - create new todo\n todo remove {id} - delete your todo from id\n todo list - see todo list")
            }else if(answ.includes("add")){
                const todoTextCreating: string = answ.slice(9);
                const todoId: number = todoListArray.length;
                const todoDateCreate: string = new Date().toString();
                //структуризація туду.
                const todoEl: ITodos = {
                    id: todoId,
                    todoText: todoTextCreating,
                    dateCreateTodo: todoDateCreate
                }
                //створення туду елементу.
                todoListArray.push(todoEl);
                //додаємо туду елемент в масив
           }else if(answ.includes("list") || todoListArray.length != 0){
              todoListArray.forEach((el, i) => {
                console.log(`${el.todoText}, ID: ${el.id}`)
              })
           }else {
               console.log("[TODO] todo list not searched use: todo add {todo text}")
           }
        }
        todoInputEnabled()
    });
}

todoInputEnabled()