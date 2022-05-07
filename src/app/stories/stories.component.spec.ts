import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoriesComponent } from './stories.component';

import { PostsService } from "../posts.service";

import { MatDialog } from '@angular/material/dialog';

import { LocationService } from "../services/location.service";
import { of } from 'rxjs';
import { Subscription } from 'rxjs';

import { Subject } from "rxjs";

import { Post } from ".././post.model";
import { BehaviorSubject } from 'rxjs';
import {LocationInfo} from '.././services/location.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('StoriesComponent', () => {
  let component: StoriesComponent;
  let fixture: ComponentFixture<StoriesComponent>;

  let fakePostsService: PostsService
  let fakeMatDialog : MatDialog
  let fakeLocationService: LocationService
  let fakePosts: Post[] = [];
  let locationMessage = new BehaviorSubject<LocationInfo>({
    lat: '0',
    long: '0',
    addr: 'notNone'
  });

  // Arrange
  beforeEach(async () => {

    fakePostsService = jasmine.createSpyObj<PostsService>({
      getPosts: undefined,
      getPostUpdateListener: of(fakePosts),
      getPostsAll: undefined,
      getPostAllUpdateListener: undefined,
      addPost: undefined
    }
    )
    fakeMatDialog = jasmine.createSpyObj<MatDialog>({
      open:undefined
    })
    fakeLocationService = jasmine.createSpyObj<LocationService>({
    },
    {
      currentLocationMessage : locationMessage
    }
    )


    await TestBed.configureTestingModule({
      declarations: [ StoriesComponent ],
      providers:[
        {provide:PostsService,useValue:fakePostsService},
        {provide:MatDialog,useValue:fakeMatDialog},
        {provide:LocationService,useValue:fakeLocationService}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('ngOnInit_update_posts_array', () => {
    // Act
    fakePosts.push( {
      _id: '0',
      title: 'string1',
      subtitle: 'string2',
      content: 'string3',
      link: 'string4',
      lat: '0',
      long: '0',
      addr: 'none'
    })
    // Assert

    expect(component.posts[0]).toEqual(
      fakePosts[0]
    );
  })

  it('ngOnInit_update_locationText_1', () => {
    // Act
    locationMessage.next({
    lat: '0',
    long: '0',
    addr: 'none'
    }
    )
    // Assert
    expect(component.locationText).toBe("lat: 0, long: 0" );
  })

  it('ngOnInit_update_locationText_2', () => {
    // Act
    locationMessage.next({
      lat: '0',
      long: '0',
      addr: 'george'
      }
      )
    // Assert
    expect(component.locationText).toBe('george');

  })

});


describe('StoriesComponentIntgeration', () => {
  let component: StoriesComponent;
  let fixture: ComponentFixture<StoriesComponent>;
  let fakeMatDialog : MatDialog
  let controller : HttpTestingController;
  let APosts: Post[] = [{
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
  }]

  // Arrange
  beforeEach(async () => {

    fakeMatDialog = jasmine.createSpyObj<MatDialog>({
      open:undefined
    })

    await TestBed.configureTestingModule({
      declarations: [ StoriesComponent ],
      imports: [HttpClientTestingModule],
      providers:[
        {provide:PostsService},
        {provide:MatDialog,useValue:fakeMatDialog},
        {provide:LocationService,useValue:new LocationService()}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    controller = TestBed.inject(HttpTestingController)
  });

  it('stories_component_postsService', () => {
    // Act
    component.postsService.getPosts("38.8290","-77.3063");
    const request = controller.expectOne('http://localhost:3000/api/posts?lat=none&long=none')
    const request1 = controller.expectOne('http://localhost:3000/api/posts?lat=38.8290&long=-77.3063'); APosts.length = 0
    request1.flush([{
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
    }])
    // Assert
    expect(component.posts).toEqual(APosts);
  })
});

describe('StoriesComponentIntgeration', () => {
  let component: StoriesComponent;
  let fixture: ComponentFixture<StoriesComponent>;
  let fakeMatDialog : MatDialog
  let fakePostsService: PostsService
  let fakePosts: Post[] = [];
  let locationServiceValue : LocationService = new LocationService();
  let APosts: Post[] = [{
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
  }]

  // Arrange
  beforeEach(async () => {

    fakePostsService = jasmine.createSpyObj<PostsService>({
      getPosts: undefined,
      getPostUpdateListener: of(fakePosts),
      getPostsAll: undefined,
      getPostAllUpdateListener: undefined,
      addPost: undefined
    }
    )

    fakeMatDialog = jasmine.createSpyObj<MatDialog>({
      open:undefined
    })

    await TestBed.configureTestingModule({
      declarations: [ StoriesComponent ],
      providers:[
        {provide:PostsService,useValue:fakePostsService},
        {provide:MatDialog,useValue:fakeMatDialog},
        {provide:LocationService,useValue:locationServiceValue}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('stories_component_locationService', () => {
    // Act
    component.locationText = 'the'
    locationServiceValue.updateLocationMessage({
      lat: '0',
      long: '0',
      addr: 'none',
    })
    // Assert
    expect(component.locationText).toBe('lat: 0, long: 0');
  })

});
