import { Component, OnInit } from '@angular/core';
import {Http, Response} from '@angular/http';
import { Router } from '@angular/router';

class HousingData {
	date: Date;
	amount: number;
}

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  housingData: HousingData = new HousingData();
  housingDataArray: HousingData[] = [];




  constructor(private http: Http, private router: Router) { }

  ngOnInit() {
  	this.grabRentPerSquareFoot()
  }

  grabRentPerSquareFoot(){
  	this.http.get('https://www.quandl.com/api/v3/datasets/ZILL/Z60618_RZSF.json').subscribe(response => {
  		this.housingDataArray = response.json().dataset.data
  		console.log(this.housingDataArray)
  	})
  }



}
