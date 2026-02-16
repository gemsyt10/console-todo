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
                console.log("TODO COMMANDS\n todo help - список команд\n todo add {todos} - створити нове завдання\n todo remove {id} - удалить задачу по індитифікатору\n todo list - переглянути усі задачі\n todo search {text} - знайде завдання за вмістом тексту")
            }else if(answ.includes("add")){
                const todoTextCreating: string = answ.slice(9);
                const todoId: number = todoListArray.length +1;
                const todoDateCreate: string = new Date().toString();
                //структуризація туду.
                const todoEl: ITodos = {
                    id: todoId,
                    todoText: todoTextCreating,
                    dateCreateTodo: todoDateCreate
                }
                //створення туду елементу.
                todoListArray.push(todoEl);
                console.log(`Ви додали нову задачу: "${todoEl.todoText}"`)
                //додаємо туду елемент в масив
           }else if(answ.includes("list")){
               if(todoListArray.length != 0) {
              todoListArray.forEach((el, i) => {
                console.log(`${el.todoText}, ID: ${el.id}`)
              })
            }else {
                console.log(`Вибачте але ваш список задач пустий. Використайте "todo help" `)
            }
           }else if(answ.includes("search")) {
            todoListArray.forEach((el, ind) => {
                if(el.todoText.includes(answ.slice(12))) {
                    console.log(`${el.todoText}, ID: ${el.id}`)
                }
            })
        }else if(answ.includes("remove")){
            todoListArray.forEach((el, i) => {
                if(i+1 == Number(answ.slice(11)) && todoListArray.length != 0) {
                    todoListArray.splice(i, 1)
                    console.log(`Успіх задачу видаленно`)
                }else {
                    console.log("Помилка: задачу не знайдено")
                }
            })
        }
    }else {
        console.error(`Команду не знайдунно використайте "todo help"`)
    }
        todoInputEnabled()
    });
}

todoInputEnabled()
