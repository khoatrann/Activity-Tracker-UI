import { AfterContentInit, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DataService } from '../../services/data.service';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})

export class SearchComponent implements AfterContentInit {
    list: any;
    search: string = '';

    constructor(private httpClient: HttpClient, private dataService: DataService) {
        this.loadMap();
    }
    async ngAfterContentInit() {
        await this.httpClient.get(`${environment.api}/search`).subscribe(res => {
            this.list = res
        });
    }

    loadMap(){
        const loader = new Loader({
            apiKey: environment.googleApiKey
        });
        loader.load().then(() => {
            const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
                center: {lat: 38.831, lng: -77.307988},
                zoom: 15
            });
            
            map.addListener('click', (e: any) => {
                const coords = e.latLng.toJSON()
                const mark = new google.maps.Marker({
                    position: {lat: coords['lat'], lng: coords['lng']},
                    map,
                    title: "Map Marker!",
                });
            });
        });
    }

    setValue(event: any){
        this.search = event;
    }

}