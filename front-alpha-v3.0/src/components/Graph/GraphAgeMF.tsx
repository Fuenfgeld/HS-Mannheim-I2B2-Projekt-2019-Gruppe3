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

class GraphAgeMF extends React.Component<ageProps,ageState> {

  constructor(){
    super();
    this.state = {
     data : [],
     dataM : [],
     dataF : []
    };
    
  }

 
componentDidUpdate(prevProps){ 
    if (prevProps.data !== this.props.data) {
       this.setState({
           dataM : this.props.data.data,
           dataF : this.props.data.data,
       }) 
    }
}


componentDidMount(){
 
}

render() {
    const padding = { top: 80, bottom: 80, left: 20, right: 20 }
    return (
     <div>
        <svg viewBox={`0 0 500 500`} style={{ width: "100%", height: "auto" }}>
            <VictoryStack horizontal
                standalone={false}
                domain={{ y: [-60, 60] }}
                padding={padding}
                height={400}
                width={400}
                style={{ data: { width: 20 }, labels: { fontSize: 11 } }}>
                    <VictoryBar
                        style={{ data: { fill: "#123440" } }}
                        data={this.state.dataM}
                        y={(data) => (-Math.abs(data.y))}
                        />
                    <VictoryBar
                        style={{ data: { fill: "#E6C24A" } }}
                        data={this.state.dataF}
                    />
                    <VictoryAxis dependentAxis
                        height={400}
                        width={400}
                        padding={padding}
                        style={{
                        axis: { stroke: "transparent" },
                        ticks: { stroke: "transparent" },
                        tickLabels: { fontSize: 11, fill: "black" }
                    }}
                    tickLabelComponent={<VictoryLabel x={250} textAnchor="middle"/>}
                    tickValues={this.state.dataM.map((point) => point.x).reverse()}
                  />
            </VictoryStack>
      </svg>
     </div>
    );
  }
}

export default GraphAgeMF;