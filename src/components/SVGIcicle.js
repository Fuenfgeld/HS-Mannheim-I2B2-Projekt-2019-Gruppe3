import React from 'react'
import ReactFauxDOM from 'react-faux-dom'
import * as d3 from 'd3'
import { directive } from '@babel/types';
import {hierarchy,partition} from 'd3-hierarchy';
import { color } from 'd3';
 
class SVGIcicle extends React.Component {

    state = {
        data: this.props.data,
        width: 975,
        height: 2400,
        width: 975,
        height: 1200
    }

    partition1(data1){
        const root = d3-hierarchy.hierarchy(data1)
            .sum(d => d.value)
            .sort((a, b) => b.height - a.height || b.value - a.value);  

        console.log("partion is called");
        return d3.partition()
            .size([this.state.height, (root.height + 1) * this.state.width / 3])(root);
    }
      

    componentWillMount(){
        let data = this.state.data;
        const root1 = data => {
            const root = d3.hierarchy(data)
                .sum(d => d.value)
                .sort((a, b) => b.height - a.height || b.value - a.value);  
            return d3.partition()
                .size([this.state.height, (root.height + 1) * this.state.width / 3])(root);
          }
        
        this.setState({root: root1});
        
        console.log("root in compM", this.state.root);
    }

    drawChart(){
        const div = new ReactFauxDOM.createElement('div');
       
        let data = this.state.data;
 
        let rootp = data => {
                 let root = d3-hierarchy.hierarchy(data)
                 .sum(d => d.value)
                 .sort((a,b) => b.height -a.height || b.value -a.value);
             return  d3-hierarchy.partition().size([this.state.height,(root.height +1)*this.state.width /3])(root);
        }
 
        console.log("root in compR", rootp);
 
        let svg = d3.select(div).append("svg")
             .attr("width", this.state.width)
             .attr("height", this.state.height);
 
        let cell = svg.selectAll('g').data(this.rootp.descendants()).join('g').attr("transform", d => `translate(${d.y0},${d.x0})`);;
 
         console.log("cel des",cell);
 
        const rect =  cell.append("rect")
             .attr("width", d => d.y1 - d.y0 - 1)
             .attr("height", d => d.x1 - d.x0 - Math.min(1, (d.x1 - d.x0) / 2))
             .attr("fill-opacity", 0.6)
             .attr("fill", d => {
                 if (!d.depth) return "#ccc";
                 while (d.depth > 1) d = d.parent;
                 return d.data.name;
             })
             .style("cursor", "pointer")
             .on("click");
       
         return div.toReact();
    }

    render() {
      return this.drawChart();
    }
}
export default SVGIcicle;
