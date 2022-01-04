
import * as d3 from "d3";

export function loadScatterPlot(data, ax1, ax2) {

    const margin = 30;
    const scalingX = 1;
    const scalingY = 1;

    let yScale = d3.scaleLinear()
                    .domain([0, 255*scalingY])
                    .range([255*scalingY, 0]);

    let xScale = d3.scaleLinear()
                    .domain([0, 255*scalingX])
                    .range([0, 255*scalingX]);
    
    let svg = d3.select(".scatter-chart");
    
    svg.selectAll("*").remove();
    
    svg.selectAll(".points").data(data)
       .join("circle")
       .attr("r", 2)
       .attr("cx", d => (d[ax1] * scalingX + margin))
       .attr("cy", d => ((255 - d[ax2])* scalingY - margin))
       .attr("fill", "blue");



    svg.append("g").attr("id", "yAxis")
                    .attr("transform", "translate("+margin+",0)")
                   .call(d3.axisLeft(yScale));

    svg.append("g").attr("transform", "translate("+margin+","+255*scalingY+")")
                   .attr("id", "xAxis")
                   .call(d3.axisBottom(xScale));



}