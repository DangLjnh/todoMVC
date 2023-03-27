import { Todo } from './../models/todo.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  animations: [
    trigger('fadeStrikeThrough', [
      state(
        'active',
        style({
          fontSize: '18px',
          color: 'black',
        })
      ),
      state(
        'completed',
        style({
          fontSize: '17.5px',
          color: 'lightgrey',
          textDecoration: 'line-through',
        })
      ),
      transition('active <=> completed', [animate(250)]),
    ]),
  ],
})
export class TodoItemComponent implements OnInit {
  @Input() todo!: Todo;
  @Output() changeStatus: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() editTodo: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter<Todo>();
  isHovered: boolean = false;
  isEditing: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  submitEdit(event: KeyboardEvent) {
    const { keyCode } = event;
    event.preventDefault();
    // enter
    if (keyCode === 13) {
      this.editTodo.emit(this.todo);
      this.isEditing = false;
    }
  }

  removeTodo() {
    this.deleteTodo.emit(this.todo);
  }

  changeTodoStatus() {
    this.changeStatus.emit({
      ...this.todo,
      isCompleted: !this.todo.isCompleted,
    });
  }
}
