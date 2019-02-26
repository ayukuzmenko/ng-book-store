import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public email: string;
  public password: string;

  constructor(    
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
    ) { }
    

  ngOnInit() {
  }

  onSubmit() {
    this.authService.createUser(this.email, this.password)
      .then(data => {
        this.flashMessage.show(`Success login. User ${data.user.email}`, {
          cssClass: 'alert-success',
          showCloseBtn: true,
          closeOnClick: true,
          timeout: 10000
        });
        this.router.navigate(['/panel']);
      })
      .catch(error => {
        this.flashMessage.show(error.message, {
          cssClass: 'alert-danger',
          showCloseBtn: true,
          closeOnClick: true,
          timeout: 10000
        });
      })
  }
}
