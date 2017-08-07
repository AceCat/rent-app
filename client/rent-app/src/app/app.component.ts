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
  token = window.localStorage.token;

  constructor(private router: Router) {}

  ngOnInit(){}

iconToggle(){
    var x = document.getElementById("myTopNav");
    if (x.className === "topNav") {
        x.className += " responsive";
    } else {
        x.className = "topNav";
    }
}

    navSearch(){
  	this.router.navigate(['/view/' + this.navZip])
  }

  logout(){
  	window.localStorage.clear();
  	this.router.navigate(['/login/'])
  }

}