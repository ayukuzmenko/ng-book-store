import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NgForm} from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: string;
  public password: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    // check auth state
    this.authService.checkAuth().subscribe( auth => {
      if (auth) {
        this.router.navigate(['/panel']);
      }
    })
  }

  onSubmit() {
    this.authService.login(this.email, this.password)
      .then(data => {
        this.router.navigate([`/panel`]);
        this.flashMessage.show(`Success login. User ${data.user.email}`, {
          cssClass: 'alert-success',
          showCloseBtn: true,
          closeOnClick: true,
          timeout: 10000
        });
        this.router.navigate(['/panel']);
      })
      .catch(error => {
        // show message error
        this.flashMessage.show(error.message, {
          cssClass: 'alert-danger',
          showCloseBtn: true,
          closeOnClick: true,
          timeout: 10000
        });
      })
  }
}
