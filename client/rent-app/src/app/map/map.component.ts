import { Component, OnInit, ElementRef } from '@angular/core';
import {Http, Response} from '@angular/http';
import { Router } from '@angular/router';
import { D3Service, D3, Selection } from 'd3-ng2-service'; 
import {MdInputModule} from '@angular/material';

declare let topojson: any;



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
	private d3: D3; // <-- Define the private member which will hold the d3 reference
	private parentNativeElement: any;
  
  state = {
    name: ""
  };

  zipCode = "";


  statesArray = [{
  	name: "Alabama",
  	value: "Alabama"
  },
  {
  	name: "Alaska",
  	value: "Alaska"
  }
  ]

  stateNamesAndCoords = {
    Alabama: [32.6010112,-86.6807365],
    Alaska: [61.3025006,-158.7750198],
    Arizona: [34.1682185,-111.930907],
    Arkansas: [34.7519275,-92.1313784],
    California: [37.2718745,-119.2704153],
    Colorado: [38.9979339,-105.550567],
    Connecticut: [41.5187835,-72.757507],
    Delaware: [39.145251,-75.4189206],
    District_of_Columbia: [38.8993487,-77.0145666],
    Florida: [27.9757279,-83.8330166],
    Georgia: [32.6781248,-83.2229757],
    Hawaii: [20.46,-157.505],
    Idaho: [45.4945756,-114.1424303],
    Illinois: [39.739318,-89.504139],
    Indiana: [39.7662195,-86.441277],
    Iowa: [41.9383166,-93.389798],
    Kansas: [38.4987789,-98.3200779],
    Kentucky: [37.8222935,-85.7682399],
    Louisiana: [30.9733766,-91.4299097],
    Maine: [45.2185133,-69.0148656],
    Maryland: [38.8063524,-77.2684162],
    Massachusetts: [42.0629398,-71.718067],
    Michigan: [44.9435598,-86.4158049],
    Minnesota: [46.4418595,-93.3655146],
    Mississippi: [32.5851062,-89.8772196],
    Missouri: [38.3046615,-92.437099],
    Montana: [46.6797995,-110.044783],
    Nebraska: [41.5008195,-99.680902],
    Nevada: [38.502032,-117.0230604],
    New_Hampshire: [44.0012306,-71.5799231],
    New_Jersey: [40.1430058,-74.7311156],
    New_Mexico: [34.1662325,-106.0260685],
    New_York: [40.7056258,-73.97968],
    North_Carolina: [35.2145629,-79.8912675],
    North_Dakota: [47.4678819,-100.3022655],
    Ohio: [40.1903624,-82.6692525],
    Oklahoma: [35.3097654,-98.7165585],
    Oregon: [44.1419049,-120.5380993],
    Pennsylvania: [40.9945928,-77.6046984],
    Rhode_Island: [41.5827282,-71.5064508],
    South_Carolina: [33.62505,-80.9470381],
    South_Dakota: [44.2126995,-100.2471641],
    Tennessee: [35.830521,-85.9785989],
    Texas: [31.1693363,-100.0768425],
    Utah: [39.4997605,-111.547028],
    Vermont: [43.8717545,-72.4477828],
    Virginia: [38.0033855,-79.4587861],
    Washington: [47.7511,-120.7401],
    West_Virginia: [38.9201705,-80.1816905],
    Wisconsin: [44.7862968,-89.8267049],
    Wyoming: [43.000325,-107.5545669]
  }

  constructor(private http: Http, private router: Router, element: ElementRef, d3Service: D3Service) { // <-- pass the D3 Service into the constructor
    this.d3 = d3Service.getD3(); // <-- obtain the d3 object from the D3 Service
    this.parentNativeElement = element.nativeElement;
  }




  ngOnInit() {

  }


makeMap () {
	var self = this

	var maps = document.getElementsByClassName('currentMap')
	if (maps.length > 0){
        maps[0].remove()
	}


    this.http.get('https://raw.githubusercontent.com/storiesofsolidarity/us-data/gh-pages/geography/zcta/'+ this.state.name +'.topo.json').subscribe(response => {
    	var width = 960
        var height = 700;
        var active = this.d3.select(null)
        var otherSelf = this


        var zoom = this.d3.zoom()
          .scaleExtent([0.2, 8])
          .on("zoom", zoomed);

        var svg = self.d3.select( ".map" )
          .append( "svg" )
          .attr( "width", width )
          .attr( "height", height )
          .attr('class', 'currentMap')
          ;


        var g = svg.append( "g" )
          .attr('class', 'state');

         svg
           .call(zoom);

        let thisStateLat = this.stateNamesAndCoords[this.state.name][0]
        let thisStateLong = this.stateNamesAndCoords[this.state.name][1] * -1

        var albersProjection = this.d3.geoAlbers()
          .scale( 6000 )
          .rotate( [thisStateLong,0] )
          .center( [0, thisStateLat] )
          .translate( [width/2,height/2] )
          ;

        console.log(response.json())

        var geoPath = this.d3.geoPath()
          .projection( albersProjection );

          g.selectAll( "path" )
            .data(topojson.feature(response.json(), response.json().objects[this.state.name + ".geo"]).features)
            .enter()
            .append( "path" )
            .attr( "d", geoPath )
            .attr( "class", "zip-borders")
            .attr( 'id', function(d, i){
              return response.json().objects[self.state.name + ".geo"].geometries[i].id
            })
            .on('click', function(d, i){
               self.router.navigate(['/view', response.json().objects[self.state.name + ".geo"].geometries[i].id])
              })
   
            console.log('done')

            function zoomed() {
              g.style("stroke-width", 1.5 / self.d3.event.scale + "px");
              g.attr("transform", self.d3.event.transform);
            }


      	})
  }

  searchZip(){
  	this.router.navigate(['/view/' + this.zipCode])
  }


}
























