import React, {Component} from "react";
import {VictoryStack,VictoryBar,VictoryAxis,VictoryLabel,VictoryTooltip} from "victory";

type ageProps = {
  data : any
}

type ageState = {
    data : any,
    dataM : any,
    dataF : any
}

const dataA = [
  { x: "Personal Drones", y: 57 },
  { x: "Smart Thermostat", y: 40 },
  { x: "Television", y: 38 },
  { x: "Smartwatch", y: 37 },
  { x: "Fitness Monitor", y: 25 },
  { x: "Tablet", y: 19 },
  { x: "Camera", y: 15 },
  { x: "Laptop", y: 13 },
  { x: "Phone", y: 12 }
];

class GraphAgeMF extends React.Component<ageProps,ageState> {

  constructor(){
    super();
    this.state = {
     data : [],
     dataM : [
      { x: "0-10", y: 20},
      { x: "10-20", y: 20},
      { x: "20-30", y: 20},
      { x: "30-40", y: 20},
      { x: "40-50", y: 20},
      { x: "50-60", y: 20},
      { x: "60-70", y: 20},
      { x: "70-80", y: 20},
      { x: "80-90", y: 20}
    ],
     dataF : [
      { x: "0-10", y: 20},
      { x: "10-20", y: 20},
      { x: "20-30", y: 20},
      { x: "30-40", y: 20},
      { x: "40-50", y: 20},
      { x: "50-60", y: 20},
      { x: "60-70", y: 20},
      { x: "70-80", y: 20},
      { x: "80-90", y: 20}
    ]
    };
    
  }

 
componentDidUpdate(prevProps){ 
  console.log("comU")
  console.log(prevProps.data)
  console.log(this.props.data)
  

    if (prevProps.data !== this.props.data) {
      console.log("props differ")
       this.setState({
          data : this.props.data.data,
          dataM :  [
            { x: "0-10", y: this.props.data.data[0].M},
            { x: "10-20", y: this.props.data.data[1].M},
            { x: "20-30", y: this.props.data.data[2].M},
            { x: "30-40", y: this.props.data.data[3].M},
            { x: "40-50", y: this.props.data.data[4].M},
            { x: "50-60", y: this.props.data.data[5].M},
            { x: "60-70", y: this.props.data.data[6].M},
            { x: "70-80", y: this.props.data.data[7].M},
            { x: "80-90", y: this.props.data.data[8].M}
          ],
          dataF :  [
            { x: "0-10", y: this.props.data.data[0].F},
            { x: "10-20", y: this.props.data.data[1].F},
            { x: "20-30", y: this.props.data.data[2].F},
            { x: "30-40", y: this.props.data.data[3].F},
            { x: "40-50", y: this.props.data.data[4].F},
            { x: "50-60", y: this.props.data.data[5].F},
            { x: "60-70", y: this.props.data.data[6].F},
            { x: "70-80", y: this.props.data.data[7].F},
            { x: "80-90", y: this.props.data.data[8].F}
          ],
       }) 
    }
}


componentDidMount(){
  this.setState({
    data : this.props.data
}) 


console.log("123",this.props.data.data[0].F)

}

render() {
  console.log(this.state.dataF)
  console.log(this.state.dataM)



  const width = 500;
  const height = 500;
  const padding = { top: 80, bottom: 80, left: 20, right: 20 };

    return (
     <div>
        <svg viewBox={`0 0 400 400`} style={{ width: "100%", height: "auto" }}>
        <VictoryStack horizontal
          standalone={false}
          domain={{ y: [-60, 60] }}
          padding={padding}
          height={height}
          width={width}
          style={{ data: { width: 20 }, labels: { fontSize: 11 } }}
        >
          <VictoryBar
            style={{ data: { fill: "#215167" } }}
            data={this.state.dataM}
            y={(data) => (-data.y)}
            labels={(data) => (data.y)}
          />
          <VictoryBar
            style={{ data: { fill: "#E6C24A" } }}
            data={this.state.dataF}
            labels={(data) => (data.y)}
          />
        </VictoryStack>

        <VictoryAxis dependentAxis
          height={height}
          width={width}
          padding={padding}
          style={{
            axis: { stroke: "transparent" },
            ticks: { stroke: "transparent" },
            tickLabels: { fontSize: 11, fill: "black" }
          }}
          tickLabelComponent={<VictoryLabel x={250} textAnchor="middle"/>}
          tickValues={dataA.map((point) => point.x).reverse()}
        />
      </svg>
     </div>
    );
  }
}

export default GraphAgeMF;