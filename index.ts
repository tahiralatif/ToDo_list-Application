#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

let todoList:string[] = [];
let conditions = true;
//  print welcome message
console.log(chalk.magenta(`\t***********************************************\t`))
console.log(chalk.blueBright("\t welcome to `Tahira's`- todo_list application\t"));
console.log(chalk.magenta(`\t***********************************************\t`))



let main = async() =>{
   while(conditions){
    let optionSelect = await inquirer.prompt(
        [
            {
                name: "option",
                type: "list",
                message: "\n choose an option what you want to do \n",
                choices: ["Add Task" , "Delete Task" , "Update Task" , "View Task" , "Exit"]
            }
        ]
    );

    if(optionSelect.option === "Add Task"){
        await addTasks();
    }else if(optionSelect.option === "Delete Task"){
        await deleteTask()
    }else if (optionSelect.option === "Update Task") {
        await updateTask();
    }else if(optionSelect.option === "View Task"){
        await viewTask();
    }else if(optionSelect.option === "Exit"){
        conditions = false;
        console.log(`\n**********Exit************\n`)
    }
    }
}
// Use function to add new task in the list
let addTasks = async() => {
    let newTask = await inquirer.prompt(
        [
            {
                name: "task",
                type: "input",
                message: "\nEnter your new task:\n",
            }
        ]
    );
    todoList.push(newTask.task);
    console.log(`\n "${chalk.blue(newTask.task)}" task added Successfully in your todo list\n`);
}
// Function to view all todo list tasks:
let viewTask = async() => {
    console.log(chalk.yellow("\n Your todo list tasks \n"));
    todoList.forEach((task ,  index) => {
        console.log(`${index + 1}: ${task}`)
    })
}
// Function to delete task:
let deleteTask = async() => {
    await viewTask()
    let taskIndex = await inquirer.prompt(
        [
            {
                name: "index",
                type: "number",
                message: "\nEnter the `index no.` you want to delete\n"
            },
        ]
    );
    let deletedTask = todoList.splice(taskIndex.index - 1, 1);
    console.log(`\n "${chalk.red(deletedTask)}" this task has been deleted Successfuly from your todo list\n`);
}
// function to update a task:
let updateTask = async () => {
    await viewTask();
    let taskIndex = await inquirer.prompt([
      {
        name: "index",
        type: "input",
        message: "\nEnter the `index no` of the task you want to update:\n",
      },
    
   
        {
          name: "task",
          type: "input",
          message: "\nNow Enter the updated task:\n",
        },
    ]);

    todoList[taskIndex.index -1] =taskIndex.task;
    console.log(`\n Task added index no. ${chalk.blue(taskIndex.index -1)} updated Successfully [for updated list check option: "View Task"]\n`)

}

main();
