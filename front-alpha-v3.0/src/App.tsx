import * as React from "react";
import TreeMap from "./components/TreeMap/TreeMap";

import './App.css';
import { any } from "prop-types";


const urlAGE ="http://localhost:5000/data";
const urlFlare ="http://localhost:5000/flaredemo";
const urlI2B2 ="http://127.0.0.1:5000/api/navigation/data";
const urlSel = "http://localhost:5000/selektList";

type MyState = {dataTree:any,
                dataAge:any,
                dataFM:any,
                currentNode:any,
                selectionList:any,
                operatorList:any};


const data = require("./data/flareSample.json");

export default class App extends React.Component<{}, MyState> {

 

    constructor(){
        super();
        this.state = {
          dataTree : data,
          dataAge : {},
          dataFM : {},
          currentNode : {},
          selectionList : [],
          operatorList : []
        };  
      }
      

      onChangeNode(currentNode: any){
        this.setState({
          currentNode: currentNode
        });
      };

      onButtonAdd(){
        console.log("ADD Button Press");
        console.log(this.state.currentNode);

        

        console.log();
      };



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
           })
           .catch((e: any) => console.log("Request error NAV", e));
      }

     
      componentDidMount(){
      
      fetch(urlI2B2).then(res => {
          return res.json();
        })
        .then(new_data => this.setState({dataTree : new_data}))
        .catch(e => console.log("Fetching error NAV", e));
      }
      

    public render() {
        return (
          <div>
          <div>
            <TreeMap
             height={500}
             width={800}
             data={this.state.dataTree}
             valueUnit={"Patients"}
             onChangeNode={this.onChangeNode.bind(this)}
            />
          </div>
          <div>
          <button onClick={this.onButtonAdd.bind(this)}>ADD</button>
          </div>
          </div>
        );
      }
    }

