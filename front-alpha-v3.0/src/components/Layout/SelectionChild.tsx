import React, {Component} from "react";
import Dropdown from 'react-dropdown'

type SelChProps = {id:number,name:string,updateOperator:any,disabeld:boolean,operator:any};
type SelChState = {id:number,operator:any, updateOperator:any};

class SelectionChild extends React.Component<SelChProps, SelChState> {
    constructor(props:SelChProps){
        super(props);
        this.state = {
          id : this.props.id,
          operator : this.props.operator,
          updateOperator :this.props.updateOperator.bind(this)
        };  
        this.onChange = this.onChange.bind(this)
    };

    onChange(option : any){
      this.setState({
          operator : option
      })
      this.state.updateOperator(this.state.id,option)
    }
    componentDidMount(){
        this.state.updateOperator(this.state.id,this.state.operator)
    }

    render() {

        const options = [
           {label:"AND",value: "INTERSECT"},{label:"OR", value:"UNION"}
        ]
        return (
            <div id="Merkmal">
                    <div>
                        <button type = "buttons" id = "dropdown"><Dropdown disabled = {this.props.disabeld} options={options} onChange = {this.onChange} value ={this.state.operator} /></button><br/>
                        <br/><p id="DiagnoseName">{this.props.name}</p>

                    </div>
            </div>
        )
    }

}



export default SelectionChild;
