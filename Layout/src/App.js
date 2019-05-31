import React,{Component} from 'react';
import './App.css';
import Navbar from "./components/Navbar"
import Selektion from "./components/Selektion"
import Treemap from "./components/Treemap"
import Suchleiste from "./components/Suchleiste"
import Graphen from "./components/Graphen"
import AddSelect from "./components/AddSelect"
import Buttons from "./components/Buttons"


class App extends Component {
        state={
            contacts:[],
            selection:[ ]

}

    render() {

        return (

        <div className="App">
            <div id = "Navigation">
              <Navbar>
              </Navbar>
            </div>
            <body className="App-body">
              <div id = "Parts">

              <div id = "Links">
                  <div id = "Selektion">
                      <Selektion>
                      </Selektion>
                  </div>
                  <div id="Treemap">
                      <div id ="adden">
                          <AddSelect id="Add"></AddSelect>
                      </div>
                      <Treemap></Treemap>
                  </div>
              </div>
              <div id ="Rechts">
                  <div id = "Suchleiste">
                  <Suchleiste></Suchleiste>
                  </div>
                  <div id = "Graphen">
                      <Graphen></Graphen>
                  </div>
                  <div id="buttons">
                <Buttons></Buttons>
                  </div>
              </div>
              </div>
              </body>
        </div>
        );
  }
}
 export default App;
