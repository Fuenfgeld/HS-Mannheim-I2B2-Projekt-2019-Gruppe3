import React, {Component} from "react"
import SelectionChild from "./SelectionChild";
import FirstSelectionChild from "./FirstSelectionChild";

type SelState = {numChildren:number,
                selNames:any,
                selOperators : any,
                onChangeOperator:any};
type SelProps = {selName:any,
                onChangeOperator:any,
                disabeld:boolean,
                selOperators:any}

class Selektion extends React.Component<SelProps, SelState> {
  constructor(props:SelProps){
    super(props);
    this.state = {
      numChildren : 0,
      selNames : this.props.selName,
      selOperators : this.props.selOperators,
      onChangeOperator : this.props.onChangeOperator.bind(this)
    };  
  };

  updateOperator(id:number,operator:string){
    let listO = this.state.selOperators;
    listO[id] = operator;
    this.setState({
      selOperators:listO
    },this.onChangeOperator)
  }

  onChangeOperator(){
    this.state.onChangeOperator(this.state.selOperators)
  }

  render() {
    let names = this.props.selName;
    let elements=[];
    let operator = this.props.selOperators;
        for(let i=0;i<names.length;i++){
             // push the component to elements!
             if(!operator[i]) {
              operator[i] = { label: "AND", value : "INTERSECT"}
             }
                elements.push(<SelectionChild key = {i} id = {i} name={ names[i]} updateOperator={this.updateOperator.bind(this)} disabeld ={this.props.disabeld} operator={operator[i]}/>);
        }
        return (
          <div id = "scrollMenu">
            <div id="children-pane">
              {elements}
            </div>
          </div>
    );
  }
}

export default Selektion;
