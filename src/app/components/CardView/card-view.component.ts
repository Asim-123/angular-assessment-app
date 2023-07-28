import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiDataService } from '../../services/api-data.service';
import {MatCardModule} from '@angular/material/card';
import { Router } from '@angular/router';
@Component({
  selector: 'app-card-view',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  styleUrls: ['./card-view.component.css'],
  templateUrl: './card-view.component.html',
})
export class CardViewComponent implements OnInit {
  cardsData: DataItem[] = [];
  
  constructor(private apiDataService: ApiDataService, private router: Router) {}
 
  ngOnInit() {
    this.getDataFromApi();
  }

  goToDetailsPage(id: number) {
    console.log("card", id)
    this.router.navigate(['/detail', id]);
  }
  getDataFromApi() {
    this.apiDataService.getData().subscribe(
      (response: DataItem[]) => {
        this.cardsData = response;
      },
      (error) => {
        console.error('Error fetching data from the API:', error);
      }
    );
  }
  
}

// Interface for your data rows
export interface DataItem {
  id: number;
  title: string;
  position: number;
  address: string;
  beds: number;
  bath: number;
  coveredAreaSQFT: number;
  propertyType: string;
  sCommercial: boolean;
  price: number;
}
