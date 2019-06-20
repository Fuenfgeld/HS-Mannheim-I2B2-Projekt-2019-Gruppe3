import React, {Component} from "react"
import SelectionChild from "./SelectionChild";
import FirstSelectionChild from "./FirstSelectionChild";

type SelState = {numChildren:number,
                selNames:any,
                selOperators : any};
type SelProps = {selName:any}

class Selektion extends React.Component<SelProps, SelState> {



  
  render() {
    let names = this.props.selName;

    let elements=[];
        for(let i=0;i<names.length;i++){
             // push the component to elements!
                elements.push(<SelectionChild key = {i} name={ names[i] } />);
        }
        return (
          <div id = "scrollMenu">
            <div id="children-pane">
              {elements}
            </div>
          </div>
    );
  }
}

export default Selektion;
