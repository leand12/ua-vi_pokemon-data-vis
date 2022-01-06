import useCompareStore from "stores/useCompareStore";
import * as d3 from "d3";

const margin = 30;
const scalingX = 1;
const scalingY = 1;


export function initScatterPlot() {
   let svg = d3.select("svg.scatter-chart");

   let yScale = d3.scaleLinear()
      .domain([0, 255 * scalingY])
      .range([255 * scalingY, 0]);

   let xScale = d3.scaleLinear()
      .domain([0, 255 * scalingX])
      .range([0, 255 * scalingX]);

   svg.append("g").attr("id", "yAxis")
      .attr("transform", "translate(" + margin + ",0)")
      .call(d3.axisLeft(yScale));

   svg.append("g").attr("id", "xAxis")
      .attr("transform", "translate(" + margin + "," + 255 * scalingY + ")")
      .call(d3.axisBottom(xScale));
}

export function loadScatterPlot(data, ax1, ax2) {
   let svg = d3.select("svg.scatter-chart");

   svg.select("g.points").remove();

   svg.append("g")
      .attr("class", "points")
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("r", 2)
      .attr("cx", d => (d[ax1] * scalingX + margin))
      .attr("cy", d => ((255 - d[ax2]) * scalingY - margin))
      .attr("fill", "blue")
      .on("click", (e, d) => {selectPokemon(d)});
}
function selectPokemon(pk) {
   console.log(pk)
   useCompareStore.getState().setSelected(pk);
}