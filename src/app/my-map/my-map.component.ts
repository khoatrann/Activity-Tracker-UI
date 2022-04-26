import { Component, OnInit, ViewChild } from '@angular/core';
import {MapInfoWindow, MapMarker} from '@angular/google-maps';
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
export class MyMapComponent implements OnInit {

  posts: Post[] = [];
  private postsSub: Subscription = new Subscription;

  constructor(private locationService:LocationService,public postsService: PostsService) { }

  markerPositions: google.maps.LatLngLiteral[] = [];

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
      var latt = event.latLng.lat().toFixed(4).toString()
      var long = event.latLng.lng().toFixed(4).toString()

      this.locationInfo.lat = latt;
      this.locationInfo.long = long;
      this.locationInfo.addr = 'none'

      //using geocoder to find an address

      this.locationService.updateLocationMessage(this.locationInfo)

      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({location: event.latLng}).then((response) => {
        if (response.results[0]) {
          var address = response.results[0].formatted_address
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
      .catch((e) => window.alert("Geocoder failed due to: " + e));
    }
  }

  selectStoryMarker(marker: MapMarker) {
    this.locationInfo.lat = marker.getPosition()!.lat().toString()
    this.locationInfo.long = marker.getPosition()!.lng().toString();
    this.locationInfo.addr = 'none'
    this.locationService.updateLocationMessage(this.locationInfo)
    this.currentMarkerPosition = { lat: marker.getPosition()!.lat(), lng: marker.getPosition()!.lng() }
  }
}
