import {Component} from "react";
import * as React from "react";
import Merkmal from "./Merkmal";


 type MyState = {query:String,
                data:[],
                searchString: String}


class SearchBar extends Component<{}, {}> {

     constructor(){
        super();
        this.state = {

            query: '',
            data: [],
            searchString:[]

        };

    }



componentWillMount() {

}


    render() {

        return (
            <div>
                <link rel="stylesheet"
                      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>


                    <form className="example" action="action_page.php">
                        <input type="text" id="filter" placeholder="Search.."  name="search"/>
                            <button type="submit"><i className="fa fa-search"></i></button>


                    </form>
                    <div>
                    </div>
            </div>
        );
    }
}
export default SearchBar;

