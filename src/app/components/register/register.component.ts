import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

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
    private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.createUser(this.email, this.password)
      .then(user => {
        this.router.navigate(['/panel']);
      })
      .catch(error => {
        console.log(error)
      })
  }
}
