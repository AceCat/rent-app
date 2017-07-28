import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Http, Response} from '@angular/http';
import { Router } from '@angular/router';
import { D3Service, D3, Selection } from 'd3-ng2-service'; 


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
	private d3: D3; // <-- Define the private member which will hold the d3 reference
	private parentNativeElement: any;

  housingData: HousingData = new HousingData();
  housingDataArray: HousingData[] = [];
  searchData = "";
  searchDataName = ""
  zipId = "";




  constructor(private route: ActivatedRoute, private http: Http, private router: Router, element: ElementRef, d3Service: D3Service) { 
    this.d3 = d3Service.getD3(); // <-- obtain the d3 object from the D3 Service
    this.parentNativeElement = element.nativeElement;
    let id = this.route.snapshot.params.id;
    this.grabRentPerSquareFoot(id)
  }

  ngOnInit() {
  	
  }

  grabRentPerSquareFoot(id){
  	this.http.get('https://www.quandl.com/api/v3/datasets/ZILL/Z' + id + '_RZSF.json?api_key=L2G7Ec6a-naz3StPLMBw').subscribe(response => {
  		this.housingDataArray = response.json().dataset.data
      this.zipId = id
  		console.log(this.housingDataArray)
  		this.makeChart()
  	})
  }

  makeChart(){
    var self = this
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
    var parseDate = this.d3.timeParse("%Y-%m-%d");
    var formatTime = this.d3.timeFormat("%e %B");

    var x = this.d3.scaleTime()
    .range([0, width])
    var y = this.d3.scaleLinear()
    .range([height, 0]);
    var xAxis = this.d3.axisBottom(x)
    var yAxis = this.d3.axisLeft(y)
    var line = this.d3.line()
    .x(function(d) { return x(d['date']); })
    .y(function(d) { return y(d['amount']); });


    var toolTip = this.d3.select(".chart").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);


    
    var svg = this.d3.select(".chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr('class', 'currentChart')
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      var data = this.housingDataArray.map(function(d) {
      return {
         date: parseDate(d[0]),
         amount: d[1]
      }
    })


      console.log(data)
    x.domain(this.d3.extent(data, function(d) { return d.date; }));
    y.domain(this.d3.extent(data, function(d) { return d.amount; }));
      svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
      svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
       
       svg.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top + 10) + ")")
      .style("text-anchor", "middle")
      .text("Date");


        svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Dollars and cents dawg");  


      svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", <any>line);

      svg.selectAll("dot")
        .data(data)
        .enter().append("circle")
        .attr("r", 3.5)
        .attr("cx", function(d) { return x(d.date); })
        .attr("cy", function(d) { return y(d.amount); })
        .on("mouseover", function(d) {
       console.log('Working')
       toolTip.transition()
         .duration(200)
         .style("opacity", .9);
       toolTip.html(formatTime(d.date) + "<br/>" + '$' + d.amount)
         .style("left", (self.d3.event.pageX) + "px")
         .style("top", (self.d3.event.pageY - 28) + "px");
       })
     .on("mouseout", function(d) {
       toolTip.transition()
         .duration(500)
         .style("opacity", 0);

  });
  }

  selectData() {
        var chart = document.getElementsByClassName('currentChart')
        chart[0].remove()
        this.http.get('https://www.quandl.com/api/v3/datasets/ZILL/Z' + this.zipId + '_' + this.searchData + '.json?api_key=L2G7Ec6a-naz3StPLMBw').subscribe(response => {
          this.housingDataArray = response.json().dataset.data
          this.makeChart()

        })


  }


}
