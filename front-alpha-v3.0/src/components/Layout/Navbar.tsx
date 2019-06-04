import React, {Component} from "react";

class Navbar extends Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return(
            <ul>
                <li><a href="default.asp">IdealGraph</a></li>
                <li style={{float: "right"}}><a className="active"
                                                href="#Help">Help</a></li>
            </ul>
        )
    }
}

export default Navbar;