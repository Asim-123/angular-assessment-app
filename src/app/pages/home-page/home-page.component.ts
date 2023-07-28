import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from '../../components/TableView/data-table.component'
import { CardViewComponent } from '../../components/CardView/card-view.component'
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, DataTableComponent, CardViewComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  isCardView: boolean = false;
  isDataTable: boolean = true; 

  showCardView() {
    this.isCardView = true;
    this.isDataTable = false;
  }

  showDataTable() {
    this.isCardView = false;
    this.isDataTable = true;
  }
}
