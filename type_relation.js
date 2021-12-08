
var svg = d3.select("#type_relation"),
    width = +svg.node().getBoundingClientRect().width,
    height = +svg.node().getBoundingClientRect().height;

// svg objects
var link, node, nodeText;
// the data - an object with nodes and links
var graph;

// load the data
// d3.json("miserables.json").then(function (data) {
//     graph = data;
//     initializeDisplay();
//     initializeSimulation();
// });

d3.json("data.json").then(function (data) {
    transformData(data);
    initializeDisplay();
    initializeSimulation();
});

let colours = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
};

function transformData(data) {
    let types = {}, links = {};

    for (var d of data.pokemons) {
        console.log(d.generation)
        if (d.generation != 1)
            continue;

        let dtype;

        if (d.type2 && d.type1 != d.type2) {
            dtype = [d.type1, d.type2].sort().join(" ");
            links[dtype] = [d.type1, d.type2];
            for (const t of [d.type1, d.type2])
                if (!(t in types)) {
                    types[t] = 0;
                }

        } else {
            dtype = d.type1;
        }

        if (dtype in types) {
            types[dtype] += 1;
        } else {
            types[dtype] = 1;
        }
    }

    graph = { nodes: [], links: [] }
    for (var [t, v] of Object.entries(types)) {
        graph.nodes.push({ id: t, value: v });
    }
    for (var [s, targets] of Object.entries(links)) {
        for (var t of targets) {
            graph.links.push({ source: s, target: t });
        }
    }
}



//////////// FORCE SIMULATION //////////// 

// force simulator
var simulation = d3.forceSimulation(graph);

// set up the simulation and event to update locations after each tick
function initializeSimulation() {
    simulation.nodes(graph.nodes);
    initializeForces();
    simulation.on("tick", ticked);
}

// values for all forces
forceProperties = {
    center: {
        x: 0.5,
        y: 0.5
    },
    charge: {
        enabled: true,
        strength: -30,
        distanceMin: 1,
        distanceMax: 2000
    },
    collide: {
        enabled: true,
        strength: .7,
        iterations: 1,
        radius: 5
    },
    forceX: {
        enabled: false,
        strength: .1,
        x: .5
    },
    forceY: {
        enabled: false,
        strength: .1,
        y: .5
    },
    link: {
        enabled: true,
        distance: 30,
        iterations: 1
    }
}

// add forces to the simulation
function initializeForces() {
    // add forces and associate each with a name
    simulation
        .force("link", d3.forceLink())
        .force("charge", d3.forceManyBody())
        .force("collide", d3.forceCollide())
        .force("center", d3.forceCenter())
        .force("forceX", d3.forceX())
        .force("forceY", d3.forceY());
    // apply properties to each of the forces
    updateForces();
}

// apply new force properties
function updateForces() {
    // get each force by name and update the properties
    simulation.force("center")
        .x(width * forceProperties.center.x)
        .y(height * forceProperties.center.y);
    simulation.force("charge")
        .strength(forceProperties.charge.strength * forceProperties.charge.enabled)
        .distanceMin(forceProperties.charge.distanceMin)
        .distanceMax(forceProperties.charge.distanceMax);
    simulation.force("collide")
        .strength(forceProperties.collide.strength * forceProperties.collide.enabled)
        .radius(function (d) { return nodeRadius(d.value) + 10; })
        .iterations(forceProperties.collide.iterations);
    simulation.force("forceX")
        .strength(forceProperties.forceX.strength * forceProperties.forceX.enabled)
        .x(width * forceProperties.forceX.x);
    simulation.force("forceY")
        .strength(forceProperties.forceY.strength * forceProperties.forceY.enabled)
        .y(height * forceProperties.forceY.y);
    simulation.force("link")
        .id(function (d) { return d.id; })
        .distance(forceProperties.link.distance)
        .iterations(forceProperties.link.iterations)
        .links(forceProperties.link.enabled ? graph.links : []);

    // updates ignored until this is run
    // restarts the simulation (important if simulation has already slowed down)
    simulation.alpha(1).restart();
}


function nodeRadius(value) {
    return (Math.log(value+1) + 1) * 8
}



//////////// DISPLAY ////////////

// generate the svg objects and force simulation
function initializeDisplay() {
    // set the data and properties of link lines
    link = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(graph.links)
        .enter().append("line");

    // set the data and properties of node circles
    node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(graph.nodes)
        .enter().append("circle")
        .attr("r", function (d) { return nodeRadius(d.value); })
        .attr("stroke", function (d) { return colours[d.id]; })
        .attr("fill", function (d) { return colours[d.id]; })
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    nodeText = svg.append("g")
        .attr("class", "nodes-text noselect")
        .selectAll("text")
        .data(graph.nodes)
        .enter().append("text")
        .text(function (d) { return d.id + "\n" + d.value; })


    // node tooltip
    node.append("title")
        .text(function (d) { return d.id; });
    // visualize the graph
    updateDisplay();
}

// update the display based on the forces (but not positions)
function updateDisplay() {
    // node
    //     .attr("r", forceProperties.collide.radius)
    //     .attr("stroke", forceProperties.charge.strength > 0 ? "blue" : "red")
    //     .attr("stroke-width", forceProperties.charge.enabled == false ? 0 : Math.abs(forceProperties.charge.strength) / 15);

    link
        .attr("stroke-width", forceProperties.link.enabled ? 1 : .5)
        .attr("opacity", forceProperties.link.enabled ? 1 : 0);
}

// update the display positions after each simulation tick
function ticked() {
    link
        .attr("x1", function (d) { return d.source.x; })
        .attr("y1", function (d) { return d.source.y; })
        .attr("x2", function (d) { return d.target.x; })
        .attr("y2", function (d) { return d.target.y; });

    node
        .attr("cx", function (d) { return d.x; })
        .attr("cy", function (d) { return d.y; });

    nodeText
        .attr("x", function (d) { return d.x - nodeRadius(d.value); })
        .attr("y", function (d) { return d.y; })
        .style("font-size", (d) => { return nodeRadius(d.value) * .5; });
    d3.select('#alpha_value').style('flex-basis', (simulation.alpha() * 100) + '%');
}



//////////// UI EVENTS ////////////

function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
}

function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0.0001);
    d.fx = null;
    d.fy = null;
}

// update size-related forces
d3.select(window).on("resize", function () {
    width = +svg.node().getBoundingClientRect().width;
    height = +svg.node().getBoundingClientRect().height;
    updateForces();
});

// convenience function to update everything (run after UI input)
function updateAll() {
    updateForces();
    updateDisplay();
}