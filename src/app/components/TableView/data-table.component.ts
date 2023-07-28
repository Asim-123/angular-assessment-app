import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ApiDataService } from '../../services/api-data.service';
import { FiltersComponent } from '../UIControls/filters/filters.component'
import { Router } from '@angular/router';

@Component({
  selector: 'app-data-table',
  styleUrls: ['./data-table.component.css'],
  templateUrl: './data-table.component.html',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, FiltersComponent, CommonModule ],
})
export class DataTableComponent implements OnInit {
  pageSize: number = 10; // Number of items per page
  currentPage: number = 1; // Current page number
  totalPages: number = 1; // Total number of pages

  setPage(page: number) {
    this.currentPage = Math.max(1, Math.min(page, this.totalPages));
    this.applyFilterAndSort();
  }

  updateTotalPages() {
    this.totalPages = Math.ceil(this.filteredDataSource.length / this.pageSize);
  }

  getCurrentPageData(): DataItem[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredDataSource.slice(startIndex, startIndex + this.pageSize);
  }

  applyFilterAndSort() {
    const filteredData = this.dataSource.filter((item) => this.itemMatchesSearch(item));

    const sortedData = filteredData.sort((a, b) =>
      this.sortDirection === 'asc' ? a.position - b.position : b.position - a.position
    );

    this.filteredDataSource = sortedData;

    this.updateTotalPages();
    this.getCurrentPageData();
  }

  

  displayedColumns: string[] = [
    'title',
    'position',
    'Address',
    'beds',
    'bath',
    'coveredAreaSQFT',
    'propertyType',
    'isCommercial',
    'price',
  ];
  dataSource: DataItem[] = []; // Use the DataItem interface
  filteredDataSource: DataItem[] = [];
  sortDirection: 'asc' | 'desc' = 'asc';

  searchInput: string = '';
  sortOption: string = '';
  searchIdInput: string = '';

  // Method to check if the item matches the search criteria
  itemMatchesSearch(item: DataItem): boolean {
    const searchTerm = this.searchInput.trim().toLowerCase();
    const searchIdTerm = this.searchIdInput.trim().toLowerCase();
    const titleMatches = searchTerm === '' || item.title.toLowerCase().includes(searchTerm);
    const positionMatches = searchIdTerm === '' || item.position.toString().includes(searchIdTerm);
    return titleMatches && positionMatches;
  }


  constructor(private apiDataService: ApiDataService,  private router: Router) {} // Inject the ApiDataService

  ngOnInit() {
    
    this.getDataFromApi();
  }

  getDataFromApi() {
    this.apiDataService.getData().subscribe(
      (response: DataItem[]) => {
        this.dataSource = response;
        this.filteredDataSource = [...response]; 
        console.log(this.dataSource);
      },
      (error) => {
        console.error('Error fetching data from the API:', error);
      }
    );
  }

  applySearchTitle(searchValue: string) {
    const searchTerm = searchValue.trim().toLowerCase();
    console.log(searchValue)
    if (searchTerm === '') {
      this.filteredDataSource = [...this.dataSource];
    } else {
      this.filteredDataSource = this.dataSource.filter((item) =>
        item.title.toLowerCase().includes(searchTerm)
      );
      console.log(this.filteredDataSource)
    }
  }
  goToDetailView(id: number) {
    console.log(id)
    this.router.navigate(['/detail', id]);
  }

  applySort(sortOption: string) {
    console.log(sortOption)
    this.filteredDataSource.reverse()
  }

  applySearchId(searchIdValue: string) {
    console.log(searchIdValue);
    const searchId = parseInt(searchIdValue, 10); 
  
    if (!isNaN(searchId)) {
      this.filteredDataSource = this.dataSource.filter((item) => item.price === searchId);
    } else {
      this.filteredDataSource = [...this.dataSource];
    }
  }
  
}

export interface DataItem {
  position: number;
  title: string;
  Address: string;
  beds: number;
  bath: number;
  coveredAreaSQFT: number;
  propertyType: string;
  isCommercial: boolean;
  price: number;
}

