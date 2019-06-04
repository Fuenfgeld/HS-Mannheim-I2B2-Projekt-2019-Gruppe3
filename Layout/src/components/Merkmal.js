import React, {Component} from "react";
import Dropdown from 'react-dropdown'
const options = [
            "AND", "OR"
        ]
class Merkmal extends Component {
    state = {
        selectedOption: "AND",
    };
    onSelect = selectedOption => {
        this.setState({
            selectedOption});
        console.log(selectedOption)
    };
    render() {
        const {selectedOption } = this.state;
        return (

            <div id="Merkmal">Name
                <div>
                <div >
                    <button type = "buttons" id = "dropdown"><Dropdown options={options} onChange={this.onSelect} value = {selectedOption}  /></button>
                </div>
                </div>
                </div>
        )
    }

}



export default Merkmal;