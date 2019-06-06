import React, {Component} from "react";
import Dropdown from 'react-dropdown'



class Merkmal extends Component<{}, {}> {
    render() {
        const options = [
            "AND", "OR"
        ]
        const defaultOption = options[0]
        return (

            <div id="Merkmal">Name
                <div>
                <div >
                    <button type = "buttons" id = "dropdown"><Dropdown options={options} value ={defaultOption} placeholder="AND"/></button>
                </div>
                </div>
                </div>
        )
    }

}

export default Merkmal;
