import React, { useEffect } from 'react';

import * as d3 from "d3";

import TypeSelect from './TypeSelect';
import TypeSwitch from './TypeSwitch';
import GenSelect from './GenSelect';
import FormControl from '@mui/material/FormControl';
import { forceProperties, updateAll } from 'utils/typeRelation';
import './style.css';

export default function SideFilter() {

    return (
        <FormControl sx={{ m: 1 }} classes={{root: "controls"}}>
            <h1>Filters</h1>

            <TypeSelect />
            <TypeSwitch />
            <GenSelect />

            <div className="force alpha">
                <p><label>alpha</label> Simulation activity</p>
                <div className="alpha_bar" onClick={updateAll}>
                    <div id="alpha_value"></div>
                </div>
            </div>
            <div className="force">
                <p><label>center</label> Shifts the view, so the graph is centered at this location.</p>
                <label>
                    x
                    <output id="center_XSliderOutput">.5</output>
                    <input type="range" min="0" max="1" defaultValue=".5" step="0.01"
                        onClick={(e) => {
                            const value = e.target.value;
                            d3.select('#center_XSliderOutput').text(value);
                            forceProperties.center.x = value;
                            updateAll();
                        }} />
                </label>
                <label>
                    y
                    <output id="center_YSliderOutput">.5</output>
                    <input type="range" min="0" max="1" defaultValue=".5" step="0.01"
                        onClick={(e) => {
                            const value = e.target.value;
                            d3.select('#center_YSliderOutput').text(value);
                            forceProperties.center.y = value;
                            updateAll();
                        }} />
                </label>
            </div>

            <div className="force">
                <p><label><input type="checkbox" checked
                    onChange={() => {
                        forceProperties.charge.enabled = this.checked;
                        updateAll();
                    }} /> charge</label> Attracts
                    (+) or repels (-) nodes to/from each other.</p>
                <label title="Negative strength repels nodes. Positive strength attracts nodes.">
                    strength
                    <output id="charge_StrengthSliderOutput">-30</output>
                    <input type="range" min="-200" max="50" defaultValue="-30" step=".1"
                        onClick={(e) => {
                            const value = e.target.value;
                            d3.select('#charge_StrengthSliderOutput').text(value);
                            forceProperties.charge.strength = value;
                            updateAll();
                        }} />
                </label>
                <label title="Minimum distance where force is applied">
                    distanceMin
                    <output id="charge_distanceMinSliderOutput">1</output>
                    <input type="range" min="0" max="50" defaultValue="1" step=".1"
                        onClick={(e) => {
                            const value = e.target.value;
                            d3.select('#charge_distanceMinSliderOutput').text(value);
                            forceProperties.charge.distanceMin = value;
                            updateAll();
                        }} />
                </label>
                <label title="Maximum distance where force is applied">
                    distanceMax
                    <output id="charge_distanceMaxSliderOutput">2000</output>
                    <input type="range" min="0" max="2000" defaultValue="2000" step=".1"
                        onClick={(e) => {
                            const value = e.target.value;
                            d3.select('#charge_distanceMaxSliderOutput').text(value);
                            forceProperties.charge.distanceMax = value;
                            updateAll();
                        }} />
                </label>
            </div>

            <div className="force">
                <p><label><input type="checkbox" checked
                    onChange={() => {
                        forceProperties.collide.enabled = this.checked; updateAll();
                    }} /> collide</label>
                    Prevents nodes from overlapping</p>
                <label>
                    strength
                    <output id="collide_StrengthSliderOutput">.7</output>
                    <input type="range" min="0" max="2" defaultValue=".7" step=".1"
                        onClick={(e) => {
                            const value = e.target.value;
                            d3.select('#collide_StrengthSliderOutput').text(value);
                            forceProperties.collide.strength = value;
                            updateAll();
                        }} />
                </label>
                <label title="Size of nodes">
                    radius
                    <output id="collide_radiusSliderOutput">5</output>
                    <input type="range" min="0" max="100" defaultValue="5" step="1"
                        onClick={(e) => {
                            const value = e.target.value;
                            d3.select('#collide_radiusSliderOutput').text(value);
                            forceProperties.collide.radius = value;
                            updateAll();
                        }} />
                </label>
                <label
                    title="Higher values increase rigidity of the nodes (WARNING: high values are computationally expensive)">
                    iterations
                    <output id="collide_iterationsSliderOutput">1</output>
                    <input type="range" min="1" max="10" defaultValue="1" step="1"
                        onClick={(e) => {
                            const value = e.target.value;
                            d3.select('#collide_iterationsSliderOutput').text(value);
                            forceProperties.collide.iterations = value;
                            updateAll();
                        }} />
                </label>
            </div>

            <div className="force">
                <p><label><input type="checkbox" onChange={() => {
                    forceProperties.forceX.enabled = this.checked; updateAll();
                }} />
                    forceX</label> Acts like gravity. Pulls all points towards an X location.</p>
                <label>
                    strength
                    <output id="forceX_StrengthSliderOutput">.1</output>
                    <input type="range" min="0" max="1" defaultValue=".1" step="0.01"
                        onClick={(e) => {
                            const value = e.target.value;
                            d3.select('#forceX_StrengthSliderOutput').text(value);
                            forceProperties.forceX.strength = value;
                            updateAll();
                        }} />
                </label>
                <label
                    title="The X location that the force will push the nodes to (NOTE: This demo multiplies by the svg width)">
                    x
                    <output id="forceX_XSliderOutput">.5</output>
                    <input type="range" min="0" max="1" defaultValue=".5" step="0.01"
                        onClick={(e) => {
                            const value = e.target.value;
                            d3.select('#forceX_XSliderOutput').text(value);
                            forceProperties.forceX.x = value;
                            updateAll();
                        }} />
                </label>
            </div>

            <div className="force">
                <p><label><input type="checkbox" onChange={() => {
                    forceProperties.forceY.enabled = this.checked; updateAll();
                }} />
                    forceY</label> Acts like gravity. Pulls all points towards a Y location.</p>
                <label>
                    strength
                    <output id="forceY_StrengthSliderOutput">.1</output>
                    <input type="range" min="0" max="1" defaultValue=".1" step="0.01"
                        onClick={(e) => {
                            const value = e.target.value;
                            d3.select('#forceY_StrengthSliderOutput').text(value);
                            forceProperties.forceY.strength = value;
                            updateAll();
                        }} />
                </label>
                <label
                    title="The Y location that the force will push the nodes to (NOTE: This demo multiplies by the svg height)">
                    y
                    <output id="forceY_YSliderOutput">.5</output>
                    <input type="range" min="0" max="1" defaultValue=".5" step="0.01"
                        onClick={(e) => {
                            const value = e.target.value;
                            d3.select('#forceY_YSliderOutput').text(value);
                            forceProperties.forceY.y = value;
                            updateAll();
                        }} />
                </label>
            </div>

            <div className="force">
                <p><label><input type="checkbox" checked
                    onChange={() => {
                        forceProperties.link.enabled = this.checked; updateAll();
                    }} /> link</label> Sets link
                    length</p>
                <label title="The force will push/pull nodes to make links this long">
                    distance
                    <output id="link_DistanceSliderOutput">100</output>
                    <input type="range" min="0" max="100" defaultValue="100" step="1"
                        onClick={(e) => {
                            const value = e.target.value;
                            d3.select('#link_DistanceSliderOutput').text(value);
                            forceProperties.link.distance = value;
                            updateAll();
                        }} />
                </label>
                <label
                    title="Higher values increase rigidity of the links (WARNING: high values are computationally expensive)">
                    iterations
                    <output id="link_IterationsSliderOutput">1</output>
                    <input type="range" min="1" max="10" defaultValue="1" step="1"
                        onClick={(e) => {
                            const value = e.target.value;
                            d3.select('#link_IterationsSliderOutput').text(value);
                            forceProperties.link.iterations = value;
                            updateAll();
                        }} />
                </label>
            </div>
        </FormControl>
    );
}