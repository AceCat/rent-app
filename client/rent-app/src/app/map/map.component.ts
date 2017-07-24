import { Component, OnInit, ElementRef } from '@angular/core';
// import {Http, Response} from '@angular/http';
import { Router } from '@angular/router';
import { D3Service, D3, Selection } from 'd3-ng2-service'; 



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

	private d3: D3; // <-- Define the private member which will hold the d3 reference
	private parentNativeElement: any;


  constructor(private router: Router, element: ElementRef, d3Service: D3Service) { // <-- pass the D3 Service into the constructor
    this.d3 = d3Service.getD3(); // <-- obtain the d3 object from the D3 Service
    this.parentNativeElement = element.nativeElement;
  }

  ngOnInit() {
  }


	// makeMap () {
	// 	var context = this.d3.select("canvas").getContext("2d"),
	//     path = this.d3.geoPath().context(context);

	// 	this.d3.json("https://unpkg.com/us-atlas@1/us/10m.json", function(error, us) {
	//   	if (error) throw error;

	//   context.beginPath();
	//   path(this.topojson.mesh(us));
	//   context.stroke();
	// 	});
	// }

}
