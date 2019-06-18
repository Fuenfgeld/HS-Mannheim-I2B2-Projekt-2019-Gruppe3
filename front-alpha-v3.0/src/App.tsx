import * as React from "react";
import ErsteSeite from "./components/Layout/ErsteSeite";
import './App.css';
import Ergebnis from "./components/Layout/Ergebnis"

import {
  BrowserRouter as Router,
  Route, Switch, Link
} from 'react-router-dom'


const urlAGE ="http://localhost:5000/data";
const urlFlare ="http://localhost:5000/flaredemo";
const urlI2B2 ="http://127.0.0.1:5000/api/navigation/data";
const urlSel = "http://localhost:5000/api/selection/data";
const urlPCount = "http://localhost:5000/api/patientcount/data";
const urlDCount = "http://localhost:5000/api/diagnosecount/data";


export default class App extends React.Component<{}, {}> {

    public render() {
      console.log("Render");

        return (
        <Router>
            <Switch>
              <Route path="/about" component={Ergebnis} />
              <Route path="/" component={ErsteSeite} />
            </Switch>
        </Router>

        );
      }

    }




