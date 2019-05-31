import React, {Component} from "react";
import TreeMap from "react-d3-treemap";


let data= require("../data")

class Treemap extends Component{

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return(
                   <TreeMap width={980} height={410} data={data} valueUnit={"MB"} />
        )
    }
}

export default Treemap;