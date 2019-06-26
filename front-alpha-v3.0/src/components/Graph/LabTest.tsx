import React, {Component} from "react";
import {VictoryBoxPlot, VictoryLabel,VictoryArea,VictoryStack, VictoryChart,VictoryTooltip, VictoryPie } from "victory";

type vitProps = {
    data : any,
    domain? : any,
    label : any,
    normRange : any,
    unit : any
  }
  
  type vitState = {
    data : any,
    normValueM : any,
    normValueF : any
    testMax : number
    value : number
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

          testMax : 100,
          value : 0
        }
      }
    

    

    parseData(data : any){

    }

    componentDidUpdate(prevProps: { data: any; }){ 
      if (prevProps.data !== this.props.data) {
        let yM = this.props.data[0].M.length > 0 ? this.props.data[0].M : [0];
        let yF = this.props.data[0].F.length > 0 ? this.props.data[0].F : [0];
        this.setState({
          data : [
            {x:" ", y:[0]},
            {x:"Male", y: yM},
            {x:"Female", y: yF},
            {x:"    ", y:[0]}
          ],

          normValueM : [
            { x: 1, y: this.props.normRange.m[0], y0: this.props.normRange.m[1] },
            { x: 2, y: this.props.normRange.m[0], y0: this.props.normRange.m[1] },
            { x: 3, y: this.props.normRange.f[0], y0: this.props.normRange.f[1] },
            { x: 4, y: this.props.normRange.f[0], y0: this.props.normRange.f[1] }

          ],

          value : this.props.data[0].V
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
                    text= {this.props.label + " Test (" +this.props.unit+")"}
                    />
              <VictoryLabel
                    textAnchor="middle"
                    style={{ fontSize: 17 }}
                    x={200} y={45}
                    text= {this.state.value + " datapoints are in Graph"}
                    />
            </VictoryChart>
            
        </div>
        );
      }
    }

export default LabTest;
