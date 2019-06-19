import React, {Component} from "react";
import Dropdown from 'react-dropdown'

type SelChProps = {id?:number,name?:string};
type SelChState = {id:number, name:string,oprtator:string};

class SelectionChild extends React.Component<SelChProps, SelChState> {
    constructor(){
        super();
        this.state = {
          id : 0,
          name: "default",
          oprtator : "AND"
        };  
    };

    onChange(e : any){
        this.setState({
            oprtator : e.target.value
        })
        console.log(this.state.oprtator)
    }

    render() {
        const options = [
            "AND", "OR"
        ]
        const defaultOption = options[0]
        const  name  = this.props.name;
        return (
            <div id="Merkmal">
                    <div>
                        <button type = "buttons" id = "dropdown"><Dropdown options={options} onChange = {this.onChange} value ={defaultOption} placeholder="AND"/></button><br/>
                        <br/><p id="DiagnoseName">{this.props.name}</p>
                        <label className="container">Not
                            <input type="checkbox" />
                                <span className="checkmark"></span>
                        </label>
                    </div>
            </div>
        )
    }

}



export default SelectionChild;
