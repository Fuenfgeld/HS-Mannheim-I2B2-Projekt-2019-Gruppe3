import {type} from "os";
import React, {Component} from "react";
import Dropdown from 'react-dropdown'

type SelChProps = {id?:number,name?:string};
type SelChState = {id:number, name:string};

class FirstSelectionChild extends React.Component<SelChProps, SelChState> {
    constructor(){
        super();
        this.state = {
          id : 0,
          name: "default",

        };
    };



    render() {
        const options = [
            "AND", "OR"
        ]
        const defaultOption = options[0]
        const  name  = this.props.name;
        return (
            <div id="Merkmal">
                <div>
                    <div >
                        <p></p>
                        <br/><p id="DiagnoseName">{this.props.name}</p>

                        <label className="container">Not
                        <input type="checkbox" />
                            <span className="checkmark"></span>
                        </label>

                    </div>

                </div>
            </div>
        )
    }

}



export default FirstSelectionChild;

