import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-preview',
  templateUrl: './post-preview.component.html',
  styleUrl: './post-preview.component.scss',
})
export class PostPreviewComponent implements OnInit {
  constructor(public postService: PostService) {}

  ngOnInit(): void {
    this.postService.getAllPosts();
  }

  get() {}
}
