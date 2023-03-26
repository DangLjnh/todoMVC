import { LocalStorageService } from './local-storage.service';
import { Filter } from './../models/filtering.model';
import { Todo } from './../models/todo.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private static readonly TodoStorageKey = 'todos';

  private todos!: Todo[];
  private filteredTodo!: Todo[];
  private lengthSubject: BehaviorSubject<number> = new BehaviorSubject<number>(
    0
  );
  private displayTodoSubject: BehaviorSubject<Todo[]> = new BehaviorSubject<
    Todo[]
  >([]);
  private currentFilter: Filter = Filter.All;

  todos$: Observable<Todo[]> = this.displayTodoSubject.asObservable();
  length$: Observable<number> = this.lengthSubject.asObservable();

  constructor(private storageService: LocalStorageService) {}
  fetchFromLocalStorage() {
    this.todos =
      this.storageService.getValue<Todo[]>(TodoService.TodoStorageKey) || [];
    this.filteredTodo = [...this.todos.map((todo) => ({ ...todo }))]; //clone deep todos
    this.updateTodoData();
  }

  updateToLocalStorage() {
    // update Todo after change
    this.storageService.setObject(TodoService.TodoStorageKey, this.todos);
    this.filterTodo(this.currentFilter, false); // filter todo in update will be change filter in fetch
    // After filterTodo change -> update stream
    this.updateTodoData();
  }

  filterTodo(filter: Filter, isFiltering: boolean = true) {
    this.currentFilter = filter;
    switch (filter) {
      case Filter.Active:
        this.filteredTodo = this.todos.filter(
          // get todo.isCompleted = false
          (todo) => !todo.isCompleted
        );
        break;
      case Filter.Completed:
        this.filteredTodo = this.todos.filter((todo) => todo.isCompleted);
        break;
      case Filter.Completed:
        this.filteredTodo = [...this.todos.map((todo) => ({ ...todo }))];
        break;
      default:
        break;
    }
    if (isFiltering) this.updateToLocalStorage();
  }

  private updateTodoData() {
    this.displayTodoSubject.next(this.filteredTodo);
    this.lengthSubject.next(this.todos.length);
  }
}
