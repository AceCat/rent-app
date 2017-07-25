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
    this.http.get('https://raw.githubusercontent.com/storiesofsolidarity/us-data/gh-pages/geography/zcta/Illinois.topo.json').subscribe(response => {
    	  var width = 1500
        var height = 1500;

        var svg = this.d3.select( "body" )
          .append( "svg" )
          .attr( "width", width )
          .attr( "height", height );

        var g = svg.append( "g" );

        var albersProjection = this.d3.geoAlbers()
          .scale( 8000 )
          .rotate( [90,0] )
          .center( [0, 42.313] )
          .translate( [width/2,height/2] );

        var geoPath = this.d3.geoPath()
          .projection( albersProjection );
          g.selectAll( "path" )
            .data(topojson.feature(response.json(), response.json().objects["Illinois.geo"]).features)
            .enter()
            .append( "path" )
            .attr( "fill", "#FF0000" )
            .attr( "d", geoPath )
            .attr( "class", "zip-borders")
            console.log('done')
      	})
   }

   createMap() {
      var width = 960;
      var height = 600;
      
      var svg = this.d3.select( "body" )
        .append( "svg" )
        .attr( "width", width )
        .attr( "height", height );
      var path = this.d3.geoPath();
      this.http.get('https://raw.githubusercontent.com/storiesofsolidarity/us-data/gh-pages/geography/zcta/Alabama.topo.json').subscribe(response => {
        var toDraw = topojson.feature(response.json(), response.json().objects["Alabama.geo"]).features
                console.log(toDraw)

        // svg.append("g")
        //     .attr("class", "states")
        //   .selectAll("path")
        //   .data(toDraw)
        //  .enter().append("path")
        //    .attr("d", path);
        // svg.append("path")
        //     .attr("class", "state-borders")
        //     .attr("d", path(topojson.mesh(response.json(), response.json().states, function(a, b) { return a !== b; })))










        var g = svg.append("g")
            .attr("class", "states")
            .selectAll("path")
            .data(toDraw)
            .enter() 
            .append("path")
            .attr("class", "state-borders")
            .attr("d", path)
            ;


            this.d3.selectAll("path").on('click', function(){
              console.log('clicked')
            })
  });
}

}























