import React, {Component} from "react";
import Dropdown from 'react-dropdown'
import Selection from "./Selection";
import SelectionPage from "./SelectionPage"
import GenderDist from "../Graph/GenderDist";
import GraphAgeMF from "../Graph/GraphAgeMF";
import SecondaryDiaGraph from "../Graph/SecondaryDiaGraph";


import {
  BrowserRouter as Router,
  Route, Switch, Link
} from 'react-router-dom'
import PatientCount from "../Graph/PatienCount";

type SelChProps = {
    id?:number,
    name?:string};
type SelChState = {
    patientCount : any,
    diagnoseCount : any,
    ageDist : any,
    selectionNameList : any,
    operatorList : any
    };



const urlPCount = "http://localhost:5000/api/gender_distribution/data";
const urlDCount = "http://localhost:5000/api/diagnose_count/data";
const urlAgeDist = "http://localhost:5000/api/age_distribution/data";
const urlSelAll = "http://localhost:5000/api/selection_name/data";



class helppage extends React.Component<SelChProps, SelChState> {



    render() {

        return (
            <div id="helppage">
                    <div id = "Navigation">

                    </div>
                <div>help is here</div>

            </div>
        )
    }

}



export default helppage;
