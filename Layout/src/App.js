import React,{Component} from 'react';
import TreeMap from "react-d3-treemap";
import './App.css';
import Selection from './components/Selection';
import { Fragment } from 'react';
import AddSelect from './components/AddSelect';
import axios from 'axios';
import SelectItem from "./components/SelectItem";


let data= require("./data")


class App extends Component {
        state={
            contacts:[],
            selection:[
                {
                id: 1,
                title:'Take out the train'
                }
                ]


}


    componentDidMount() {
    fetch('http://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then((data) => {
      this.setState({ contacts: data })
      console.log(this.state.contacts)
    })
    .catch(console.log)
        axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(res => this.setState({ todos: res.data }))
  }




  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };

    this.toggle1 = this.toggle1.bind(this);
    this.state = {
      dropdownOpen1: false};

    this.toggle2 = this.toggle2.bind(this);
    this.state = {
      dropdownOpen2: false
    };
  }


  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  toggle1() {
    this.setState(prevState => ({
      dropdownOpen1: !prevState.dropdownOpen1
    }));
  }

  toggle2() {
    this.setState(prevState => ({
      dropdownOpen2: !prevState.dropdownOpen2
    }));
  }

// Delete Todo
  delSelect = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/selection/${id}`)
      .then(res => this.setState({ selection: [...this.state.selection.filter(select => select.id !== id)] }));
  }

  // Add Todo
  addSelect = (title) => {
    axios.post('https://jsonplaceholder.typicode.com/selection', {
      title,
      completed: false
    })
      .then(res => this.setState({ selection: [...this.state.selection, res.data] }));
  }

    render() {

        return (

        <div className="App">
              <div id = "Navigation">
            <ul>
                <li><a href = "default.asp">IdealGraph</a></li>
                <li style= {{float:"right"}} ><a class ="active"
                    href = "#Help">Help</a></li>
            </ul>
              </div>
            <body className="App-body">
              <div id = "Parts">

              <div id = "Links">
                  <div id = "Selektion">Selektion
                  </div>
                  <div id="Treemap">
                      <div id="add">
                      <button onClick= "myFunction()">Add</button>
                   <TreeMap width={865} height={320} data={data} valueUnit={"MB"} />
                   </div>
                  </div>
              </div>
              <div id ="Rechts">
                  <div id = "Suchleiste">
                  <label htmlFor="suche"></label>
                  <input type="search" id="suche" placeholder="Suche"/>
                  </div>
                  <div id = "Graphen">Graphen</div>
                  <div id="buttons">
        <div id="run">
            <button onClick="myFunction()">Run</button>
        </div>
        <div id="edit">
            <button onClick="myFunction()">Reset</button>
        </div>
        <div id ="save">
            <button onClick="myFunction()">Save</button>
        </div>
                  </div>
              </div>
              </div>
            </body>
        </div>

        );
  }
}
 export default App;
