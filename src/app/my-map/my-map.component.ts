import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import {MapInfoWindow, MapMarker, MapGeocoder} from '@angular/google-maps';
import { LocationService } from "../services/location.service";
import {LocationInfo} from "../services/location.service";

import { Post } from "../post.model";
import { PostsService } from "../posts.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-map',
  templateUrl: './my-map.component.html',
  styleUrls: ['./my-map.component.css']
})

//@Component({selector: 'app-my-map', template: ''})
export class MyMapComponent implements OnInit {

  @ViewChild('search')
  public searchElementRef!: ElementRef;

  posts: Post[] = [];
  private postsSub: Subscription = new Subscription;

  constructor(private locationService:LocationService,public postsService: PostsService, public geocoder: MapGeocoder,private ngZone: NgZone) { }

  markerPositions: google.maps.LatLngLiteral[] = [];

  ngAfterViewInit(): void {
    // Binding autocomplete to search input control
    let autocomplete = new google.maps.places.Autocomplete(
      this.searchElementRef.nativeElement
    );

    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        //get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();

        //verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }

        console.log( place.geometry.location?.lat() + ", " + place.geometry.location?.lng());

      this.locationInfo.lat = place.geometry.location!.lat().toFixed(4);
      this.locationInfo.long =  place.geometry.location!.lng().toFixed(4);
      this.locationInfo.addr = 'none'

      this.locationService.updateLocationMessage(this.locationInfo)

      this.initialCoordinates = {lat:place.geometry.location!.lat(),lng:place.geometry.location!.lng()}

      this.currentMarkerPosition = { lat: place.geometry.location!.lat(), lng: place.geometry.location!.lng() }

      this.runGeoCoder(place.geometry.location!)
      });
    });
  }


  ngOnInit(): void {
    this.postsSub = this.postsService.getPostAllUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.extractPositionsFromPosts(this.posts)
      });
    this.postsService.getPostsAll();
  }

  initialCoordinates = {
    lat: 38.830,
    lng: -77.308,
  }
  initialZoom = 17

  mapOptions: google.maps.MapOptions = { clickableIcons: false };

  markerOptions: google.maps.MarkerOptions = {draggable: false,clickable:true};

  currentMarkerOptions: google.maps.MarkerOptions = {draggable: false,clickable:true,icon:"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"};
  currentMarkerPosition: google.maps.LatLngLiteral = this.initialCoordinates;

  locationInfo:LocationInfo =  {
    lat: 'none',
    long: 'none',
    addr: 'none'
  }

  extractPositionsFromPosts(posts: Post[]){
    posts.forEach(post =>
      this.markerPositions.push({ lat: Number(post.lat), lng: Number(post.long) })
    );
  }

  updateCurrentMarker(event: google.maps.MapMouseEvent) {
    if(event.latLng != null){
      this.currentMarkerPosition = event.latLng.toJSON();
      var latt = event.latLng.lat().toFixed(4)
      var long = event.latLng.lng().toFixed(4)
      this.locationInfo.lat = latt;
      this.locationInfo.long = long;
      this.locationInfo.addr = 'none'

      this.locationService.updateLocationMessage(this.locationInfo)

      //using geocoder to find an address
      this.runGeoCoder(event.latLng);
    }
  }

  selectStoryMarker(marker: MapMarker) {
    this.locationInfo.lat = marker.getPosition()!.lat().toFixed(4)
    this.locationInfo.long = marker.getPosition()!.lng().toFixed(4);
    this.locationInfo.addr = 'none'
    this.locationService.updateLocationMessage(this.locationInfo)
    this.currentMarkerPosition = { lat: marker.getPosition()!.lat(), lng: marker.getPosition()!.lng() }
    this.runGeoCoder(marker.getPosition()!)
  }

  runGeoCoder(latlong :google.maps.LatLng){
    this.geocoder.geocode({location: latlong}).subscribe((response) => {
      if (response.results[0]) {
        var address = response.results[0].formatted_address
        console.log(address + "fssfsf")
        if(address.includes('+',6)){

        }
        else{
          this.locationInfo.addr = address;
        }
        this.locationService.updateLocationMessage(this.locationInfo)

      } else {
        window.alert("No results found");
      }
    })
  }

}
