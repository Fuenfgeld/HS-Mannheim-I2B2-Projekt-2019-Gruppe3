import {Component} from "react";
import * as React from "react";
import Merkmal from "./Merkmal";

class Search extends Component<{}, {}> {
    render() {

        return (
            <div>
                <link rel="stylesheet"
                      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                    <form className="example" action="action_page.php">
                        <input type="text" placeholder="Search.." name="search"/>
                            <button type="submit"><i className="fa fa-search"></i></button>
                    </form>
            </div>
        );
    }
}
export default Search;
