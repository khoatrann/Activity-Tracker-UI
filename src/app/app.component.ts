import { DOCUMENT } from '@angular/common';
import { Component, HostBinding, Inject, OnInit, Renderer2 } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Activity-Tracker';
  private isDark = false;

  constructor(private dataService: DataService, @Inject (DOCUMENT) private document: Document, private renderer: Renderer2){
      this.dataService.darkModeChange.subscribe((value) => {
        this.isDark = value
        const hostclass =  this.isDark ? 'dark-theme': 'light-theme';
        this.renderer.setAttribute(this.document.body, 'class', hostclass);
    });
  }

  ngOnInit(): void {
    this.renderer.setAttribute(this.document.body, 'class', 'light-theme')
  }
}
