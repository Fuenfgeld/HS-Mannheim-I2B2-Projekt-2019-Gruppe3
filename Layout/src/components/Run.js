import React, {Component} from "react";

class Run extends Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return(
                <button onClick= "myFunction()">Run</button>
        )
    }
}

export default Run;