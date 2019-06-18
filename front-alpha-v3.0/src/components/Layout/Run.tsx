import React, {Component} from "react";
import Navbar from "./Navbar";
import { Redirect } from 'react-router-dom'
import 'App.tsx'

class Run extends Component<{}, {}> {

    state = {
    redirect: false
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

    renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/target' />
    }
  }

    render() {
        return (
          <div className="Results">
              <div>
                <Navbar>
                </Navbar>
              </div>

              <div id = "Selektion">

              </div>

              <div id="Ergebnisse" >

                <div className="vertical-menu-Ergebnisse">
                          <div id="GeschlechtGraph"> GeschlechtGraph</div><br/>
                          <div id="AlterGraph">AlterGraph</div><br/>
                          <div id="AllgemeinGraph">AllgemeinGraph</div><br/>
                          <div id="NebendiagnosenGraph">NebendiagnosenGraph</div>
                </div>

                  <div id="buttons">
                        <div>
                        {this.renderRedirect()}
                        <button onClick={this.setRedirect}>Redirect</button>
                       </div>
                  </div>

              </div>
          </div>
        );
    }

}

export default Run;
