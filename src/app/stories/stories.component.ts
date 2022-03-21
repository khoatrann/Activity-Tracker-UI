import { Component, OnInit,OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DataService } from '../services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { LocationService } from "../services/location.service";

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

  posts: Post[] = [];
  private postsSub: Subscription = new Subscription;
  
  //constructor(private dataService: DataService, private httpClient: HttpClient) {}
  constructor(public postsService: PostsService,private dialog: MatDialog,private locationService:LocationService) {}

  ngOnInit() {
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
    this.locationService.currentLocationMessage.subscribe(msg => this.locationText = msg);
  }
  
  locationOfStory = "None"
  
  buttonClicked(){
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '100%',
  });

  dialogRef.afterClosed().subscribe(e => {
  })
  }
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
