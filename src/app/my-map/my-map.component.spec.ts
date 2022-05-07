import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMapComponent } from './my-map.component';

import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import {MapInfoWindow, MapMarker,MapGeocoder} from '@angular/google-maps';
import { LocationService } from "../services/location.service";
import {LocationInfo} from "../services/location.service";

import { Post } from "../post.model";
import { PostsService } from "../posts.service";
import { of } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Subject } from "rxjs";

describe('MyMapComponent', () => {
  let component: MyMapComponent;
  let fixture: ComponentFixture<MyMapComponent>;
  let fakePostsService: PostsService
  let postsUpdated: Post[];
  let fakeLocationService: LocationService
  let postsAllUpdated: Post[] = [
  ];

  let locationMessage = new BehaviorSubject<LocationInfo>({
    lat: 'none',
    long: 'none',
    addr: 'none'
  });



  // Arrange
  beforeEach(async () => {

    fakePostsService = jasmine.createSpyObj<PostsService>({
      getPosts: undefined,
      getPostUpdateListener: undefined,
      getPostsAll: undefined,
      getPostAllUpdateListener: of(postsAllUpdated),
      addPost: undefined
    }
    )
    fakeLocationService = jasmine.createSpyObj<LocationService>({

    },
    {
      updateLocationMessage(message: LocationInfo) {
        locationMessage.next(message)
      },
      currentLocationMessage : locationMessage.asObservable()
    }
    )


    await TestBed.configureTestingModule({
      declarations: [ MyMapComponent ],
      providers:[
        {provide:PostsService,useValue:fakePostsService},
        {provide:LocationService,useValue:fakeLocationService},
        {provide:MapGeocoder}
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('extractPositionsFromPosts', () => {
    // Act

    postsAllUpdated.push(
      {
        _id: '6267422d86db7329b38aee27',
        title:
        "My GMU Class Story",
        subtitle:
        "at Enterprise Hall",
        content:
        "a",
        link:
        "b",
        lat:
        "38.8290",
        long:
        "-77.3063",
        addr:
        "Enterprise Hall, Fairfax, VA 22030, USA"
      }
    );
    console.log(postsAllUpdated[0].content + "thethe")
    console.log(component.posts[0].content + "tytyty")
    // Assert
    component.extractPositionsFromPosts(postsAllUpdated)
    console.log(component.markerPositions[0].lat + "asasasas1l")
    expect(component.markerPositions[0].lat).toBe(38.829);
    expect(component.markerPositions[0].lng).toBe(-77.3063);
  })

  it('updateCurrentMarker1', () => {
    // Act
    let latlnglit:google.maps.LatLngLiteral = {
      lat:2,
      lng:0
    }
    let m : Event ={
      bubbles: false,
      cancelBubble: false,
      cancelable: false,
      composed: false,
      currentTarget: null,
      defaultPrevented: false,
      eventPhase: 0,
      isTrusted: false,
      returnValue: false,
      srcElement: null,
      target: null,
      timeStamp: 0,
      type: '',
      composedPath: function (): EventTarget[] {
        throw new Error('Function not implemented.');
      },
      initEvent: function (type: string, bubbles?: boolean, cancelable?: boolean): void {
        throw new Error('Function not implemented.');
      },
      preventDefault: function (): void {
        throw new Error('Function not implemented.');
      },
      stopImmediatePropagation: function (): void {
        throw new Error('Function not implemented.');
      },
      stopPropagation: function (): void {
        throw new Error('Function not implemented.');
      },
      AT_TARGET: 0,
      BUBBLING_PHASE: 0,
      CAPTURING_PHASE: 0,
      NONE: 0
    }
    let e:google.maps.MapMouseEvent = {
      domEvent: m,
      latLng: {lat:()=>2,lng: ()=>2, equals: ()=> true,toJSON:()=>latlnglit,toUrlValue:()=>"none" },
      stop: function (): void {
        throw new Error('Function not implemented.');
      }
    }
    component.updateCurrentMarker(e)
    // Assert
    expect(component.locationInfo.addr).toBe('none');
  })

  it('updateCurrentMarker2', () => {
    // Act
    let latlnglit:google.maps.LatLngLiteral = {
      lat:2,
      lng:0
    }
    let m : Event ={
      bubbles: false,
      cancelBubble: false,
      cancelable: false,
      composed: false,
      currentTarget: null,
      defaultPrevented: false,
      eventPhase: 0,
      isTrusted: false,
      returnValue: false,
      srcElement: null,
      target: null,
      timeStamp: 0,
      type: '',
      composedPath: function (): EventTarget[] {
        throw new Error('Function not implemented.');
      },
      initEvent: function (type: string, bubbles?: boolean, cancelable?: boolean): void {
        throw new Error('Function not implemented.');
      },
      preventDefault: function (): void {
        throw new Error('Function not implemented.');
      },
      stopImmediatePropagation: function (): void {
        throw new Error('Function not implemented.');
      },
      stopPropagation: function (): void {
        throw new Error('Function not implemented.');
      },
      AT_TARGET: 0,
      BUBBLING_PHASE: 0,
      CAPTURING_PHASE: 0,
      NONE: 0
    }
    let e:google.maps.MapMouseEvent = {
      domEvent: m,
      latLng: null,
      stop: function (): void {
        throw new Error('Function not implemented.');
      }
    }
    component.updateCurrentMarker(e)
    // Assert
    expect(component.locationInfo.lat).toBe('none');
  })

  it('updateCurrentMarker3', () => {
    // Act
    let latlnglit:google.maps.LatLngLiteral = {
      lat:-23.5692,
      lng:135.9611
    }
    let m : Event ={
      bubbles: false,
      cancelBubble: false,
      cancelable: false,
      composed: false,
      currentTarget: null,
      defaultPrevented: false,
      eventPhase: 0,
      isTrusted: false,
      returnValue: false,
      srcElement: null,
      target: null,
      timeStamp: 0,
      type: '',
      composedPath: function (): EventTarget[] {
        throw new Error('Function not implemented.');
      },
      initEvent: function (type: string, bubbles?: boolean, cancelable?: boolean): void {
        throw new Error('Function not implemented.');
      },
      preventDefault: function (): void {
        throw new Error('Function not implemented.');
      },
      stopImmediatePropagation: function (): void {
        throw new Error('Function not implemented.');
      },
      stopPropagation: function (): void {
        throw new Error('Function not implemented.');
      },
      AT_TARGET: 0,
      BUBBLING_PHASE: 0,
      CAPTURING_PHASE: 0,
      NONE: 0
    }
    let e:google.maps.MapMouseEvent = {
      domEvent: m,
      latLng: {lat:()=>2,lng: ()=>2, equals: ()=> true,toJSON:()=>latlnglit,toUrlValue:()=>"none" },
      stop: function (): void {
        throw new Error('Function not implemented.');
      }
    }
    component.updateCurrentMarker(e)
    // Assert
    expect(component.locationInfo.addr).toBe('none');
  })

  it('updateCurrentMarker4', () => {
    // Act
    let latlnglit:google.maps.LatLngLiteral = {
      lat: 38.829,
      lng: -77.3063
    }
    let m : Event ={
      bubbles: false,
      cancelBubble: false,
      cancelable: false,
      composed: false,
      currentTarget: null,
      defaultPrevented: false,
      eventPhase: 0,
      isTrusted: false,
      returnValue: false,
      srcElement: null,
      target: null,
      timeStamp: 0,
      type: '',
      composedPath: function (): EventTarget[] {
        throw new Error('Function not implemented.');
      },
      initEvent: function (type: string, bubbles?: boolean, cancelable?: boolean): void {
        throw new Error('Function not implemented.');
      },
      preventDefault: function (): void {
        throw new Error('Function not implemented.');
      },
      stopImmediatePropagation: function (): void {
        throw new Error('Function not implemented.');
      },
      stopPropagation: function (): void {
        throw new Error('Function not implemented.');
      },
      AT_TARGET: 0,
      BUBBLING_PHASE: 0,
      CAPTURING_PHASE: 0,
      NONE: 0
    }
    let e:google.maps.MapMouseEvent = {
      domEvent: m,
      latLng: {lat:()=>38.8290,lng: ()=>-77.3063, equals: ()=> true,toJSON:()=>latlnglit,toUrlValue:()=>"none" },
      stop: function (): void {
        throw new Error('Function not implemented.');
      }
    }
    component.updateCurrentMarker(e)
    // Assert
    let geocoder: MapGeocoder = new MapGeocoder(new NgZone({}));
    geocoder.geocode({location:latlnglit}).subscribe((response) => {
      var address = response.results[0].formatted_address
      component.locationInfo.addr = address;
      expect(address).toBe('none');
    })
    latlnglit.lat = 38.8290

  })
});



