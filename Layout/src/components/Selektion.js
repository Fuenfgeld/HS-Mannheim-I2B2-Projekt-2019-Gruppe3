import React, {Component} from "react";
import Merkmal from "./Merkmal"

class Selektion extends Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return(
           <div class = "scrollMenu">
               <a> <Merkmal>Merkmal 1</Merkmal> </a>
               <a><Merkmal>Merkmal 2</Merkmal></a>
                 <a> <Merkmal>Merkmal 3</Merkmal> </a>
               <a><Merkmal>Merkmal 4</Merkmal></a>
                 <a> <Merkmal>Merkmal 1</Merkmal> </a>
               <a><Merkmal>Merkmal 2</Merkmal></a>
           </div>

        )
    }
}

export default Selektion;