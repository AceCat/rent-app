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
	var self = this
    this.http.get('https://raw.githubusercontent.com/storiesofsolidarity/us-data/gh-pages/geography/zcta/Illinois.topo.json').subscribe(response => {
    	  var width = 960
        var height = 700;

        var svg = this.d3.select( "body" )
          .append( "svg" )
          .attr( "width", width )
          .attr( "height", height );

        var g = svg.append( "g" )
          .attr('class', 'state');

        var albersProjection = this.d3.geoAlbers()
          .scale( 6000 )
          .rotate( [90,0] )
          .center( [4, 40] )
          .translate( [width/2,height/2] );

         console.log(response.json())

        var geoPath = this.d3.geoPath()
          .projection( albersProjection );

          g.selectAll( "path" )
            .data(topojson.feature(response.json(), response.json().objects["Illinois.geo"]).features)
            .enter()
            .append( "path" )
            .attr( "d", geoPath )
            .attr( "class", "zip-borders")
            .attr( 'fill', '#688C5B')
            .attr( 'id', function(d, i){
              return response.json().objects['Illinois.geo'].geometries[i].id
            })
            .on('click', function(d, i){
                console.log(response.json().objects['Illinois.geo'].geometries[i].id)
              })
            
            console.log('done')

      	})
   }

}
























