import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../shared/services/data.service';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input('comment') comments;
  @Input('userId') userId;
  isEdit: boolean = false;
  isReply: boolean = false;
  currentComment;

  createComment$: Subscription;
  editComment$: Subscription;

  constructor(private dataService: DataService,
    private alertService: AlertService) {
  }

  ngOnInit() {
    console.log(this.comments);
  }

  editComment(comment) {
    this.isEdit = true;
    this.currentComment = comment;
  }

  onEditHandler(response) {
    if (response['isCreated']) {
      console.log("SUBMIT TO SERVER ");
      const payload = {
        text: response['text'],
        commentId: this.currentComment.commentId
      }
      this.editComment$ = this.dataService.editComment(payload).subscribe(res => {
        if (res['success']) {
          this.currentComment.text = response['text'];
        } else {
          this.alertService.showAlert("Edit Failed")
        }
      }, err => {
        console.error(err);
        this.alertService.showAlert("Edit Failed")
      })
    }
    this.currentComment = null;

    this.isEdit = false;
  }

  replyToComment(comment) {
    this.isReply = true;
    this.currentComment = comment;
  }


  onReplyHandler(response) {
    if (response['isCreated']) {
      const payload = {
        text: response['text'],
        level: this.currentComment.level + 1,
        path: this.currentComment.path,
        parentId: this.currentComment.commentId,
        userId: this.userId
      }
      this.createComment$ = this.dataService.addComment(payload).subscribe(res => {
        console.log(res);
        if (res['success']) {
          this.currentComment.replies.push(res['data'])
        } else {
          this.alertService.showAlert("Couldn't create new comment")
        }

        this.currentComment = null;
      }, err => {
        this.alertService.showAlert("Couldn't create new comment")
      })
    }
    this.currentComment = null;
    this.isReply = false;

  }

}
