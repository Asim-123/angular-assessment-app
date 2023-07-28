import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule],
})
export class FiltersComponent {
  @Output() onSearchTitle = new EventEmitter<string>();
  @Output() onSort = new EventEmitter<string>();
  @Output() onSearchId = new EventEmitter<string>();

  searchInput: string = '';
  sortOption: string = '';
  searchIdInput: string = '';

  handleSearch() {
    this.onSearchTitle.emit(this.searchInput);
    /*this.onSort.emit(this.sortOption);
    this.onSearchId.emit(this.searchIdInput);*/
  }

  handleSearchTitle() {
    this.onSearchTitle.emit(this.searchInput);
  }

  handleSort() {
    this.onSort.emit(this.sortOption);
  }

  handleSearchByPrice() {
    this.onSearchId.emit(this.searchIdInput);
  }
}