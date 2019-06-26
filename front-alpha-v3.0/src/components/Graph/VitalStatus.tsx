import React, {Component} from "react";
import {VictoryAxis, VictoryLabel,VictoryBar,VictoryStack, VictoryChart,VictoryTooltip } from "victory";

type vitProps = {
    data : any
  } 
  
 
  type vitState = {
    dataM : any,
    dataF : any,
  
  }

class VitalStatus extends React.Component<vitProps,vitState> {
    constructor(){
        super();
        this.state = {
          dataM :[
            {x:"deceased", y:10 },
            {x:"defeared", y:10 },
            {x:"alive", y:10 },
            {x:"unknown", y:10 },
          ],
          dataF :[
            {x:"deceased", y:10 },
            {x:"defeared", y:10 },
            {x:"alive", y:10 },
            {x:"unknown", y:10 },
          ]
        }
      }
    

    componentDidUpdate(prevProps: { data: any; }){ 
      if (prevProps.data !== this.props.data) {
        this.setState({
          dataM : [
            {x:this.props.data.lable[0], y:this.props.data.M[0]},
            {x:this.props.data.lable[1], y:this.props.data.M[1]},
            {x:this.props.data.lable[2], y:this.props.data.M[2]},
            {x:this.props.data.lable[3], y:this.props.data.M[3]}
          ],
          dataF : [
            {x:this.props.data.lable[0], y:this.props.data.F[0]},
            {x:this.props.data.lable[1], y:this.props.data.F[1]},
            {x:this.props.data.lable[2], y:this.props.data.F[2]},
            {x:this.props.data.lable[3], y:this.props.data.F[3]}
          ]
        })
      }
    }
    
    componentDidMount(){
    
    }
    
    
    render() {
      
      const width = 400;
      const height = 400;
      const padding = { top: 80, bottom: 100, left: 50, right: 50 };
        return (
         <div>
           <VictoryChart height={height} width={width}
              domainPadding={{ x: 20}}
              padding = {padding}
            >
              <VictoryStack 
                standalone={false}
                 style={{ data: { width: 20 }, labels: { fontSize: 17 } }}
                 padding ={10}
                 labels = {[(this.state.dataF[0].y+this.state.dataM[0].y),(this.state.dataF[1].y+this.state.dataM[1].y),(this.state.dataF[2].y+this.state.dataM[2].y),(this.state.dataF[3].y+this.state.dataM[3].y)]}
                >
               
              <VictoryBar 
                style={{ data: { fill: "#215167" } }}
                data= {this.state.dataM}
                //labelComponent={<VictoryTooltip/>}
              />
               <VictoryBar
                style={{ data: { fill: "#E6C24A" } }}
                data= {this.state.dataF}
                //labelComponent={<VictoryTooltip/>}
              />
              </VictoryStack>
              <VictoryAxis 
              style={{
                axis: { stroke: "black" },
                ticks: { stroke: "black" },
                tickLabels: { fontSize: 16, fill: "black" }
              }}
            />
             <VictoryAxis dependentAxis
              style={{
                axis: { stroke: "black" },
                ticks: { stroke: "black" },
                tickLabels: { fontSize: 16, fill: "black" }
              }}
            />
             <VictoryLabel
              textAnchor="middle"
              style={{ fontSize: 30 }}
              x={(width/2)} y={30}
              text= {"Vital Status"}
            />
            </VictoryChart>
            
        </div>
        );
      }
    }

export default VitalStatus;
