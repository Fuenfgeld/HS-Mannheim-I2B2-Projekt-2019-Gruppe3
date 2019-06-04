import React, {Component} from "react"
import AddSelect from "./AddSelect"
import Merkmal from "./Merkmal";

type SelState = 
{
numChildren:number
};


class Selektion extends React.Component<{}, SelState> {
  constructor(){
    super();
    this.state = {
      numChildren : 0
    };  
  }

  render () {
    const children = [];

    for (var i = 0; i < this.state.numChildren; i += 1) {
      children.push(<ChildComponent key={i} number={i} />);
    };

    return (
      <ParentComponent addChild={this.onAddChild}>
        {children}
      </ParentComponent>
    );
  }

  onAddChild = () => {
    this.setState({
      numChildren: this.state.numChildren + 1
    });
  }
}

const ParentComponent = (props: { children: React.ReactNode; addChild: (event: React.MouseEvent<HTMLButtonElement>) => void; }) => (
    <div>
    <div id = "scrollMenu">
  <div className="card calculator">
    <div id="children-pane">
      {props.children}
    </div>
  </div>
    </div>
        <button id="add"  onClick={props.addChild}>Add</button>
    </div>
);

const ChildComponent = (props: any) => <Merkmal>Merkmal1</Merkmal>;

    export default Selektion;