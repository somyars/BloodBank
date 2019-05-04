import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { User } from './_models';

/*@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularApp';
}*/

@Component({
  selector: 'app',
  templateUrl: 'app.component.html'
 })
export class AppComponent {
    currentUser: User;

    resolved(captchaResponse: string) {
        console.log('Resolved captcha with response ${captchaResponse}');
    }

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

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
    
    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
