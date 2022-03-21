import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private locationMessage = new BehaviorSubject('None');
  currentLocationMessage = this.locationMessage.asObservable();

  constructor() { }

  updateLocationMessage(message: string) {
    this.locationMessage.next(message)
  }
}
