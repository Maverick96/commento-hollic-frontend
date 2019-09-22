import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  fetchComments() {
    return this.http.get(`${BASE_URL}/comment`);
  }

  addComment(payload) {
    return this.http.post(`${BASE_URL}/comment/create`, payload);
  }

  editComment(payload) {
    return this.http.put(`${BASE_URL}/comment/edit`, payload);
  }

}
