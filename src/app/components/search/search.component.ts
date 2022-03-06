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
    isDark: any;
    styles = [];

    constructor(private httpClient: HttpClient, private dataService: DataService) {
        this.isDark = this.dataService.isDarkMode;
        this.loadMap();
    }
    async ngAfterContentInit() {
        await this.httpClient.get(`${environment.api}/search`).subscribe(res => {
            this.list = res
        });
        this.isDark = this.dataService.isDarkMode;
        this.loadMap();
    }


    loadMap(){
        if (this.isDark){
            const loader = new Loader({
                apiKey: environment.googleApiKey
            });
            loader.load().then(() => {
                const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
                    center: {lat: 38.831, lng: -77.307988},
                    zoom: 15,
                    styles: [
                        { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
                        { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
                        { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
                        {
                          featureType: "administrative.locality",
                          elementType: "labels.text.fill",
                          stylers: [{ color: "#d59563" }],
                        },
                        {
                          featureType: "poi",
                          elementType: "labels.text.fill",
                          stylers: [{ color: "#d59563" }],
                        },
                        {
                          featureType: "poi.park",
                          elementType: "geometry",
                          stylers: [{ color: "#263c3f" }],
                        },
                        {
                          featureType: "poi.park",
                          elementType: "labels.text.fill",
                          stylers: [{ color: "#6b9a76" }],
                        },
                        {
                          featureType: "road",
                          elementType: "geometry",
                          stylers: [{ color: "#38414e" }],
                        },
                        {
                          featureType: "road",
                          elementType: "geometry.stroke",
                          stylers: [{ color: "#212a37" }],
                        },
                        {
                          featureType: "road",
                          elementType: "labels.text.fill",
                          stylers: [{ color: "#9ca5b3" }],
                        },
                        {
                          featureType: "road.highway",
                          elementType: "geometry",
                          stylers: [{ color: "#746855" }],
                        },
                        {
                          featureType: "road.highway",
                          elementType: "geometry.stroke",
                          stylers: [{ color: "#1f2835" }],
                        },
                        {
                          featureType: "road.highway",
                          elementType: "labels.text.fill",
                          stylers: [{ color: "#f3d19c" }],
                        },
                        {
                          featureType: "transit",
                          elementType: "geometry",
                          stylers: [{ color: "#2f3948" }],
                        },
                        {
                          featureType: "transit.station",
                          elementType: "labels.text.fill",
                          stylers: [{ color: "#d59563" }],
                        },
                        {
                          featureType: "water",
                          elementType: "geometry",
                          stylers: [{ color: "#17263c" }],
                        },
                        {
                          featureType: "water",
                          elementType: "labels.text.fill",
                          stylers: [{ color: "#515c6d" }],
                        },
                        {
                          featureType: "water",
                          elementType: "labels.text.stroke",
                          stylers: [{ color: "#17263c" }],
                        },
                      ],
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
        else {
            const loader = new Loader({
                apiKey: environment.googleApiKey
            });
            loader.load().then(() => {
                const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
                    center: {lat: 38.831, lng: -77.307988},
                    zoom: 15,
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
    }

    setValue(event: any){
        this.search = event;
    }

}