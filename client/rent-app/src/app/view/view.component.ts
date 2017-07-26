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

//   makeChart(){
//     var margin = {top: 20, right: 20, bottom: 30, left: 50},
//     width = 960 - margin.left - margin.right,
//     height = 500 - margin.top - margin.bottom;
//     var parseDate = this.d3.timeParse("%Y-%m-%d");
//     var x = this.d3.scaleTime()
//     .range([0, width])
//     var y = this.d3.scaleLinear()
//     .range([height, 0]);
//     var xAxis = this.d3.axisBottom(x)
//     var yAxis = this.d3.axisLeft(y)
//     var line = this.d3.line()
//     .x(function(d) { return x(d['date']); })
//     .y(function(d) { return y(d['amount']); });
    
//     var svg = this.d3.select("body").append("svg")
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//         .append("g")
//         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//       var data = this.housingDataArray.map(function(d) {
//       return {
//          date: parseDate(d[0]),
//          amount: d[1]
//       }
//   })
//       console.log(data)
//   x.domain(this.d3.extent(data, function(d) { return d.date; }));
//   y.domain(this.d3.extent(data, function(d) { return d.amount; }));
//     svg.append("g")
//       .attr("class", "x axis")
//       .attr("transform", "translate(0," + height + ")")
//       .call(xAxis);
//     svg.append("g")
//       .attr("class", "y axis")
//       .call(yAxis)
//     .append("text")
//       .attr("transform", "rotate(-90)")
//       .attr("y", 6)
//       .attr("dy", ".71em")
//       .style("text-anchor", "end")
//       .text("Price ($)");
//     svg.append("path")
//       .data(data)
//       .attr("class", "line")
//       .attr("d", <any>line);
// }


}
