import * as d3 from "d3";

let svg, width, height, simulation;
// svg objects
let link, node, nodeHalf, nodeText;
// the data: an object with nodes and links
let graph;
// an auxiliar object for halfNode orientation
let mainNodePtr = {};

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

// values for all forces
export const forceProperties = {
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

export function transformData(data) {
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

function nodeRadius(node) {
    return (Math.log(node.value + 1) + 1) * 8;
}

function linkWidth(link) {
    return (Math.log(link.value + 1) + 1);
}

function isMainNode(node) {
    return node.id.indexOf(" ") == -1;
}

// set up the simulation and event to update locations after each tick
export function initializeSimulation() {
    // create map with node references
    for (const n of graph.nodes) {
        if (isMainNode(n)) {
            mainNodePtr[n.id] = n;
        }
    }
    // force simulator
    simulation = d3.forceSimulation(graph);

    simulation.nodes(graph.nodes);

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

    simulation.on("tick", ticked);

    // update size-related forces
    d3.select(window).on("resize", () => {
        width = svg.node().getBoundingClientRect().width;
        height = +svg.node().getBoundingClientRect().height;
        updateForces();
    });
}


// apply new force properties
export function updateForces() {
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
        .radius((d) => nodeRadius(d) + 10)
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



//////////// DISPLAY ////////////

// generate the svg objects and force simulation
export function initializeDisplay() {
    svg = d3.select("svg.type-relation");
    svg.selectAll("*:not(defs, defs *)").remove();

    width = svg.node().getBoundingClientRect().width;
    height = svg.node().getBoundingClientRect().height;

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
        .attr("r", (d) => nodeRadius(d))
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
        .data(graph.nodes.filter((d) => !isMainNode(d)))
        .enter().append("g").append("path")
        .attr("d", (d) => { const r = nodeRadius(d); return `M 0 ${r} a 1 1 0 0 0 ${2 * r} 0` })
        .attr("fill", (d) => colours[d.id.split(" ")[1]])
        .attr("mask", "url(#fade)")
        .on("click", filterType);

    nodeText = svg.append("g")
        .attr("class", "nodes-text noselect")
        .selectAll("g")
        .data(graph.nodes)
        .enter().append("g")
        .style("font-size", (d) => nodeRadius(d) * .5)

    nodeText
        .append("text")
        .attr("text-anchor", "middle")
        .text((d) => d.id.split(" ")[0])
        .attr("y", d => -nodeRadius(d) * (isMainNode(d) ? .15 : .3))

    nodeText
        .filter(d => !isMainNode(d))
        .append("text")
        .attr("text-anchor", "middle")
        .text((d) => d.id.split(" ")[1])
        .attr("y", d => nodeRadius(d) * .2)

    nodeText
        .append("text")
        .attr("text-anchor", "middle")
        .attr("font-weight", "bold")
        .text((d) => d.value)
        .attr("y", d => nodeRadius(d) * (isMainNode(d) ? .35 : .6))

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
        .attr("stroke-width", forceProperties.link.enabled ? (d) => linkWidth(d) : .5)
        .attr("opacity", forceProperties.link.enabled ? 0.75 : 0);
}

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
            const r = nodeRadius(d),
                [type1, type2] = d.id.split(" "),
                x1 = mainNodePtr[type1].x,
                y1 = mainNodePtr[type1].y,
                x2 = mainNodePtr[type2].x,
                y2 = mainNodePtr[type2].y,
                a1 = Math.atan2((d.y - y1), (d.x - x1)),
                a2 = Math.atan2((d.y - y2), (d.x - x2)),
                a3 = (a1 + a2) / 2;

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

            return `translate(${d.x - r}, ${d.y - r}) rotate(${a}, ${r}, ${r})`
        });

    nodeText
        .attr("transform", (d) => `translate(${d.x}, ${d.y})`);

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
    console.log("clicked on type", d.id);
    console.log(d)

    let f;

    if (d.id.split(" ").length != 1) {
        // turns on parents and self
        const [type1, type2] = d.id.split(" ");
        f = (id) => ([type1, type2, d.id].includes(id));
    } else {
        // turns on self and those who contain self
        f = (id) => (id.includes(d.id));
    }

    node.attr("fill-opacity", (o) => {
        return f(o.id) ? 1 : 0.2;
    })

    nodeHalf.attr("fill-opacity", (o) => {
        return f(o.id) ? 1 : 0.2;
    })

    link.attr("opacity", (o) => {
        return f(o.target.id) && f(o.source.id) ? 1 : 0.1;
    })
}


// convenience function to update everything (run after UI input)
export function updateAll() {
    updateForces();
    updateDisplay();
}
