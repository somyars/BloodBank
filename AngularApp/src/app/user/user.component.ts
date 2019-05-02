
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';

import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';

declare var M: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService]
})
export class UserComponent implements OnInit {



    bloodtype = [
        {id: 1, name: 'A+'},
        {id: 2, name: 'A-'},
        {id: 3, name: 'B+'},
        {id: 4, name: 'B-'},
        {id: 5, name: 'O+'},
        {id: 6, name: 'O+'},
        {id: 7, name: 'AB+'},
        {id: 8, name: 'AB-'}
    ];

  constructor(private userService: UserService) { }

  ngOnInit() {
    console.log("Init");
    this.resetForm();
    this.refreshUserList();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.userService.selectedUser = {
      _id: "",
      guid: "",
      isActive: true,
      gender: "",
      name: "",
      type: "",
      bloodgroup: "",
      email: "",
      phone: "",
      age: null,
      address: "",
      registered: "",
      latitude: null,
      longitude: null,
      geometry: null,
    }
  }

  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      var address = (this.userService.selectedUser.address);
      var add = geocode(address);
      console.log(add);
      console.log("back");
      this.userService.postUser(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshUserList();
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    }
    else {
      this.userService.putUser(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshUserList();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }

  refreshUserList() {
    this.userService.getUserList().subscribe((res) => {
      console.log("Result:"+res);
      this.userService.users = res as User[];
    });
  }

  onEdit(u: User) {
    this.userService.selectedUser = u;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.userService.deleteUser(_id).subscribe((res) => {
        this.refreshUserList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }


   

}
