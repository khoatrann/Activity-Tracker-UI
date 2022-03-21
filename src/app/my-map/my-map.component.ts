import { Component, OnInit, ViewChild } from '@angular/core';
import {MapInfoWindow, MapMarker} from '@angular/google-maps';
import { LocationService } from "../services/location.service";

@Component({
  selector: 'app-my-map',
  templateUrl: './my-map.component.html',
  styleUrls: ['./my-map.component.css']
})
export class MyMapComponent implements OnInit {

  //locationText:string="";

  constructor(private locationService:LocationService) { }

  ngOnInit(): void {
    //this.locationService.currentLocationMessage.subscribe(msg => this.locationText = msg);
  }

  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  initialCoordinates = {
    lat: -25.363,
    lng: 131.044,
  }
  initialZoom = 4

  markerOptions: google.maps.MarkerOptions = {draggable: false,clickable:true};
  markerPositions: google.maps.LatLngLiteral[] = [];

  

  addMarker(event: google.maps.MapMouseEvent) {
    if(event.latLng != null){
      this.markerPositions.pop();
      this.markerPositions.push(event.latLng.toJSON());
      console.log(event.latLng.toJSON())
      var latt = event.latLng.lat().toFixed(4).toString()
      var long = event.latLng.lng().toFixed(4).toString()
      this.locationService.updateLocationMessage("Lat: " + latt + ", Long: " + long)
      console.log("Lat: " + latt + ", Long: " + long)
      //using geocoder to find an address
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({location: event.latLng}).then((response) => {
        if (response.results[0]) {
          var address = response.results[0].formatted_address
          console.log(address)
          if(address.includes('+',6)){
            
          }
          else{
            this.locationService.updateLocationMessage(address)
          }
            
          
          

        } else {
          window.alert("No results found");
        }
      })
      .catch((e) => window.alert("Geocoder failed due to: " + e));
      

    }
  }
  openInfoWindow(marker: MapMarker) {
    this.infoWindow.open(marker);
  }
}
