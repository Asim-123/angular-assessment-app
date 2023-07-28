import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiDataService } from '../../services/api-data.service';
@Component({
  selector: 'app-detail-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.css']
})
export class DetailViewComponent implements OnInit {
  cardDetails: DataItem | undefined;

  constructor(private route: ActivatedRoute, private apiDataService: ApiDataService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.getCardDetails(id);
    });
  }

  getCardDetails(id: number) {
    this.apiDataService.getData().subscribe(
      (response: DataItem[]) => {
        console.log('API Response:', response);
        this.cardDetails = response.find(card => card.id == id);  
        console.log('Card Details:', this.cardDetails);
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