import { Component, OnInit } from '@angular/core';
import { JsonPlaceHolderService } from "../../services/json-place-holder.service";

@Component({
  selector: 'navbar-component',
  templateUrl: './navbar-component.component.html',
  styleUrls: ['./navbar-component.component.css']
})
export class NavbarComponentComponent implements OnInit {

  todoLength: number;
  lastMessage: string;

  constructor(
    public server: JsonPlaceHolderService
  ) { }

  ngOnInit() {
    // Subscribe on update task length
    // @Подписка на событие в ngOnInit
    this.server.taskCount.subscribe(length => this.todoLength = length);
    // Subscribe on add new task
    this.server.newTask.subscribe(data => {
      if (data['body']) {
        this.lastMessage = data['body'].title;
      }
    })
  }

}
