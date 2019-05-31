import React, {Component} from "react";
import Merkmal from "./Merkmal";


class Selektion extends Component{
    constructor(props) {
        super(props);
        this.state = {}
    }



    render() {
        return(
           <div class = "scrollMenu">
               <a><Merkmal></Merkmal></a>
           </div>

        )
    }
}


export default Selektion;