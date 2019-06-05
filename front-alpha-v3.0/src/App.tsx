import * as React from "react";
import TreeMap from "./components/TreeMap/TreeMap";
import './App.css';
import Selection from "./components/Layout/Selection"
import AddSelect from "./components/Layout/AddSelect"
import Navbar from "./components/Layout/Navbar"


const urlAGE ="http://localhost:5000/data";
const urlFlare ="http://localhost:5000/flaredemo";
const urlI2B2 ="http://127.0.0.1:5000/api/navigation/data";
const urlSel = "http://localhost:5000/api/selection/data";

type MyState = {dataTree:any,
                dataAge:any,
                dataFM:any,
                currentNode:any,
                selectionList:any,
                operatorList:any,
                selectionNameList:any};


const data = require("./data/dataAllChild.json");

export default class App extends React.Component<{}, MyState> {

 

    constructor(){
        super();
        this.state = {
          dataTree : data,
          dataAge : {},
          dataFM : {},
          currentNode : [],
          selectionList : [],
          operatorList : [],
          selectionNameList : []
        };  
      }
      

      onChangeNode(currentNode: any){
        this.setState({
          currentNode: currentNode
        });
      };

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
            });
          }else{
            console.log("Merkmal schon enthalten")
          };
        };

        console.log(this.state.selectionNameList);
        console.log(this.state.selectionList);
        this.fetchData();
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
           }).then(this.fetchNav)
           .catch((e: any) => console.log("Request error NAV", e));
      }

     
      fetchNav(){
        console.log("FetchNav")
        fetch(urlI2B2).then(res => {
          return res.json();
        })
        .then(new_data => this.setState({dataTree : new_data}))
        .catch(e => console.log("Fetching error NAV", e));
      };

      componentDidMount(){
        this.fetchNav();
     
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
                    <Selection selName = {this.state.selectionNameList}></Selection>
                    <div>
                      <button onClick = {this.onButtonAdd.bind(this)}>Add</button>
                      <button onClick = {this.onButtonDelete.bind(this)}>Delete</button>
                    </div>
                  </div>
                  <div id="Treemap">
                  <TreeMap
                    height={410}
                    width={980}
                    data={this.state.dataTree}
                    valueUnit={"Patients"}
                    onChangeNode={this.onChangeNode.bind(this)}
            />
                  </div>
                </div> 
           
                <div id ="Rechts">
                  <div id = "Suchleiste">

                  </div>
                  <div id = "Graphen">

                  </div>
                  <div id="buttons">
                   
                  </div>
                </div>
              </div>
          </div>
        );
      }
      
    }

