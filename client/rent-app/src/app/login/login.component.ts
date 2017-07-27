import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';

class User {
	email: string;
	password: string
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	currentUser: User = new User();
	errorMessage = "";


  constructor(private router: Router, private http: Http) { }

  ngOnInit() {}

  loginUser(){
  	  	this.http.post('http://localhost:9393/users/login', this.currentUser).subscribe(response => {
  	  		if (response.json().email) {
  	  			console.log('fired')
  	  			this.router.navigate(['/map'])
  	  		} else {
  	  			console.log('failed')
  	  			this.errorMessage = response.json().error
  	  		}
  		// response.json().email ? this.router.navigate(['http://localhost:4200/map']) : this.errorMessage = response.json().error
 	})
	}

}


