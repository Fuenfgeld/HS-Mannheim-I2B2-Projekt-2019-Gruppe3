import React, {Component} from "react";
import {VictoryChart, VictoryLabel,VictoryBar,VictoryContainer,VictoryStack } from "victory";

type secProps = {
  data : any
}

type secState = {
  data : any
}

class SecondaryDiaGraph extends React.Component<secProps,secState> {

  constructor(){
    super();
    this.state = {
      data :[
        {x:"loding", y:69 },
        {x:"loding", y:69 },
        {x:"loding", y:69 },
        {x:"loding", y:69 },
        {x:"loding", y:69 },
        {x:"loding", y:69 },
        {x:"loding", y:69 },
        {x:"loding", y:69 },
        {x:"loding", y:69 },
        {x:"loding", y:69 }
      ]
    }
  }

componentDidUpdate(prevProps: { data: any; }){ 
  if (prevProps.data !== this.props.data) {
    this.setState({
      data : [
        {x:this.props.data.lable[0], y:this.props.data.data[0] },
        {x:this.props.data.lable[1], y:this.props.data.data[1] },
        {x:this.props.data.lable[2], y:this.props.data.data[2] },
        {x:this.props.data.lable[3], y:this.props.data.data[3] },
        {x:this.props.data.lable[4], y:this.props.data.data[4] },
        {x:this.props.data.lable[5], y:this.props.data.data[5] },
        {x:this.props.data.lable[6], y:this.props.data.data[6] },
        {x:this.props.data.lable[7], y:this.props.data.data[7] },
        {x:this.props.data.lable[8], y:this.props.data.data[8] },
        {x:this.props.data.lable[9], y:this.props.data.data[9] }
      ]
    })
  }
}

componentDidMount(){

}


render() {
    return (
     <div>
       <VictoryChart height={400} width={400}
          domainPadding={{ x: 50}}
        >
          <VictoryBar
            data= {this.state.data}
          />
        </VictoryChart>
    </div>
    );
  }
}

export default SecondaryDiaGraph;