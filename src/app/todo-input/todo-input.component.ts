import { TodoService } from './../services/todo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.scss'],
})
export class TodoInputComponent implements OnInit {
  todoContent: string = '';
  constructor(private todoService: TodoService) {}
  onSubmit() {
    // check empty
    if (this.todoContent.trim() === '') {
      return false;
    } else {
      this.todoService.addTodo(this.todoContent);
      this.todoContent = '';
      return true;
    }
  }
  ngOnInit(): void {}
}
