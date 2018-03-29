#!/usr/bin/env node

const program = require('commander');
const {prompt} = require('inquirer');

program
    .version('0.0.1')
    .description('TODO app');

    function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}


// Craft questions to present to users
const createQuestions = [
    {
        type: 'input',
        name: 'title',
        message: 'Enter title ...'
    },
    {
        type: 'input',
        name: 'description',
        message: 'Enter description ...'
    },
    {
        default :guid(),
        name: 'id',
        message: 'ID automatik :'
    },


];

const updateQuestions = [
    {
        type: 'input',
        name: 'title',
        message: 'Enter new title ...'
    },
    {
        type: 'input',
        name: 'description',
        message: 'Enter new description ...'
    },
];

const commentQuestions = [
    {
        type: 'input',
        name: 'comment',
        message: 'Enter comment ...'
    },
];

let todos = [];

program
    .command('create')
    .alias('cr')
    .description('Create new TODO item')
    .action(() => {
        prompt(createQuestions).then(answers => {

            // TODO add todo
            //file system variable
            const fs = require('fs');
            //checking if file for saving exists
            if (fs.existsSync('todos.txt')) {
                //then read the file, parse it to JSON and assign this object to todos variable
                fs.readFile('todos.txt', 'utf8', (err, data) => {
                    if (err) console.log(err);
                    todos = JSON.parse(data);
                    //add new item to todos
                    todos.push(answers);

                    //rewriting changed array to the file
                    fs.writeFile('todos.txt', JSON.stringify(todos), function (err) {
                        if (err) {
                            console.log(err);
                        }
                    });
                    //logging id
                    console.log('new todo item id is: ' + todos.length);
                });
            }
            //if file doesnt exists just writing data to a new file
            else {
                todos.push(answers);
                fs.writeFile("todos.txt", JSON.stringify(todos), function (err) {
                    if (err) {
                        console.log(err);
                    }
                    console.log('new todo item id is: ' + todos.length);

                });

            }
        });
    });

    program
        .command('read <id>')
        .alias('upd')
        .description('Update TODO item')
        .action((id) => {
            var a=id;
            const fs = require('fs');
          fs.readFile('todos.txt', 'utf8', (err, data) => {
              if (err) console.log(err);
              todos = JSON.parse(data);
              //add new item to todos
              todos.push(data);
              for(var key in todos) {
              if (+(todos[id])===a) console.log('id ЕСТЬ В БАЗЕ')
              else
                console.log('Нет id');
                console.log(todos[key]);
              };
              console.log("Ответ:"+ todos);
              console.log("Ответ:"+ a);

            });
        });


program
    .command('update <id>')
    .alias('upd')
    .description('Update TODO item')
    .action((id) => {
        prompt(updateQuestions).then(answers => {
            // TODO update todo
        });
    });

program
    .command('remove')
    .alias('rm')
    .description('Remove TODO item by id')
    .action((id) => {

    console.log(guid());
        // TODO remove item
    });

program
    .command('list')
    .alias('ls')
    .description('List all TODOs')
    .action(() => {
var fs = require('fs');
var filePath = 'c:/Users/User/Desktop/ВИТЯ/node/todos.txt';
fs.unlinkSync(filePath);
console.log('Записей ещё мало чтобы удалить');
        // TODO write todos list to the cli
    });

program
    .command('like <id>')
    .alias('lk')
    .description('Like TODO item')
    .action((id) => {
        // TODO mark todo item as liked
    });

program
    .command('comment <id>')
    .alias('cmt')
    .description('Comment TODO item')
    .action((id) => {
        prompt(commentQuestions).then(answers => {
            // TODO comment for todo item
        });
    });

program.parse(process.argv);
