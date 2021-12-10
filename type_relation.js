
var svg = d3.select("svg.type-relation"),
    width = +svg.node().getBoundingClientRect().width,
    height = +svg.node().getBoundingClientRect().height;

// svg objects
var link, node, nodeHalf, nodeText;
// the data - an object with nodes and links
var graph;
var mainNodeRef = {}


d3.json("data.json").then(function (data) {
    transformData(data);
    initializeDisplay();
    initializeSimulation();

    var mysvg = $("svg.type-relation");
    var l1 = $("#l1");
    var l2 = $("#l2");
    var s = $("#s");
    console.log(mysvg, l1)
    mysvg.append(l1);
    mysvg.append(l2);
    mysvg.append(s);
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
        // if (d.generation != 1)
        //     continue;

        let dtype;

        if (d.type2 && d.type1 != d.type2) {
            dtype = [d.type1, d.type2].sort().join(" ");
            links[dtype] = [d.type1, d.type2];

            for (const t of [d.type1, d.type2]) {
                if (!(t in types)) {
                    types[t] = 0;
                }
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
            graph.links.push({ source: s, target: t, value: types[s] });
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

    for (const n of graph.nodes) {
        if (n.id.indexOf(" ") == -1) {
            mainNodeRef[n.id] = n;
        }
    }
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
        distance: 100,
        iterations: 1
    }
}

$('#select-type').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
    console.log($('#select-type').val())
});


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
        .radius((d) => nodeRadius(d.value) + 10)
        .iterations(forceProperties.collide.iterations);
    simulation.force("forceX")
        .strength(forceProperties.forceX.strength * forceProperties.forceX.enabled)
        .x(width * forceProperties.forceX.x);
    simulation.force("forceY")
        .strength(forceProperties.forceY.strength * forceProperties.forceY.enabled)
        .y(height * forceProperties.forceY.y);
    simulation.force("link")
        .id((d) => d.id)
        .distance(forceProperties.link.distance)
        .iterations(forceProperties.link.iterations)
        .links(forceProperties.link.enabled ? graph.links : []);

    // updates ignored until this is run
    // restarts the simulation (important if simulation has already slowed down)
    simulation.alpha(1).restart();
}


function nodeRadius(value) {
    return (Math.log(value + 1) + 1) * 8;
}

function linkWidth(value) {
    return (Math.log(value + 1) + 1);
}


//////////// DISPLAY ////////////

// generate the svg objects and force simulation
function initializeDisplay() {
    // set the data and properties of link lines
    link = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(graph.links)
        .enter().append("line")
        .attr("stroke", (d) => colours[d.target])
    // .attr("stroke-width", 5);

    // set the data and properties of node circles
    node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(graph.nodes)
        .enter().append("circle")
        .attr("r", (d) => nodeRadius(d.value))
        // .attr("stroke", (d) => colours[d.id])
        .attr("fill", (d) => colours[d.id.split(" ")[0]])
        .on("click", filterType)
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    nodeHalf = svg.append("g")
        .attr("class", "nodes-half")
        .selectAll("path")
        .data(graph.nodes.filter((d) => d.id.indexOf(" ") != -1))
        .enter().append("g").append("path")
        .attr("d", (d) => { const r = nodeRadius(d.value); return `M 0 ${r} a 1 1 0 0 0 ${2 * r} 0` })
        .attr("fill", (d) => colours[d.id.split(" ")[1]])
        .attr("mask", "url(#fade)");

    nodeText = svg.append("g")
        .attr("class", "nodes-text noselect")
        .selectAll("text")
        .data(graph.nodes)
        .enter().append("text")
        .text((d) => d.id + "\n" + d.value)
        .style("font-size", (d) => nodeRadius(d.value) * .5)

    // node tooltip
    node.append("title")
        .text((d) => d.id);
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
        .attr("stroke-width", forceProperties.link.enabled ? (d) => linkWidth(d.value) : .5)
        .attr("opacity", forceProperties.link.enabled ? 0.75 : 0);
}

var buff = 0, ML = [];
document.addEventListener('keypress', (event) => {
    // Alert the key name and key code on keydown
    // alert(`Key pressed ${name} \r\n Key code value: ${code}`);
    console.error(event.code, ML)
}, false);

// update the display positions after each simulation tick
function ticked() {
    link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

    node
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y);

    nodeHalf
        .attr("transform", (d) => {
            const r = nodeRadius(d.value),
                [type1, type2] = d.id.split(" "),
                x1 = mainNodeRef[type1].x,
                y1 = mainNodeRef[type1].y,
                x2 = mainNodeRef[type2].x,
                y2 = mainNodeRef[type2].y,
                // a = Math.atan((d.y - y1 + d.y - y2) / (d.x - x1 + d.x - x2)) * 180 / Math.PI;

                // uv = (x1 - d.x) * (x2 - d.x) + (y1 - d.y) * (y2 - d.y),
                // u = Math.sqrt(Math.pow(x1 - d.x, 2) * Math.pow(y1 - d.y, 2)),
                // v = Math.sqrt(Math.pow(x2 - d.x, 2) * Math.pow(y2 - d.y, 2)),
                // a = Math.acos( uv / (u*v) ) * 180 / Math.PI;

                a1 = Math.atan2((d.y - y1), (d.x - x1)),
                a2 = Math.atan2((d.y - y2), (d.x - x2)),
                a3 = (a1 + a2) / 2,
                slope = Math.tan(a3);


            let a = a3 * 180 / Math.PI;


            if (a1 < 0) {
                a += 180;
            }

            if (a1 > 0 && a1 < a2) {
                a += 180;
            }

            if (a1 < 0 && a2 < 0 && a1 > a2) {
                a += 180;
            }

            // var t = uv / (u * v); +
            // if (t > 1 || t < -1) console.error(t, d.x, d.y, x1, y1, x2, y2)

            if (d.id === "flying normal") {
                if (++buff === 10) {
                    buff = 0;
                    console.log(a1 * 180 / Math.PI, a2 * 180 / Math.PI, a3 * 180 / Math.PI)
                    ML = [a1 * 180 / Math.PI, a2 * 180 / Math.PI, a3 * 180 / Math.PI];
                }
                d3.select("#l1")
                    .attr("x1", d.x)
                    .attr("x2", x1)
                    .attr("y1", d.y)
                    .attr("y2", y1)
                d3.select("#l2")
                    .attr("x1", d.x)
                    .attr("x2", x2)
                    .attr("y1", d.y)
                    .attr("y2", y2)
                d3.select("#s")
                    .attr("x1", d.x)
                    .attr("x2", d.x + 200)
                    .attr("y1", d.y)
                    .attr("y2", d.y + 200 * slope)
                // console.log(a, d.y - y1 + d.y - y2, d.x - x1 + d.x - x2)
            }

            return `translate(${d.x - r}, ${d.y - r}) rotate(${a}, ${r}, ${r})`
        });

    nodeText
        .attr("x", (d) => d.x - nodeRadius(d.value))
        .attr("y", (d) => d.y);

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
    event.sourceEvent.stopPropagation();
}

function filterType(event, d) {
    console.log("button clicked", event, d);
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