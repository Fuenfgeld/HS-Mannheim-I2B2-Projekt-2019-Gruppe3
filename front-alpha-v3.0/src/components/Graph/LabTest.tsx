import React, {Component} from "react";
import {VictoryBoxPlot, VictoryLabel,VictoryArea,VictoryStack, VictoryChart,VictoryTooltip } from "victory";

type vitProps = {
    data? : any
  }
  
  type vitState = {
    data : any,
  
  }

class LengthOfStay extends React.Component<vitProps,vitState> {
    constructor(){
        super();
        this.state = {
          data :[
            {x:"Male", y:[20,33,5,6,9,8,7]},
            {x:"Female", y:[5,4,19,4,7,12]}
          ]
        }
      }
    

    createKeyValue(xValues: any[],yValues:any){
      let keyValData = [];
      
      for(let i = 0; i < xValues.length; i++){   
        keyValData[i] = {x: xValues[i], y: yValues[i]}
      }
      return keyValData;
    }

    componentDidUpdate(prevProps: { data: any; }){ 
      if (prevProps.data !== this.props.data) {
        this.setState({
          data : [
            {x:"Male", y:this.props.data.M},
            {x:"Female", y:this.props.data.F}
          ]
        })
      }
    }
    
    componentDidMount(){
    
    }
    
    
    render() {
      
      const width = 400;
      const height = 400;
      const padding = { top: 80, bottom: 100, left: 30, right: 30 };
      const maleC = "#215167";
      const femaleC = "#E6C24A";

        return (
         <div>
            <VictoryChart
            width = {width}
            height = {height}
            padding = {padding}
            domainPadding = {100}
            >
                <VictoryBoxPlot
                boxWidth={40}
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
