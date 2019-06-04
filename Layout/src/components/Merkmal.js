import React, {Component} from "react";
import Dropdown from 'react-dropdown';
import Selektion from './Selektion';

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


                <div >
                    <button type = "buttons" id = "dropdown"><Dropdown options={options} onChange={this.onSelect} value = {selectedOption}  /></button>
                </div><br/>

                <form id="not">
                   NOT <input type="checkbox"/>
                </form>
                </div>
        )
    }

}



export default Merkmal;