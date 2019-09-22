import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dataService: DataService) { }
  fetchComments$: Subscription;
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

}
