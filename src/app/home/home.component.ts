import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { Subscription } from 'rxjs';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dataService: DataService,
    private alertService: AlertService) { }
  fetchComments$: Subscription;
  createComment$: Subscription;
  comments = [];
  userId: number;
  ngOnInit() {
    this.fetchComments();
    const userData = JSON.parse(localStorage.getItem('user-data'));
    this.userId = userData['userId'];
  }

  fetchComments() {
    this.fetchComments$ = this.dataService.fetchComments().subscribe(data => {
      if (data['success']) {
        this.comments = data['data'];
        // console.log("Co", this.comments)
      } else {

      }
    }, err => {

    })
  }

  onCreateHandler(response) {
    if (response['isCreated']) {
      const payload = {
        text: response['text'],
        level: 1,
        path: '',
        parentId: 0,
        userId: this.userId
      }
      this.createComment$ = this.dataService.addComment(payload).subscribe(res => {
        console.log(res);
        if (res['success']) {
          this.comments.push(res['data'])
        }

      })
    }
  }

}
