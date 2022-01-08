import * as d3 from "d3";
import useFilterStore from 'stores/useFilterStore';
import typeRelationPos from 'archive/typeRelationPos.json';

const width = 900,
    height = 900;

let svg, simulation;
// svg objects
let link, node, nodeHalf, nodeText;
// the data: an object with nodes and links
let graph = { nodes: [], links: [] };
// an auxiliar object for halfNode orientation
let mainNodePtr = {};

let firstTransform = true;


// keeps track of the selected node
let currentNode;

export const colours = {
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
        distance: 100,
        iterations: 1
    }
}

export function transformData(data) {
    let types = {}, links = {};

    for (const d of data) {
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

    let oldGraph = { nodes: [...graph.nodes], links: [...graph.links] };
    graph = { nodes: [], links: [] };

    // push already existent nodes to preserve positions
    for (const n of oldGraph.nodes) {
        if (n.id in types) {
            n.value = types[n.id];
            graph.nodes.push(n);
        }
    }
    // push already existent links to preserve positions
    for (const l of oldGraph.links) {
        if (l.source in links) {
            console.log('>', types[l.source]);
            l.value = types[l.source];
            graph.links.push(l);
        }
    }
    // create new links
    for (const l of graph.links) {
        delete links[l.source];
    }
    for (const [s, targets] of Object.entries(links)) {
        for (const t of targets) {
            graph.links.push({ source: s, target: t, value: types[s] });
        }
    }
    // create new nodes
    for (const n of graph.nodes) {
        delete types[n.id];
    }
    for (const [t, v] of Object.entries(types)) {
        if (firstTransform) {
            const { x, y } = typeRelationPos[t];
            graph.nodes.push({ id: t, value: v, x, y, vx: 0, vy: 0 });
        } else {
            if (t.indexOf(" ") != -1) {
                // not a main node
                // create node between its 2 main nodes
                const [type1, type2] = t.split(" "),
                    x1 = mainNodePtr[type1].x,
                    y1 = mainNodePtr[type1].y,
                    x2 = mainNodePtr[type2].x,
                    y2 = mainNodePtr[type2].y;
                graph.nodes.push({ id: t, value: v, x: (x1 + x2) / 2, y: (y1 + y2) / 2 });
                continue;
            }
            graph.nodes.push({ id: t, value: v, x: width / 2, y: height / 2 });
        }
    }
    firstTransform = false;
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
    if (simulation) {
        updateForces();
        return;
    }
    // force simulator
    simulation = d3.forceSimulation(graph.nodes)
        .force("link", d3.forceLink())
        .force("charge", d3.forceManyBody())
        .force("collide", d3.forceCollide())
        .force("center", d3.forceCenter())
        .force("forceX", d3.forceX())
        .force("forceY", d3.forceY())
        .alpha(0.01)
        .on("tick", ticked);

    // get each force by name and update the properties
    simulation.force("center")
        .x(width / 2)
        .y(height / 2);
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
        .links(graph.links);

}


// apply new force properties
export function updateForces() {

    // Update and restart the simulation.
    simulation.nodes(graph.nodes).force("collide")
        .strength(forceProperties.collide.strength * forceProperties.collide.enabled)
        .radius((d) => nodeRadius(d) + 10)
        .iterations(forceProperties.collide.iterations);;

    simulation.force("link")
        .id((d) => d.id)
        .distance(forceProperties.link.distance)
        .iterations(forceProperties.link.iterations).links(graph.links);

    // updates ignored until this is run
    // restarts the simulation (important if simulation has already slowed down)
    simulation.alpha(0.5).restart();
}


//////////// DISPLAY ////////////

// generate the svg objects and force simulation
export function initializeDisplay() {
    if (!svg) {
        svg = d3.select("svg.type-relation");
        svg.call(d3.zoom()
            .scaleExtent([1, 3])
            .translateExtent([[0, 0], [width, height]])
            .on("zoom", function (event) {
                svg.select("g.zoom").attr("transform", event.transform)
            }));
    }

    // const t = d3.transition()
    //     .duration(750)
    //     .ease(d3.easeLinear);

    // set the data and properties of link lines
    const linkData = svg.select("g.links")
        .selectAll("line")
        .data(graph.links, l => l.source + l.target);

    link = linkData.enter().append("line")
        .attr("stroke", (d) => colours[d.target])
        .attr("opacity", 0.75)
        .merge(linkData)
        .attr("stroke-width", (d) => linkWidth(d));

    linkData.exit().remove();

    // set the data and properties of node circles
    const nodeData = svg.select("g.nodes")
        .selectAll("circle")
        .data(graph.nodes, n => n.id);

    node = nodeData.enter().append("circle")
        .attr("fill", (d) => colours[d.id.split(" ")[0]])
        .on("click", filterType)
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    // node tooltip
    node.append("title")
        .text((d) => d.id);

    node = node.merge(nodeData)
        // .transition(t)
        .attr("r", (d) => nodeRadius(d));

    nodeData.exit()
        // .transition(t)
        // .attr("r", 1e-6)
        .remove();

    const nodeHalfData = svg.select("g.nodes-half")
        .selectAll("path")
        .data(graph.nodes.filter((d) => !isMainNode(d)), n => n.id);

    nodeHalf = nodeHalfData.enter().append("path")
        .attr("fill", (d) => colours[d.id.split(" ")[1]])
        .attr("mask", "url(#fade)")
        .merge(nodeHalfData)
        .attr("d", (d) => { const r = nodeRadius(d); return `M 0 ${r} a 1 1 0 0 0 ${2 * r} 0` });

    nodeHalfData.exit().remove();

    const nodeTextData = svg.select("g.nodes-text")
        .selectAll("foreignObject")
        .data(graph.nodes, n => n.id);

    nodeText = nodeTextData.enter()
        .append("foreignObject");

    nodeText.append("xhtml:div")
        .style("text-align", "center")
        .style("height", "100%")
        .style("display", "flex")
        .style("justify-content", "center")
        .style("align-items", "center")
        .append("xhtml:span");

    nodeText = nodeText.merge(nodeTextData)
        .attr("width", d => nodeRadius(d) * 2.5)
        .attr("height", d => nodeRadius(d) * 2.5);

    nodeText.select("div")
        .style("font-size", (d) => `${nodeRadius(d) * .5}px`)
        .select("span")
        .html(d => d.id.split(" ").join("<br>") + "<br><strong>" + d.value + "</strong>");

    nodeTextData.exit().remove();
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
        .attr("x", (d) => d.x - nodeRadius(d) * 1.25)
        .attr("y", (d) => d.y - nodeRadius(d) * 1.25);

    d3.select('#alpha_value').style('flex-basis', (simulation.alpha() * 100) + '%');
}

window.lixo = () => {
    console.log(graph.nodes);
}

//////////// UI EVENTS ////////////

function dragstarted(event, d) {
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(event, d) {
    simulation.alphaTarget(0.3).restart();
    d.fx = event.x;
    d.fy = event.y;
}

function dragended(event, d) {
    simulation.alphaTarget(0.01);
    d.fx = null;
    d.fy = null;
    event.sourceEvent.stopPropagation();
}

function filterType(event, d) {

    if (currentNode == d.id) {
        // Selecting the current node
        currentNode = "";
        useFilterStore.getState().setFilters({ types: [] });
    } else {
        // Selecting a node of a 1type or 2type

        if (d.id.indexOf(" ") != -1) {
            // turns on parents and self
            useFilterStore.getState().setFilters({ types: d.id.split(" "), typesSelection: 'all' });
        } else {
            // turns on self and those who contain self
            useFilterStore.getState().setFilters({ types: [d.id], typesSelection: 'any' });
        }
        currentNode = d.id;
    }
}

export function changeOpacity() {
    const { types, typesSelection } = useFilterStore.getState().filters;

    const filterType = (id) => {
        if (typesSelection === 'any') {
            if (!id.split(" ").some(t => types.includes(t)))
                return false;
        } else if (typesSelection === 'all') {
            if (!id.split(" ").every(t => types.includes(t)))
                return false;
        }
        return true;
    }

    node.attr("fill-opacity", (o) => {
        return filterType(o.id) ? 1 : 0.2;
    })

    nodeHalf.attr("fill-opacity", (o) => {
        return filterType(o.id) ? 1 : 0.2;
    })

    link.attr("opacity", (o) => {
        return filterType(o.target.id) && filterType(o.source.id) ? 0.75 : 0.05;
    })

    nodeText.attr("opacity", (o) => {
        return filterType(o.id) ? 1 : 0.2;
    })
}


// convenience function to update everything (run after UI input)
export function updateAll() {
    updateForces();
}
