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

componentDidUpdate(prevProps: { data: any; }){ 
  if (prevProps.data !== this.props.data) {
      let pGes = (this.props.data.data[0]+this.props.data.data[1]);
      let newPerIn = Math.round((100 / this.state.maxP) * pGes);
      let newPerOut = 100 -(newPerIn);

      this.setState({
        perIn : newPerIn,
        perOut : newPerOut,
        pComp : pGes
      })
  }
}


componentDidMount(){
  if(!this.state.init){
    this.setState({
      maxP : (this.props.data[0]+this.props.data[1]),
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
          colorScale={["#215167","#ECE9D6"]}
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
