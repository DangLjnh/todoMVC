import { Observable, map } from 'rxjs';
import { TodoService } from './services/todo.service';
import { Component, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hasTodo$!: Observable<boolean>;
  constructor(private todoService: TodoService) {}
  ngOnInit() {
    this.todoService.fetchFromLocalStorage();
    this.hasTodo$ = this.todoService.length$.pipe(map((length) => length > 0));
  }
}
