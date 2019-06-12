import React, {Component} from "react";
import {VictoryPie, VictoryLabel} from "victory";

type PatProps = {
  data : any
}

type PatState = {
  dataM: number,
  dataF: number,
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
      dataM: 50,
      dataF: 50,
      perInM : 50,
      perInF : 50,
      perOut : 0,
      maxP : 134,
      init : false
    };
    this.updateState = this.updateState.bind(this)
  }


  updateState(){
    this.setState({
      dataM: this.props.data[0],
      dataF: this.props.data[1]
    })
  }

componentDidUpdate(prevProps){
  console.log("compDU PC");
  
  if (prevProps.data !== this.props.data) {
    this.updateState
    let newPerInM = Math.round((100 / this.state.maxP) * this.state.dataM);
    let newPerInF = Math.round((100 / this.state.maxP) * this.state.dataF);
    let newPerOut = 100 -(newPerInF + newPerInM);


    this.setState({
      perInM : newPerInM,
      perInF : newPerInF,
      perOut : newPerOut
    })

  }
}

arrSum = arr => arr.reduce((a,b) => a + b, 0);




componentDidMount(){
  console.log("compMount PC");
  if(!this.state.init){
    this.setState({
      maxP : this.arrSum(this.props.data),
      init : true
    })
  };
  
  console.log(this.arrSum(this.props.data));
}

render() {
    return (
     <div>
         <svg viewBox="0 0 400 400">
        <VictoryPie
          standalone={false}
          width={400} height={400}
          colorScale={["#123440","#E6C24A","#EBD2A9"]}
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
          text= {(this.state.perInM+this.state.perInF)+"% \n"+(this.state.dataM+this.state.dataF)}
        />
      </svg>
     </div>
    );
  }
}

export default PatientCount;