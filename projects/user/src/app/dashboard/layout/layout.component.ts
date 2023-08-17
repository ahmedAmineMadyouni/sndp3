import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  idPhoto:any
  username :any
  photoName:any

  currentRoute: string = ''; // Initialize currentRoute variable

  constructor(private router: Router) {}


  ngOnInit(): void {
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
    this.photoName=JSON.parse(localStorage.getItem("token")!).photoName;
    this.username=JSON.parse(localStorage.getItem("token")!).username

  }



}

