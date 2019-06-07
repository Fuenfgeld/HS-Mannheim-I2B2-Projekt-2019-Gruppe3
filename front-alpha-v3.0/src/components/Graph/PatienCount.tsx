import React, {Component} from "react"


type PatProps = {
    data : number
}


class PatientCount extends React.Component<PatProps, {}> {

  render() {
    return (
     <div>
         Patienten Anzahl :   {this.props.data}
     </div>
    );
  }
}

export default PatientCount;