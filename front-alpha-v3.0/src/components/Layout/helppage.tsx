import React, {Component} from "react";
import Dropdown from 'react-dropdown'
import Navbar from "./Navbar";
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



class ResultPage extends React.Component<SelChProps, SelChState> {


    constructor(){
        super();
        this.state = {
          patientCount : [82,52],
          diagnoseCount : [],
          selectionNameList : [],
          operatorList : [],
          ageDist : {"data":[{"F":1,"M":0,"name":"0-10"},{"F":11,"M":20,"name":"10-20"},{"F":9,"M":12,"name":"20-30"},{"F":13,"M":22,"name":"30-40"},{"F":6,"M":15,"name":"40-50"},{"F":2,"M":6,"name":"50-60"},{"F":4,"M":6,"name":"60-70"},{"F":3,"M":1,"name":"70-80"},{"F":3,"M":0,"name":"80-90"}]}
        };
    }

    onButtonSave(){
        console.log("Save Button Press");
        alert("In Bearbeitung..")
    };


    fetchPCount(){
        fetch(urlPCount).then(res => {
          return res.json();
        })
        .then(new_data => this.setState({patientCount : new_data}))
        .catch(e => console.log("Fetching error PCount", e));
      };

      fetchDCount(){
        fetch(urlDCount).then(res => {
          return res.json();
        })
        .then(new_data => this.setState({diagnoseCount : new_data}))
        .catch(e => console.log("Fetching error DCount", e));
      }

      fetchAgeDist(){
        fetch(urlAgeDist).then(res => {
          return res.json();
        })
        .then(new_data => this.setState({ageDist : new_data}))
        .catch(e => console.log("Fetching error DCount", e));
      }

      fetchSel(){
        fetch(urlSelAll).then(res => {
          return res.json();
        })
        .then(new_data => this.setState({selectionNameList : new_data.names}))
        .catch(e => console.log("Fetching error DCount", e));
      }

      onChangeOperator(selOperatorList:any){
        this.setState({
          operatorList : selOperatorList
        },() => {
          //this.fetchData();
        })
      }

      

      componentDidMount(){
        this.fetchSel();
        this.fetchPCount();
        this.fetchDCount();
        this.fetchAgeDist();
        
      };


    render() {

        return (
            <div id="resultpage">
                    <div id = "Navigation">
                        <Navbar>
                        </Navbar>
                    </div>
                <div id="resultedit">
                    <div id = "Oben">
                        <div id = "Selektion">
                            <Selection selName={this.state.selectionNameList} onChangeOperator={this.onChangeOperator} disabeld={true} selOperators={this.state.operatorList}></Selection>
                        </div>
                    </div>

                    <div id="Unten">
                        <div id="Überschrift">Your Results

                            <Link className={'RunButton'} to='/'>Edit</Link>
                        </div>
                        <br/><br/><br/>
                    <div>

                        <div id="PatientenAnzahl2"> <PatientCount  data = {this.state.patientCount}/></div>

                        <div id ="PatientenAnzahl2"> <GenderDist  data = {this.state.patientCount}/> </div>

                        <div id="AgeGenderGraph2"> <GraphAgeMF data = {this.state.ageDist}/> </div>

                        <div id="NebendiagnosenGraph2">
                           Nebendiagnosen
                          <SecondaryDiaGraph data = {this.state.diagnoseCount}/>
                        </div>

                    </div>

                    </div>
                </div>
            </div>
        )
    }

}



export default ResultPage;
