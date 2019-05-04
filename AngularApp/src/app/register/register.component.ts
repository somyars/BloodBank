import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MatRadioModule } from '@angular/material/radio';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';

import { AlertService, AuthenticationService } from '../_services';

declare var M: any;

@Component({templateUrl: 'register.component.html',
styleUrls: ['register.component.css']})
export class RegisterComponent implements OnInit {



    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService
    ) { 
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.resetForm();
        this.registerForm = this.formBuilder.group({
            _id: ['', Validators.required],
            isActive: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            gender: ['', Validators.required],
            age: ['', Validators.required],
            type: ['', Validators.required],
            bloodgroup: ['', Validators.required],
            email: ['', Validators.required],
            phone: ['', Validators.required],
            address: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    resetForm(form?: FormGroup) {
    if (form)
      form.reset();
    this.userService.selectedUser = {
      _id: "",
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
    }
  }

    onSubmit(form: FormGroup) {
    if (form.value._id == "") {
      var address = this.userService.selectedUser.address;
      console.log(address);
      console.log("hello");
      geocode(address);
      this.userService.postUser(form.value).subscribe((res) => {
        this.resetForm(form); 
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    }
    else {
      this.userService.putUser(form.value).subscribe((res) => {
        this.resetForm(form);
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }
}
