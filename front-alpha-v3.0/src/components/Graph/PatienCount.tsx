import React, {Component} from "react";
import {VictoryPie, VictoryLabel} from "victory";

type PatProps = {
  data : any
}

type PatState = {
  perInM : number,
  perInF : number,
  perOut : number,
  maxP : number,
  init : boolean
}

class PatientCount extends React.Component<PatProps,PatState> {

  constructor(){
    super();
    this.state = {
      perInM : 50,
      perInF : 50,
      perOut : 0,
      maxP : 134,
      init : false
    };
  }





componentDidUpdate(prevProps){
  if (prevProps.data !== this.props.data) {
    let newPerInM = Math.round((100 / this.state.maxP) * this.props.data[0]);
    let newPerInF = Math.round((100 / this.state.maxP) * this.props.data[1]);
    let newPerOut = 100 -(newPerInF + newPerInM);

    this.setState({
      perInM : newPerInM,
      perInF : newPerInF,
      perOut : newPerOut
    })

  }
}

componentDidMount(){
  if(!this.state.init){
    this.setState({
      maxP : this.props.data[0]+ this.props.data[1],
      init : true
    })
  }
}

render() {
    return (
     <div>
         <svg viewBox="0 0 400 400">
        <VictoryPie
          standalone={false}
          width={400} height={400}
          colorScale={["#123440","#ECE9D6"]}
          data={[
            { y: this.state.perInM },{ y: this.state.perInF }, { y: this.state.perOut }
          ]}
          innerRadius={130} 
          labelRadius={100}
          labels = {() => null}

        />
        <VictoryLabel
          textAnchor="middle"
          style={{ fontSize: 40 }}
          x={200} y={200}
          text= {(this.state.perInM+this.state.perInF)+"% \n"+(this.props.data[0]+this.props.data[1])}
        />
      </svg>
     </div>
    );
  }
}

export default PatientCount;