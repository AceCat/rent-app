import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  navZip = "";

  constructor(private router: Router) {}

  ngOnInit(){}

    navSearch(){
  	this.router.navigate(['/view/' + this.navZip])
  }

  logout(){
  	window.localStorage.clear();
  	this.router.navigate(['/login/'])
  }

}