import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { User } from './user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
  selectedUser: User;
  users: User[];
  readonly baseURL = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  postUser(u: User) {
    console.log('User Post'+u);
    console.log(u.address);
    return this.http.post(this.baseURL, u);
  }

  getUserList() {
    return this.http.get(this.baseURL);
  }

  putUser(u: User) {
    console.log('User Put'+u);
    return this.http.put(this.baseURL + `/${u._id}`, u);
  }

  deleteUser(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

}
