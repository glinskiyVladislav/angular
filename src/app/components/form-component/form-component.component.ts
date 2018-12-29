import { Component, OnInit, ViewChild } from '@angular/core';
import { Task } from "../../models/Task-model";

// @Импорт сервиса в компоненту
// Передаеться в конструктор public server: JsonPlaceHolderService
import { JsonPlaceHolderService } from "../../services/json-place-holder.service";

// @Импорт флеш сообщения в компоненту
// для работы с сообщениями которые будут выводиться там где есть тег
// Передаеться в конструктор  public flashMessage: FlashMessagesService
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: 'form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.css']
})
export class FormComponentComponent implements OnInit {

  todo: Task = {
    id: null,
    title: '',
    userId: null,
    completed: false,
    text: ''
  };

  // @Инициализация формы в компоненте
  // Название переменной что используется для формы и после название как будет использоваться
  @ViewChild('form') form;

  title: string;
  isEdit: boolean;
  currentTaskId: number;

  constructor(
    public server: JsonPlaceHolderService,
    public flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    // subscribe on edit
    this.server.editingTask.subscribe((task) => {
      if (task.title) {
        this.isEdit = true;
        this.title = task.title;
        this.currentTaskId = task.id;
        this.todo.id = task.id;
      }
    });

    // subscribe on cancel edit
    this.server.cancelEdit.subscribe((task) => {
      if (task.title) {
        this.isEdit = false;
        this.form.reset();
      }
    });

    // Subscribe on delete task
    this.server.deleteTaskEvent.subscribe(task => {
      if(this.currentTaskId != undefined) {
        if(task.id === this.currentTaskId) {
          this.form.reset();
          this.isEdit = false;
        }
      }
    });
  }

  addTask() {
    const  newTask = {
      userId: 1,
      completed: false,
      title: this.title
    };
    // Add task
    if(this.form.valid) {
      this.server.addTask(newTask).subscribe( (data: Task) => {
        this.form.reset();
        // Для оповещения подписщиков
        this.server.emitNewTask(data);
        // Вывод сообщения
        this.flashMessage.show('Success!', {
          cssClass: 'alert-success',
          showCloseBtn: true,
          closeOnClick: true,
          timeout: 5000
        });
      }, error => {
        this.flashMessage.show(error.message, {
          cssClass: 'alert-danger',
          showCloseBtn: true,
          closeOnClick: true,
          timeout: 5000
        })
      })
    }
  }

  editTask() {
    const updateTask = {
      id: this.currentTaskId,
      userId: 1,
      completed: false,
      title: this.title
    };

    this.server.editTask(updateTask).subscribe( (task: Task) => {
      this.server.emitUpdateTask(task);
      this.isEdit = false;
      this.form.reset();
      this.flashMessage.show('Edit Success', {
        cssClass: 'alert-success',
        showCloseBtn: true,
        closeOnClick: true,
        timeout: 5000
      });
    });

  }

  cancelEdit() {
    this.form.reset();
    this.isEdit = false;
    this.server.emitCancelEdit(this.todo);
  }

  addTodo() {
    // const newTask = {
    //   id: String(this.todoList.todos.length + 1),
    //   title: this.todo.title,
    //   text: this.todo.text,
    //   complete: false
    // };
    //
    // this.todoList.todos.unshift(newTask);
    this.form.reset();
  }
}
