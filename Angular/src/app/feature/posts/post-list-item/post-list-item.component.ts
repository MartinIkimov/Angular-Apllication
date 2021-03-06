import { Component, Input, OnInit } from '@angular/core';
import { IPost } from 'src/app/core/interfaces/post';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.css']
})
export class PostListItemComponent implements OnInit {

  @Input() post: IPost;

  constructor() { }

  ngOnInit(): void {
  }

}
