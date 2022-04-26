import { Component, OnInit,OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { LocationService } from "../services/location.service";
import {LocationInfo} from "../services/location.service";
import { Subscription } from 'rxjs';
import { Post } from "../post.model";
import { PostsService } from "../posts.service";

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit {
  locationText:string="";
  locationInfo:LocationInfo =  {
    lat: 'none',
    long: 'none',
    addr: 'none'
  }

  posts: Post[] = [];
  private postsSub: Subscription = new Subscription;

  constructor(public postsService: PostsService,private dialog: MatDialog,private locationService:LocationService) {}

  ngOnInit() {
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
    this.locationService.currentLocationMessage.subscribe(msg =>{
      this.locationInfo = msg;
      if(this.locationInfo.addr == "none"){
        this.locationText = "lat: " + this.locationInfo.lat + ", " + "long: " + this.locationInfo.long
      }
      else{
        this.locationText= this.locationInfo.addr
      }
      this.postsService.getPosts(this.locationInfo.lat,this.locationInfo.long);
    });
  }

  locationOfStory = "None"

  buttonClicked(){
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '100%',
      data: {info: this.locationInfo}
  });

  dialogRef.afterClosed().subscribe(e => {
  })
  }
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
