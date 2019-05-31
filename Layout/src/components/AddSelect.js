import React, {Component} from "react";
import Selektion from "./Selektion"

class AddSelect extends Component{
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return(
           <button onClick= "myFunction()">Add</button>

        )
    }
}

export default AddSelect;