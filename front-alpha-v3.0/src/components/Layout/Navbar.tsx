import React, {Component} from "react";

class Navbar extends Component{
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