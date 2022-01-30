import { AfterContentInit, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DataService } from '../services/data.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})

export class SearchComponent implements AfterContentInit {
    list: any;
    selected: Date | any;

    constructor(private httpClient: HttpClient, private dataService: DataService) {

    }
    ngAfterContentInit() {
        this.httpClient.get(`${environment.api}/search`).subscribe(res => {
            this.list = res
        });

        this.dataService.callMe();
    }

}