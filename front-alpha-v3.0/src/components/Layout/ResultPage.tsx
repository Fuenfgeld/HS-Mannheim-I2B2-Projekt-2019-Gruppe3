import React, {Component} from "react";
import Dropdown from 'react-dropdown';
import Navbar from "./Navbar";
import Selection from "./Selection";
import SelectionPage from "./SelectionPage"
import GenderDist from "../Graph/GenderDist";
import GraphAgeMF from "../Graph/GraphAgeMF";
import SecondaryDiaGraph from "../Graph/SecondaryDiaGraph";
import Medication from "../Graph/Medication";
import Procedures from "../Graph/Procedures"
import VitalStatus from "../Graph/VitalStatus"
import LengthOfStay from "../Graph/LengthOfStay"
import LabTest from "../Graph/LabTest"

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
    operatorList : any,
    medicationCount : any
    procedureCount : any,
    vitalStatus : any,
    lengthStay : any,
    labTestData : any
    };


const urlPre = "http://localhost:5000"

const urlPCount = urlPre+"/api/gender_distribution/data";
const urlDCount = urlPre+"/api/diagnose_count/data";
const urlAgeDist = urlPre+"/api/age_distribution/data";
const urlSelAll = urlPre+"/api/selection_name/data";
const urlMed = urlPre+"/api/medication_count/data";
const urlPro = urlPre+"/api/procedure_count/data";
const urlVit = urlPre+"/api/vital_status/data";
const urlSty = urlPre+"/api/stay_of_days/data";
const urlLab = urlPre+"/api/laboratory_tests/data";





class ResultPage extends React.Component<SelChProps, SelChState> {


    constructor(){
        super();
        this.state = {
          patientCount : [82,52],
          diagnoseCount : [],
          selectionNameList : [],
          operatorList : [],
          ageDist : {"data":[{"F":1,"M":0,"name":"0-10"},{"F":11,"M":20,"name":"10-20"},{"F":9,"M":12,"name":"20-30"},{"F":13,"M":22,"name":"30-40"},{"F":6,"M":15,"name":"40-50"},{"F":2,"M":6,"name":"50-60"},{"F":4,"M":6,"name":"60-70"},{"F":3,"M":1,"name":"70-80"},{"F":3,"M":0,"name":"80-90"}]},
          medicationCount : [],
          procedureCount : [],
          vitalStatus :[],
          lengthStay : [],
          labTestData : []
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
        .then(new_data => this.setState({selectionNameList : new_data.names,operatorList:new_data.operator}))
        .catch(e => console.log("Fetching error DCount", e));
      }

      fetchMed(){
        fetch(urlMed).then(res => {
          return res.json();
        })
        .then(new_data => this.setState({medicationCount : new_data}))
        .catch(e => console.log("Fetching error DCount", e));
      }

      fetchPro(){
        fetch(urlPro).then(res => {
          return res.json();
        })
        .then(new_data => this.setState({procedureCount : new_data}))
        .catch(e => console.log("Fetching error DCount", e));
      }

      fetchVit(){
        fetch(urlVit).then(res => {
          return res.json();
        })
        .then(new_data => this.setState({vitalStatus : new_data}))
        .catch(e => console.log("Fetching error DCount", e));
      }

      fetchSty(){
        fetch(urlSty).then(res => {
          return res.json();
        })
        .then(new_data => this.setState({lengthStay : new_data}))
        .catch(e => console.log("Fetching error DCount", e));
      }

      fetchLab(){
        fetch(urlLab).then(res => {
          return res.json();
        })
        .then(new_data => this.setState({labTestData : new_data}))
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
        this.fetchMed();
        this.fetchPro();
        this.fetchVit();
        this.fetchSty();
        this.fetchLab();

      };


    render() {
        return (
            <div id="resultpage">
                    <div id = "Navigation">
                        <Navbar></Navbar>
                    </div>
                    <div id="resultedit">
                        <div id = "Oben">
                        <div id = "Selektion">
                            <Selection selName={this.state.selectionNameList} onChangeOperator={this.onChangeOperator} disabeld={true} selOperators={this.state.operatorList}></Selection>
                        </div>
                        </div>

                    <div id="Unten">
                        <br/>
                        <h1 id="schatten">The Results
                            <Link className={'RunButton'} to='/'>Edit</Link>
                        </h1>

                        <div className="vertical-menu2">
                            <div id="resultGeneralInfo">
                                <div id="resultGeneralInfo1">

                                    <div id="PatientenAnzahl2"> <PatientCount data = {this.state.patientCount}/></div>
                                    <div id ="PatientenAnzahl3"> <GenderDist  data = {this.state.patientCount}/> </div>

                                </div>
                                <br/>
                                <div id="resultGeneralInfo2">

                                    <div id="rgi2">
                                        <div id="NebendiagnosenGraph2">
                                            <SecondaryDiaGraph data = {this.state.diagnoseCount}/></div>
                                    </div>

                                    <div id="rgi3">
                                        <div id="NebendiagnosenGraph2">
                                            <Medication data = {this.state.medicationCount}/></div>
                                    </div>
                                    <div id="rgi4">
                                    <div id="NebendiagnosenGraph3">
                                        <Procedures data = {this.state.procedureCount}/>
                                     </div>

                                    </div>
                                </div>
                            </div>

                            <div id="resultmainInfo">
                                <div id="AgeGenderGraph2"> <GraphAgeMF data = {this.state.ageDist}/> </div>
                                <div id="AgeGenderGraph2"  > <VitalStatus  data = {this.state.vitalStatus}/></div>
                                <div id="AgeGenderGraph3"><LengthOfStay data = {this.state.lengthStay}/></div>
                            </div>

                            <div id="resultspecialInfo">
                              <div id ="rsi1"> <LabTest  data = {this.state.labTestData.creatine} domain={[0,400]} label={"Creatine"} normRange={{f:[45,90],m:[60,110]}} unit ={"mmol/L"}/></div>
                              <div id ="rsi1"> <LabTest  data = {this.state.labTestData.cholesterol} domain={[0,300]} label={"Cholesterol"} normRange={{f:[0,0],m:[0,0]}} unit ={"mg/dL"}/></div>
                              <div id ="rsi1"> <LabTest  data = {this.state.labTestData.hemoglobin} domain={[0,20]} label={"Hemoglobin"} normRange={{f:[12.5,15.5],m:[13.5,17.5]}} unit ={"g/dL"}/></div>
                              <div id ="rsi1"> <LabTest  data = {this.state.labTestData.C_REACTIVE_PROTEIN} domain={[0,10]} label={"C-Reactive Protein"} normRange={{f:[0,3],m:[0,3]}} unit ={"mg/L"}/></div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>

        )
    }

}



export default ResultPage;
