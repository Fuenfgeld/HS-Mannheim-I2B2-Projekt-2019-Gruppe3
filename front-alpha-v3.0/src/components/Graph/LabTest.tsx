import React, {Component} from "react";
import {VictoryBoxPlot, VictoryLabel,VictoryArea,VictoryStack, VictoryChart,VictoryTooltip, VictoryPie } from "victory";

type vitProps = {
    data : any,
    domain? : any,
    label : any,
    normRange : any
  }
  
  type vitState = {
    data : any,
    normValueM : any,
    normValueF : any
    testMax : number
  }

class LabTest extends React.Component<vitProps,vitState> {
    constructor(){
        super();
        this.state = {
          data :[
            {x:" ", y:[0]},
            {x:"Male", y:[0]},
            {x:"Female", y:[0]},
            {x:"  ", y:[0]}
          ],
          normValueM : [
            {x:""}
          ],
          normValueF : [
            {x:""}
          ],

          testMax : 100
        }
      }
    

    

    parseData(data : any){

    }

    componentDidUpdate(prevProps: { data: any; }){ 
      if (prevProps.data !== this.props.data) {
        
        this.setState({
          data : [
            {x:" ", y:[0]},
            {x:"Male", y:this.props.data[0].M},
            {x:"Female", y:this.props.data[0].F},
            {x:"    ", y:[0]}
          ],

          normValueM : [
            { x: 1, y: this.props.normRange.m[0], y0: this.props.normRange.m[1] },
            { x: 2, y: this.props.normRange.m[0], y0: this.props.normRange.m[1] },
            { x: 3, y: this.props.normRange.f[0], y0: this.props.normRange.f[1] },
            { x: 4, y: this.props.normRange.f[0], y0: this.props.normRange.f[1] }

          ]
        })
      }
    }
    
    componentDidMount(){
    
    }
    
    
    render() {
      
      const width = 400;
      const height = 400;
      const padding = { top: 80, bottom: 100, left: 40, right: 40 };
      const maleC = "#215167";
      const femaleC = "#E6C24A";

        return (
         <div>
            <VictoryChart
            width = {width}
            height = {height}
            padding = { padding}
            domain = {{y:this.props.domain}}
            domainPadding = {{x : [50,50]}}
            >
                <VictoryArea
                interpolation = {"step"}
                style={{
                    data: {
                      fill: "#c43a31", fillOpacity: 0.2
                    },
                  }}
                data={this.state.normValueM}
                />
                <VictoryBoxPlot
                
                boxWidth={40}
                padding={100}
                data={this.state.data}
                style={{
                    min: { stroke: (d) => d.x =="Male" ? maleC :femaleC},
                    max: { stroke: (d) => d.x =="Male" ? maleC : femaleC },
                    q1: { fill: (d) => d.x =="Male" ? maleC : femaleC },
                    q3: { fill: (d) => d.x =="Male" ? maleC : femaleC },
                    //median: { stroke: (d) => d.x =="Male" ? maleC : femaleC, strokeWidth: 2 },
                    minLabels: { fill: (d) => d.x =="Male" ? maleC : femaleC },
                    maxLabels: { fill: (d) => d.x =="Male" ? maleC : femaleC }
                }}
                />  
              <VictoryLabel
                    textAnchor="middle"
                    style={{ fontSize: 30 }}
                    x={200} y={20}
                    text= {this.props.label + " Test"}
                    />
            </VictoryChart>
            
        </div>
        );
      }
    }

export default LabTest;
