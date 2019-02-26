import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NgForm} from '@angular/forms';


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
    private router: Router

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
      .then(user => {
        this.router.navigate([`/panel`]);
        // show message success
      })
      .catch(error => {
        // show message error
        console.log(error);
      })
  }
}
