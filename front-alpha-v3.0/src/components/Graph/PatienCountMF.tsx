import React, {Component} from "react";
import {VictoryPie, VictoryLabel,VictoryTooltip} from "victory";

type PatProps = {
  data : any
}

type PatState = {
  perInM : number,
  perInF : number,
  perOut : number,
  maxP : number,
  init : boolean,
  pComp : any
}

class PatientCount extends React.Component<PatProps,PatState> {

  constructor(){
    super();
    this.state = {
      perInM : 50,
      perInF : 50,
      perOut : 0,
      maxP : 100,
      init : false,
      pComp : 100
    };
    
  }

componentDidUpdate(prevProps: { data: any; }){ 
  if (prevProps.data !== this.props.data) {

      let newPerInM = Math.round((100 / this.state.maxP) * this.props.data.data[0]);
      let newPerInF = Math.round((100 / this.state.maxP) * this.props.data.data[1]);
      let newPerOut = 100 -(newPerInF + newPerInM);

      this.setState({
        perInM : newPerInM,
        perInF : newPerInF,
        perOut : newPerOut,
        pComp : this.props.data.data[0] + this.props.data.data[1]
      })
  }
}



componentDidMount(){
  if(!this.state.init){
    this.setState({
      maxP :this.props.data.data[0] + this.props.data.data[1],
      init : true
    })
  };
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
            { y: this.state.perInM, label:"Male" },{ y: this.state.perInF, label:"Female"}, { y: this.state.perOut }
          ]}
          innerRadius={130} 
          labelRadius={100}
          labelComponent={<VictoryTooltip
                            cornerRadius ={20}
                            />}
          labels = {() => null}

        />
        <VictoryLabel
          textAnchor="middle"
          style={{ fontSize: 30 }}
          x={200} y={200}
          text= {(this.state.perInM+this.state.perInF)+"% \n"+(this.state.pComp)}
        />
       
      </svg>
     </div>
    );
  }
}

export default PatientCount;