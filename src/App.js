import React, { Component } from 'react';
import './App.css';
import BarChart from './components/BarChart';
import SVGChart from './components/SVGChart';
import TreeMap from "react-d3-treemap";
import SVGIcicle from './components/SVGIcicle';
import { ColorModel } from "react-d3-treemap";
import {Doughnut,Line} from 'react-chartjs-2';

const dataFMPie = {
	labels: [
		'Male',
		'Female'
	],
	datasets: [{
		data: [82,52],
		backgroundColor: [
		'#FF6384',
		'#36A2EB'
		],
		hoverBackgroundColor: [
		'#FF6384',
		'#36A2EB'
		]
	}]
};

const dataAgeLine = {
  labels: ['0-10', '10-20', '20-30', '30-40', '40-50', '50-60', '70-80','80-90','90-100'],
  datasets: [
    {
      label: 'Age',
      fill: true,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [0, 10, 15, 21, 34, 22, 13,7,4,1]
    }
  ]
};

const options =  {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
      yAxes: [{
          ticks: {
              beginAtZero:true
          }
      }]
  }
}




const dataTreeDef = require('./datai2b2');

const urlAGE ="http://localhost:5000/data";
const urlFlare ="http://localhost:5000/flaredemo";
const urlI2B2 ="http://localhost:5000/api/navigation/dataTree";
const urlSel = "http://localhost:5000/selektList";

const data1 = [
  {SEX: 'M', frequency: 400},
  {SEX: 'F', frequency: 64}]


class App extends Component {

constructor(){
  super();
  this.state = {
    dataTree : dataTreeDef,
    dataAge : {},
    dataFM : {},
    selektionList : []
  };  
}

componentDidUpdate(){

}


componentDidMount(){

fetch(urlI2B2).then(res => {
    return res.json();
  })
  .then(new_data => this.setState({dataTree : new_data}))
  .catch(e => console.log("Fetching error NAV", e)) 

  fetch(urlAGE).then(res => {
    return res.json();
  })
  .then(new_data => this.setState({dataAge : new_data}))
  .catch(e => console.log("Fetching error AGE", e)) 

  fetch(urlSel, {  
    method: 'post',  
    mode: 'cors',
    headers: {  
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },  
     body: JSON.stringify({
    name: 'dean',
    login: 'dean'
  })
})
.then(function (data) {  
  console.log('Request success: ', data);  
})  
.catch(function (error) {  
  console.log('Request failure: ', error);  
})
}

/*
render(){
  return(
    <div>
     
    </div>
  )
}
}
*/

  render() {
    console.log("render data",this.state.data)
    return (
      <div>
        <div className="App" >
          <header className="App-header">
            <div id="Name">
              <p>idealGraph</p>
                </div>
            <div id="help">
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
                help
             </a>
        </div>
    </header>

    <body className="App-body" >
    <div id="Parts">
      <div id="Visualisierung">

          <div id="Selection">
        </div>
        <div id="Graphen">
        <div class="chart-container">
        <Doughnut
        data = {dataFMPie}

        />
        </div>
        </div>
        <div id="buttons">
        <div id="run">
            <button onClick="myFunction()">Run</button>
        </div>
        <div id="edit">
            <button onClick="myFunction()">Reset</button>
            <button onClick="myFunction()">Save</button>
        </div>
        </div>
      </div>
      <div id="Navigation">

      
      <TreeMap
           height={650}
           width={600}
           data={this.state.dataTree}

       
           valueUnit={"Diagnose"}
          />
        
       
       <div id="Navi">

       </div>
      </div>

    </div>
    </body>

  </div>
  </div>
    );
  }
}

export default App;

