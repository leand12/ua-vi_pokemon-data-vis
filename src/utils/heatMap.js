import * as d3 from "d3";

export function getTypeData(pokemons) {

    let data = {};
    let counts = {};
    let atributes = ["attack", "defense", "sp_attack", "sp_defense", "speed", "hp"]

    for(let pk of pokemons) {

        if(!data[pk.type1]){
            data[pk.type1] = [0,0,0,0,0,0]
            counts[pk.type1] = 0
        }
        counts[pk.type1]++
        for(let i=0; i < atributes.length; i++) {
            data[pk.type1][i] += pk[atributes[i]]
        } 

        if(pk.type2){ 
            if(!data[pk.type2]) {
                data[pk.type2] = [0,0,0,0,0,0]         
                counts[pk.type2] = 0
            }
            counts[pk.type2]++
            for(let i=0; i < atributes.length; i++) {
                data[pk.type2][i] += pk[atributes[i]]
            } 
        }
        
    }

    let final_data = [];

    for(let type of Object.keys(data)) {
        let temp = [];
        for(let i=0; i < data[type].length; i++) {
            temp.push(Math.round(data[type][i]/counts[type]));
        }
        final_data.push(temp);
    }

    return [final_data, Object.keys(data), atributes]

}

export function getStatsCorrelationData(pokemons) {

    let counters = [0,0,0,0,0,0];
    let atributes = ["attack", "defense", "sp_attack", "sp_defense", "speed", "hp"]

    
    for(let pk of pokemons) {
        for(let i=0; i<atributes.length; i++) {
            counters[i] += pk[atributes[i]]
        }
    }

    for(let i=0; i < counters.length; i++)
        counters[i] = Math.round(counters[i]/pokemons.length)
    

    let cov = [];
    for(let i=0; i < atributes.length; i++) {
        cov.push([0,0,0,0,0,0])
    }
    
    let std = [0,0,0,0,0,0];
    for(let pk of pokemons) {

        let distances = [];
        for(let i=0; i < atributes.length; i++) {
            distances.push(pk[atributes[i]] - counters[i])
            std[i] += Math.pow(pk[atributes[i]] - counters[i],2)
        }
        for(let i=0; i < atributes.length; i++) {
            for(let j=i; j < atributes.length; j++) {
                cov[i][j] += distances[i]*distances[j];
                cov[j][i] = cov[i][j]; 
            }
        }
    }

    for(let i=0; i < std.length; i++)
        std[i] = Math.sqrt(std[i]/pokemons.length)

    for(let i=0; i < atributes.length; i++) {
        for(let j=i; j < atributes.length; j++) {
            cov[i][j] = cov[i][j] / (pokemons.length*std[i]*std[j]) ;
            cov[j][i] = cov[i][j]; 
        }
    }

    return [cov, atributes, atributes]
}

export function loadTypeHeatmap(data, xLabel, yLabel, id){


    /*
        data = [[]]
    */

   let margin = 80;
    // Tooltip

    let tooltip = d3.select('#' + id)
                    .append("div")
                    .style("opacity", 0)
                    .attr("class", "tooltip")
                    .style("background-color", "white")
                    .style("border", "solid")
                    .style("border-width", "2px")
                    .style("border-radius", "5px")
                    .style("padding", "5px")
                    .style("position", "absolute")
                    .style("display", "block")
                    .style("left", 0)
                    .style("top", 0)

                    

    let mouseover = function (d) {
        tooltip.style("opacity", 1)
        tooltip.style("z-index", 1000)

    }
    let mousemove = function (event, d) {
        tooltip
            .html(d)
            .style("left", (event.pageX - 100 - margin) + "px")
            .style("top", (event.pageY) + "px")
    }
    let mouseleave = function (d) {
        tooltip.style("opacity", 0)
        tooltip.style("z-index", -1)
    }


    let max = data[0][0]
    let min = data[0][0]
    for(let i=0; i < data.length; i++) {
        for(let j=0; j < data[0].length; j++) {
            if(data[i][j] > max)
                max = data[i][j]
            else if(data[i][j] < min)
                min = data[i][j]
        }
    }

    let colors = d3.scaleLinear()
        .range(["black", "white"])
        .domain([min, max])

    let cell_size = 50;


    let svg = d3.select('#' + id + " .charts-heatmap");
    let height = yLabel.length*cell_size
    let width = xLabel.length*cell_size

    svg.attr("width", width + margin).attr("height", height + margin);

    svg.selectAll("*").remove();

    svg.selectAll("g")
        .data(data).enter()
        .append("g")
        .attr("transform", (d,i) => {return "translate("+i*cell_size +")"})
        .selectAll("rect")
        .data((d) => (d))
        .enter()
        .append("rect")
        .attr("width", cell_size)
        .attr("height", cell_size)
        .attr("fill", (d,i) => {return colors(d)})
        .attr("y", (d,i) => (i * cell_size))
        .attr("x", margin)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave);


    let x = d3.scaleBand().range([0, width]).domain(xLabel)

    svg.append("g")
        .attr("transform", "translate("+margin+","+height+")")
        .call(d3.axisBottom(x));

    let y = d3.scaleBand()
        .range([height, 0])
        .domain(yLabel.reverse())
        
     
    svg.append("g")
        .attr("transform", "translate("+margin+",0)")
        .call(d3.axisLeft(y));

}
