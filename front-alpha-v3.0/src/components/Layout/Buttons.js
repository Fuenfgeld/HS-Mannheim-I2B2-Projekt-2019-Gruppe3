import React, {Component} from "react";
import Run from "./Run"
import Edit from "./Edit"
import Save from "./Save"

class Buttons extends Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return(
            <div>
                <Run></Run>
                <Edit></Edit>
                <Save></Save>
            </div>
        )
    }
}

export default Buttons;