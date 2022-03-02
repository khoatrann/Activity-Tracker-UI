import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './components/settings/settings.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { UploadComponent } from './components/upload/upload.component';

const routes: Routes = [
  { path: 'Home', component: HomeComponent, pathMatch: 'full' },
  { path: 'Search', component: SearchComponent, pathMatch: 'full' },
  { path: 'Settings', component: SettingsComponent, pathMatch: 'full' },
  { path: 'Upload', component: UploadComponent, pathMatch: 'full' },
  { path: '', redirectTo: "/Home", pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
