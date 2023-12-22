import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICommentPost } from '../../services/interfaces';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit {
  myForm: FormGroup;
  constructor(
    public postService: PostService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.myForm = this.formBuilder.group({
      text: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!isNaN(Number(id))) {
      this.postService.getPostById(Number(id));
      this.postService.getComments(Number(id));
    }
  }

  onSubmit(e: Event) {
    e.preventDefault();
    const id = this.route.snapshot.paramMap.get('id');

    const form: ICommentPost = {
      content: this.myForm.controls['text'].value,
    };

    if (!isNaN(Number(id))) {
      console.log('submit');
      this.postService.postComment(Number(id), form);
    }
  }
}
