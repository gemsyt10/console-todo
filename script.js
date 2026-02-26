import readline from "readline";
import fs from "fs";

const todoListArray = [];

const todoInput = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function todoInputEnabled() {
    todoInput.question("Todo console>>_ ", (answ) => {

        if (answ.startsWith("todo")) {

            if (answ === "todo help") {
                console.log(`
TODO COMMANDS:
todo help - список команд
todo add {text} - створити нове завдання
todo remove {id} - видалити задачу по ID
todo list - переглянути всі задачі
todo search {text} - знайти задачу по тексту
                `);

            } else if (answ.startsWith("todo add ")) {

                const todoTextCreating = answ.slice(9).trim();

                if (!todoTextCreating) {
                    console.log("Помилка: введіть текст задачі");
                } else {

                    const todoEl = {
                        id: todoListArray.length + 1,
                        todoText: todoTextCreating,
                        dateCreateTodo: new Date().toString()
                    };

                    todoListArray.push(todoEl);

                    console.log(`Ви додали нову задачу: "${todoEl.todoText}"`);
                }

            } else if (answ === "todo list") {

                if (todoListArray.length === 0) {
                    console.log(`Список задач пустий. Використайте "todo help"`);
                } else {
                    todoListArray.forEach(el => {
                        console.log(`${el.todoText}, ID: ${el.id}`);
                    });
                }

            } else if (answ.startsWith("todo search ")) {

                const searchText = answ.slice(12).trim();
                let found = false;

                todoListArray.forEach(el => {
                    if (el.todoText.includes(searchText)) {
                        console.log(`${el.todoText}, ID: ${el.id}`);
                        found = true;
                    }
                });

                if (!found) {
                    console.log("Нічого не знайдено");
                }

            } else if (answ.startsWith("todo remove ")) {

                const id = Number(answ.slice(12));

                const index = todoListArray.findIndex(el => el.id === id);

                if (index !== -1) {
                    todoListArray.splice(index, 1);
                    console.log("Успіх! Задачу видалено");
                } else {
                    console.log("Помилка: задачу не знайдено");
                }

            } else {
                console.log(`Невідома команда. Використайте "todo help"`);
            }

        } else {
            console.log(`Команда повинна починатись з "todo"`);
        }

        todoInputEnabled();
    });
}

todoInputEnabled();
