import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import {MdInputModule} from '@angular/material';



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

	newUser: User = new User();
	currentUser: User = new User();
	errorMessage = "";
	showLogin = true;
	showRegister = false;


  constructor(private router: Router, private http: Http) { }

  ngOnInit() {}

  loginUser(){
  	  	this.http.post('http://localhost:9393/users/login', this.currentUser).subscribe(response => {
  	  		if (response.json().email) {
  	  			console.log('fired')
  	  			window.localStorage.setItem("token", response.json().token)
  	  			this.router.navigate(['/map'])
  	  		} else {
  	  			console.log('failed')
  	  			this.errorMessage = response.json().error
  	  		}
  		// response.json().email ? this.router.navigate(['http://localhost:4200/map']) : this.errorMessage = response.json().error
 	})
	}

	validateEmail(email) {
    	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	return re.test(email);
}

	registerUser(){
		this.http.post('http://localhost:9393/users/register', this.newUser).subscribe(response => {
		if (this.validateEmail(this.newUser.email)) {
      	window.localStorage.setItem("token", response.json().token)
      	this.router.navigate(['/map'])
      	} else {
      		this.errorMessage = 'That is not a valid email'
      	}
		})
	}

	toggleLogin(){
		this.showLogin = true;
		this.showRegister = false;
	}

	toggleRegister(){
		this.showLogin = false;
		this.showRegister = true;
	}

}


