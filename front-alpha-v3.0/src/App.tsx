import * as React from "react";
import SelectionPage from "./components/Layout/SelectionPage";
import './App.css';
import helppage from "./components/Layout/helppage"
import ResultPage from "./components/Layout/ResultPage"

import {
  BrowserRouter as Router,
  Route, Switch, Link
} from 'react-router-dom'


export default class App extends React.Component<{}, {}> {

    public render() {
      console.log("Render");

        return (
        <Router>
            <Switch>
              <Route path="/result" component={ResultPage} />
              <Route path="/" component={SelectionPage} />
              <Route path="/help" component={helppage} />

            </Switch>
        </Router>

        );
      }

    }

