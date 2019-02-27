import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, Event, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;
  userName: string;
  isPublic: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.router.events.subscribe((e: Event) => {
      if ( e instanceof NavigationEnd) {
        this.isPublic = e.url.indexOf(`panel`) === -1;
      }
    });

    this.authService.checkAuth().subscribe( auth => {
      if (auth) {
        this.isLogin = true;
        this.userName = auth.email;
      } else {
        this.userName = '';
        this.isLogin = false;
      }
    });
  }

  logout() {
    this.authService.logout()
    .then(() => {
      this.router.navigate(['/login'])
    })
  }
}
