import { Observable, Subject, map, takeUntil } from 'rxjs';
import { TodoService } from './../services/todo.service';
import { FilterButton, Filter } from './../models/filtering.model';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, OnDestroy {
  length: number = 0;
  hasCompleted$!: Observable<boolean>;
  destroy$: Subject<null> = new Subject<null>();
  filterButtons: FilterButton[] = [
    {
      type: Filter.All,
      isActive: true,
      label: 'All',
    },
    {
      type: Filter.Active,
      isActive: false,
      label: 'Active',
    },
    {
      type: Filter.Completed,
      isActive: false,
      label: 'Completed',
    },
  ];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.length$.subscribe((val) => (this.length = val));
    this.hasCompleted$ = this.todoService.todos$.pipe(
      map((todo) => todo.some((t) => t.isCompleted)),
      takeUntil(this.destroy$) // way to unsubscribe
    );
  }

  filterBtn(type: Filter) {
    this.setActiveFilterButton(type);
    this.todoService.filterTodo(type);
  }

  clearCompleted() {
    this.todoService.clearCompleted();
  }

  private setActiveFilterButton(type: Filter) {
    this.filterButtons.forEach((btn) => {
      btn.isActive = btn.type === type;
    });
  }
  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
