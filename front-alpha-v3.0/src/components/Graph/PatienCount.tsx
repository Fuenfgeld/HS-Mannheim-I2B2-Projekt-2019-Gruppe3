import React, {Component} from "react";
import {VictoryPie, VictoryLabel,VictoryTooltip} from "victory";

type PatProps = {
  data : any
}

type PatState = {
  perIn : number,
  perOut : number,
  maxP : number,
  init : boolean,
  pComp : any
}

class PatientCount extends React.Component<PatProps,PatState> {

  constructor(){
    super();
    this.state = {
      perIn : 100,
      perOut : 0,
      maxP : 100,
      init : false,
      pComp : 100
    };
    
  }

componentDidUpdate(prevProps){ 
  if (prevProps.data !== this.props.data) {
      let pGes = this.arrSum(this.props.data.data);
      let newPerIn = Math.round((100 / this.state.maxP) * pGes);
      let newPerOut = 100 -(newPerIn);

      this.setState({
        perIn : newPerIn,
        perOut : newPerOut,
        pComp : this.arrSum(this.props.data.data)
      })
  }
}

arrSum = arr => arr.reduce((a,b) => a + b, 0);


componentDidMount(){
  if(!this.state.init){
    this.setState({
      maxP : this.arrSum(this.props.data),
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
          colorScale={["#123440","#ECE9D6"]}
          data={[
            { y: this.state.perIn, label:"Patients in Selektion" }, { y: this.state.perOut }
          ]}
          cornerRadius ={25}
          innerRadius={130} 
          labelRadius={140}
          labelComponent={<VictoryTooltip
                            cornerRadius ={20}
                            />}
          labels = {() => null}

        />
        <VictoryLabel
          textAnchor="middle"
          style={{ fontSize: 40 }}
          x={200} y={200}
          text= {(this.state.perIn)+"% \n"+(this.state.pComp)+" von "+(this.state.maxP)}
        />
       <VictoryLabel
          textAnchor="middle"
          style={{ fontSize: 40 }}
          x={200} y={20}
          text= {"Patient in selection"}
        />
      </svg>
     </div>
    );
  }
}

export default PatientCount;