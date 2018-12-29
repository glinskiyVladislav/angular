/*
 @Команда создания сервиса
 Создаеться командой ng g s название_папки/название сервиса --module=app
 Нужно заимпортить в app module
 */
import { Injectable } from '@angular/core';
import { Task } from "../models/Task-model";
// @Ипорт в сервис HttpClient
// Возможность работы с http запрсами и передать его в конструктор
// в app module должен быть импортирован класс HttpClientModule
import { HttpClient } from "@angular/common/http";

// @Передача данных с помощью наблюдателя BehaviorSubject
// @Импорт BehaviorSubject в сервис
// Для работы с наблюдателем и передачей данных между компонентами нужно импортировать BehaviorSubject
// После чего создать приватную переменную . В нашем сдучае это taskSource
// Для подписки в нашем случае используеться newTask new BehaviorSubject<Task>( {id:0, title: '', userId: 0, completed: false} );
// Для того что б обовестить подписщиков используеться метод emitNewTask() который записывается в метод addTask в form-component
// Для того что бы подписаться нужно в нужной нам компоненте (сейчас todo-list) в методе ngOnInit записать следующее:
//this.server.newTask.subscribe((data: Task) => {
//       if(data['body']) {
//         this.tasks.unshift(data['body']);
//       }
//     });
import { BehaviorSubject } from "rxjs";


@Injectable()
export class JsonPlaceHolderService {

  // @Определение base url
  configUrl = 'https://jsonplaceholder.typicode.com/todos/';

  private taskSource = new BehaviorSubject<Task>( {id:0, title: '', userId: 0, completed: false} );
  //<Task> - означает что ответ будет фозвращать данные в формате Task и передаються значения с пустыми полями
  newTask = this.taskSource.asObservable();

  // @Инициализация наблюдателя в сервисе
  // 200 Это стартовое значение которое присылаеться с сервера
  private taskCountSource = new BehaviorSubject(200);
  taskCount = this.taskCountSource.asObservable();

  private editTaskSource = new BehaviorSubject<Task>({id:0, title: '', userId: 0, completed: false});
  editingTask = this.editTaskSource.asObservable();

  private updateTaskSource = new BehaviorSubject<Task>({id:0, title: '', userId: 0, completed: false});
  updatingTask = this.updateTaskSource.asObservable();

  private cancelEditSource = new BehaviorSubject<Task>({id:0, title: '', userId: 0, completed: false});
  cancelEdit = this.cancelEditSource.asObservable();

  private deleteTaskSource = new BehaviorSubject<Task>({id:0, title: '', userId: 0, completed: false});
  deleteTaskEvent = this.deleteTaskSource.asObservable();

  constructor(
    public http: HttpClient
  ) { }

  emitNewTask(task: Task) {
    // Для оповещения подписщиков
    this.taskSource.next(task);
  }
  // @Инициализация для распространиеня среди подписщиков в сервисе
  updateCount(length: number) {
    this.taskCountSource.next(length);
  }

  emitEditTask(task: Task) {
    this.editTaskSource.next(task);
  }

  emitUpdateTask(task: Task) {
    this.updateTaskSource.next(task);
  }

  emitCancelEdit(task: Task) {
    this.cancelEditSource.next(task);
  }

  emitDeleteTask(task: Task) {
    this.deleteTaskSource.next(task);
  }

  getTasks() {
    // Все запросы возращают Observable на которые нужно подписаться в компоненте
    return this.http.get(this.configUrl);
  }

  addTask(task: Task) {
    return this.http.post(this.configUrl, {
      body: task
    })
  }

  // @Инициализация удаления в сервисе
  deleteTask(id: number) {
    return this.http.delete(this.configUrl + id);
  }

  // Change of completed state
  changeStateTask(id: number, completedState: boolean) {
    return this.http.patch(this.configUrl + id, {
      completed: completedState
    })
  }

  editTask(task: Task) {
    return this.http.put(this.configUrl + task.id,{
      body: task
    });
  }

}
