import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Loader } from "@googlemaps/js-api-loader";
import { DataService } from "src/app/services/data.service";
import { environment } from "src/environments/environment";

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']
})

export class ModalComponent {
    step: number = 1;
    progress: number = 0;
    selected: Date | any;
    isDark: boolean = false;
    constructor(private dataService: DataService, private dialogRef: MatDialogRef<ModalComponent>, @Inject(MAT_DIALOG_DATA) private data: string) {
    }

    previous() {
        this.step -= 1;
        this.progress -= 33;
        if (this.step == 2){
            this.isDark = this.dataService.isDarkMode;
            this.loadMap()
        }
    }

    close(){
        this.dialogRef.close();
    }

    next(): void {
        this.step += 1;
        this.progress += 33;
        if (this.step == 2){
            this.isDark = this.dataService.isDarkMode;
            this.loadMap()
        }
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

        keepHidden(){
        return this.step != 2;
    }
}