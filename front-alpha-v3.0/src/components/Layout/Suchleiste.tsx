import React, {Component} from "react";

class Suchleiste extends Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return(
            <label htmlFor="suche">
                  <input type="search" id="suche" placeholder="Suche"/>
                  </label>
        )
    }
}

export default Suchleiste;