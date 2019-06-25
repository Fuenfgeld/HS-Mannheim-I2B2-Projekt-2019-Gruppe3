import React, {Component} from "react";
import {VictoryAxis, VictoryLabel,VictoryArea,VictoryStack, VictoryChart,VictoryTooltip } from "victory";

type vitProps = {
    data? : any
  }
  
  type vitState = {
    dataM : any,
    dataF : any,
  
  }

class LengthOfStay extends React.Component<vitProps,vitState> {
    constructor(){
        super();
        this.state = {
          dataM :[
            {x:"<1", y:20},
            {x:"1", y:5},
            {x:"2", y:3},
            {x:"3", y:0},
            {x:"4", y:10},
            {x:"5", y:0},
            {x:"6", y:0},
            {x:"7", y:2},
            {x:"8", y:1},
            {x:"9", y:0},
            {x:"10", y:4},
            {x:"10< ", y:0}
          ],
          dataF :[
            {x:"<1", y:10},
            {x:"1", y:10},
            {x:"2", y:10},
            {x:"3", y:10},
            {x:"4", y:10},
            {x:"5", y:10},
            {x:"6", y:10},
            {x:"7", y:10},
            {x:"8", y:10},
            {x:"9", y:10},
            {x:"10", y:10},
            {x:"10<", y:10}
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
        let data = this.createKeyValue(this.props.data.label,this.props.data.data)
        this.setState({
          dataM : data
        })
      }
    }
    
    componentDidMount(){
    
    }
    
    
    render() {
      
      const width = 400;
      const height = 400;
      const padding = { top: 80, bottom: 50, left: 30, right: 30 };
        return (
         <div>
            <VictoryChart 
            height={height} 
            width={width}
            padding = {padding}>
                <VictoryArea
                //interpolation="natural"
                data={this.state.dataM}
                style={{
                    data: {
                      fill: "#66717E", fillOpacity: 0.7, stroke: "#66717E", strokeWidth: 3
                    },
                }}
                labels={(d: any) => d.y }
                />
                 <VictoryLabel
                    textAnchor="middle"
                    style={{ fontSize: 30 }}
                    x={200} y={20}
                    text= {"Lenght of stay in days"}
                    />
            </VictoryChart>
        </div>
        );
      }
    }

export default LengthOfStay;
