import { OverlayContainer } from '@angular/cdk/overlay';
import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit {
    httpResult: any;
    toggled: boolean = false;
    name = 'Angular 7';

    constructor(private httpClient: HttpClient, private dataService: DataService, private overlayContainer: OverlayContainer){

    }

    ngOnInit(): void {
        this.httpClient.get(`${environment.api}/entries`).subscribe((res) => {
            this.httpResult = res;
        })
    }

    toggleMode(): void{
        this.toggled = !this.toggled;
        this.dataService.toggleDarkMode();
    }
} 
