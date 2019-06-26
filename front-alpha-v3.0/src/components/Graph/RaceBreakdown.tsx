import React, {Component} from "react";
import {VictoryPie, VictoryLabel,VictoryTooltip} from "victory";

type PatProps = {
  data : any
}

type PatState = {
    data :any
}
class RaceBreakDown extends React.Component<PatProps,PatState> {

  constructor(){
    super();
    this.state = {
      data : []
    };
    
  }

componentDidUpdate(prevProps: { data: any; }){ 
  if (prevProps.data !== this.props.data) {}
      this.setState({
       data : [
           {x: 10, label: "asian"},
           {x: 10, label: "asian"},
           {x: 10, label: "asian"},
           {x: 10, label: "asian"},
           {x: 10, label: "asian"}
       ]
    })
}


render() {
  const padding = { top: 60, bottom: 100, left: 30, right: 30 };
    return (
     <div>
        <svg viewBox="0 0 400 400">
        <VictoryPie
          width={400} height={400}
          padding ={padding}
          colorScale={["#66717E","#F9F9F9"]}
          data={this.state.data} 
          labelRadius={140}
          labelComponent={<VictoryTooltip
                            cornerRadius ={20}
                            />}
          labels = {() => null}

        />
       <VictoryLabel
          textAnchor="middle"
          style={{ fontSize: 30 }}
          x={200} y={20}
          text= {"RaceBreakdown"}
        />
      </svg>
     </div>
    );
  }
}

export default RaceBreakDown;
