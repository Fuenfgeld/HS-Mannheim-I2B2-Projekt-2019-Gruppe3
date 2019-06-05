import React, {Component} from "react";
import Dropdown from 'react-dropdown';
import Selektion from './Selektion';

const options = [
            "AND", "OR"
        ]

const options1 = [
            "Hauptdiagnose", "Nebendiagnose"
        ]

class Merkmal extends Component {
    state = {
        selectedOption: "AND",
        selectedOption1: "all Diagnoses",

    };


    onSelect = selectedOption => {
        this.setState({
            selectedOption});
        console.log(selectedOption)
    };

    onSelect1 = selectedOption1 => {
        this.setState({
            selectedOption1});
        console.log(selectedOption1)
    };
    render() {
        const {selectedOption } = this.state;
        const {selectedOption1 } = this.state;

        return (

            <div id="Merkmal">Name


                <div>
                    <button type = "buttons" id = "dropdown"><Dropdown options={options} onChange={this.onSelect} value = {selectedOption}  /></button>
                <br/>
                </div>
                    <button type = "buttons" id = "dropdown2"><Dropdown options={options1} onChange={this.onSelect1} value = {selectedOption1}  /></button>


                <form id="not">
                   NOT <input type="checkbox"/>
                </form>
                </div>
        )
    }

}



export default Merkmal;