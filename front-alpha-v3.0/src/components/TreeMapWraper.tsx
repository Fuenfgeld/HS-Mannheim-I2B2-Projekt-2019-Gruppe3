import React, {Component} from "react"
import TreeMap from "./TreeMap/TreeMap"


type wrapProps = {
    dataTree : number,
    onChangeNode : any
}

type wrapState = {
    currentNode : any,
    onChangeNode : any
}


class TreeMapWraper extends React.Component<wrapProps, wrapState> {

    public static defaultProps: wrapProps = {
        dataTree : null,
        onChangeNode : null
    };

    constructor(){
        super();
        this.state = {
        currentNode : null,
        onChangeNode : this.props.onChangeNode.bind(this)
        }
    }

    public onChangeNode(nodeCurrent: any){
        console.log("in onChange Treemap");
        console.log("Node in onChangeNode",nodeCurrent)
        this.state.onChangeNode(nodeCurrent);
    };


  render() {
    return (
     <div>
        <TreeMap
         height={410}
         width={980}
         data={this.props.dataTree}
         valueUnit={"Diagnoses"}
         onChangeNode={this.state.onChangeNode.bind(this)}
        
        />
     </div>
    );
  }
}

export default TreeMapWraper;