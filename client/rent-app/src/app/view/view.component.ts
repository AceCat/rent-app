import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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




  constructor(private route: ActivatedRoute, private http: Http, private router: Router) { 
    let id = this.route.snapshot.params.id;
    this.grabRentPerSquareFoot(id)
  }

  ngOnInit() {
  	
  }

  grabRentPerSquareFoot(id){
  	this.http.get('https://www.quandl.com/api/v3/datasets/ZILL/Z' + id + '_RZSF.json').subscribe(response => {
  		this.housingDataArray = response.json().dataset.data
  		console.log(this.housingDataArray)
  	})
  }



}
