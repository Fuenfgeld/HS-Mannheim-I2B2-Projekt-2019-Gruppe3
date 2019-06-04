import React, {Component} from "react"
import AddSelect from "./AddSelect"
import Merkmal from "./Merkmal";

class Selektion extends Component {
    state = {
        numChildren: 0
  }

  render () {
    const children = [];

    for (var i = 0; i < this.state.numChildren; i += 1) {
      children.push(<ChildComponent key={i} number={i} />);
    };

    return (
      <ParentComponent deleteChild={this.onDeleteChild} addChild={this.onAddChild}>
        {children}
      </ParentComponent>
    );
  }

  onAddChild = () => {
    this.setState({
      numChildren: this.state.numChildren + 1
    });
  }
  onDeleteChild =() =>{
    this.setState({
      numChildren:this.state.numChildren -1
    });
}
}

const ParentComponent = props => (
    <div>
    <div id = "scrollMenu">
  <div className="card calculator">
    <div id="children-pane">
      {props.children}
    </div>
  </div>
    </div>
        <p>      <button id = "delete" href="#" onClick={props.deleteChild}>X</button>
 <button id = "add" href="#" onClick={props.addChild}>Add</button></p>
    </div>
);

const ChildComponent = props => <Merkmal></Merkmal>;

    export default Selektion;