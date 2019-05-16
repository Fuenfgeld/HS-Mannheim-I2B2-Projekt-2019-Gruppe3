import React from 'react'
import ReactFauxDOM from 'react-faux-dom'
import * as d3 from 'd3'
import { directive } from '@babel/types';
import { partition } from 'd3-hierarchy';
 
class SVGIcicle extends React.Component {

    state = {
        data: this.props.data,
        width: 975,
        height: 2400,
    }

    

    render() {
        let data = this.state.data;
        
        let root = data => d3.partition().size([this.height,this.width]).padding(1)
                (d3.hierarchy(data).sum(d=> d.value)
                .sort((a,b) => b.this.state.height - a.this.state.height || b.value -a.value));


        let margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = this.props.width - margin.left - margin.right,
            height = this.props.height - margin.top - margin.bottom;
        
        //create element to mount on
        const div = new ReactFauxDOM.Element('div')

        let svg = d3.select(div).append("svg")
                    .style("width", "100%")
                    .style("height","auto")
                    .style("font", "10px sans-serif");

        let cell = svg.selectAll("g").data(root.descendants())
                    .join("g").attr("transform", d => `translate(${d.y0},${d.x0})`);

        
        cell.append("rect")
                .attr("width", d => d.y1 - d.y0)
                .attr("height", d => d.x1 - d.x0)
                .attr("fill-opacity", 0.6)
                .attr("fill", d => {
                    if (!d.depth) return "#ccc";
                    while (d.depth > 1) d = d.parent;
                    return d.data.name.d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1));
                });

                
        return div.toReact();
    }
}
export default SVGIcicle;
