import * as React from "react";
import TreeMap from "../TreeMap/TreeMap";
import '../../App.css';
import Selection from "./Selection";
import Navbar from "./Navbar";
import PatientCount from "../Graph/PatienCount";
import {
  BrowserRouter as Router,
  Route, Switch, Link
} from 'react-router-dom'
//import GraphAgeMF from "./components/Graph/GraphAgeMF";
import GenderDist from "../Graph/GenderDist";
import GraphAgeMF from "../Graph/GraphAgeMF";
import SecondaryDiaGraph from "../Graph/SecondaryDiaGraph";




const urlI2B2 ="http://127.0.0.1:5000/api/navigation/data";
const urlSel = "http://localhost:5000/api/selection/data";
const urlPCount = "http://localhost:5000/api/gender_distribution/data";
const urlDCount = "http://localhost:5000/api/diagnose_count/data";
const urlAgeDist = "http://localhost:5000/api/age_distribution/data";
const urlSelAll = "http://localhost:5000/api/selection_name/data";

type MyState = {dataTree : any,
                dataAge : any,
                dataFM : any,
                patientCount : any,
                diagnoseCount : string[],
                currentNode : any,
                selectionList : any,
                operatorList : any,
                selectionNameList : any,
                keyValue : number,
                ageDist : any};



const data = require("../../data/dataAllChild.json");

export default class App extends React.Component<{}, MyState> {

    constructor(){
        super();
        this.state = {
          dataTree : data,
          dataAge : {},
          dataFM : {},
          patientCount : [82,52],
          diagnoseCount : [],
          currentNode : [],
          selectionList :[],
          operatorList : [],
          selectionNameList : [],
          keyValue : 0,
          ageDist : {"data":[{"F":1,"M":0,"name":"0-10"},{"F":11,"M":20,"name":"10-20"},{"F":9,"M":12,"name":"20-30"},{"F":13,"M":22,"name":"30-40"},{"F":6,"M":15,"name":"40-50"},{"F":2,"M":6,"name":"50-60"},{"F":4,"M":6,"name":"60-70"},{"F":3,"M":1,"name":"70-80"},{"F":3,"M":0,"name":"80-90"}]}
        };
        this.initNewData = this.initNewData.bind(this);
        this.resetTree = this.resetTree.bind(this);
      }

      onChangeNode(currentNode: any){
        this.setState({
          currentNode: currentNode
        });
      };


      onChangeOperator(selOperatorList:any){
        this.setState({
          operatorList : selOperatorList
        },() => {
          this.fetchData();
        })
      }

      screenInfoHeightDisplay(){
        var displayheight= window.screen.availHeight;

        return  displayheight
      }

    screenInfoWidthDisplay(){
        var displaywidth= window.screen.availWidth;

        return displaywidth
    }

    screenInfoHeight(){
        var displayheight= window.screen.availHeight;
        var height
            height=(displayheight/100)*50;

        return  height
    }

    screenInfoWidth(){
        var displaywidth= window.screen.availWidth;
        var width
            width=(displaywidth/100)*69;

        return width
    }

      onButtonAdd(){
        console.log("ADD Button Press");

        if(this.state.selectionNameList.length == 0){
          console.log("was empty");
          this.setState({
            selectionNameList :  this.state.selectionNameList.concat(["Diagnoses"])
          });

        };

        if(this.state.currentNode.length !== 0){
          if(this.state.selectionNameList.indexOf(this.state.currentNode.data.name) == -1){
            this.setState({
              selectionNameList :  this.state.selectionNameList.concat([this.state.currentNode.data.name]),
              selectionList : this.state.selectionList.concat([this.state.currentNode.data.selection]),
            },() => {
              this.fetchData();
            })

          }else{
            console.log("already in selection")
          };
        };
      };


      onButtonDelete(){
        console.log("Delete Pressed");
        let selectionNameList = this.state.selectionNameList;
        selectionNameList.pop();
        let selectionList = this.state.selectionList;
        selectionList.pop();
        let operatorList = this.state.operatorList;
        operatorList.pop();

        this.setState({
          selectionNameList : selectionNameList,
          selectionList : selectionList,
          operatorList : operatorList
        },() => {
          this.fetchData();
        })
      }


      fetchData = () => {
        fetch(urlSel, {
           method: 'post',
           //dataType: 'JSON',
           headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
           },
           body: JSON.stringify({
               selection: this.state.selectionList,
               operator: this.state.operatorList,
               selection_name: this.state.selectionNameList
           })
       })
            .then(function (data: any) {
              console.log('Request success: ', data);


           }).then(this.initNewData)
           .catch((e: any) => console.log("Request error NAV", e));
      }


      fetchNav(){
        fetch(urlI2B2).then(res => {
          return res.json();
        })
        .then(new_data => this.setState({dataTree : new_data}))
        .then(this.resetTree)
        .catch(e => console.log("Fetching error NAV", e));
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
        .catch(e => console.log("Fetching error AgeDist", e));
      }

      fetchSelData(){
        fetch(urlSelAll).then(res => {
          return res.json();
        })
        .then(new_data => this.setState({selectionList : new_data.selection,
                                          operatorList : new_data.operator,
                                          selectionNameList : new_data.names
                                        }))
        .catch(e => console.log("Fetching error SelData", e));
      }


      initNewData(){
        this.fetchNav();
        this.fetchPCount();
        this.fetchDCount();
        this.fetchAgeDist();
      }

      resetTree(){
        this.setState({
          keyValue : this.state.keyValue +1
        })
      }

      componentDidMount(){
        this.fetchNav();
        this.fetchSelData();
        this.fetchPCount();
        this.fetchDCount();
        this.fetchAgeDist(); 
      };


    public render() {
        return (
          <div className="App">
              <div id = "Navigation">
                <Navbar>
                </Navbar>
              </div>
              <div id = "Parts">
                <div id = "Links">
                  <div id = "Selektion">
                    <Selection selName = {this.state.selectionNameList} onChangeOperator={this.onChangeOperator.bind(this)} disabeld={false} selOperators={this.state.operatorList}></Selection>
                  </div>
                  <div id="Treemap" >
                      <div>
                      <button className={'AddButton'} onClick = {this.onButtonAdd.bind(this)}>Add</button>
                      <button className={'DeleteButton'}onClick = {this.onButtonDelete.bind(this)}>Delete</button>
                      <Link className={'RunButton'} to='/result'>Result</Link>
                    </div>
                  <TreeMap
                    key = {this.state.keyValue}
                    height={this.screenInfoHeight()}
                    width={this.screenInfoWidth()}
                    bgColorRangeLow={"#B7BEC5"}
                    bgColorRangeHigh={"#66717E"}
                    data={this.state.dataTree}
                    valueUnit={"Diagnoses"}
                    onChangeNode={this.onChangeNode.bind(this)}
                  />

                  </div>
                </div>

                <div id ="Rechts">
                  <div id = "Graphen">
                      <div className="vertical-menu">
                          <div id="PatientenAnzahl"> <PatientCount  data = {this.state.patientCount}/></div>
                          <div id ="PatientenAnzahl"> <GenderDist  data = {this.state.patientCount}/> </div><br/>
                              <div id="GeschlechtGraph">
                               <GraphAgeMF data = {this.state.ageDist}/>
                              </div><br/>
                              <div id="NebendiagnosenGraph">
                                  <SecondaryDiaGraph data = {this.state.diagnoseCount}/>
                              </div><br/>
                      </div>
                  </div>

                  <div id="buttons">
                

                  </div>
                </div>
              </div>
          </div>
        );
      }

    }
