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
  selectedUser: User = {
    _id : "",
    guid: "",
      isActive: true,
      gender: "",
      name: "",
      firstName: "",
      lastName: "",
      password: "",
      type: "",
      bloodgroup: "",
      email: "",
      phone: "",
      age: null,
      address: "",
      registered: "",
      latitude: null,
      longitude: null
  };
  users: User[];
  readonly baseURL = 'http://localhost:3000/users';
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  postUser(u: User) {
    console.log('User Post'+u);
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

  login(authCredentials) {
    console.log('user.service');
    return this.http.post(this.baseURL + '/authenticate', authCredentials,this.noAuthHeader);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
}
