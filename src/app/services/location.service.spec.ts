import { TestBed } from '@angular/core/testing';

import { LocationService,LocationInfo } from './location.service';

describe('LocationService', () => {
  let service: LocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('updateLocationMessage', () => {
    // Act
    service.updateLocationMessage(
      {
        lat: '0',
        long: '0',
        addr: 'none'
      }
    )
    let loc: LocationInfo;
    service.currentLocationMessage.subscribe((info)=>
    {
      loc = info
      expect(loc).toEqual({
        lat: '0',
        long: '0',
        addr: 'none'
      });
    }
    )
    // Assert

  })

});
