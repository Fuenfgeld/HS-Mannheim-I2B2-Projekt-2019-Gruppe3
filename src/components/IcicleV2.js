import React from 'react'
import ReactFauxDOM from 'react-faux-dom'
import * as d3 from 'd3'
import { directive } from '@babel/types';
import { partition } from 'd3-hierarchy';
 
class SVGIcicle extends React.Component {

    state = {
        data: this.props.data,
        width: 960,
        height: 500
    }

    componentWillMount(){
        
    }

    render() {
        let data = this.state.data;
    
        let x = d3.scaleLinear()
                .range([0, width]);

        let y = d3.scaleLinear()
                .range([0, height]);

        let color = d3.scaleOrdinal(d3.schemeCategory20c);

        const div = new ReactFauxDOM.Element('div')

        let vis = d3.select(div).append("svg")
                .attr("width", this.state.width)
                .attr("height", this.state.height);
        
        let partition = d3.partition()
                .size([this.state.width, this.state.height])
                .padding(0)
                .round(true);

        d3.json("readme.json", function(error, root) {
            if (error) throw error;

                root = d3.hierarchy(d3.entries(root)[0], function(d) {
                        return d3.entries(d.value)
                      })
                      .sum(function(d) { return d.value })
                      .sort(function(a, b) { return b.value - a.value; });
                  
                partition(root);
        
        return div.toReact();
    }
}
export default SVGIcicle;
