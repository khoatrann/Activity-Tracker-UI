import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: 'Home', component: HomeComponent, pathMatch: 'full' },
  { path: 'Search', component: SearchComponent, pathMatch: 'full' },
  { path: 'About', component: AboutComponent, pathMatch: 'full' },
  { path: '', redirectTo: "/Home", pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
