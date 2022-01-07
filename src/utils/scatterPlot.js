import useCompareStore from "stores/useCompareStore";
import * as d3 from "d3";

const margin = 30;
const scalingX = 1;
const scalingY = 1;

const width = 300, height = 300;
let svg, scatter, xAxis, yAxis, yScale, xScale, xType, yType;

export function initScatterPlot() {
   svg = d3.select("svg.scatter-chart");

   svg.selectAll("*").remove()

   svg.append("defs").append("SVG:clipPath")
      .attr("id", "clip")
      .append("svg:rect")
      .attr("width", 255)
      .attr("height", 255)
      .attr("x", margin)
      .attr("y", margin / 2);

   yScale = d3.scaleLinear()
      .domain([0, 255 * scalingY])
      .range([255 * scalingY, 0]);

   xScale = d3.scaleLinear()
      .domain([0, 255 * scalingX])
      .range([0, 255 * scalingX]);

   yAxis = svg.append("g").attr("id", "yAxis")
      .attr("transform", "translate(" + margin + "," + margin / 2 + ")")
      .call(d3.axisLeft(yScale));

   xAxis = svg.append("g").attr("id", "xAxis")
      .attr("transform", "translate(" + margin + "," + (255 * scalingY + margin / 2) + ")")
      .call(d3.axisBottom(xScale));

   var zoom = d3.zoom()
      .scaleExtent([1, 5])
      .extent([[0, 0], [255, 255]])
      .on("zoom", updateChart);

   svg.append("rect")
      .attr("width", width)
      .attr("height", height)
      .style("fill", "none")
      .style("pointer-events", "all")
      .call(zoom);
}

function updateChart(event) {

   // recover the new scale
   const newX = event.transform.rescaleX(xScale);
   const newY = event.transform.rescaleY(yScale);

   // update axes with these new boundaries
   xAxis.call(d3.axisBottom(newX))
   yAxis.call(d3.axisLeft(newY))

   // update circle position
   scatter.attr("transform", event.transform)

   // .selectAll("circle")
   // .attr('cx', function (d) { return newX(d[xType] * scalingX + margin) })
   // .attr('cy', function (d) { return newY(d[yType] * scalingY + margin / 2) })
   // .attr("r", 0.5 * event.transform.k + 1.5);
}

export function loadScatterPlot(data, ax1, ax2) {
   [xType, yType] = [ax1, ax2];

   svg.select("g.points").remove();

   scatter = svg.append("g")
      .attr("clip-path", "url(#clip)")
      .attr("class", "points")
      .append("g");

   scatter
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("r", 1.2)
      .attr("cx", d => (d[ax1] * scalingX + margin))
      .attr("cy", d => ((255 - d[ax2]) * scalingY + margin / 2))
      .attr("fill", "rgb(0, 160, 176)")
      .attr("fill-opacity", 0.6)
      .on("click", function (e, d) {
         useCompareStore.getState().setSelected(d);
      })
      .on("mouseover", function () {
         d3.select(this).style("fill-opacity", 1);
      })
      .on("mouseout", function (e, d) {
         let { selected, compare1, compare2 } = useCompareStore.getState();
         if ([selected.pokedex_number, compare1.pokedex_number,
         compare2.pokedex_number].includes(d.pokedex_number)) {
            d3.select(this).style("fill-opacity", 1);
         } else {
            d3.select(this).style("fill-opacity", 0.6);
         }
      });
}

export function changeColors(state) {
   let { selected, compare1, compare2 } = state;
   scatter
      .selectAll("circle")
      .each(function () {
         const id = d3.select(this).data()[0].pokedex_number;
         let color;
         if (selected.pokedex_number === id) {
            color = "#222";
         } else if (compare1.pokedex_number === id) {
            color = "rgb(204, 51, 63)";
         } else if (compare2.pokedex_number === id) {
            color = "rgb(237, 201, 81)";
         }
         if (color) {
            d3.select(this).attr("fill", color).attr("fill-opacity", 1);
         } else {
            d3.select(this).attr("fill", "rgb(0, 160, 176)").attr("fill-opacity", 0.6);
         }
      })
}