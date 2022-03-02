import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Loader } from "@googlemaps/js-api-loader";
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
    constructor(private dialogRef: MatDialogRef<ModalComponent>, @Inject(MAT_DIALOG_DATA) private data: string) {
    }

    previous() {
        this.step -= 1;
        this.progress -= 33;
        if (this.step == 2){
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
            this.loadMap()
        }
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

    keepHidden(){
        return this.step != 2;
    }
}