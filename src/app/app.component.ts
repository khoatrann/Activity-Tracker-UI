import { Component } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'places-n-tales';
  tile1 = { cols: 5, rows: 2, color: 'lightblue'}
  tile2 =  { cols: 3, rows: 2, color: 'lightgreen'}

}

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}