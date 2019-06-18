import React, {Component} from "react";
import Dropdown from 'react-dropdown'
import Navbar from "./Navbar";
import Selection from "./Selection";
import ErsteSeite from "./ErsteSeite"

import {
  BrowserRouter as Router,
  Route, Switch, Link
} from 'react-router-dom'

type SelChProps = {id?:number,name?:string};
type SelChState = {id:number, name:string,oprtator:string};



class Ergebnis extends React.Component<SelChProps, SelChState> {



    onButtonSave(){
        console.log("Save Button Press");
        alert("In Bearbeitung..")
    };



    render() {

        return (
            <div>

                    <div id = "Navigation">
                        <Navbar>
                        </Navbar>
                    </div>

                    <div id = "Oben">
                        <div id = "Selektion">
                            <Selection selName={"...."}></Selection>
                        </div>
                    </div>

                    <div id="Unten">
                        Your Results

                        <button className={'RunButton'}onClick = {this.onButtonSave.bind(this)}>Save</button>
                        <Link className={'RunButton'} to='/'>Edit</Link>

                    </div>
            </div>
        )
    }

}



export default Ergebnis;
