import { FilterButton, Filter } from './../models/filtering.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
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

  length = 0;
  constructor() {}

  ngOnInit(): void {}
}
