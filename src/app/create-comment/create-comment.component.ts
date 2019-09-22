import { Component, OnInit, Output, Input, ViewChild, ElementRef } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent implements OnInit {
  @Input('text') message;
  @Output('submit') submitResponse = new EventEmitter<object>();
  @ViewChild('textArea') textArea: ElementRef;
  constructor() { }
  text: string = ''
  ngOnInit() {
    if (this.message) {
      this.text = this.message
    }

    this.textArea.nativeElement.focus();
  }

  postComment() {
    const response = {
      isCreated: true,
      text: this.text
    };
    this.onSubmit(response);
  }

  cancelComment() {
    const response = {
      isCreated: false,
    };
    this.onSubmit(response);
  }

  onSubmit(response) {
    this.text = '';
    this.submitResponse.emit(response);

  }

}
