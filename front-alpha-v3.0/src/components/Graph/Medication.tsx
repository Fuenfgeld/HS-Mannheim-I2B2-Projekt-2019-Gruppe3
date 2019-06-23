import React, {Component} from "react";
import {VictoryChart, VictoryLabel,VictoryBar,VictoryTooltip,VictoryStack,VictoryAxis } from "victory";

type secProps = {
  data : any
}

type secState = {
  dataM : any,
  dataF : any
}

class Medication extends React.Component<secProps,secState> {

  constructor(){
    super();
    this.state = {
      dataM :[
        {x:"loading", y:69 },
        {x:"loading", y:69 },
        {x:"loading", y:69 },
        {x:"loading", y:69 },
        {x:"loading", y:69 },
        {x:"loading", y:69 },
        {x:"loading", y:69 },
        {x:"loading", y:69 },
        {x:"loading", y:69 },
        {x:"loading", y:69 }
      ],
      dataF :[
        {x:"loading", y:69 },
        {x:"loading", y:69 },
        {x:"loading", y:69 },
        {x:"loading", y:69 },
        {x:"loading", y:69 },
        {x:"loading", y:69 },
        {x:"loading", y:69 },
        {x:"loading", y:69 },
        {x:"loading", y:69 },
        {x:"loading", y:69 }
      ]
    }
  }

componentDidUpdate(prevProps: { data: any; }){ 
  if (prevProps.data !== this.props.data) {
    this.setState({
      dataM : [
        {x:this.props.data.lable[9], y:0 },
        {x:" ", y:this.props.data.M[9] },
        {x:this.props.data.lable[8], y:0 },
        {x:"  ", y:this.props.data.M[8] },
        {x:this.props.data.lable[7], y:0 },
        {x:"   ", y:this.props.data.M[7] },
        {x:this.props.data.lable[6], y:0 },
        {x:"    ", y:this.props.data.M[6] },
        {x:this.props.data.lable[5], y:0 },
        {x:"     ", y:this.props.data.M[5] },
        {x:this.props.data.lable[4], y:0 },
        {x:"      ", y:this.props.data.M[4] },
        {x:this.props.data.lable[3], y:0 },
        {x:"       ", y:this.props.data.M[3] },
        {x:this.props.data.lable[2], y:0 },
        {x:"        ", y:this.props.data.M[2] },
        {x:this.props.data.lable[1], y:0 },
        {x:"         ", y:this.props.data.M[1] },
        {x:this.props.data.lable[0], y:0 },
        {x:"          ", y:this.props.data.M[0] }
      ],
      dataF : [
        {x:this.props.data.lable[9], y:0 },
        {x:" ", y:this.props.data.F[9] },
        {x:this.props.data.lable[8], y:0 },
        {x:"  ", y:this.props.data.F[8] },
        {x:this.props.data.lable[7], y:0 },
        {x:"   ", y:this.props.data.F[7] },
        {x:this.props.data.lable[6], y:0 },
        {x:"    ", y:this.props.data.F[6] },
        {x:this.props.data.lable[5], y:0 },
        {x:"     ", y:this.props.data.F[5] },
        {x:this.props.data.lable[4], y:0 },
        {x:"      ", y:this.props.data.F[4] },
        {x:this.props.data.lable[3], y:0 },
        {x:"       ", y:this.props.data.F[3] },
        {x:this.props.data.lable[2], y:0 },
        {x:"        ", y:this.props.data.F[2] },
        {x:this.props.data.lable[1], y:0 },
        {x:"         ", y:this.props.data.F[1] },
        {x:this.props.data.lable[0], y:0 },
        {x:"          ", y:this.props.data.F[0] }
      ]
    })
  }
}

componentDidMount(){

}


render() {
  const width = 400;
  const height = 400;
  const padding = { top: 60, bottom: 10, left: 20, right: 20 };
    return (
     <div>
       <VictoryChart height={height} width={width}
          domainPadding={{ x: 5}}
          padding = {padding}
        >
          <VictoryStack horizontal
            standalone={false}
             style={{ data: { width: 15 }, labels: { fontSize: 15 } }}
             padding ={10}
            >
           
          <VictoryBar 
            style={{ data: { fill: "#215167" } }}
            data= {this.state.dataM}
            labelComponent={<VictoryTooltip
              cornerRadius ={20}
              />}
          />
           <VictoryBar
            style={{ data: { fill: "#E6C24A" } }}
            data= {this.state.dataF}
            labelComponent={<VictoryTooltip
              cornerRadius ={20}
              />}
          />
          </VictoryStack>
          <VictoryAxis
          orientation = {"right"}
          offsetX = {380}
          style={{
            axis: { stroke: "black" },
            ticks: { stroke: "transparent" },
            tickLabels: { fontSize: 16, fill: "black" }
          }}
        />
         <VictoryLabel
          textAnchor="middle"
          style={{ fontSize: 30 }}
          x={(width/2)} y={30}
          text= {"Top 10 Medications"}
        />
        </VictoryChart>
        
    </div>
    );
  }
}

export default Medication;