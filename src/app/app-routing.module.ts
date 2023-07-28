import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailViewComponent } from './components/detail-view/detail-view.component'; // Import the newly created component
import { HomePageComponent }from './pages/home-page/home-page.component'
const routes: Routes = [
  {path: "", component: HomePageComponent },
  { path: 'detail/:id', component: DetailViewComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
