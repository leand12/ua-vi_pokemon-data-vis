
import * as d3 from "d3"

export function loadBarChartGenerations(pokemons) {

    let generations = {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0};
    for(let i=0; i < pokemons.length; i++) {
        generations[pokemons[i].generation] += 1
    }
    
    let max = 0;
    for(let i of Object.keys(generations)){
        if(generations[i] > max)
            max = generations[i];
    }

    let height = 400;
    let width = 400;
    let margin = 60;
    let svg = d3.select(".charts-bar").attr("height", height + 2*margin).attr("width", width+ 2*margin)
                .append("g")
                .attr("transform", "translate("+margin+","+ margin+")");
    
    // X axis
    let x = d3.scaleBand()
        .range([ 0, width ])
        .domain([1,2,3,4,5,6,7])
    
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
    
        // Add Y axis
    let y = d3.scaleLinear()
        .domain([0, 200])
        .range([ height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));


    svg.append("text").attr("x", width/2 - margin/2).attr("y", height + margin/2).text("Generation")
    svg.append("text").attr("transform", "translate("+ (-margin/2 - 5)+","+(margin + height/2)   +")rotate(270)").text("Number of Pokemons")

    let data = [...Object.values(generations)]
    // Bars
    svg.selectAll("bars")
        .data(data)
        .enter()
        .append("rect")
            .attr("x", function(d, i) { return width/7 * i + 5 })
            .attr("width", width/7 - 10)
            .attr("fill", "blue")
            // no bar at the beginning thus:
            .attr("y", (d) => y(d))
            .attr("height", function(d) {return height - y(d); });

}