import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Task } from "../../models/Task-model";
import { JsonPlaceHolderService } from "../../services/json-place-holder.service";

@Component({
  selector: 'todo-item-component',
  templateUrl: './todo-item-component.component.html',
  styleUrls: ['./todo-item-component.component.css']
})
export class TodoItemComponentComponent implements OnInit {
  // @Ожидание данных от родительского элемента
  @Input() task: Task;

  @Input() borderState: boolean;

  // @Инициализация события удаления в ts
  @Output() delete = new EventEmitter();

  @Output() changeState = new EventEmitter();

  @Output() edit = new EventEmitter();

  @Output() cancelBorder = new EventEmitter();

  constructor(
    public server: JsonPlaceHolderService
  ) { }

  ngOnInit() {
  }

  deleteTask() {
    // @Генирация события удаления в ts
    this.delete.emit(this.task)
  }

  changeStateTask() {
    this.changeState.emit(this.task);
  }

  editTask() {
    const updateTask = Object.assign({}, this.task, {borderState: this.borderState});
    this.edit.emit(updateTask)
  }

  cancelEdit() {
    this.borderState = false;
    this.cancelBorder.emit(this.task);
  }

}
