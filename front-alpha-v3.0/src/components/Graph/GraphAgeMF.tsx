import React, {Component} from "react";
import {VictoryStack,VictoryBar,VictoryAxis,VictoryLabel,VictoryTooltip} from "victory";

type ageProps = {
  data : any
}

type ageState = {
    dataLabel : any,
    dataM : any,
    dataF : any
}

class GraphAgeMF extends React.Component<ageProps,ageState> {

  constructor(){
    super();
    this.state = {
    dataLabel : [  
    { x: "0-10", y: 30},
    { x: "10-20", y: 30},
    { x: "20-30", y: 30},
    { x: "30-40", y: 30},
    { x: "40-50", y: 30},
    { x: "50-60", y: 30},
    { x: "60-70", y: 30},
    { x: "70-80", y: 30},
    { x: "80-90", y: 30}],
    
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

 
componentDidUpdate(prevProps: { data: any; }){ 

    if (prevProps.data !== this.props.data) {
       this.setState({
         dataLabel :[
          { x: "0-10", y: 40-this.props.data.data[0].M},
          { x: "10-20", y: 40-this.props.data.data[1].M},
          { x: "20-30", y: 40-this.props.data.data[2].M},
          { x: "30-40", y: 40-this.props.data.data[3].M},
          { x: "40-50", y: 40-this.props.data.data[4].M},
          { x: "50-60", y: 40-this.props.data.data[5].M},
          { x: "60-70", y: 40-this.props.data.data[6].M},
          { x: "70-80", y: 40-this.props.data.data[7].M},
          { x: "80-90", y: 40-this.props.data.data[8].M}
         ],
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




render() {
  const width = 400;
  const height = 400;
  const padding = { top: 80, bottom: 80, left: 20, right: 20 };

    return (
     <div>
      
        <svg viewBox={`0 0 ${width} ${height}`} style={{ width: "100%", height: "auto" }}>
        <VictoryStack horizontal
          standalone={false}
          domain={{ y: [-60, 60] }}
          padding={padding}
          height={height}
          width={width}
          style={{ data: { width: 25 }, labels: { fontSize: 15 } }}
        >
          <VictoryBar
            style={{ data: { fill: "#215167" } }}
            data={this.state.dataM}
            y={(data) => (-data.y)}
            //labels={(data) => (data.y > 0 ? data.y : "")}
            labelComponent={<VictoryTooltip
              cornerRadius ={20}
              />}
          />
          <VictoryBar
            style={{ data: { fill: "#E6C24A" } }}
            data={this.state.dataF}
            //labels={(data) => (data.y > 0 ? data.y : "")}
            labelComponent={<VictoryTooltip
              cornerRadius ={20}
              />}
          />
          
          <VictoryBar
            style={{ data: { fill: "#ECE9D6" } }}
            data={this.state.dataLabel}
            y={(data) => (-(data.y))}
            labels={(data) => (data.x)}
          />

        </VictoryStack>
        <VictoryAxis dependentAxis
          height={height}
          width={width}
          padding={padding}
          style={{
            axis: { stroke: "transparent" },
            ticks: { stroke: "transparent" },
            tickLabels: { fontSize: 20, fill: "black" }
          }}
          tickLabelComponent={<VictoryLabel x={250} textAnchor="middle"/>}
          tickValues={this.state.dataM.map((point: { x: any; }) => point.x).reverse()}
        />
        <VictoryLabel
          textAnchor="middle"
          style={{ fontSize: 30 }}
          x={(width/2)} y={30}
          text= {"Age and Gender distribution"}
        />
      </svg>
     </div>
    );
  }
}

export default GraphAgeMF;