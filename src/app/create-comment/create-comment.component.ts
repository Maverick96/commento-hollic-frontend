import { Component, OnInit, Output, Input } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent implements OnInit {
  @Input('text') message;
  @Output('submit') submitResponse = new EventEmitter<object>();
  constructor() { }
  text: string = ''
  ngOnInit() {
    if (this.message) {
      this.text = this.message
    }
  }

  postComment() {
    const response = {
      isCreated: true,
      text: this.text
    };
    this.submitResponse.emit(response);
  }

  cancelComment() {
    const response = {
      isCreated: false,
    };
    this.submitResponse.emit(response);
  }

}
