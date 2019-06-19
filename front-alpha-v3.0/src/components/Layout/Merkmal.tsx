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
<div>HHHAAALLOOOO</div>
                <div >
                    <button type = "buttons" id = "dropdown"><Dropdown options={options} value ={defaultOption} placeholder="AND"/></button><br/>
                     <label className="container">One
                        <input type="checkbox" />
                            <span className="checkmark"></span>
                    </label>
                    <div>HHHAAALLOOOO</div>
                </div>
                <div>HHHAAALLOOOO</div>

                </div>
        )
    }

}

export default Merkmal;
