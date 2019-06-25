import React, {Component} from "react";
import {VictoryBoxPlot, VictoryLabel,VictoryArea,VictoryStack, VictoryChart,VictoryTooltip } from "victory";

type vitProps = {
    data? : any
  }
  
  type vitState = {
    data : any,
    normValue : any
  
  }

class LengthOfStay extends React.Component<vitProps,vitState> {
    constructor(){
        super();
        this.state = {
          data :[
            {x:" ", y:[0]},
            {x:"Male", y:[20,33,5,6,9,8,7]},
            {x:"Female", y:[5,4,19,4,7,12]},
            {x:"  ", y:[0]}
          ],
          normValue : [
            {x:""}
          ]
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
            {x:"  ", y:[0]},
            {x:"Female", y:this.props.data[0].F},
            {x:"   ", y:[0]}
          ],
          normValue : [
            { x: 1, y: 175, y0: 135 },
            { x: 2, y: 175, y0: 135 },
            { x: 3, y: 165, y0: 130 },
            { x: 4, y: 155, y0: 125 },
            { x: 5, y: 155, y0: 125 }

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
            padding = {padding}
            domain = {{y:[0,400]}}
            domainPadding = {{x : [50,50]}}
            >
                <VictoryArea
                style={{
                    data: {
                      fill: "#c43a31", fillOpacity: 0.2
                    },
                  }}
                data={this.state.normValue}
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
                    median: { stroke: (d) => d.x =="Male" ? maleC : femaleC, strokeWidth: 2 },
                    minLabels: { fill: (d) => d.x =="Male" ? maleC : femaleC },
                    maxLabels: { fill: (d) => d.x =="Male" ? maleC : femaleC }
                }}
                />  

            </VictoryChart>
        </div>
        );
      }
    }

export default LengthOfStay;
