
import * as d3 from "d3"

export function loadLineChart(data){


    let series = [];

    let attributes = ["attack", "defense", "sp_attack", "sp_defense", "speed", "hp"];
    let generation_values = {1:[0,0,0,0,0,0], 2:[0,0,0,0,0,0], 3:[0,0,0,0,0,0], 4:[0,0,0,0,0,0], 5:[0,0,0,0,0,0], 6:[0,0,0,0,0,0], 7:[0,0,0,0,0,0]};
    let counters = [0,0,0,0,0,0,0];
    for(let i=0; i < data.length; i++) {
        for(let j=0; j < attributes.length; j++) {
            generation_values[data[i].generation][j] += data[i][attributes[j]];
        }
        counters[data[i].generation - 1] += 1 
    }

    for(let a=0; a < attributes.length; a++) {
        let temp = [];
        for(let i=0; i < counters.length; i++) {
            temp.push({time: i + 1, value: Math.round(generation_values[i+1][a]/counters[i])})
        }
        series.push(temp);
    }

    let width = 500;
    let height = 500;
    let margin = 45;
    let svg = d3.select(".charts-line").attr("width", width + margin).attr("height", height + margin*2).attr("transform", "translate("+margin+","+margin+")");

    let color = d3.scaleOrdinal()
        .domain(attributes)
        .range(['red','blue','purple','pink','brown','green'])

    let y = d3.scaleLinear()
        .range([height, 0])
        .domain([60,90])
    let x = d3.scaleBand().range([0, width]).domain([1,2,3,4,5,6,7])

    console.log(series)
    // [ {time:1 , value: 10} , {time: 2, value:10}] , [{time:1 , value: 20} , {time: 2, value:20}]
    let line = d3.line()
        .x(function(d) { return x(d.time) + margin + x(2)/2 }) // need to scale this 
        .y(function(d) { return y(d.value); })
        .curve(d3.curveLinear);
    
    svg.selectAll("g")
        .data(series)
        .enter().append("g")
        .append("path")
        .attr("id", (d,i) => (attributes[i])) 
        .attr("stroke", (d,i) => {console.log(i, color(i+1));return color(i)})
        .attr("stroke-width", "2px")
        .attr("fill", "none")
        .attr("d", line)
        .on("mouseover", function() {d3.select(this).attr("stroke-width", "4px")})
        .on("mouseout", function() {d3.select(this).attr("stroke-width", "2px")})
    
    svg.append("g")
        .attr("transform", "translate("+margin+","+height+")")
        .call(d3.axisBottom(x));

        
        
    svg.append("g")
        .attr("transform", "translate("+margin+",0)")
        .call(d3.axisLeft(y));
 
        
    let lineLegend = svg.selectAll(".lineLegend").data(attributes)
        .enter().append("g")
        .attr("class","lineLegend")
        .attr("transform", function (d,i) {
                return "translate(" + (margin + 10) + "," + (i*20 + 5)+")";
            });
    
    lineLegend.append("text").text(function (d) {return d[0].toUpperCase() + d.slice(1).replace("_", " ");})
        .attr("transform", "translate(15,10)"); //align texts with boxes
    
    lineLegend.append("rect")
        .attr("fill", function (d, i) {return color(d); })
        .attr("width", 10).attr("height", 10);


    svg.append("text").attr("x", width/2 ).attr("y", height + margin).text("Generation")
    svg.append("text").attr("transform", "translate("+ (margin/2 - 10)+","+(margin + height/2)   +")rotate(270)").text("Stats Value")
    

}