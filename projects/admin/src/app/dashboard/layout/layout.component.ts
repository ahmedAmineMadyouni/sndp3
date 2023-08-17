import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  userData:any
  
  idPhoto:any
  username :any
  currentRoute: string = '';
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.getUserData()
    this.getPhotoAndUsername()
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url; // Update currentRoute with the current route URL
      }
    });
  }

  logout() {
    this.router.navigate(['/login'])
    localStorage.removeItem('token')
  }
  
  getPhotoAndUsername(){
    this.idPhoto=JSON.parse(localStorage.getItem("token")!).idPhoto;
    this.username=JSON.parse(localStorage.getItem("token")!).username

  }
  getUserData() {
    let token = JSON.stringify(localStorage.getItem('token'));
    this.userData = JSON.parse(window.atob(token.split('.')[1]))
    console.log(this.userData)
  }

}
