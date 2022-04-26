import { NONE_TYPE } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export class LocationInfo{
  lat: string = 'none';
  long: string =  'none';
  addr: string = 'none';
}

@Injectable({
  providedIn: 'root'
})

export class LocationService {

  private locationMessage = new BehaviorSubject<LocationInfo>({
    lat: 'none',
    long: 'none',
    addr: 'none'
  });
  currentLocationMessage = this.locationMessage.asObservable();

  constructor() { }

  updateLocationMessage(message: LocationInfo) {
    this.locationMessage.next(message)
  }
}
