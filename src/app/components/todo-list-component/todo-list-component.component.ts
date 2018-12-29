import { Component, OnInit, Input } from '@angular/core';
import { Task } from "../../models/Task-model";
// Импортируем сервис
import { JsonPlaceHolderService } from "../../services/json-place-holder.service";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: 'todo-list-component',
  templateUrl: './todo-list-component.component.html',
  styleUrls: ['./todo-list-component.component.css']
})
export class TodoListComponentComponent implements OnInit {
  tasks: Task[];
  todos: any[];

  constructor(
    public server: JsonPlaceHolderService,
    public flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    // Get all tasks from server .
    this.server.getTasks().subscribe( (data: Task[]) => {
      // Можно также проверять на длину
      if(data) {
        this.tasks = data;
      }
    }, error => {
      console.log(error);
    });

    // Subscribe on new task event
    this.server.newTask.subscribe((data: Task) => {
      if(data['body']) {
        // возможность обьеденить обьекты. В пустой обьект закинуть data['body'] и обьект id: data.id
        const newTask = Object.assign({}, data['body'], {id: data.id});
        this.tasks.unshift(newTask);
        // @Использование метода для оповещения при добавлении задачи
        // изменение длины в навбаре
        this.server.updateCount(this.tasks.length);
      }
    });

    // Subscribe on update task
    this.server.updatingTask.subscribe((task: Task) => {
      if (task['body']) {
        this.tasks = this.tasks.map(item => {
          if (item.id === task.id) {
            item.title = task['body'].title;
          }
          return item;
        });
      }
    });

    // Subscribe on cancel edit
    this.server.cancelEdit.subscribe((task: Task) => {
      if (this.tasks != undefined) {
          this.tasks.map( item => {
            if(task.id === item.id) {
              item.borderState = false;
            }
            return item;
          });
      }
    });
  }

  // Delete task from todo-list-component with splice method
  deleteTaskSplice(index: number) {
    this.todos.splice(index, 1);
  }

  // Delete task from todo-list-component with id - Real situation but now for example is use filter method
  deleteTaskWithId(id: string) {
    this.todos = this.todos.filter( task => task.id !== id );
  }

  identify(index: number) {
    // return index && item;
    return index
  }
  // @Обработка удаления через сервер и изменеие html разметки
  deleteTask(data: Task) {
    // @Генерация удаления в ts
    this.server.deleteTask(data.id).subscribe( resp => {
      this.server.emitDeleteTask(data);
      this.tasks = this.tasks.filter(task => task.id !== data.id);
      //@Использование метода для оповещения при удалении задачи
      this.server.updateCount(this.tasks.length);
      // @Вызов флеш сообщения
      this.flashMessage.show('Delete success!', {
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
      });
    });
  }

  changeStateTask(task: Task) {
    this.server.changeStateTask(task.id, !task.completed).subscribe( data => {
      task.completed = !task.completed
    });
  }

  editTask(task: Task) {
    this.tasks.map( (item: Task) => {
      if(item.id != task.id) {
        item.borderState = false;
      } else {
        item.borderState = true;
      }
      return item;
    });
    this.server.emitEditTask(task);
  }

  cancelEdit(task: Task) {
    task.borderState = false;
    this.server.emitCancelEdit(task);
  }
}
