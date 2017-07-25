import { Component, OnInit, ElementRef } from '@angular/core';
import {Http, Response} from '@angular/http';
import { Router } from '@angular/router';
import { D3Service, D3, Selection } from 'd3-ng2-service'; 
declare let topojson: any;



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
	private d3: D3; // <-- Define the private member which will hold the d3 reference
	private parentNativeElement: any;


  constructor(private http: Http, private router: Router, element: ElementRef, d3Service: D3Service) { // <-- pass the D3 Service into the constructor
    this.d3 = d3Service.getD3(); // <-- obtain the d3 object from the D3 Service
    this.parentNativeElement = element.nativeElement;
  }




  ngOnInit() {
  	this.makeMap()
  }

makeMap () {
	var width = 1200
    var height = 1200;

var svg = this.d3.select( "body" )
  .append( "svg" )
  .attr( "width", width )
  .attr( "height", height );

var g = svg.append( "g" );

var albersProjection = this.d3.geoAlbers()
  .scale( 2000 )
  .rotate( [71.057,0] )
  .center( [0, 42.313] )
  .translate( [width/2,height/2] );

var geoPath = this.d3.geoPath()
    .projection( albersProjection );
this.http.get('https://raw.githubusercontent.com/jgoodall/us-maps/master/geojson/state.geo.json').subscribe(response => {
console.log(response.json().features)
g.selectAll( "path" )
  .data(response.json().features)
  .enter()
  .append( "path" )
  .attr( "fill", "#ccc" )
  .attr( "d", geoPath )
  		})
	}

}


