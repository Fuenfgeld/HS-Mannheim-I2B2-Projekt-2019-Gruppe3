import React, {Component} from "react";


class Merkmal extends Component{
    constructor(props) {
        super(props);
        this.state = {}}
            render() {
                return (
                    <div id = "Merkmal">
                        <div class="dropdown">
                            <button class="dropbtn">AND</button>
                            <div class="dropdown-content">
                                <a href="#">AND</a>
                                <a href="#">OR</a>
                            </div>
                        </div>
                    </div>
                )
            }

        }



export default Merkmal;