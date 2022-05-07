import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { Post } from "./post.model";

@Injectable({ providedIn: "root" })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  private postsAll: Post[] = [];
  private postsAllUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts(lat: string,long:string) {
    console.log('called5')
    this.http
      .get<{ message: string; posts: Post[] }>(
        "http://localhost:3000/api/posts", {params:{lat:lat,long:long}}
      )
      .subscribe(postData => {
        console.log(postData.posts)
        console.log("posts6")
        this.posts = postData.posts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPostsAll() {
    this.http
      .get<{ message: string; posts: Post[] }>(
        "http://localhost:3000/api/posts"
      )
      .subscribe(postAllData => {
        this.postsAll = postAllData.posts;
        this.postsAllUpdated.next([...this.postsAll]);
      });
  }

  getPostAllUpdateListener() {
    return this.postsAllUpdated.asObservable();
  }

  addPost(title: string, subtitle: string, content: string, link: string,lat: string,long: string, addr:string) {
    const post: Post = { _id: "null", title: title, subtitle: subtitle, content: content, link: link, lat:lat, long:long, addr:addr };
    this.http
      .post<{ message: string }>("http://localhost:3000/api/posts", post)
      .subscribe(responseData => {
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.postsAll.push(post);
        this.postsAllUpdated.next([...this.postsAll]);
      });
  }
}
