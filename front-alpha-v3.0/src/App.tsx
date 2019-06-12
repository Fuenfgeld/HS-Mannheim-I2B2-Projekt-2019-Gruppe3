import * as React from "react";
import TreeMap from "./components/TreeMap/TreeMap";
import './App.css';
import Selection from "./components/Layout/Selection";
import Navbar from "./components/Layout/Navbar";
import PatientCount from "./components/Graph/PatienCount";
import Search from "./components/Layout/Search"
//import GraphReChart from "./components/Graph/GraphReChart";
import GraphVictory from "./components/Graph/GraphVictory";

//import {Doughnut,Line} from 'react-chartjs-2';


const urlAGE ="http://localhost:5000/data";
const urlFlare ="http://localhost:5000/flaredemo";
const urlI2B2 ="http://127.0.0.1:5000/api/navigation/data";
const urlSel = "http://localhost:5000/api/selection/data";
const urlPCount = "http://localhost:5000/api/gender_distribution/data";
const urlDCount = "http://localhost:5000/api/diagnosecount/data";

type MyState = {dataTree:any,
                dataAge:any,
                dataFM:any,
                patientCount : any,
                diagnoseCount : string[],
                currentNode:any,
                selectionList:any,
                operatorList:any,
                selectionNameList:any,
                keyValue : number};



const data1 = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 3490, pv: 4300, amt: 2100,
  },
];


const data = require("./data/dataAllChild.json");

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
          selectionList : [],
          operatorList : [],
          selectionNameList : [],
          keyValue : 0
        };
        this.initNewData = this.initNewData.bind(this);
        this.resetTree = this.resetTree.bind(this);
      }


      onChangeNode(currentNode: any){
        this.setState({
          currentNode: currentNode
        });
      };
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
        if(displayheight==828){
            height=450
        }
        return  height
    }
    screenInfoWidth(){
        var displaywidth= window.screen.availWidth;
        var width
        if(displaywidth==1440){
            width=1120
        }
        return width
    }

      onButtonAdd(){
        console.log("ADD Button Press");

        if(this.state.selectionNameList.length == 0){
          console.log("war leer");
          this.setState({
            selectionNameList :  this.state.selectionNameList.concat(["Diagnoses"])
          });

        };

        if(this.state.currentNode.length !== 0){
          if(this.state.selectionNameList.indexOf(this.state.currentNode.data.name) == -1){
            this.setState({
              selectionNameList :  this.state.selectionNameList.concat([this.state.currentNode.data.name]),
              selectionList : this.state.selectionList.concat([this.state.currentNode.data.selection]),
              operatorList : this.state.operatorList.concat(["AND"])
            },() => {
              this.fetchData();
            })

          }else{
            console.log("Merkmal schon enthalten")
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
               operator: this.state.operatorList
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
        fetch(urlPCount).then(res => {
          return res.json();
        })
        .then(new_data => this.setState({diagnoseCount : new_data}))
        .catch(e => console.log("Fetching error DCount", e));
      }

      initNewData(){
        this.fetchNav();
        this.fetchPCount();
        this.fetchDCount();
      }

      resetTree(){
        this.setState({
          keyValue : this.state.keyValue +1
        })
      }

      componentDidMount(){
        this.fetchNav();
        this.fetchPCount();
        this.fetchDCount();
      };


    public render() {
      console.log("Render");
        return (
          <div className="App">
              <div id = "Navigation">
                <Navbar>
                </Navbar>
              </div>
              <div id = "Parts">
                <div id = "Links">
                  <div id = "Selektion">
                    <Selection selName = {this.state.selectionNameList}></Selection>

                  </div>
                  <div id="Treemap" >
                      <div>
                      <button className={'AddButton'} onClick = {this.onButtonAdd.bind(this)}>Add</button>
                      <button className={'DeleteButton'}onClick = {this.onButtonDelete.bind(this)}>Delete</button>
                    </div>
                  <TreeMap
                    key = {this.state.keyValue}
                    height={this.screenInfoHeight()}
                    width={950}
                    bgColorRangeLow={"#F8EFD0"}
                    bgColorRangeHigh={"#E6C24A"}
                    data={this.state.dataTree}
                    valueUnit={"Diagnoses"}
                    onChangeNode={this.onChangeNode.bind(this)}
                  />

                  </div>
                </div>

                <div id ="Rechts">
                  <div id = "Suchleiste">
                        <Search></Search>
                  </div>
                  <div id = "Graphen">
                      <div id="PatientenAnzahl"> <PatientCount  data = {this.state.patientCount}/>
                      </div>
                      <div className="vertical-menu">
                          <div id="GeschlechtGraph"> 
                          
                          </div><br/>
                          <div id="AlterGraph">
                            <GraphVictory
                            
                            />
                            </div><br/>
                          <div id="AllgemeinGraph">AllgemeinGraph</div><br/>
                          <div id="NebendiagnosenGraph">NebendiagnosenGraph</div>
                      </div>


                  </div>

                  <div id="buttons">
                        <form method='GET' action="runpage.html">
                          <input type="submit" id="RunButton" value="Run"  className="RunButton"></input>

                        </form>

                  </div>
                </div>
              </div>
          </div>
        );
      }

    }
