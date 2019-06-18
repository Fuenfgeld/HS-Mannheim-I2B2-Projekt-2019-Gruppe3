import React, {Component} from "react";
import {VictoryAxis, VictoryLabel,VictoryBar,VictoryContainer,VictoryStack } from "victory";

type genProps = {
  data : any
}

type genState = {
 m : any,
 f: any,
 dataM : number,
 dataF : number
}

class GenderDist extends React.Component<genProps,genState> {

  constructor(){
    super();
    this.state = {
     m : [{y: 0},{y:50},{y: 0}],
     f : [{y: 0},{y:0},{y: 50}],
    dataM : 50,
    dataF : 50
    };
  }

componentDidUpdate(prevProps: { data: any; }){ 
  if (prevProps.data !== this.props.data) {
    this.setState({
            m : [{y: 0},{y : this.props.data.data[0]},{y : 0}],
            f: [{y: 0},{y : 0},{y : this.props.data.data[1]}],
            dataM :  this.props.data.data[0],
            dataF:  this.props.data.data[1]
        })
  }
}

componentDidMount(){
    console.log(this.props.data)
}


render() {
    const padding = { top: 80, bottom: 80, left: 90, right: 90 };
    const width = 400
    const height = 400
    const data1 = [{y : 50},{y : 25}]
    return (
     <div>
       <svg viewBox={`0 0 ${width} ${height}`}
        

      >
        <VictoryStack 
          standalone={false}
          padding={padding}
          //domainPadding = {200}
          height={height}
          width={width}
          style={{ data: { width: 20 }, labels: { fontSize:20 } }}
        >

          <VictoryBar
            
            barWidth = {80}
            data={this.state.m}
            style ={{
              data: {fill: "#215167"}
            }}
            labels={ ["",`${this.state.dataM}`,"",""]}
          />
          <VictoryBar
            barWidth = {80}
            data={this.state.f}
          style = {{
            data : {fill: "#E6C24A"}
          }}
          labels={ ["","",`${this.state.dataF}`,""]}
          />
          <VictoryAxis
          tickValues={[1,2,3]}
          offsetX ={85}
          offsetY ={75}
          tickFormat={["MALE", "FEMALE"]}
          style={{
          }}
        />
         </VictoryStack>
         <VictoryLabel
          textAnchor="middle"
          style={{ fontSize: 40 }}
          x={200} y={20}
          text= {"Gender distribution"}
        />
      </svg>
       
    </div>
    );
  }
}

export default GenderDist;