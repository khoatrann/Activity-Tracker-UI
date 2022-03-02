import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DataService } from '../../services/data.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
    dummyData: any;

    constructor(private dataService: DataService, private httpClient: HttpClient) {}

    async ngOnInit() {
        const item = await this.httpClient.get(`${environment.api}/search`).subscribe(e => {
            this.dummyData = e;
        });
    }
}